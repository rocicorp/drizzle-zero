import {
  integer,
  jsonb,
  pgEnum,
  pgTable,
  point,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';
import {describe, expect, test} from 'vitest';
import {
  isDrizzleArrayColumn,
  normalizeDrizzleDataType,
  resolveDrizzleColumnToZeroType,
} from '../src/drizzle-to-zero';

describe('drizzle-to-zero runtime helpers', () => {
  test('normalizes beta drizzle data types conservatively', () => {
    expect(normalizeDrizzleDataType('string timestamp')).toBe('date');
    expect(normalizeDrizzleDataType('object json')).toBe('json');
    expect(normalizeDrizzleDataType('string enum')).toBe('string');
    expect(normalizeDrizzleDataType('bigint int64')).toBe('bigint');
    expect(normalizeDrizzleDataType('array vector')).toBe('array');
    expect(normalizeDrizzleDataType('array point')).toBeNull();
  });

  test('detects beta arrays from dimensions and baseColumn wrappers', () => {
    const testTable = pgTable('posts', {
      id: text('id').primaryKey(),
      tags: text('tags').array(),
      matrix: integer('matrix').array('[][]'),
    });

    expect(isDrizzleArrayColumn(testTable.id)).toBe(false);
    expect(isDrizzleArrayColumn(testTable.tags)).toBe(true);
    expect(isDrizzleArrayColumn(testTable.matrix)).toBe(true);

    expect(
      isDrizzleArrayColumn({
        dataType: 'array basecolumn',
        baseColumn: {dataType: 'string'},
      }),
    ).toBe(true);
  });

  test('resolves zero types with array and enum precedence', () => {
    const status = pgEnum('status', ['active', 'inactive']);
    const testTable = pgTable('events', {
      id: text('id').primaryKey(),
      status: status('status').notNull(),
      statusList: status('status_list').array(),
      createdAt: timestamp('created_at', {mode: 'string'}).notNull(),
      metadata: jsonb('metadata').notNull(),
      ids: integer('ids').array(),
    });

    expect(resolveDrizzleColumnToZeroType(testTable.status)).toBe('string');
    expect(resolveDrizzleColumnToZeroType(testTable.statusList)).toBe('json');
    expect(resolveDrizzleColumnToZeroType(testTable.createdAt)).toBe('number');
    expect(resolveDrizzleColumnToZeroType(testTable.metadata)).toBe('json');
    expect(resolveDrizzleColumnToZeroType(testTable.ids)).toBe('json');
  });

  test('falls back to SQL types for custom columns', () => {
    expect(
      resolveDrizzleColumnToZeroType({
        columnType: 'PgCustomColumn',
        dataType: 'custom',
        getSQLType: () => 'uuid',
      }),
    ).toBe('string');
  });

  test('keeps unsupported tuple-style beta array data unresolved', () => {
    const testTable = pgTable('geo', {
      id: text('id').primaryKey(),
      location: point('location').notNull(),
    });

    expect(resolveDrizzleColumnToZeroType(testTable.location)).toBeNull();
  });
});
