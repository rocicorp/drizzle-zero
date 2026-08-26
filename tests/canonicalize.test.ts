import {defineRelations} from 'drizzle-orm';
import {integer, pgTable, primaryKey, serial, text} from 'drizzle-orm/pg-core';
import {describe, expect, test} from 'vitest';
import {canonicalizeZeroSchema} from '../src/canonicalize';
import {drizzleZeroConfig} from '../src/relations';

describe('canonicalizeZeroSchema', () => {
  test('sorts tables, columns, relationship owners and relation names', () => {
    const canonical = canonicalizeZeroSchema({
      tables: {
        zebra: {name: 'zebra', primaryKey: ['id'], columns: {b: {}, a: {}}},
        apple: {name: 'apple', primaryKey: ['id'], columns: {d: {}, c: {}}},
      },
      relationships: {
        zebra: {second: [], first: []},
        apple: {fourth: [], third: []},
      },
    });

    expect(Object.keys(canonical.tables)).toEqual(['apple', 'zebra']);
    expect(Object.keys(canonical.tables.apple.columns)).toEqual(['c', 'd']);
    expect(Object.keys(canonical.tables.zebra.columns)).toEqual(['a', 'b']);
    expect(Object.keys(canonical.relationships)).toEqual(['apple', 'zebra']);
    expect(Object.keys(canonical.relationships.apple)).toEqual([
      'fourth',
      'third',
    ]);
  });

  test('leaves meaningful ordering alone', () => {
    const canonical = canonicalizeZeroSchema({
      tables: {
        t: {name: 't', primaryKey: ['b', 'a'], columns: {b: {}, a: {}}},
      },
      relationships: {
        t: {
          // Hops are ordered, and sourceField/destField pair up by position.
          rel: [
            {sourceField: ['z', 'a'], destField: ['q', 'b'], destSchema: 'u'},
            {sourceField: ['m'], destField: ['n'], destSchema: 'v'},
          ],
        },
      },
    });

    expect(canonical.tables.t.primaryKey).toEqual(['b', 'a']);
    expect(canonical.relationships.t.rel).toEqual([
      {sourceField: ['z', 'a'], destField: ['q', 'b'], destSchema: 'u'},
      {sourceField: ['m'], destField: ['n'], destSchema: 'v'},
    ]);
  });

  test('is idempotent', () => {
    const schema = {
      tables: {b: {columns: {y: {}, x: {}}}, a: {columns: {}}},
      relationships: {b: {two: [], one: []}},
    };

    const once = canonicalizeZeroSchema(schema);

    expect(JSON.stringify(canonicalizeZeroSchema(once))).toBe(
      JSON.stringify(once),
    );
  });

  test('passes through values that are not schemas', () => {
    expect(canonicalizeZeroSchema(null)).toBeNull();
    expect(canonicalizeZeroSchema('nope')).toBe('nope');
    expect(canonicalizeZeroSchema({tables: 7})).toEqual({tables: 7});
  });
});

describe('schema generation is order-independent', () => {
  const users = pgTable('users', {
    id: serial('id').primaryKey(),
    name: text('name'),
  });

  const buildPosts = (reverseColumns: boolean) =>
    reverseColumns
      ? pgTable('posts', {
          id: serial('id').primaryKey(),
          editorId: integer('editor_id'),
          authorId: integer('author_id'),
        })
      : pgTable('posts', {
          id: serial('id').primaryKey(),
          authorId: integer('author_id'),
          editorId: integer('editor_id'),
        });

  const buildRelations = (
    posts: ReturnType<typeof buildPosts>,
    reverse: boolean,
  ) =>
    defineRelations({users, posts}, r =>
      reverse
        ? {
            posts: {
              editor: r.one.users({
                from: r.posts.editorId,
                to: r.users.id,
                optional: true,
              }),
              author: r.one.users({
                from: r.posts.authorId,
                to: r.users.id,
                optional: false,
              }),
            },
          }
        : {
            posts: {
              author: r.one.users({
                from: r.posts.authorId,
                to: r.users.id,
                optional: false,
              }),
              editor: r.one.users({
                from: r.posts.editorId,
                to: r.users.id,
                optional: true,
              }),
            },
          },
    );

  const config = {tables: {users: true, posts: true}} as const;

  const baselinePosts = buildPosts(false);
  const baseline = JSON.stringify(
    drizzleZeroConfig(
      {users, posts: baselinePosts, r: buildRelations(baselinePosts, false)},
      config,
    ),
  );

  test('reordering table exports changes nothing', () => {
    expect(
      JSON.stringify(
        drizzleZeroConfig(
          {
            posts: baselinePosts,
            users,
            r: buildRelations(baselinePosts, false),
          },
          config,
        ),
      ),
    ).toBe(baseline);
  });

  test('reordering relation declarations changes nothing', () => {
    expect(
      JSON.stringify(
        drizzleZeroConfig(
          {users, posts: baselinePosts, r: buildRelations(baselinePosts, true)},
          config,
        ),
      ),
    ).toBe(baseline);
  });

  test('reordering column declarations changes nothing', () => {
    const reversed = buildPosts(true);

    expect(
      JSON.stringify(
        drizzleZeroConfig(
          {users, posts: reversed, r: buildRelations(reversed, false)},
          config,
        ),
      ),
    ).toBe(baseline);
  });

  test('a composite primary key keeps its declared column order', () => {
    const membership = pgTable(
      'membership',
      {
        teamId: integer('team_id').notNull(),
        userId: integer('user_id').notNull(),
      },
      t => [primaryKey({columns: [t.userId, t.teamId]})],
    );

    const schema = drizzleZeroConfig({membership}, {
      tables: {membership: true},
    } as never) as never as {
      tables: {membership: {primaryKey: readonly string[]}};
    };

    expect(schema.tables.membership.primaryKey).toEqual(['userId', 'teamId']);
  });
});
