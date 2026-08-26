import camelCase from 'camelcase';
import {createHash} from 'node:crypto';
import pluralize from 'pluralize';
import {
  type CodeBlockWriter,
  type Project,
  type SourceFile,
  VariableDeclarationKind,
} from 'ts-morph';
import type {getConfigFromFile} from './config';
import type {getDefaultConfig} from './drizzle-kit';
import {COLUMN_SEPARATOR, resolveCustomTypes} from './type-resolution';

/**
 * Distinguishes a table's row type from its table const in the identifier
 * allocator, which keys everything by a single string.
 */
const ROW_TYPE_PREFIX = 'row\u0000';

/**
 * Identifiers the generated file always declares or imports. A schema key that
 * wants one of these is treated as a collision so the generated code never
 * shadows them.
 */
const RESERVED_IDENTIFIERS: ReadonlySet<string> = new Set([
  'CustomType',
  'ReadonlyJSONValue',
  'Row',
  'Schema',
  'ZeroCustomType',
  'builder',
  'createBuilder',
  'drizzleSchema',
  'schema',
  'zeroSchema',
  'zql',
]);

const stableDisambiguator = (key: string) =>
  createHash('sha256').update(key).digest('hex').slice(0, 8);

/**
 * Assigns a generated identifier to every key in one pass.
 *
 * A key whose preferred name is unique and unreserved keeps that name. When
 * several keys want the same name -- `user` and `users` both want the row type
 * `User`, say -- every one of them takes a suffix derived from its own key, so
 * no key's identifier depends on where it sits relative to the others. That
 * keeps a reordered schema byte-identical, and confines the effect of adding a
 * colliding key to the keys it actually collides with.
 */
function allocateIdentifiers(
  requests: Iterable<readonly [key: string, preferredName: string]>,
): Map<string, string> {
  const keysByPreferredName = new Map<string, string[]>();

  for (const [key, preferredName] of requests) {
    const existing = keysByPreferredName.get(preferredName);

    if (existing) {
      existing.push(key);
    } else {
      keysByPreferredName.set(preferredName, [key]);
    }
  }

  const allocated = new Map<string, string>();

  for (const [preferredName, keys] of keysByPreferredName) {
    if (keys.length === 1 && !RESERVED_IDENTIFIERS.has(preferredName)) {
      allocated.set(keys[0]!, preferredName);
      continue;
    }

    for (const key of keys) {
      allocated.set(key, `${preferredName}_${stableDisambiguator(key)}`);
    }
  }

  return allocated;
}

