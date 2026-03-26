import type {Column, Table} from 'drizzle-orm';
import type {ZeroColumnType, ZeroTypeToTypescriptType} from './drizzle-to-zero';
import type {ColumnsConfig} from './tables';

type ArrayLikeDrizzleConstraint =
  | 'basecolumn'
  | 'halfvector'
  | 'int64vector'
  | 'vector';

type DateLikeDrizzleStringConstraint =
  | 'date'
  | 'datetime'
  | 'time'
  | 'timestamp';

type NumberLikeDrizzleStringConstraint =
  | 'int64'
  | 'numeric'
  | 'uint64'
  | 'unumeric';

type StringLikeDrizzleConstraint = 'enum' | 'uuid';

type IsUnknown<T> = unknown extends T
  ? [keyof T] extends [never]
    ? true
    : false
  : false;

type IsUnsupportedTupleArrayDataType<TDataType extends string> =
  TDataType extends `array ${infer TConstraint}`
    ? TConstraint extends ArrayLikeDrizzleConstraint
      ? false
      : true
    : false;

type PreserveNarrowType<TData, TWide, TFallback> = TData extends TWide
  ? TWide extends TData
    ? TFallback
    : TData
  : TData;

type ResolveNumberLikeCustomType<TData> = TData extends number
  ? PreserveNarrowType<TData, number, number>
  : TData extends string
    ? PreserveNarrowType<TData, string, number>
    : TData extends bigint
      ? PreserveNarrowType<TData, bigint, number>
      : TData extends Date
        ? PreserveNarrowType<TData, Date, number>
        : TData;

type ResolveStringLikeCustomType<TData> = TData extends string ? TData : string;

type ResolveBooleanLikeCustomType<TData> = TData extends boolean
  ? PreserveNarrowType<TData, boolean, boolean>
  : boolean;

type ResolveJsonCustomType<TData> =
  IsUnknown<TData> extends true ? ZeroTypeToTypescriptType['json'] : TData;

type ResolveArrayCustomType<TData> =
  TData extends ReadonlyArray<unknown>
    ? TData
    : ZeroTypeToTypescriptType['json'];

/**
 * Gets the keys of columns that can be used as indexes.
 * @template TTable - The table to get index keys from
 */
export type ColumnIndexKeys<TTable extends Table> = {
  [K in keyof Columns<TTable>]: K;
}[keyof Columns<TTable>];

/**
 * Configuration type for specifying which tables and columns to include in the Zero schema.
 * @template TDrizzleSchema - The complete Drizzle schema
 */
export type TableColumnsConfig<TDrizzleSchema extends Record<string, unknown>> =
  Partial<
    Flatten<{
      /**
       * The columns to include in the Zero schema.
       */
      readonly [K in keyof TDrizzleSchema as TDrizzleSchema[K] extends Table<any>
        ? K
        : never]: TDrizzleSchema[K] extends Table<any>
        ? ColumnsConfig<TDrizzleSchema[K]>
        : never;
    }>
  >;

/**
 * A default config type which includes all tables in the Drizzle schema.
 * @template TDrizzleSchema - The complete Drizzle schema
 */
export type DefaultTableColumnsConfig<
  TDrizzleSchema extends Record<string, unknown>,
> = Flatten<{
  readonly [K in keyof TDrizzleSchema as TDrizzleSchema[K] extends Table<any>
    ? K
    : never]: TDrizzleSchema[K] extends Table<any>
    ? DefaultColumnsConfig<TDrizzleSchema[K]>
    : never;
}>;

/**
 * A default config type which includes all columns in a Drizzle table.
 * @template TTable - The Drizzle table type
 */
type DefaultColumnsConfig<TTable extends Table> = {
  readonly [K in ColumnNames<TTable>]: true;
};

/**
 * Gets all columns from a Drizzle table type.
 * @template TTable The Drizzle table type
 */
type TableColumnKeys<TTable extends Table> = Extract<
  {
    [K in keyof TTable]: TTable[K] extends Column ? K : never;
  }[keyof TTable],
  string
>;

export type Columns<TTable extends Table> = Pick<
  TTable,
  TableColumnKeys<TTable>
>;

export type ColumnMetadata<TColumn> = TColumn extends {_: unknown}
  ? TColumn['_']
  : never;

export type ColumnData<TColumn> =
  ColumnMetadata<TColumn> extends {
    data: infer TData;
  }
    ? TData
    : never;

export type ColumnDataType<TColumn> =
  ColumnMetadata<TColumn> extends {
    dataType: infer TDataType extends string;
  }
    ? TDataType
    : never;

export type ColumnEnumValues<TColumn> =
  ColumnMetadata<TColumn> extends {
    enumValues: infer TEnumValues;
  }
    ? TEnumValues
    : never;

export type ColumnHasEnumValues<TColumn> =
  ColumnEnumValues<TColumn> extends readonly string[] ? true : false;

