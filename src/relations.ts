import {createSchema} from '@rocicorp/zero';
import type {RelationsBuilderColumnBase} from 'drizzle-orm/relations';
import {getColumnTable} from 'drizzle-orm/column';
import {Table, getTableName, getTableUniqueName, is} from 'drizzle-orm';
import {Relations as LegacyRelations} from 'drizzle-orm/_relations';
import {
  type ColumnsConfig,
  createZeroTableBuilder,
  getDrizzleColumnKeyFromColumnName,
  type ZeroTableBuilderSchema,
  type ZeroTableCasing,
} from './tables';
import type {
  DefaultTableColumnsConfig,
  Flatten,
  ResolveColumnCustomType,
  TableColumnsConfig,
} from './types';
import {debugLog, typedEntries} from './util';

type ThroughColumn = RelationsBuilderColumnBase;

type IsAny<T> = 0 extends 1 & T ? true : false;

type SchemaIsAnyError = {
  __error__: 'The schema passed in to `ZeroCustomType` is `any`. Please make sure to pass in a proper schema type, or check your imports to make sure that Typescript can resolve your schema definition.';
};

/**
 * Direct extraction of the custom type from Drizzle schema. This falls back
 * to the default TypeScript type if no custom type is specified.
 *
 * @template DrizzleSchema - The Drizzle schema object (typeof drizzleSchema)
 * @template TableKey - The key of the table in the schema
 * @template ColumnKey - The key of the column in the table
 */
type CustomType<
  DrizzleSchema,
  TableKey extends string,
  ColumnKey extends string,
> = TableKey extends keyof DrizzleSchema
  ? DrizzleSchema[TableKey] extends Table
    ? ColumnKey extends keyof DrizzleSchema[TableKey]
      ? ResolveColumnCustomType<DrizzleSchema[TableKey][ColumnKey]>
      : unknown
    : unknown
  : unknown;

/**
 * Type utility to get the Drizzle custom type for a table and column.
 *
 * @template ZeroSchema - The complete Zero schema
 * @template TableName - The name of the table
 * @template ColumnName - The name of the column
 */
type ZeroCustomType<
  ZeroSchema,
  TableName extends string,
  ColumnName extends string,
> =
  IsAny<ZeroSchema> extends true
    ? SchemaIsAnyError
    : ZeroSchema extends {
          tables: Record<
            TableName,
            {columns: Record<ColumnName, {customType: infer T}>}
          >;
        }
      ? T
      : unknown;

/**
 * The mapped Zero schema from a Drizzle schema with version and tables.
 */
type DrizzleToZeroSchema<
  TDrizzleSchema extends {[K in string]: unknown},
  TColumnConfig extends TableColumnsConfig<TDrizzleSchema> =
    DefaultTableColumnsConfig<TDrizzleSchema>,
> = {
  readonly tables: {
    readonly [K in IncludedTableNames<
      TDrizzleSchema,
      TColumnConfig
    >]: TDrizzleSchema[K] extends infer TTable extends Table<any>
      ? ZeroTableBuilderSchema<
          K,
          TTable,
          TableConfigFor<TDrizzleSchema, TColumnConfig, K>
        >
      : never;
  };
  readonly relationships: any;
  readonly enableLegacyMutators?: boolean;
  readonly enableLegacyQueries?: boolean;
};

type IncludedTableNames<
  TDrizzleSchema extends {[K in string]: unknown},
  TColumnConfig extends TableColumnsConfig<TDrizzleSchema>,
> = Extract<
  {
    [TTableName in keyof TDrizzleSchema &
      string]: TDrizzleSchema[TTableName] extends Table<any>
      ? TTableName extends keyof TColumnConfig
        ? [TColumnConfig[TTableName]] extends [false | undefined]
          ? never
          : TTableName
        : never
      : never;
  }[keyof TDrizzleSchema & string],
  string
>;

type TableConfigFor<
  TDrizzleSchema extends {[K in string]: unknown},
  TColumnConfig extends TableColumnsConfig<TDrizzleSchema>,
  TTableName extends IncludedTableNames<TDrizzleSchema, TColumnConfig>,
