import type {ReadonlyJSONValue} from '@rocicorp/zero';

type DrizzleDataType = 'number' | 'bigint' | 'boolean' | 'date';

export const drizzleDataTypeToZeroType = {
  number: 'number',
  bigint: 'number',
  boolean: 'boolean',
  date: 'number',
} as const satisfies Record<DrizzleDataType, string>;

export type DrizzleDataTypeToZeroType = typeof drizzleDataTypeToZeroType;

type DrizzleColumnType =
  | 'PgText'
  | 'PgChar'
  | 'PgVarchar'
  | 'PgUUID'
  | 'PgEnumColumn'
  | 'PgJsonb'
  | 'PgJson'
  | 'PgNumeric'
  | 'PgDateString'
  | 'PgTime'
  | 'PgTimestampString'
  | 'PgArray';

export const drizzleColumnTypeToZeroType = {
  PgText: 'string',
  PgChar: 'string',
  PgVarchar: 'string',
  PgUUID: 'string',
  PgEnumColumn: 'string',
  PgJsonb: 'json',
  PgJson: 'json',
  PgNumeric: 'number',
  PgDateString: 'number',
  PgTime: 'number',
  PgTimestampString: 'number',
  PgArray: 'json',
} as const satisfies Record<DrizzleColumnType, string>;

export type DrizzleColumnTypeToZeroType = typeof drizzleColumnTypeToZeroType;

export const postgresTypeToZeroType = {
  'text': 'string',
  'char': 'string',
  'character': 'string',
  'varchar': 'string',
  'character varying': 'string',
  'uuid': 'string',
  'enum': 'string',
  'jsonb': 'json',
  'json': 'json',
  'numeric': 'number',
  'decimal': 'number',
  'int': 'number',
  'integer': 'number',
  'smallint': 'number',
  'bigint': 'number',
  'int2': 'number',
  'int4': 'number',
  'int8': 'number',
  'real': 'number',
  'float4': 'number',
  'float8': 'number',
  'double precision': 'number',
  'serial': 'number',
  'bigserial': 'number',
  'date': 'number',
  'time': 'number',
  'time without time zone': 'number',
  'time with time zone': 'number',
  'timetz': 'number',
  'timestamp': 'number',
  'timestamp without time zone': 'number',
  'timestamp with time zone': 'number',
  'timestamptz': 'number',
  'boolean': 'boolean',
  'bool': 'boolean',
} as const satisfies Record<string, string>;

export type PostgresTypeToZeroType = typeof postgresTypeToZeroType;

export type ZeroTypeToTypescriptType = {
  number: number;
  boolean: boolean;
  date: string;
  string: string;
  json: ReadonlyJSONValue;
};

export type ZeroColumnType = Exclude<keyof ZeroTypeToTypescriptType, 'date'>;

export type ParsedDrizzleDataType = {
  readonly raw: string;
  readonly baseType: string;
  readonly constraint?: string;
};

export type NormalizedDrizzleDataType =
  | 'array'
  | 'bigint'
  | 'boolean'
  | 'custom'
  | 'date'
  | 'json'
  | 'number'
  | 'string';

export const normalizedDrizzleDataTypeToZeroType = {
  array: 'json',
  bigint: 'number',
  boolean: 'boolean',
  date: 'number',
  json: 'json',
  number: 'number',
  string: 'string',
} as const satisfies Record<
  Exclude<NormalizedDrizzleDataType, 'custom'>,
  ZeroColumnType
>;

const arrayLikeDrizzleConstraints = new Set([
  'basecolumn',
  'halfvector',
  'int64vector',
  'vector',
]);

const dateLikeStringConstraints = new Set([
  'date',
  'datetime',
  'time',
  'timestamp',
]);

const numberLikeStringConstraints = new Set([
  'int64',
  'numeric',
  'uint64',
  'unumeric',
]);

const stringLikeConstraints = new Set(['enum', 'uuid']);

export type RuntimeDrizzleColumn = {
  readonly columnType?: string;
  readonly dataType?: string;
  readonly enumValues?: readonly string[] | undefined;
  readonly dimensions?: number;
  readonly baseColumn?: unknown;
  getSQLType(): string;
};

export const parseDrizzleDataType = (
  dataType: string | undefined,
): ParsedDrizzleDataType | null => {
  if (typeof dataType !== 'string') {
    return null;
  }

  const raw = dataType.trim();
  if (raw.length === 0) {
    return null;
  }

  const [baseType = raw, ...constraintParts] = raw.split(/\s+/);
  const constraint =
    constraintParts.length > 0 ? constraintParts.join(' ') : undefined;

  return constraint === undefined
    ? {
        raw,
        baseType,
      }
    : {
        raw,
        baseType,
        constraint,
      };
};

export const normalizeDrizzleDataType = (
  dataType: string | undefined,
): NormalizedDrizzleDataType | null => {
  const parsed = parseDrizzleDataType(dataType);

  if (parsed === null) {
    return null;
  }

  const {raw, baseType, constraint} = parsed;

  if (raw === 'date') {
    return 'date';
  }

  switch (baseType) {
    case 'array':
      return constraint === undefined ||
        arrayLikeDrizzleConstraints.has(constraint)
        ? 'array'
        : null;
    case 'bigint':
      return 'bigint';
    case 'boolean':
      return 'boolean';
    case 'custom':
      return 'custom';
    case 'number':
      return 'number';
    case 'object':
      if (constraint === 'json') {
        return 'json';
      }

      return constraint === 'date' ? 'date' : null;
    case 'string':
      if (constraint === undefined) {
        return 'string';
      }

      if (dateLikeStringConstraints.has(constraint)) {
        return 'date';
      }

      if (numberLikeStringConstraints.has(constraint)) {
        return 'number';
      }

      return stringLikeConstraints.has(constraint) ? 'string' : null;
    default:
      return null;
  }
};

export const isDrizzleArrayColumn = (
  column: Pick<RuntimeDrizzleColumn, 'baseColumn' | 'dataType' | 'dimensions'>,
): boolean => {
  if (typeof column.dimensions === 'number' && column.dimensions > 0) {
    return true;
  }

  if (typeof column.baseColumn === 'object' && column.baseColumn !== null) {
    return true;
  }

  return normalizeDrizzleDataType(column.dataType) === 'array';
};

export const resolveDrizzleDataTypeToZeroType = (
  dataType: string | undefined,
): ZeroColumnType | null => {
  const normalized = normalizeDrizzleDataType(dataType);

  if (normalized === null || normalized === 'custom') {
    return null;
  }

  return normalizedDrizzleDataTypeToZeroType[normalized];
};

export const resolveDrizzleColumnToZeroType = (
  column: RuntimeDrizzleColumn,
): ZeroColumnType | null => {
  if (isDrizzleArrayColumn(column)) {
    return 'json';
  }

  if (Array.isArray(column.enumValues) && column.enumValues.length > 0) {
    return 'string';
  }

  const columnType = column.columnType;
  if (columnType !== undefined) {
    const zeroType =
      drizzleColumnTypeToZeroType[
        columnType as keyof typeof drizzleColumnTypeToZeroType
      ];

    if (zeroType !== undefined) {
      return zeroType;
    }
  }

  const dataType = resolveDrizzleDataTypeToZeroType(column.dataType);
  if (dataType !== null) {
    return dataType;
  }

  const sqlType = column.getSQLType().toLowerCase();

  return (
    postgresTypeToZeroType[sqlType as keyof typeof postgresTypeToZeroType] ??
    null
  );
};
