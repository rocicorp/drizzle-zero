import * as path from 'node:path';
import {Project} from 'ts-morph';
import {describe, expect, test} from 'vitest';
import {
  isSafeResolvedType,
  resolveCustomTypes,
} from '../src/cli/type-resolution';

describe('resolveCustomTypes', () => {
  test.each([
    ['"WY" | "AL" | "AK"', '10 | 2'],
    ['"AK" | "WY" | "AL"', '2 | 10'],
  ])(
    'uses native type ordering after checking %s and %s',
    (states, numbers) => {
      const project = new Project({
        tsConfigFilePath: path.resolve(__dirname, '../tsconfig.json'),
        skipAddingFilesFromTsConfig: true,
      });
      const unrelated = project.createSourceFile(
        'unrelated.ts',
        `export type States = ${states}; export type Numbers = ${numbers};`,
      );
      project.createSourceFile(
        'virtual-schema.ts',
        `
        import {pgTable, text, integer, jsonb} from 'drizzle-orm/pg-core';
        export const records = pgTable('records', {
          id: text('id').primaryKey(),
          state: text('state').$type<'WY' | 'AL' | 'AK'>().notNull(),
          count: integer('count').$type<10 | 2>().notNull(),
          tuple: jsonb('tuple').$type<[string, number, 'WY' | 'AL' | 'AK']>().notNull(),
        });
      `,
      );
      // Intern the unrelated literals before resolving the schema, as in PR #1.
      for (const alias of unrelated.getTypeAliases()) {
        alias.getType().getText();
      }

      const resolved = resolveCustomTypes({
        project,
        helperName: 'CustomType',
        schemaTypeExpression: 'typeof drizzleSchema',
        schemaImports: [
          {
            moduleSpecifier: './virtual-schema',
            namespaceImport: 'drizzleSchema',
            isTypeOnly: true,
          },
        ],
        requests: ['state', 'count', 'tuple'].map(columnName => ({
          tableName: 'records',
          columnName,
        })),
      });

      expect(Object.fromEntries(resolved)).toEqual({
        'records::|::state': '"AK" | "AL" | "WY"',
        'records::|::count': '2 | 10',
        'records::|::tuple': '[string, number, "AK" | "AL" | "WY"]',
      });
    },
  );

  // PR #1 reported custom types collapsing to unknown when ts-morph's
  // declarations were loaded into the schema's TypeScript program.
  test.each(['CustomType', 'ZeroCustomType'] as const)(
    '%s resolves custom types with ts-morph declarations in the program',
    helperName => {
      const project = new Project({
        tsConfigFilePath: path.resolve(__dirname, '../tsconfig.json'),
        skipAddingFilesFromTsConfig: true,
      });

      const source = project.createSourceFile(
        'virtual-schema.ts',
        `
          import type {Project} from 'ts-morph';
          import {pgTable, text, integer, jsonb} from 'drizzle-orm/pg-core';
          import {drizzleZeroConfig} from './src/index';

          export type SchemaProject = Project;
          export const records = pgTable('records', {
            id: text('id').primaryKey(),
            status: text('status').$type<'active' | 'archived'>().notNull(),
            count: integer('count').notNull(),
            metadata: jsonb('metadata').notNull(),
            settings: jsonb('settings').$type<{enabled: boolean; labels: string[]}>().notNull(),
          });
          export const schema = drizzleZeroConfig({records}, {tables: {records: true}});
        `,
        {overwrite: true},
      );
      project.resolveSourceFileDependencies();
      expect(source.getPreEmitDiagnostics()).toEqual([]);

      const resolved = resolveCustomTypes({
        project,
        helperName,
        schemaTypeExpression:
          helperName === 'CustomType'
            ? 'typeof drizzleSchema'
            : 'typeof drizzleSchema.schema',
        schemaImports: [
          {
            moduleSpecifier: './virtual-schema',
            namespaceImport: 'drizzleSchema',
            isTypeOnly: true,
          },
        ],
        requests: ['id', 'status', 'count', 'metadata', 'settings'].map(
          columnName => ({tableName: 'records', columnName}),
        ),
      });

      expect(Object.fromEntries(resolved)).toEqual({
        'records::|::id': 'string',
        'records::|::status': '"active" | "archived"',
        'records::|::count': 'number',
        'records::|::metadata': 'ReadonlyJSONValue',
        'records::|::settings': '{ enabled: boolean; labels: string[]; }',
      });
    },
  );

  test('resolves primitive column types', () => {
    const project = new Project({
      tsConfigFilePath: path.resolve(__dirname, '../tsconfig.json'),
      skipAddingFilesFromTsConfig: true,
    });

    project.createSourceFile(
      'virtual-schema.ts',
      `
        import { pgTable, text, jsonb, pgEnum, number, boolean } from "drizzle-orm/pg-core";
        import type { CustomJsonType } from "@drizzle-zero/custom-types";

        const customEnum = pgEnum("custom_enum", ["a", "b", "c"]);
        export const user = pgTable("user", {
          id: text("id").primaryKey(),
          name: text("name").notNull(),
          enumField: customEnum("enum_field").notNull(),
          enumFieldWithDefault: customEnum("enum_field_with_default").default("a").notNull(),
          numberField: number("number_field").notNull(),
          booleanField: boolean("boolean_field").notNull(),

          customTypeJson: jsonb("custom_type_json").$type<CustomJsonType>().notNull(),
          customInterfaceJson: jsonb("custom_interface_json").$type<CustomInterface>().notNull(),
        });
      `,
      {overwrite: true},
    );

    project.resolveSourceFileDependencies();

    const resolved = resolveCustomTypes({
      project,
      helperName: 'CustomType',
      schemaTypeExpression: 'typeof drizzleSchema',
      schemaImports: [
        {
          moduleSpecifier: './virtual-schema',
          namespaceImport: 'drizzleSchema',
          isTypeOnly: true,
        },
      ],
      requests: [
        {tableName: 'user', columnName: 'id'},
        {tableName: 'user', columnName: 'name'},
        {tableName: 'user', columnName: 'customTypeJson'},
        {tableName: 'user', columnName: 'enumField'},
        {tableName: 'user', columnName: 'enumFieldWithDefault'},
        {tableName: 'user', columnName: 'numberField'},
        {tableName: 'user', columnName: 'booleanField'},
      ],
    });

    expect(Array.from(resolved.entries())).toMatchInlineSnapshot(`
      [
        [
          "user::|::id",
          "string",
        ],
        [
          "user::|::name",
          "string",
        ],
        [
          "user::|::enumField",
          ""a" | "b" | "c"",
        ],
        [
          "user::|::enumFieldWithDefault",
          ""a" | "b" | "c"",
        ],
        [
          "user::|::booleanField",
          "boolean",
        ],
      ]
    `);
  });

  test('returns empty map when there are no custom type requests', () => {
    const project = new Project({
      skipAddingFilesFromTsConfig: true,
    });

    const resolved = resolveCustomTypes({
      project,
      helperName: 'CustomType',
      schemaTypeExpression: 'typeof schema',
      schemaImports: [],
      requests: [],
    });

    expect(resolved.size).toBe(0);
  });

  test('deduplicates repeated table/column requests', () => {
    const project = new Project({
      tsConfigFilePath: path.resolve(__dirname, '../tsconfig.json'),
      skipAddingFilesFromTsConfig: true,
    });

    project.createSourceFile(
      'virtual-schema.ts',
      `
        import { pgTable, text } from "drizzle-orm/pg-core";

        export const user = pgTable("user", {
          customField: text("custom_field").$type<string>().notNull(),
        });
      `,
      {overwrite: true},
    );

    project.resolveSourceFileDependencies();

    const resolved = resolveCustomTypes({
      project,
      helperName: 'CustomType',
      schemaTypeExpression: 'typeof drizzleSchema',
      schemaImports: [
        {
          moduleSpecifier: './virtual-schema',
          namespaceImport: 'drizzleSchema',
          isTypeOnly: true,
        },
      ],
      requests: [
        {tableName: 'user', columnName: 'customField'},
        {tableName: 'user', columnName: 'customField'},
      ],
    });

    expect(resolved.size).toBe(1);
    expect(resolved.get('user::|::customField')).toBe('string');
  });

  test('resolves ReadonlyJSONValue and includes it in the result map', () => {
    const project = new Project({
      tsConfigFilePath: path.resolve(__dirname, '../tsconfig.json'),
      skipAddingFilesFromTsConfig: true,
    });

    project.createSourceFile(
      'virtual-schema.ts',
      `
        import { pgTable, text, jsonb } from "drizzle-orm/pg-core";

        export const user = pgTable("user", {
          id: text("id").primaryKey(),
          jsonData: jsonb("json_data").notNull(),
        });
      `,
      {overwrite: true},
    );

    project.resolveSourceFileDependencies();

    const resolved = resolveCustomTypes({
      project,
      helperName: 'CustomType',
      schemaTypeExpression: 'typeof drizzleSchema',
      schemaImports: [
        {
          moduleSpecifier: './virtual-schema',
          namespaceImport: 'drizzleSchema',
          isTypeOnly: true,
        },
      ],
      requests: [
        {tableName: 'user', columnName: 'id'},
        {tableName: 'user', columnName: 'jsonData'},
      ],
    });

    expect(resolved.get('user::|::id')).toBe('string');
    expect(resolved.get('user::|::jsonData')).toBe('ReadonlyJSONValue');
  });
});