> = TDrizzleSchema[TTableName] extends infer TTable extends Table<any>
  ? TTableName extends keyof TColumnConfig
    ? TColumnConfig[TTableName] extends ColumnsConfig<TTable> | undefined
      ? TColumnConfig[TTableName]
      : never
    : never
  : never;

type BetaRelationsTableConfig = {
  readonly table: unknown;
  readonly name: string;
  readonly relations: Record<string, unknown>;
};

type RuntimeBetaRelation = {
  readonly fieldName: string;
  readonly relationType: 'one' | 'many';
  readonly sourceTable: unknown;
  readonly targetTable: unknown;
  readonly targetTableName: string;
  readonly sourceColumns: readonly unknown[];
  readonly targetColumns: readonly unknown[];
  readonly through?: {
    readonly source: ThroughColumn[];
    readonly target: ThroughColumn[];
  };
  readonly throughTable?: unknown;
};

type NormalizedRelationHop = {
  readonly sourceField: string[];
  readonly destField: string[];
  readonly destSchema: string;
  readonly cardinality: 'one' | 'many';
};

type NormalizedRelation = {
  readonly sourceTableName: string;
  readonly relationName: string;
  readonly hops:
    | readonly [NormalizedRelationHop]
    | readonly [NormalizedRelationHop, NormalizedRelationHop];
};

const isBetaRelationsTableConfig = (
  value: unknown,
): value is BetaRelationsTableConfig => {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    return false;
  }

  if (!('name' in value) || typeof value.name !== 'string') {
    return false;
  }

  if (!('relations' in value)) {
    return false;
  }

  return (
    typeof value.relations === 'object' &&
    value.relations !== null &&
    'table' in value
  );
};

const isBetaRelationsExport = (
  value: unknown,
): value is Record<string, BetaRelationsTableConfig> => {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    return false;
  }

  const entries = Object.values(value);
  return entries.length > 0 && entries.every(isBetaRelationsTableConfig);
};

const getBetaRelationEntries = (
  relations: Record<string, unknown>,
): Record<string, RuntimeBetaRelation> =>
  Object.fromEntries(
    typedEntries(relations).filter(([, relation]) => {
      if (typeof relation !== 'object' || relation === null) {
        return false;
      }

      return (
        'fieldName' in relation &&
        'relationType' in relation &&
        'sourceTable' in relation &&
        'targetTable' in relation &&
        'targetTableName' in relation &&
        'sourceColumns' in relation &&
        'targetColumns' in relation
      );
    }),
  ) as Record<string, RuntimeBetaRelation>;

const getThroughFieldNames = (columns: ThroughColumn[]): string[] =>
  columns.map(column => column._.key);

const normalizeBetaRelation = ({
  schema,
  relation,
}: {
  schema: Record<string, unknown>;
  relation: RuntimeBetaRelation;
}): NormalizedRelation => {
  if (!is(relation.sourceTable, Table) || !is(relation.targetTable, Table)) {
    throw new Error(
      `drizzle-zero: Relations involving views are not currently supported for ${relation.fieldName}`,
    );
  }

  const sourceTableName = getDrizzleKeyFromTable({
    schema,
    table: relation.sourceTable,
    fallbackTableName: getTableName(relation.sourceTable),
  });

  const targetTableName = getDrizzleKeyFromTable({
    schema,
    table: relation.targetTable,
    fallbackTableName: relation.targetTableName,
  });

  const sourceFieldNames = relation.sourceColumns.map(
    (column: (typeof relation.sourceColumns)[number]) =>
      getDrizzleColumnKeyFromColumnName({
        columnName: (column as {name: string}).name,
        table: getColumnTable(column as any) as unknown as Table,
      }),
  );

  const targetFieldNames = relation.targetColumns.map(
    (column: (typeof relation.targetColumns)[number]) =>
      getDrizzleColumnKeyFromColumnName({
        columnName: (column as {name: string}).name,
        table: getColumnTable(column as any) as unknown as Table,
      }),
  );

  if (!sourceFieldNames.length || !targetFieldNames.length) {
    throw new Error(
      `drizzle-zero: Missing join columns for beta relation ${sourceTableName}.${relation.fieldName}`,
    );
  }

  if (relation.through) {
    if (!relation.throughTable || !is(relation.throughTable, Table)) {
      throw new Error(
        `drizzle-zero: Invalid through(...) relation ${sourceTableName}.${relation.fieldName}: junction table is missing or unsupported`,
      );
    }

    const throughTableName = getDrizzleKeyFromTable({
      schema,
      table: relation.throughTable,
      fallbackTableName: getTableName(relation.throughTable),
    });

    const throughSourceFieldNames = getThroughFieldNames(
      relation.through.source,
    );
    const throughTargetFieldNames = getThroughFieldNames(
      relation.through.target,
    );

    if (!throughSourceFieldNames.length || !throughTargetFieldNames.length) {
      throw new Error(
        `drizzle-zero: Invalid through(...) relation ${sourceTableName}.${relation.fieldName}: junction columns are missing`,
      );
    }

    return {
      sourceTableName,
      relationName: relation.fieldName,
      hops: [
        {
          sourceField: sourceFieldNames,
          destField: throughSourceFieldNames,
          destSchema: throughTableName,
          cardinality: relation.relationType,
        },
        {
          sourceField: throughTargetFieldNames,
          destField: targetFieldNames,
          destSchema: targetTableName,
          cardinality: relation.relationType,
        },
      ],
    };
  }

  return {
    sourceTableName,
    relationName: relation.fieldName,
    hops: [
      {
        sourceField: sourceFieldNames,
        destField: targetFieldNames,
        destSchema: targetTableName,
        cardinality: relation.relationType,
      },
    ],
  };
};