export function getGeneratedSchema({
  tsProject,
  result,
  outputFilePath,
  jsExtensionOverride = 'auto',
  skipTypes = false,
  skipBuilder = false,
  skipDeclare = false,
  enableLegacyMutators = false,
  enableLegacyQueries = false,
  debug,
}: {
  tsProject: Project;
  result:
    | Awaited<ReturnType<typeof getConfigFromFile>>
    | Awaited<ReturnType<typeof getDefaultConfig>>;
  outputFilePath: string;
  jsExtensionOverride?: 'auto' | 'force' | 'none';
  skipTypes?: boolean;
  skipBuilder?: boolean;
  skipDeclare?: boolean;
  enableLegacyMutators?: boolean;
  enableLegacyQueries?: boolean;
  debug?: boolean;
}) {
  // Auto-detect if .js extensions are needed based on tsconfig
  // unless explicitly overridden by the user
  let needsJsExtension = jsExtensionOverride === 'force';

  if (jsExtensionOverride === 'auto') {
    const compilerOptions = tsProject.getCompilerOptions();
    const moduleResolution = compilerOptions.moduleResolution;

    // ModuleResolutionKind enum values:
    // Classic = 1, NodeJs = 2, Node16 = 3, NodeNext = 99, Bundler = 100
    // We need .js extensions for Node16 (3) and NodeNext (99)
    // For NodeJs (2), we typically don't need them
    // For Bundler (100), we definitely don't need them
    needsJsExtension = moduleResolution === 3 || moduleResolution === 99;

    if (needsJsExtension && debug) {
      console.log(
        `ℹ️  drizzle-zero: Auto-detected moduleResolution requires .js extensions (moduleResolution=${moduleResolution})`,
      );
    }
  }

  const schemaObjectName = 'schema';
  const typename = 'Schema';

  const zeroSchemaGenerated = tsProject.createSourceFile(outputFilePath, '', {
    overwrite: true,
  });

  let resolverImportHelperFile: SourceFile | undefined;
  const getResolverImportModuleSpecifier = (sourceFile: SourceFile) => {
    if (!resolverImportHelperFile) {
      resolverImportHelperFile = tsProject.createSourceFile(
        '__drizzle_zero_type_resolver__imports.ts',
        '',
        {overwrite: true},
      );
    }

    const moduleSpecifier =
      resolverImportHelperFile.getRelativePathAsModuleSpecifierTo(sourceFile);

    if (needsJsExtension && !moduleSpecifier.endsWith('.js')) {
      return `${moduleSpecifier}.js`;
    }

    return moduleSpecifier;
  };

  let customTypeHelper: string;
  let zeroSchemaSpecifier: string | undefined;
  let schemaTypeExpression: string | undefined;
  const resolverImports: Parameters<
    typeof resolveCustomTypes
  >[0]['schemaImports'] = [];

  if (result.type === 'config') {
    // For config mode, use ZeroCustomType with the config schema
    customTypeHelper = 'ZeroCustomType';
    zeroSchemaGenerated.addImportDeclaration({
      moduleSpecifier: 'drizzle-zero',
      namedImports: [{name: customTypeHelper}],
      isTypeOnly: true,
    });
    const moduleSpecifier =
      zeroSchemaGenerated.getRelativePathAsModuleSpecifierTo(
        result.zeroSchemaTypeDeclarations[1].getSourceFile(),
      );
    const runtimeModuleSpecifier =
      needsJsExtension && !moduleSpecifier.endsWith('.js')
        ? `${moduleSpecifier}.js`
        : moduleSpecifier;
    // Add import for DrizzleConfigSchema
    zeroSchemaGenerated.addImportDeclaration({
      moduleSpecifier: runtimeModuleSpecifier,
      namedImports: [{name: result.exportName, alias: 'zeroSchema'}],
      isTypeOnly: true,
    });

    resolverImports.push({
      moduleSpecifier: getResolverImportModuleSpecifier(
        result.zeroSchemaTypeDeclarations[1].getSourceFile(),
      ),
      namedImports: [{name: result.exportName, alias: 'zeroSchema'}],
      isTypeOnly: true,
    });

    zeroSchemaSpecifier = 'typeof zeroSchema';
    schemaTypeExpression = zeroSchemaSpecifier;
  } else {
    // For no-config mode, use CustomType to avoid expanding entire schema
    const moduleSpecifier =
      zeroSchemaGenerated.getRelativePathAsModuleSpecifierTo(
        result.drizzleSchemaSourceFile,
      );
    const runtimeModuleSpecifier =
      needsJsExtension && !moduleSpecifier.endsWith('.js')
        ? `${moduleSpecifier}.js`
        : moduleSpecifier;
    zeroSchemaGenerated.addImportDeclaration({
      moduleSpecifier: runtimeModuleSpecifier,
      namespaceImport: 'drizzleSchema',
      isTypeOnly: true,
    });

    // Add import for CustomType - much faster than ZeroCustomType
    customTypeHelper = 'CustomType';
    zeroSchemaGenerated.addImportDeclaration({
      moduleSpecifier: 'drizzle-zero',
      namedImports: [{name: customTypeHelper}],
      isTypeOnly: true,
    });
    zeroSchemaSpecifier = 'typeof drizzleSchema';
    schemaTypeExpression = zeroSchemaSpecifier;
    resolverImports.push({
      moduleSpecifier: getResolverImportModuleSpecifier(
        result.drizzleSchemaSourceFile,
      ),
      namespaceImport: 'drizzleSchema',
      isTypeOnly: true,
    });
  }

  const collectCustomTypeRequests = () => {
    const requests: {tableName: string; columnName: string}[] = [];

    const tables: Record<string, any> = (result.zeroSchema?.tables ??
      {}) as Record<string, any>;

    for (const [tableName, tableDef] of Object.entries(tables)) {
      if (!tableDef || typeof tableDef !== 'object') {
        continue;
      }

      const columns = tableDef.columns as Record<string, any> | undefined;
      if (!columns || typeof columns !== 'object') {
        continue;
      }

      for (const [columnName, columnDef] of Object.entries(columns)) {
        if (
          columnDef &&
          typeof columnDef === 'object' &&
          Object.prototype.hasOwnProperty.call(columnDef, 'customType') &&
          columnDef.customType === null
        ) {
          requests.push({tableName, columnName});
        }
      }
    }

    return requests;
  };

  const customTypeRequests =
    schemaTypeExpression !== undefined ? collectCustomTypeRequests() : [];

  resolverImportHelperFile?.delete();

  const resolvedCustomTypes =
    schemaTypeExpression && customTypeRequests.length > 0
      ? resolveCustomTypes({
          project: tsProject,
          helperName: customTypeHelper as 'CustomType' | 'ZeroCustomType',
          schemaTypeExpression,
          schemaImports: resolverImports,
          requests: customTypeRequests,
        })
      : new Map<string, string>();

  const isRecord = (value: unknown): value is Record<string, unknown> =>
    typeof value === 'object' && value !== null && !Array.isArray(value);

  let readonlyJSONValueImported = false;

  // `locale: false` throughout: camelcase otherwise case-maps with the host
  // locale, which turns `I` into a dotless `ı` under `tr`. Generated
  // identifiers must not depend on where the generator runs.
  const sanitizeIdentifier = (value: string, fallback: string) => {
    const baseCandidate =
      camelCase(value, {pascalCase: false, locale: false}) || value || fallback;
    const cleaned = baseCandidate.replace(/[^A-Za-z0-9_$]/g, '') || fallback;
    const startsValid = /^[A-Za-z_$]/.test(cleaned) ? cleaned : `_${cleaned}`;
    return startsValid.length > 0 ? startsValid : fallback;
  };

  const ensureSuffix = (identifier: string, suffix: string) =>
    identifier.toLowerCase().endsWith(suffix.toLowerCase())
      ? identifier
      : `${identifier}${suffix}`;

  const constNameFor = (name: string, suffix: string, fallback: string) =>
    ensureSuffix(sanitizeIdentifier(name, fallback), suffix);

  const customTypeAliasNameFor = (tableName: string, columnName: string) =>
    camelCase(`${tableName} ${columnName} custom type`, {
      pascalCase: true,
      locale: false,
    });

  const tableNames = isRecord(result.zeroSchema?.tables)
    ? Object.keys(result.zeroSchema.tables)
    : [];
  const relationshipNames = isRecord(result.zeroSchema?.relationships)
    ? Object.keys(result.zeroSchema.relationships)
    : [];

  const tableConstNames = allocateIdentifiers(
    tableNames.map(
      tableName =>
        [tableName, constNameFor(tableName, 'Table', 'table')] as const,
    ),
  );
  const relationshipConstNames = allocateIdentifiers(
    relationshipNames.map(
      relationshipName =>
        [
          relationshipName,
          constNameFor(relationshipName, 'Relationships', 'relationships'),
        ] as const,
    ),
  );

  const fallbackCustomTypeRequests = customTypeRequests.filter(
    request =>
      !resolvedCustomTypes.has(
        `${request.tableName}${COLUMN_SEPARATOR}${request.columnName}`,
      ),
  );

  // Row types and custom type aliases share the type namespace, so they are
  // allocated together to keep either from silently shadowing the other.
  const typeAliasNames = allocateIdentifiers([
    ...fallbackCustomTypeRequests.map(
      request =>
        [
          `${request.tableName}${COLUMN_SEPARATOR}${request.columnName}`,
          customTypeAliasNameFor(request.tableName, request.columnName),
        ] as const,
    ),
    ...tableNames.map(
      tableName =>
        [
          `${ROW_TYPE_PREFIX}${tableName}`,
          camelCase(pluralize.singular(tableName), {
            pascalCase: true,
            locale: false,
          }),
        ] as const,
    ),
  ]);

  const fallbackCustomTypeAliasNames = new Map(
    fallbackCustomTypeRequests.map(request => {
      const key = `${request.tableName}${COLUMN_SEPARATOR}${request.columnName}`;
      return [key, typeAliasNames.get(key)!] as const;
    }),
  );

  const writeSchemaReferenceCollection = (
    writer: CodeBlockWriter,
    collection: Record<string, unknown>,
    constNameMap: Map<string, string>,
    indent: number,
  ) => {
    const indentStr = ' '.repeat(indent);
    writer.write('{');
    const entries = Object.entries(collection);
    if (entries.length > 0) {
      writer.newLine();
      for (let i = 0; i < entries.length; i++) {
        const [key] = entries[i] ?? [];
        if (!key) {
          continue;
        }
        const identifier = constNameMap.get(key) ?? 'undefined';
        writer.write(
          indentStr + '  ' + JSON.stringify(key) + ': ' + identifier,
        );
        if (i < entries.length - 1) {
          writer.write(',');
        }
        writer.newLine();
      }
      writer.write(indentStr);
    }
    writer.write('}');
  };

  type WriteValueOptions = {
    keys?: string[];
    indent?: number;
    mode?: 'default' | 'schema';
  };

  const writeValue = (
    writer: CodeBlockWriter,
    value: unknown,
    {keys = [], indent = 0, mode = 'default'}: WriteValueOptions = {},
  ) => {
    const indentStr = ' '.repeat(indent);

    // A column definition always sits at tables/<table>/columns/<column>, so a
    // `customType` key anywhere else belongs to user data and must be written
    // verbatim rather than replaced with a resolved type.
    const columnPath =
      keys.length === 4 &&
      keys[0] === 'tables' &&
      keys[2] === 'columns' &&
      typeof keys[1] === 'string' &&
      typeof keys[3] === 'string'
        ? ([keys[1], keys[3]] as const)
        : null;

    if (
      !value ||
      typeof value === 'string' ||
      typeof value === 'number' ||
      typeof value === 'boolean' ||
      Array.isArray(value)
    ) {
      const serialized = JSON.stringify(value);
      writer.write(serialized ?? 'undefined');
      return;
    }

    if (typeof value === 'object' && value !== null) {
      writer.write('{');

      const entries = Object.entries(value);

      if (entries.length > 0) {
        writer.newLine();

        for (let i = 0; i < entries.length; i++) {
          const [key, propValue] = entries[i] ?? [];

          if (!key) {
            continue;
          }

          writer.write(indentStr + '  ' + JSON.stringify(key) + ': ');

          if (
            mode === 'schema' &&
            keys.length === 0 &&
            key === 'tables' &&
            isRecord(propValue)
          ) {
            writeSchemaReferenceCollection(
              writer,
              propValue,
              tableConstNames,
              indent + 2,
            );
          } else if (
            mode === 'schema' &&
            keys.length === 0 &&
            key === 'relationships' &&
            isRecord(propValue)
          ) {
            writeSchemaReferenceCollection(
              writer,
              propValue,
              relationshipConstNames,
              indent + 2,
            );
          } else if (
            columnPath !== null &&
            key === 'customType' &&
            propValue === null
          ) {
            const [tableName, columnName] = columnPath;
            const customTypeKey = `${tableName}${COLUMN_SEPARATOR}${columnName}`;
            const resolvedType = resolvedCustomTypes.get(customTypeKey);
            const fallbackAlias =
              fallbackCustomTypeAliasNames.get(customTypeKey);

            if (resolvedType) {
              writer.write(`null as unknown as ${resolvedType}`);

              if (resolvedType === 'ReadonlyJSONValue') {
                readonlyJSONValueImported = true;
              }
            } else if (fallbackAlias) {
              writer.write(`null as unknown as ${fallbackAlias}`);
            } else {
              writer.write(
                `null as unknown as ${customTypeHelper}<${zeroSchemaSpecifier}, ${JSON.stringify(tableName)}, ${JSON.stringify(columnName)}>`,
              );
            }
          } else if (
            mode === 'schema' &&
            keys.length === 0 &&
            key === 'enableLegacyMutators'
          ) {
            writer.write(enableLegacyMutators ? 'true' : 'false');
          } else if (
            mode === 'schema' &&
            keys.length === 0 &&
            key === 'enableLegacyQueries'
          ) {
            writer.write(enableLegacyQueries ? 'true' : 'false');
          } else {
            writeValue(writer, propValue, {
              keys: [...keys, key],
              indent: indent + 2,
              mode,
            });
          }

          if (i < entries.length - 1) {
            writer.write(',');
          }

          writer.newLine();
        }

        writer.write(indentStr);
      }

      writer.write('}');
      return;
    }

    const serialized = JSON.stringify(value);
    writer.write(serialized ?? 'undefined');
  };

  let tableConstCount = 0;

  if (
    zeroSchemaSpecifier !== undefined &&
    fallbackCustomTypeAliasNames.size > 0
  ) {
    for (const [key, aliasName] of fallbackCustomTypeAliasNames) {
      const [tableName, columnName] = key.split(COLUMN_SEPARATOR);

      if (!tableName || !columnName) {
        continue;
      }

      zeroSchemaGenerated.addTypeAlias({
        name: aliasName,
        isExported: true,
        type: `${customTypeHelper}<${zeroSchemaSpecifier}, ${JSON.stringify(tableName)}, ${JSON.stringify(columnName)}>`,
      });
    }

    zeroSchemaGenerated.addStatements(writer => writer.blankLine());
  }

  if (isRecord(result.zeroSchema?.tables)) {
    for (const [tableName, tableDef] of Object.entries(
      result.zeroSchema.tables as Record<string, unknown>,
    )) {
      const constName = tableConstNames.get(tableName)!;

      if (tableConstCount > 0) {
        zeroSchemaGenerated.addStatements(writer => writer.blankLine());
      }

      zeroSchemaGenerated.addVariableStatement({
        declarationKind: VariableDeclarationKind.Const,
        declarations: [
          {
            name: constName,
            initializer: writer => {
              writeValue(writer, tableDef, {
                keys: ['tables', tableName],
              });
              writer.write(' as const');
            },
          },
        ],
      });

      tableConstCount += 1;
    }
  }

  let relationshipConstCount = 0;
  if (isRecord(result.zeroSchema?.relationships)) {
    for (const [relationshipName, relationshipDef] of Object.entries(
      result.zeroSchema.relationships as Record<string, unknown>,
    )) {
      const constName = relationshipConstNames.get(relationshipName)!;

      if (relationshipConstCount === 0) {
        if (tableConstCount > 0) {
          zeroSchemaGenerated.addStatements(writer => writer.blankLine());
        }
      } else {
        zeroSchemaGenerated.addStatements(writer => writer.blankLine());
      }

      zeroSchemaGenerated.addVariableStatement({
        declarationKind: VariableDeclarationKind.Const,
        declarations: [
          {
            name: constName,
            initializer: writer => {
              writeValue(writer, relationshipDef, {
                keys: ['relationships', relationshipName],
              });
              writer.write(' as const');
            },
          },
        ],
      });

      relationshipConstCount += 1;
    }
  }

  const schemaVariable = zeroSchemaGenerated.addVariableStatement({
    declarationKind: VariableDeclarationKind.Const,
    isExported: true,
    declarations: [
      {
        name: schemaObjectName,
        initializer: writer => {
          writeValue(writer, result.zeroSchema, {mode: 'schema'});
          writer.write(` as const`);
        },
      },
    ],
  });

  schemaVariable.addJsDoc({
    description:
      '\nThe Zero schema object.\nThis type is auto-generated from your Drizzle schema definition.',
  });

  const schemaTypeAlias = zeroSchemaGenerated.addTypeAlias({
    name: typename,
    isExported: true,
    type: `typeof ${schemaObjectName}`,
  });

  schemaTypeAlias.addJsDoc({
    description:
      '\nRepresents the Zero schema type.\nThis type is auto-generated from your Drizzle schema definition.',
  });

  // Add type exports for each table
  if (
    !skipTypes &&
    result.zeroSchema &&
    typeof result.zeroSchema === 'object' &&
    'tables' in result.zeroSchema
  ) {
    const allTableNames = Object.keys(result.zeroSchema.tables);

    if (allTableNames.length > 0) {
      zeroSchemaGenerated.addImportDeclaration({
        moduleSpecifier: '@rocicorp/zero',
        namedImports: [{name: 'Row'}],
        isTypeOnly: true,
      });
    }

    for (const tableName of allTableNames) {
      const typeName = typeAliasNames.get(`${ROW_TYPE_PREFIX}${tableName}`)!;

      const tableTypeAlias = zeroSchemaGenerated.addTypeAlias({
        name: typeName,
        isExported: true,
        type: `Row<(typeof ${schemaObjectName})["tables"]["${tableName}"]>`,
      });

      tableTypeAlias.addJsDoc({
        description: `\nRepresents a row from the "${tableName}" table.\nThis type is auto-generated from your Drizzle schema definition.`,
      });
    }
  }

  // Add builder export
  if (!skipBuilder) {
    zeroSchemaGenerated.addImportDeclaration({
      moduleSpecifier: '@rocicorp/zero',
      namedImports: [{name: 'createBuilder'}],
    });

    const zqlVariable = zeroSchemaGenerated.addVariableStatement({
      declarationKind: VariableDeclarationKind.Const,
      isExported: true,
      declarations: [
        {
          name: 'zql',
          initializer: `createBuilder(${schemaObjectName})`,
        },
      ],
    });

    zqlVariable.addJsDoc({
      description:
        '\nRepresents the ZQL query builder.\nThis type is auto-generated from your Drizzle schema definition.',
    });

    const builderVariable = zeroSchemaGenerated.addVariableStatement({
      declarationKind: VariableDeclarationKind.Const,
      isExported: true,
      declarations: [
        {
          name: 'builder',
          initializer: 'zql',
        },
      ],
    });

    builderVariable.addJsDoc({
      description:
        '\nRepresents the Zero schema query builder.\nThis type is auto-generated from your Drizzle schema definition.',
    });
  }

  // Add module augmentation for default types
  if (!skipDeclare) {
    zeroSchemaGenerated.addStatements(writer => {
      writer.write(`\n/** Defines the default types for Zero */\n`);
      writer.write(`declare module '@rocicorp/zero' {`);
      writer.write(`  interface DefaultTypes {`);
      writer.write(`    schema: ${typename};`);
      writer.write(`  }`);
      writer.write(`}`);
    });
  }

  if (readonlyJSONValueImported) {
    zeroSchemaGenerated.addImportDeclaration({
      moduleSpecifier: '@rocicorp/zero',
      namedImports: [{name: 'ReadonlyJSONValue'}],
      isTypeOnly: true,
    });
  }

  zeroSchemaGenerated.formatText();

  // organize imports
  const organizedImports = zeroSchemaGenerated.organizeImports();

  const file = organizedImports.getText();

  return `// This file was automatically generated by drizzle-zero.
// You should NOT make any changes in this file as it will be overwritten.

${file}`;
}