export type NormalizeColumnDataType<TDataType extends string> =
  TDataType extends 'date'
    ? 'date'
    : TDataType extends 'array'
      ? 'array'
      : TDataType extends `array ${infer TConstraint}`
        ? TConstraint extends ArrayLikeDrizzleConstraint
          ? 'array'
          : never
        : TDataType extends 'bigint' | `bigint ${string}`
          ? 'bigint'
          : TDataType extends 'boolean'
            ? 'boolean'
            : TDataType extends 'custom'
              ? 'custom'
              : TDataType extends 'number' | `number ${string}`
                ? 'number'
                : TDataType extends `object ${infer TConstraint}`
                  ? TConstraint extends 'json'
                    ? 'json'
                    : TConstraint extends 'date'
                      ? 'date'
                      : never
                  : TDataType extends 'string'
                    ? 'string'
                    : TDataType extends `string ${infer TConstraint}`
                      ? TConstraint extends DateLikeDrizzleStringConstraint
                        ? 'date'
                        : TConstraint extends NumberLikeDrizzleStringConstraint
                          ? 'number'
                          : TConstraint extends StringLikeDrizzleConstraint
                            ? 'string'
                            : never
                      : never;

export type NormalizedColumnDataType<TColumn> =
  ColumnDataType<TColumn> extends infer TDataType extends string
    ? NormalizeColumnDataType<TDataType>
    : never;

export type ColumnIsArray<TColumn> =
  NormalizedColumnDataType<TColumn> extends 'array'
    ? true
    : ColumnData<TColumn> extends ReadonlyArray<unknown>
      ? ColumnDataType<TColumn> extends infer TDataType extends string
        ? IsUnsupportedTupleArrayDataType<TDataType> extends true
          ? false
          : true
        : true
      : false;

export type ResolveColumnZeroType<TColumn> =
  ColumnIsArray<TColumn> extends true
    ? 'json'
    : ColumnHasEnumValues<TColumn> extends true
      ? 'string'
      : NormalizedColumnDataType<TColumn> extends 'bigint' | 'date' | 'number'
        ? 'number'
        : NormalizedColumnDataType<TColumn> extends 'boolean'
          ? 'boolean'
          : NormalizedColumnDataType<TColumn> extends 'json'
            ? 'json'
            : NormalizedColumnDataType<TColumn> extends 'string'
              ? 'string'
              : never;

export type ResolveColumnDefaultType<TColumn> = [
  ResolveColumnZeroType<TColumn>,
] extends [never]
  ? unknown
  : ResolveColumnZeroType<TColumn> extends infer TZeroType extends
        ZeroColumnType
    ? ZeroTypeToTypescriptType[TZeroType]
    : unknown;

export type ResolveColumnCustomType<TColumn> =
  ColumnIsArray<TColumn> extends true
    ? ResolveArrayCustomType<ColumnData<TColumn>>
    : ColumnHasEnumValues<TColumn> extends true
      ? ResolveStringLikeCustomType<ColumnData<TColumn>>
      : NormalizedColumnDataType<TColumn> extends 'custom'
        ? ColumnData<TColumn>
        : NormalizedColumnDataType<TColumn> extends 'json'
          ? ResolveJsonCustomType<ColumnData<TColumn>>
          : NormalizedColumnDataType<TColumn> extends 'string'
            ? ResolveStringLikeCustomType<ColumnData<TColumn>>
            : NormalizedColumnDataType<TColumn> extends 'boolean'
              ? ResolveBooleanLikeCustomType<ColumnData<TColumn>>
              : NormalizedColumnDataType<TColumn> extends
                    | 'bigint'
                    | 'date'
                    | 'number'
                ? ResolveNumberLikeCustomType<ColumnData<TColumn>>
                : unknown;

/**
 * Gets all column names from a Drizzle table type.
 * @template TTable The Drizzle table type
 */
export type ColumnNames<TTable extends Table> = keyof Columns<TTable>;

/**
 * Helper type that extracts primary key columns from a table.
 * @template T The Drizzle table type
 */
type PrimaryKeyColumns<T extends Table> = {
  [K in keyof Columns<T>]: ColumnMetadata<Columns<T>[K]> extends {
    isPrimaryKey: true;
  }
    ? K extends string
      ? K
      : never
    : never;
}[keyof Columns<T>];

/**
 * Finds the primary key(s) from a table.
 * @template T The Drizzle table type
 */
export type FindPrimaryKeyFromTable<T extends Table> = [
  PrimaryKeyColumns<T>,
] extends [never]
  ? [never]
  : [PrimaryKeyColumns<T>];

/**
 * Type guard that checks if a type is a Table with a specific name.
 * @template T The type to check
 * @template Name The name to check for
 */
type IsTableWithName<T, Name extends string> = T extends {_: {name: Name}}
  ? T extends Table<any>
    ? true
    : false
  : false;

/**
 * Finds a table in the schema by its name.
 * @template TDrizzleSchema The complete Drizzle schema
 * @template Name The name of the table to find
 */
export type FindTableByName<
  TDrizzleSchema extends Record<string, unknown>,
  Name extends string,
> = Extract<
  {
    [P in keyof TDrizzleSchema]: IsTableWithName<
      TDrizzleSchema[P],
      Name
    > extends true
      ? TDrizzleSchema[P]
      : never;
  }[keyof TDrizzleSchema],
  Table<any>
>;

/**
 * Utility type that flattens an object type by removing any intermediate interfaces.
 * @template T The type to flatten
 */
export type Flatten<T> = {
  [K in keyof T]: T[K];
} & {};