describe('isSafeResolvedType', () => {
  const safeTypes = [
    // Primitives
    'boolean',
    'number',
    'string',
    'true',
    'false',
    'true | false',
    'null',
    'undefined',

    // JSON types
    'ReadonlyJSONValue',

    // Numeric literals
    '1 | 2 | 3',
    '0 | 1',
    '42',
    '-1 | 0 | 1',
    '1.5 | 2.5',

    // String literals
    '"ASSIGNED" | "COMPLETED"',
    '"active" | "inactive" | "pending"',

    // Template literals
    '`${string}@${string}`',
    '`user_${number}`',
    '`${string}_${string}_${string}`',
    '`prefix-${string | number}`',
    '`${"a" | "b" | "c"}_${number}`',
    '`prefix_${"one" | "two"}`',

    // Simple arrays
    'number[]',
    'string[]',
    'string[][]',
    'number[][][]',

    // Tuples
    '[string, number, boolean]',
    '[string]',
    '[string, string, string, string]',
    '[number, ...string[]]',
    '[string, number?, boolean?]',

    // Arrays with complex types
    '("active" | "inactive" | "pending")[]',
    '("foo" | number | `${string}:${number}`)[]',
    '{ key: string; }[]',
    '({ id: string; })[][]',
    '(string | number)[]',
    '(string | number | { id: string; })[]',
    '("foo" | "bar" | { id: string; })[]',

    // Simple objects
    '{}',
    '{ key: string; }',
    '{ theme: string; fontSize: number; }',

    // Objects with optional properties
    '{ id: string; config?: { theme: string; }; }',
    '{ id: string; config?: { theme: string; }; }[]',

    // Nested objects
    '{ nested: { deep: { value: string; }; }; }',
    '{ array: string[]; tuple: [number, boolean]; }',
    '{ union: string | number; intersection: string & ("a" | "b"); }',

    // Objects with index signatures
    '{ [key: string]: number; }',
    '{ [index: number]: string; }',
    '{ [key: string]: string | number; }',
    '{ [key: string]: { nested: boolean; }; }',
    '{ name: string; [key: string]: string; }',
    '({ palette: { [key: string]: string; accents: { [index: number]: string; }; }; })',

    // Complex nested objects
    '({ id: string; flags?: ("foo" | "bar")[]; nested: { count: number; }; })',
    '({ id: string; flags?: ("foo" | "bar")[]; nested: { count: number; }; })[]',
    '({ coordinates: [number, number]; metadata: { source: "gps" | "wifi"; tags?: ("alpha" | `flag:${string}`)[]; }; version: 1 | 2 | 3; })',
    '({ nodes: { id: string; edges: { id: string; weight: number; }[]; }[]; root: string; })[]',
    '({ label: `${string}:${number}`; colors: ("red" | "blue" | `${string}`)[]; options: { compact: boolean; }[]; })',
    '({ layout: [number, number, number]; history: { status: "open" | "closed"; transitions: { at: string; from: "open" | "closed"; to: "open" | "closed"; }[]; }[]; })',

    // Union types
    'string | "literal"',
    'string | null',
    'string | undefined',
    'string | null | undefined',
    'string | number | boolean | null | undefined',
    '{ type: "a"; value: string; } | { type: "b"; value: number; }',
    '({ status: "active" | "inactive"; data: string | number; } | { status: "error"; message: string; })[]',

    // Intersection types
    'string & ("draft" | "published")',
    '{ a: string; } & { b: number; }',
    'string & { _brand: "UserId"; }',
    '(string | number) & (number | boolean)',

    // Empty types
    '[]',
  ] as const;

  const unsafeTypes = [
    // Boxed primitives should be rejected
    'Boolean',
    'Number',
    'String',
    'Boolean | null',
    'String[]',
    'Boolean[]',
    'Array<Boolean>',
    'Promise<Boolean>',
    'ReadonlyArray<Boolean>',
    'Record<string, Boolean>',
    'Set<Boolean>',
    '{ value: Boolean; }',
    'Boolean | boolean',
    'Boolean & boolean',
    'globalThis.Boolean',
    'BooleanConstructor',
    'NumberConstructor',
    'StringConstructor',
    'Symbol',
    'Object',
    'Function',

    // Disallowed bigint
    'bigint',
    '`${string}-${number}-${bigint}`',
    '[[string, number], [boolean, bigint]]',
    '{ a: string; b: number; c: boolean; d: bigint; }',

    // Error types
    'SchemaIsAnyError',
    'SomeType__error__',
    '__error__Type',
    'Type__error__Name',

    // CustomType/ZeroCustomType in name (should be rejected)
    'CustomTypeHelper',
    'ZeroCustomTypeWrapper',
    'MyCustomType',

    // TypeScript problem types
    'any',
    'unknown',
    'never',
    'void',
    'object',
    'object | null',

    // Custom type identifiers
    'CustomJsonInterface',
    'CustomJsonType',
    'TestType',

    // Namespace/module types
    'drizzleSchema.TestExportedType',
    'drizzleSchema.TestInterface',
    'namespace.Type',
    'MyNamespace.MyType',
    'A.B.C',
    'module.submodule.Type',
    'React.FC',
    'Express.Request',

    // Import types
    "import('path/to/module').SomeType",
    "typeof import('module')",

    // Indexed access types
    "drizzleSchema['user']['id']",
    'User["id"]',
    'T[K]',
    'MyType[keyof MyType]',
    'Array<string>[number]',

    // Built-in generic types
    'Record<string, string>',
    'Promise<string>',
    'PromiseLike<{ id: string }>',
    'Map<string, number>',
    'Set<string>',
    'ReadonlyArray<string>',
    'Array<{ id: string }>',
    'Date',

    // TypeScript utility types
    'Pick<User, "id" | "name">',
    'Omit<User, "password">',
    'Partial<{ id: string }>',
    'Required<{ id?: string; }>',
    'Readonly<{ id: string; }>',
    'Extract<string | number, string>',
    'Exclude<string | number, string>',
    'NonNullable<string | null>',
    'ReturnType<typeof compute>',
    'Parameters<typeof fn>',
    'ConstructorParameters<typeof MyClass>',
    'InstanceType<typeof MyClass>',
    'ThisType<any>',
    'Awaited<string>',
    'Uppercase<string>',
    'Lowercase<string>',
    'Capitalize<string>',
    'Uncapitalize<string>',

    // Complex utility combinations
    'Partial<Pick<User, "id">>',
    'Required<Readonly<{ id?: string; }>>',
    'Record<string, Partial<User>>',

    // Third-party type helpers
    'z.infer<typeof schema>',
    'Brand<string, "UserId">',
    'Opaque<number, "Cents">',
    'Nominal<string, "Email">',

    // Function types
    '() => string',
    '()=>string',
    '(arg: string) => void',
    '(arg: string) => string',
    '(arg: string, count: number) => boolean',
    '<T>(arg: T) => T',
    '<T extends string>(arg: T) => T',

    // Constructor types
    'new () => string',
    'new (arg: string) => MyClass',
    'abstract new () => any',

    // Object types with methods
    '{ method(): void; }',
    '{ method(arg: string): number; }',
    '{ new (): string; }',

    // Conditional types
    'T extends string ? number : boolean',
    'string extends infer U ? U : never',
    'MyType extends { id: string } ? true : false',

    // Mapped types
    '{ [K in keyof T]: string; }',
    '{ [P in "a" | "b"]: number; }',
    '{ readonly [K in keyof T]: T[K]; }',
    '{ [K in keyof T]?: T[K]; }',
    '{ [K in keyof T as `get${K}`]: T[K]; }',

    // keyof operator
    'keyof User',
    'keyof { id: string; name: string; }',
    'keyof T',

    // typeof with expressions
    'typeof window',
    'typeof myVariable',
    'typeof MyClass',

    // Generic type parameters
    'T',
    'U extends string',
    'T[]',
    'K extends keyof T',

    // infer keyword
    'T extends Array<infer U> ? U : never',
    'T extends (...args: infer P) => any ? P : never',

    // Tuple with generic rest elements
    '[...T]',
    '[string, ...T]',

    // Symbol types
    'symbol',
    'unique symbol',

    // this type
    'this',
    'this is string',

    // Type guards
    'x is string',
    'asserts x is number',

    // readonly modifier
    'readonly string[]',

    // Enum-like references
    'MyEnum',
    'MyEnum.Value',

    // Object with computed property names (identifiers)
    '{ [computed]: string; }',

    // Weird edge case
    '"`resolved literal`"',

    // void and never in complex contexts
    'void[]',
    'void | string',
    '{ foo: void }',
    'never[]',
    'never | string',
    '{ foo: never }',
    '(void)',
    '(never)',
    'any[]',
    'unknown[]',

    // More bigint variations
    'bigint | string',
    'bigint[]',
    '(bigint)',
    'bigint | null',

    // Template literals with disallowed types
    '`${any}`',
    '`${unknown}`',
    '`${symbol}`',
    '`${void}`',
    '`${never}`',
    '`${bigint}`',

    // Common built-in types
    'RegExp',
    'Error',
    'TypeError',
    'SyntaxError',
    'ReferenceError',
    'RangeError',
    'EvalError',
    'URIError',
    'AggregateError',

    // Typed arrays and binary types
    'Uint8Array',
    'Int8Array',
    'Uint16Array',
    'Int16Array',
    'Uint32Array',
    'Int32Array',
    'Float32Array',
    'Float64Array',
    'Uint8ClampedArray',
    'BigInt64Array',
    'BigUint64Array',
    'ArrayBuffer',
    'SharedArrayBuffer',
    'DataView',

    // More built-in generic/reference types
    'WeakMap<object, string>',
    'WeakSet<object>',
    'Blob',
    'File',
    'FileList',
    'URL',
    'URLSearchParams',
    'FormData',
    'Headers',
    'Request',
    'Response',

    // Global namespace types
    'Intl.DateTimeFormat',
    'Intl.NumberFormat',
    'Intl.Collator',
    'globalThis.Array',
    'globalThis.Promise',
    'globalThis.Map',
    'JSON',
    'Console',

    // readonly with tuples
    'readonly [string, number]',
    'readonly [string, ...number[]]',

    // More typeof with globals
    'typeof globalThis',
    'typeof process',
    'typeof console',
    'typeof global',

    // Parenthesized types with identifiers
    '(MyType)',
    '(CustomInterface | string)',
    '(T)',

    // More complex intersections with custom types
    'CustomType & string',
    '{ foo: string } & CustomInterface',
    'MyType & { bar: number }',

    // Edge cases with multiple generics
    'Map<K, V>',
    'Record<K, V>',
  ] as const;

  test('returns false when the resolved type text is missing', () => {
    expect(isSafeResolvedType(undefined)).toBe(false);
    expect(isSafeResolvedType('')).toBe(false);
  });

  test.each(safeTypes)('returns true for safe type %s', typeText => {
    expect(isSafeResolvedType(typeText)).toBe(true);
  });

  test.each(unsafeTypes)('returns false for unsafe type %s', typeText => {
    expect(isSafeResolvedType(typeText)).toBe(false);
  });
});
