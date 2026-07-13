import {createSchema, relationships, string, table} from '@rocicorp/zero';
import {defineRelations, defineRelationsPart} from 'drizzle-orm/relations';
import {relations as legacyRelations} from 'drizzle-orm/_relations';
import {pgTable, primaryKey, text} from 'drizzle-orm/pg-core';
import {describe, expect, test} from 'vitest';
import {drizzleZeroConfig} from '../src/relations';
import {expectSchemaDeepEqual} from './utils';

describe('beta relations engine', () => {
  test('builds direct and through relationships from beta defineRelations exports', () => {
    const users = pgTable('user', {
      id: text('id').primaryKey(),
      name: text('name'),
    });

    const groups = pgTable('group', {
      id: text('id').primaryKey(),
      name: text('name'),
    });

    const usersToGroups = pgTable(
      'users_to_group',
      {
        userId: text('user_id')
          .notNull()
          .references(() => users.id),
        groupId: text('group_id')
          .notNull()
          .references(() => groups.id),
      },
      t => [primaryKey({columns: [t.userId, t.groupId]})],
    );

    const schemaRelations = defineRelations(
      {users, groups, usersToGroups},
      (r: any) => ({
        users: {
          usersToGroups: r.many.usersToGroups(),
          groups: r.many.groups({
            from: r.users.id.through(r.usersToGroups.userId),
            to: r.groups.id.through(r.usersToGroups.groupId),
            alias: 'users-groups',
          }),
        },
        groups: {
          usersToGroups: r.many.usersToGroups(),
          users: r.many.users({
            alias: 'users-groups',
          }),
        },
        usersToGroups: {
          user: r.one.users({
            from: r.usersToGroups.userId,
            to: r.users.id,
            optional: false,
          }),
          group: r.one.groups({
            from: r.usersToGroups.groupId,
            to: r.groups.id,
            optional: false,
          }),
        },
      }),
    );

    const result = drizzleZeroConfig({
      users,
      groups,
      usersToGroups,
      schemaRelations,
    });

    const expectedUsers = table('users')
      .from('user')
      .columns({
        id: string(),
        name: string().optional(),
      })
      .primaryKey('id');

    const expectedGroups = table('groups')
      .from('group')
      .columns({
        id: string(),
        name: string().optional(),
      })
      .primaryKey('id');

    const expectedUsersToGroups = table('usersToGroups')
      .from('users_to_group')
      .columns({
        userId: string().from('user_id'),
        groupId: string().from('group_id'),
      })
      .primaryKey('userId', 'groupId');

    const expected = createSchema({
      tables: [expectedUsers, expectedGroups, expectedUsersToGroups],
      relationships: [
        relationships(expectedUsers, ({many}) => ({
          usersToGroups: many({
            sourceField: ['id'],
            destField: ['userId'],
            destSchema: expectedUsersToGroups,
          }),
          groups: many(
            {
              sourceField: ['id'],
              destField: ['userId'],
              destSchema: expectedUsersToGroups,
            },
            {
              sourceField: ['groupId'],
              destField: ['id'],
              destSchema: expectedGroups,
            },
          ),
        })),
        relationships(expectedGroups, ({many}) => ({
          usersToGroups: many({
            sourceField: ['id'],
            destField: ['groupId'],
            destSchema: expectedUsersToGroups,
          }),
          users: many(
            {
              sourceField: ['id'],
              destField: ['groupId'],
              destSchema: expectedUsersToGroups,
            },
            {
              sourceField: ['userId'],
              destField: ['id'],
              destSchema: expectedUsers,
            },
          ),
        })),
        relationships(expectedUsersToGroups, ({one}) => ({
          user: one({
            sourceField: ['userId'],
            destField: ['id'],
            destSchema: expectedUsers,
          }),
          group: one({
            sourceField: ['groupId'],
            destField: ['id'],
            destSchema: expectedGroups,
          }),
        })),
      ],
    });

    expectSchemaDeepEqual(result).toEqual(expected);
  });

  test('merges multiple beta defineRelationsPart exports', () => {
    const users = pgTable('user', {
      id: text('id').primaryKey(),
    });

    const posts = pgTable('post', {
      id: text('id').primaryKey(),
      authorId: text('author_id')
        .notNull()
        .references(() => users.id),
    });

    const comments = pgTable('comment', {
      id: text('id').primaryKey(),
      postId: text('post_id')
        .notNull()
        .references(() => posts.id),
    });

    const authorRelations = defineRelationsPart(
      {users, posts, comments},
      (r: any) => ({
        users: {
          posts: r.many.posts(),
        },
        posts: {
          author: r.one.users({
            from: r.posts.authorId,
            to: r.users.id,
            optional: false,
          }),
        },
      }),
    );

    const commentRelations = defineRelationsPart(
      {users, posts, comments},
      (r: any) => ({
        posts: {
          comments: r.many.comments(),
        },
        comments: {
          post: r.one.posts({
            from: r.comments.postId,
            to: r.posts.id,
            optional: false,
          }),
        },
      }),
    );

    const result = drizzleZeroConfig({
      users,
      posts,
      comments,
      authorRelations,
      commentRelations,
    });

    const expectedUsers = table('users')
      .from('user')
      .columns({id: string()})
      .primaryKey('id');

    const expectedPosts = table('posts')
      .from('post')
      .columns({
        id: string(),
        authorId: string().from('author_id'),
      })
      .primaryKey('id');

    const expectedComments = table('comments')
      .from('comment')
      .columns({
        id: string(),
        postId: string().from('post_id'),
      })
      .primaryKey('id');

    const expected = createSchema({
      tables: [expectedUsers, expectedPosts, expectedComments],
      relationships: [
        relationships(expectedUsers, ({many}) => ({
          posts: many({
            sourceField: ['id'],
            destField: ['authorId'],
            destSchema: expectedPosts,
          }),
        })),
        relationships(expectedPosts, ({one, many}) => ({
          author: one({
            sourceField: ['authorId'],
            destField: ['id'],
            destSchema: expectedUsers,
          }),
          comments: many({
            sourceField: ['id'],
            destField: ['postId'],
            destSchema: expectedComments,
          }),
        })),
        relationships(expectedComments, ({one}) => ({
          post: one({
            sourceField: ['postId'],
            destField: ['id'],
            destSchema: expectedPosts,
          }),
        })),
      ],
    });

    expectSchemaDeepEqual(result).toEqual(expected);
  });

  test('rejects legacy relations exports', () => {
    const users = pgTable('user', {
      id: text('id').primaryKey(),
    });

    const posts = pgTable('post', {
      id: text('id').primaryKey(),
      authorId: text('author_id').references(() => users.id),
    });

    const usersRelations = legacyRelations(users as any, ({many}: any) => ({
      posts: many(posts as any),
    }));

    expect(() =>
      drizzleZeroConfig({users, posts, usersRelations}),
    ).toThrowErrorMatchingInlineSnapshot(
      `[Error: drizzle-zero: Legacy relations(...) exports are no longer supported. Use beta defineRelations(...) or defineRelationsPart(...) instead. Found: usersRelations]`,
    );
  });

  test('rejects removed manyToMany config', () => {
    const users = pgTable('user', {
      id: text('id').primaryKey(),
    });

    expect(() =>
      drizzleZeroConfig({users}, {
        manyToMany: {},
      } as unknown as Parameters<typeof drizzleZeroConfig>[1]),
    ).toThrowErrorMatchingInlineSnapshot(
      `[Error: drizzle-zero: \`manyToMany\` has been removed. Use beta \`through(...)\` relations instead.]`,
    );
  });
});