/**
 * Configuration for the Zero schema generator. This defines how your Drizzle ORM schema
 * is transformed into a Zero schema format, handling table selection, column mapping,
 * and beta `defineRelations(...)` / `defineRelationsPart(...)` exports.
 *
 * @param schema - The Drizzle schema to create a Zero schema from. This should be your complete Drizzle schema object
 *                containing all your table definitions and beta relation exports.
 * @param config - Configuration object for the Zero schema generation
 * @param config.tables - Specify which tables and columns to include in sync
 * @param config.casing - The casing to use for the table name.
 * @param config.debug - Whether to enable debug mode.
 *
 * @returns A configuration object for the Zero schema CLI.
 *
 * @example
 * ```typescript
 * import {defineRelations} from 'drizzle-orm';
 * import {integer, pgTable, serial, text, varchar} from 'drizzle-orm/pg-core';
 * import {drizzleZeroConfig} from 'drizzle-zero';
 *
 * const users = pgTable('users', {
 *   id: serial('id').primaryKey(),
 *   name: text('name'),
 * });
 *
 * const posts = pgTable('posts', {
 *   id: serial('id').primaryKey(),
 *   title: varchar('title'),
 *   authorId: integer('author_id').references(() => users.id),
 * });
 *
 * const schemaRelations = defineRelations({users, posts}, r => ({
 *   users: {
 *     posts: r.many.posts(),
 *   },
 *   posts: {
 *     author: r.one.users({
 *       from: r.posts.authorId,
 *       to: r.users.id,
 *       optional: false,
 *     }),
 *   },
 * }));
 *
 * export default drizzleZeroConfig(
 *   {users, posts, schemaRelations},
 *   {
 *     tables: {
 *       users: true,
 *       posts: true,
 *     },
 *   },
 * );
 * ```
 */
const drizzleZeroConfig = <
  const TDrizzleSchema extends {[K in string]: unknown},
  const TColumnConfig extends TableColumnsConfig<TDrizzleSchema> =
    DefaultTableColumnsConfig<TDrizzleSchema>,
  const TCasing extends ZeroTableCasing = undefined,
