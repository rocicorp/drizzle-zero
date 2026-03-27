import type {ReadonlyJSONValue} from '@rocicorp/zero';
import {describe, expectTypeOf, test} from 'vitest';
import {
  char,
  customType,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';
import type {
  ResolveColumnCustomType,
  ResolveColumnDefaultType,
  ResolveColumnZeroType,
} from '../src/types';

describe('column metadata types', () => {
  test('maps beta metadata to zero logical types', () => {
    const status = pgEnum('status', ['active', 'inactive', 'pending']);
    const testTable = pgTable('events', {
      id: text('id').primaryKey(),
      createdAt: timestamp('created_at', {mode: 'string'}).notNull(),
      metadata: jsonb('metadata').notNull(),
      status: status('status').notNull(),
      tagIds: integer('tag_ids').array(),
    });

    expectTypeOf<
      ResolveColumnZeroType<typeof testTable.createdAt>
    >().toEqualTypeOf<'number'>();
    expectTypeOf<
      ResolveColumnZeroType<typeof testTable.metadata>
    >().toEqualTypeOf<'json'>();
    expectTypeOf<
      ResolveColumnZeroType<typeof testTable.status>
    >().toEqualTypeOf<'string'>();
    expectTypeOf<
      ResolveColumnZeroType<typeof testTable.tagIds>
    >().toEqualTypeOf<'json'>();
  });

  test('preserves custom metadata-backed types', () => {
    type EventId = string & {__brand: 'EventId'};
    type ISODateString = string & {__brand: 'ISODateString'};
    type Email = `${string}@${string}`;
    type CountryIsoCode = 'US' | 'CA' | 'MX';

    const testTable = pgTable('events', {
      id: text('id').$type<EventId>().primaryKey(),
      publishedAt: timestamp('published_at').$type<ISODateString>().notNull(),
      emails: text('emails').$type<Email>().array(),
      domicileCountry: char('domicile_country', {
        length: 2,
      }).$type<CountryIsoCode | null>(),
      metadata: jsonb('metadata').$type<{slug: string}>().notNull(),
    });

    expectTypeOf<
      ResolveColumnCustomType<typeof testTable.id>
    >().toEqualTypeOf<EventId>();
    expectTypeOf<
      ResolveColumnCustomType<typeof testTable.publishedAt>
    >().toEqualTypeOf<ISODateString>();
    expectTypeOf<
      ResolveColumnCustomType<typeof testTable.emails>
    >().toEqualTypeOf<Email[]>();
    expectTypeOf<
      ResolveColumnCustomType<typeof testTable.domicileCountry>
    >().toEqualTypeOf<CountryIsoCode | null>();
    expectTypeOf<
      ResolveColumnCustomType<typeof testTable.metadata>
    >().toEqualTypeOf<{slug: string}>();
  });

  test('falls back to logical zero defaults for native beta data', () => {
    const testTable = pgTable('events', {
      id: text('id').primaryKey(),
      createdAt: timestamp('created_at', {mode: 'string'}).notNull(),
      metadata: jsonb('metadata').notNull(),
    });

    expectTypeOf<
      ResolveColumnDefaultType<typeof testTable.createdAt>
    >().toEqualTypeOf<number>();
    expectTypeOf<
      ResolveColumnCustomType<typeof testTable.createdAt>
    >().toEqualTypeOf<number>();
    expectTypeOf<
      ResolveColumnDefaultType<typeof testTable.metadata>
    >().toEqualTypeOf<ReadonlyJSONValue>();
    expectTypeOf<
      ResolveColumnCustomType<typeof testTable.metadata>
    >().toEqualTypeOf<ReadonlyJSONValue>();
  });

  test('infers custom factory data from beta column metadata', () => {
    type TypeId<T extends string> = string & {__type: T};

    const typeId = <T extends string>() =>
      customType<{
        data: TypeId<T>;
        driverData: string;
      }>({
        dataType() {
          return 'text';
        },
      });

    const testTable = pgTable('events', {
      id: text('id').primaryKey(),
      userId: typeId<'user'>()('user_id').notNull(),
    });

    expectTypeOf<
      ResolveColumnCustomType<typeof testTable.userId>
    >().toEqualTypeOf<TypeId<'user'>>();
  });

  test('keeps override defaults broad for zero builders', () => {
    const testTable = pgTable('events', {
      id: text('id').primaryKey(),
      emails: text('emails').$type<`${string}@${string}`>().array(),
    });

    expectTypeOf<
      ResolveColumnDefaultType<typeof testTable.id>
    >().toEqualTypeOf<string>();
    expectTypeOf<
      ResolveColumnDefaultType<typeof testTable.emails>
    >().toEqualTypeOf<ReadonlyJSONValue>();
  });
});