>(
  schema: TDrizzleSchema,
  config?: {
    /**
     * Specify the tables to include in the Zero schema.
     * This can include type overrides for columns, using `column.json()` for example.
     */
    readonly tables?: TColumnConfig;

    /**
     * The casing to use for the table name.
     */
    readonly casing?: TCasing;

    /**
     * Whether to enable debug mode.
     */
    readonly debug?: boolean;

    /**
     * Whether to hide warnings for columns with default values.
     * @see https://bugs.rocicorp.dev/p/zero/issue/3465
     */
    readonly suppressDefaultsWarning?: boolean;
  },
): Flatten<DrizzleToZeroSchema<TDrizzleSchema, TColumnConfig>> => {
  if (
    (config as {manyToMany?: unknown} | undefined)?.manyToMany !== undefined
  ) {
    throw new Error(
      'drizzle-zero: `manyToMany` has been removed. Use beta `through(...)` relations instead.',
    );
  }

  const tables: any[] = [];
  const tableColumnNamesForSourceTable = new Map<string, Set<string>>();
  const includedTableKeys = new Set<string>();
  const discoveredRelations = new Map<
    string,
    {
      table: Table;
      relations: Record<string, RuntimeBetaRelation>;
    }
  >();
  const legacyRelationExports: string[] = [];

  const assertRelationNameIsNotAColumnName = ({
    sourceTableName,
    relationName,
  }: {
    sourceTableName: string;
    relationName: string;
  }) => {
    const tableColumnNames =
      tableColumnNamesForSourceTable.get(sourceTableName);

    if (tableColumnNames?.has(relationName)) {
      throw new Error(
        `drizzle-zero: Invalid relationship name for ${String(sourceTableName)}.${relationName}: there is already a table column with the name ${relationName} and this cannot be used as a relationship name`,
      );
    }
  };

  for (const [entryName, schemaValue] of typedEntries(schema)) {
    if (!schemaValue) {
      throw new Error(
        `drizzle-zero: table or relation with key ${String(entryName)} is not defined`,
      );
    }

    if (is(schemaValue, Table)) {
      const table = schemaValue;
      const tableConfig = config?.tables?.[entryName as keyof TColumnConfig];

      if (
        config?.tables !== undefined &&
        (tableConfig === false || tableConfig === undefined)
      ) {
        debugLog(
          config?.debug,
          `Skipping table ${String(entryName)} - ${
            tableConfig === false
              ? 'explicitly excluded'
              : 'not mentioned in config'
          }`,
        );
        continue;
      }

      const tableSchema = createZeroTableBuilder(
        String(entryName),
        table,
        tableConfig as any,
        config?.debug,
        config?.casing,
        config?.suppressDefaultsWarning,
      );

      tables.push(tableSchema);
      includedTableKeys.add(String(entryName));
      tableColumnNamesForSourceTable.set(
        String(entryName),
        new Set(Object.keys(tableSchema.schema.columns)),
      );
      continue;
    }

    if (schemaValue instanceof LegacyRelations) {
      legacyRelationExports.push(String(entryName));
      continue;
    }

    if (!isBetaRelationsExport(schemaValue)) {
      continue;
    }

    debugLog(config?.debug, 'Discovered beta relations export', {
      entryName,
      tableKeys: Object.keys(schemaValue),
    });

    for (const [tableKey, tableConfig] of typedEntries(
      schemaValue as Record<string, BetaRelationsTableConfig>,
    )) {
      if (!is(tableConfig.table, Table)) {
        continue;
      }

      const relationEntries = getBetaRelationEntries(tableConfig.relations);
      const existing = discoveredRelations.get(tableKey);

      if (!existing) {
        discoveredRelations.set(tableKey, {
          table: tableConfig.table,
          relations: {...relationEntries},
        });
        continue;
      }

      if (
        existing.table !== tableConfig.table &&
        getTableUniqueName(existing.table) !==
          getTableUniqueName(tableConfig.table)
      ) {
        throw new Error(
          `drizzle-zero: Conflicting beta relation exports found for table key ${tableKey}`,
        );
      }

      for (const [relationName, relation] of Object.entries(relationEntries)) {
        if (relationName in existing.relations) {
          throw new Error(
            `drizzle-zero: Duplicate relationship found for: ${relationName} (from ${tableKey} to ${relation.targetTableName}).`,
          );
        }

        existing.relations[relationName] = relation;
      }
    }
  }

  if (legacyRelationExports.length > 0) {
    throw new Error(
      `drizzle-zero: Legacy relations(...) exports are no longer supported. Use beta defineRelations(...) or defineRelationsPart(...) instead. Found: ${legacyRelationExports.join(', ')}`,
    );
  }

  if (tables.length === 0) {
    throw new Error(
      schema['tables']
        ? '❌ drizzle-zero: No tables found in the input - did you pass in a Zero schema to the `drizzleZeroConfig` function instead of a Drizzle schema?'
        : '❌ drizzle-zero: No tables found in the input - did you export tables and relations from the Drizzle schema passed to the `drizzleZeroConfig` function?',
    );
  }

  const relationships = {} as Record<
    string,
    Record<string, NormalizedRelation['hops']>
  >;

  for (const [tableKey, relationConfig] of discoveredRelations) {
    for (const relation of Object.values(relationConfig.relations)) {
      const normalizedRelation = normalizeBetaRelation({schema, relation});
      const throughTableName =
        normalizedRelation.hops.length === 2
          ? normalizedRelation.hops[0]!.destSchema
          : undefined;
      const targetTableName = normalizedRelation.hops.at(-1)!.destSchema;

      if (
        !includedTableKeys.has(normalizedRelation.sourceTableName) ||
        !includedTableKeys.has(targetTableName) ||
        (throughTableName !== undefined &&
          !includedTableKeys.has(throughTableName))
      ) {
        debugLog(
          config?.debug,
          'Skipping relation - source, target, or through table is excluded',
          {
            exportedTableKey: tableKey,
            sourceTable: normalizedRelation.sourceTableName,
            relationName: normalizedRelation.relationName,
            targetTable: targetTableName,
            throughTable: throughTableName,
          },
        );
        continue;
      }

      if (
        relationships[normalizedRelation.sourceTableName]?.[
          normalizedRelation.relationName
        ]
      ) {
        throw new Error(
          `drizzle-zero: Duplicate relationship found for: ${normalizedRelation.relationName} (from ${normalizedRelation.sourceTableName} to ${targetTableName}).`,
        );
      }

      assertRelationNameIsNotAColumnName({
        sourceTableName: normalizedRelation.sourceTableName,
        relationName: normalizedRelation.relationName,
      });

      relationships[normalizedRelation.sourceTableName] = {
        ...relationships[normalizedRelation.sourceTableName],
        [normalizedRelation.relationName]: normalizedRelation.hops,
      };

      debugLog(config?.debug, 'Added beta relationship', {
        sourceTable: normalizedRelation.sourceTableName,
        relationName: normalizedRelation.relationName,
        relationship: normalizedRelation.hops,
      });
    }
  }

  const finalSchema = createSchema({
    tables,
    relationships: Object.entries(relationships).map(([name, value]) => ({
      name,
      relationships: value,
    })),
  } as any) as unknown as DrizzleToZeroSchema<TDrizzleSchema, TColumnConfig>;

  debugLog(
    config?.debug,
    'Output Zero schema',
    JSON.stringify(finalSchema, null, 2),
  );

  return finalSchema;
};

/**
 * Get the key of a table in the schema from the table name.
 * @param schema - The complete Drizzle schema
 * @param tableName - The name of the table to get the key for
 * @returns The key of the table in the schema
 */
const getDrizzleKeyFromTable = ({
  schema,
  table,
  fallbackTableName,
}: {
  schema: Record<string, unknown>;
  table?: Table;
  fallbackTableName?: string;
}) => {
  if (table) {
    const directMatch = typedEntries(schema).find(
      ([_name, tableOrRelations]) =>
        is(tableOrRelations, Table) && tableOrRelations === table,
    )?.[0];

    if (directMatch) {
      return directMatch;
    }

    const uniqueName = getTableUniqueName(table);
    const uniqueMatch = typedEntries(schema).find(
      ([_name, tableOrRelations]) =>
        is(tableOrRelations, Table) &&
        getTableUniqueName(tableOrRelations) === uniqueName,
    )?.[0];

    if (uniqueMatch) {
      return uniqueMatch;
    }
  }

  if (fallbackTableName) {
    const fallbackMatch = typedEntries(schema).find(
      ([_name, tableOrRelations]) =>
        is(tableOrRelations, Table) &&
        getTableName(tableOrRelations) === fallbackTableName,
    )?.[0];

    if (fallbackMatch) {
      return fallbackMatch;
    }
  }

  throw new Error(
    `drizzle-zero: Unable to resolve table key for ${table ? getTableUniqueName(table) : fallbackTableName}`,
  );
};

export {
  drizzleZeroConfig,
  type CustomType,
  type DrizzleToZeroSchema,
  type ZeroCustomType,
};
