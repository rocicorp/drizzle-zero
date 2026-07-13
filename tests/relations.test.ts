import {
  boolean,
  createSchema,
  json,
  number,
  relationships,
  string,
  table,
} from '@rocicorp/zero';
import {describe, test} from 'vitest';
import {drizzleZeroConfig} from '../src/relations';
import {expectSchemaDeepEqual} from './utils';

describe('relationships', () => {
  test('relationships - no tables', async ({expect}) => {
    await expect(() =>
      drizzleZeroConfig(
        {},
        {
          tables: {
            users: {
              id: true,
            },
          },
        },
      ),
    ).toThrowErrorMatchingInlineSnapshot(
      `[Error: ❌ drizzle-zero: No tables found in the input - did you export tables and relations from the Drizzle schema passed to the \`drizzleZeroConfig\` function?]`,
    );
  });

  test('relationships - importing a zero schema instead of a drizzle schema', async ({
    expect,
  }) => {
    const {schema: zeroSchema} = await import('./schemas/one-to-many.zero');

    await expect(() =>
      drizzleZeroConfig(zeroSchema),
    ).toThrowErrorMatchingInlineSnapshot(
      `[Error: drizzle-zero: table or relation with key enableLegacyQueries is not defined]`,
    );
  });

  test('relationships - many-to-many-missing-foreign-key', async () => {
    const {schema: manyToManyMissingForeignKeyZeroSchema} =
      await import('./schemas/many-to-many-missing-foreign-key.zero');

    const expectedUsers = table('users')
      .from('user')
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

    const expectedGroups = table('groups')
      .from('group')
      .columns({
        id: string(),
        name: string().optional(),
      })
      .primaryKey('id');

    const expectedUsersRelationships = relationships(
      expectedUsers,
      ({many}) => ({
        groups: many({
          sourceField: ['id'],
          destField: ['userId'],
          destSchema: expectedUsersToGroups,
        }),
      }),
    );

    const expectedUsersToGroupsRelationships = relationships(
      expectedUsersToGroups,
      ({one}) => ({
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
      }),
    );

    const expectedGroupsRelationships = relationships(
      expectedGroups,
      ({many}) => ({
        users: many({
          sourceField: ['id'],
          destField: ['groupId'],
          destSchema: expectedUsersToGroups,
        }),
      }),
    );

    const expected = createSchema({
      tables: [expectedUsers, expectedUsersToGroups, expectedGroups],
      relationships: [
        expectedUsersRelationships,
        expectedUsersToGroupsRelationships,
        expectedGroupsRelationships,
      ],
    });

    expectSchemaDeepEqual(manyToManyMissingForeignKeyZeroSchema).toEqual(
      expected,
    );
  });

  test('relationships - one-to-one-missing-foreign-key', async () => {
    const {schema: oneToOneMissingForeignKeyZeroSchema} =
      await import('./schemas/one-to-one-missing-foreign-key.zero');

    const expectedUsers = table('users')
      .columns({
        id: string(),
        name: string().optional(),
      })
      .primaryKey('id');

    const expectedPosts = table('posts')
      .columns({
        id: string(),
        name: string().optional(),
        author: string(),
      })
      .primaryKey('id');

    const expectedUsersRelationships = relationships(
      expectedUsers,
      ({one}) => ({
        userPosts: one({
          sourceField: ['id'],
          destField: ['author'],
          destSchema: expectedPosts,
        }),
      }),
    );

    const expectedPostsRelationships = relationships(
      expectedPosts,
      ({one}) => ({
        postAuthor: one({
          sourceField: ['author'],
          destField: ['id'],
          destSchema: expectedUsers,
        }),
      }),
    );

    const expected = createSchema({
      tables: [expectedUsers, expectedPosts],
      relationships: [expectedUsersRelationships, expectedPostsRelationships],
    });

    expectSchemaDeepEqual(oneToOneMissingForeignKeyZeroSchema).toEqual(
      expected,
    );
  });

  test('relationships - relation-name-conflicts-column', async ({expect}) => {
    await expect(
      import('./schemas/relation-name-conflicts-column.zero'),
    ).rejects.toThrowErrorMatchingInlineSnapshot(
      `[Error: relations -> users: { posts: r.many.posts(...) }: relation name collides with column "posts" of table "users"]`,
    );
  });

  test('relationships - many-to-many-relation-name-conflicts-column', async ({
    expect,
  }) => {
    await expect(
      import('./schemas/many-to-many-relation-name-conflicts-column.zero'),
    ).rejects.toThrowErrorMatchingInlineSnapshot(
      `[Error: relations -> users: { groups: r.many.groups(...) }: relation name collides with column "groups" of table "users"]`,
    );
  });

  test('relationships - no-relations', async () => {
    const {schema: noRelationsZeroSchema} =
      await import('./schemas/no-relations.zero');

    const expectedUsers = table('users')
      .from('user')
      .columns({
        id: string(),
        name: string().optional(),
      })
      .primaryKey('id');

    const expectedProfileInfo = table('profileInfo')
      .from('profile_info')
      .columns({
        id: string(),
        userId: string().from('user_id').optional(),
        metadata: json().optional(),
      })
      .primaryKey('id');

    const expected = createSchema({
      tables: [expectedUsers, expectedProfileInfo],
    });

    expectSchemaDeepEqual(noRelationsZeroSchema).toEqual(expected);
  });

  test('relationships - one-to-one self-referential', async () => {
    const {schema: oneToOneSelfZeroSchema} =
      await import('./schemas/one-to-one-self.zero');

    const expectedUsers = table('users')
      .from('user')
      .columns({
        id: string(),
        name: string().optional(),
        invitedBy: string().from('invited_by').optional(),
      })
      .primaryKey('id');

    const expectedRelations = relationships(expectedUsers, ({one}) => ({
      invitee: one({
        sourceField: ['invitedBy'],
        destField: ['id'],
        destSchema: expectedUsers,
      }),
    }));

    const expected = createSchema({
      tables: [expectedUsers],
      relationships: [expectedRelations],
    });

    expectSchemaDeepEqual(oneToOneSelfZeroSchema).toEqual(expected);
  });

  test('relationships - one-to-one', async () => {
    const {schema: oneToOneZeroSchema} =
      await import('./schemas/one-to-one.zero');

    const expectedUsers = table('users')
      .from('user')
      .columns({
        id: string(),
        name: string().optional(),
      })
      .primaryKey('id');

    const expectedProfileInfo = table('profileInfo')
      .from('profile_info')
      .columns({
        id: string(),
        userId: string().from('user_id').optional(),
        metadata: json().optional(),
      })
      .primaryKey('id');

    const expectedUsersRelations = relationships(expectedUsers, ({one}) => ({
      profileInfo: one({
        sourceField: ['id'],
        destField: ['userId'],
        destSchema: expectedProfileInfo,
      }),
    }));

    const expectedProfileInfoRelations = relationships(
      expectedProfileInfo,
      ({one}) => ({
        user: one({
          sourceField: ['userId'],
          destField: ['id'],
          destSchema: expectedUsers,
        }),
      }),
    );

    const expected = createSchema({
      tables: [expectedUsers, expectedProfileInfo],
      relationships: [expectedUsersRelations, expectedProfileInfoRelations],
    });

    expectSchemaDeepEqual(oneToOneZeroSchema).toEqual(expected);
  });

  test('relationships - one-to-one-subset', async () => {
    const {schema: oneToOneSubsetZeroSchema} =
      await import('./schemas/one-to-one-subset.zero');

    const expectedUsers = table('users')
      .from('user')
      .columns({
        id: string(),
        name: string().optional(),
      })
      .primaryKey('id');

    const expected = createSchema({
      tables: [expectedUsers],
    });

    expectSchemaDeepEqual(oneToOneSubsetZeroSchema).toEqual(expected);
  });

  test('relationships - one-to-one-foreign-key', async () => {
    const {schema: oneToOneForeignKeyZeroSchema} =
      await import('./schemas/one-to-one-foreign-key.zero');

    const expectedUsers = table('users')
      .columns({
        id: string(),
        name: string().optional(),
      })
      .primaryKey('id');

    const expectedPosts = table('posts')
      .columns({
        id: string(),
        name: string().optional(),
        author: string(),
      })
      .primaryKey('id');

    const expectedUsersRelationships = relationships(
      expectedUsers,
      ({one}) => ({
        userPosts: one({
          sourceField: ['id'],
          destField: ['author'],
          destSchema: expectedPosts,
        }),
      }),
    );

    const expectedPostsRelationships = relationships(
      expectedPosts,
      ({one}) => ({
        postAuthor: one({
          sourceField: ['author'],
          destField: ['id'],
          destSchema: expectedUsers,
        }),
      }),
    );

    const expected = createSchema({
      tables: [expectedUsers, expectedPosts],
      relationships: [expectedUsersRelationships, expectedPostsRelationships],
    });

    expectSchemaDeepEqual(oneToOneForeignKeyZeroSchema).toEqual(expected);
  });

  test('relationships - one-to-one-2', async () => {
    const {schema: oneToOne2ZeroSchema} =
      await import('./schemas/one-to-one-2.zero');

    const expectedUsers = table('userTable')
      .from('user')
      .columns({
        id: string(),
        name: string(),
        partner: boolean(),
        createdAt: number().from('created_at'),
      })
      .primaryKey('id');

    const expectedMedium = table('mediumTable')
      .from('medium')
      .columns({
        id: string(),
        name: string(),
      })
      .primaryKey('id');

    const expectedMessage = table('messageTable')
      .from('message')
      .columns({
        id: string(),
        senderId: string().optional(),
        mediumId: string().optional(),
        body: string(),
      })
      .primaryKey('id');

    const expectedMediumRelationships = relationships(
      expectedMedium,
      ({many}) => ({
        messages: many({
          sourceField: ['id'],
          destField: ['mediumId'],
          destSchema: expectedMessage,
        }),
      }),
    );

    const expectedUsersRelationships = relationships(
      expectedUsers,
      ({many}) => ({
        messages: many({
          sourceField: ['id'],
          destField: ['senderId'],
          destSchema: expectedMessage,
        }),
      }),
    );

    const expectedMessageRelationships = relationships(
      expectedMessage,
      ({one}) => ({
        medium: one({
          sourceField: ['mediumId'],
          destField: ['id'],
          destSchema: expectedMedium,
        }),
        sender: one({
          sourceField: ['senderId'],
          destField: ['id'],
          destSchema: expectedUsers,
        }),
      }),
    );

    const expected = createSchema({
      tables: [expectedUsers, expectedMedium, expectedMessage],
      relationships: [
        expectedUsersRelationships,
        expectedMediumRelationships,
        expectedMessageRelationships,
      ],
    });

    expectSchemaDeepEqual(oneToOne2ZeroSchema).toEqual(expected);
  });

  test('relationships - one-to-many', async () => {
    const {schema: oneToManyZeroSchema} =
      await import('./schemas/one-to-many.zero');

    const expectedUsers = table('users')
      .from('user')
      .columns({
        id: string(),
        name: string().optional(),
      })
      .primaryKey('id');

    const expectedPosts = table('posts')
      .from('post')
      .columns({
        id: string(),
        content: string().optional(),
        authorId: string().from('author_id').optional(),
      })
      .primaryKey('id');

    const expectedComments = table('comments')
      .from('comment')
      .columns({
        id: string(),
        text: string().optional(),
        authorId: string().from('author_id').optional(),
        postId: string().from('post_id').optional(),
      })
      .primaryKey('id');

    const expectedUsersRelationships = relationships(
      expectedUsers,
      ({many}) => ({
        posts: many({
          sourceField: ['id'],
          destField: ['authorId'],
          destSchema: expectedPosts,
        }),
      }),
    );

    const expectedPostsRelationships = relationships(
      expectedPosts,
      ({one}) => ({
        author: one({
          sourceField: ['authorId'],
          destField: ['id'],
          destSchema: expectedUsers,
        }),
      }),
    );

    const expectedCommentsRelationships = relationships(
      expectedComments,
      ({one}) => ({
        post: one({
          sourceField: ['postId'],
          destField: ['id'],
          destSchema: expectedPosts,
        }),
        author: one({
          sourceField: ['authorId'],
          destField: ['id'],
          destSchema: expectedUsers,
        }),
      }),
    );

    const expected = createSchema({
      tables: [expectedUsers, expectedPosts, expectedComments],
      relationships: [
        expectedUsersRelationships,
        expectedPostsRelationships,
        expectedCommentsRelationships,
      ],
    });

    expectSchemaDeepEqual(oneToManyZeroSchema).toEqual(expected);
  });

  test('relationships - one-to-many-named', async () => {
    const {schema: oneToManyNamedZeroSchema} =
      await import('./schemas/one-to-many-named.zero');

    const expectedUsers = table('users')
      .columns({
        id: string(),
        name: string().optional(),
      })
      .primaryKey('id');

    const expectedPosts = table('posts')
      .columns({
        id: string(),
        content: string().optional(),
        authorId: string().from('author_id').optional(),
        reviewerId: string().from('reviewer_id').optional(),
      })
      .primaryKey('id');

    const expectedUsersRelationships = relationships(
      expectedUsers,
      ({many}) => ({
        author: many({
          sourceField: ['id'],
          destField: ['authorId'],
          destSchema: expectedPosts,
        }),
        reviewer: many({
          sourceField: ['id'],
          destField: ['reviewerId'],
          destSchema: expectedPosts,
        }),
      }),
    );

    const expectedPostsRelationships = relationships(
      expectedPosts,
      ({one}) => ({
        author: one({
          sourceField: ['authorId'],
          destField: ['id'],
          destSchema: expectedUsers,
        }),
        reviewer: one({
          sourceField: ['reviewerId'],
          destField: ['id'],
          destSchema: expectedUsers,
        }),
      }),
    );

    const expected = createSchema({
      tables: [expectedUsers, expectedPosts],
      relationships: [expectedUsersRelationships, expectedPostsRelationships],
    });

    expectSchemaDeepEqual(oneToManyNamedZeroSchema).toEqual(expected);
  });

  test('relationships - many-to-many', async () => {
    const {schema: manyToManyZeroSchema} =
      await import('./schemas/many-to-many.zero');

    const expectedUsers = table('users')
      .from('user')
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

    const expectedGroups = table('groups')
      .from('group')
      .columns({
        id: string(),
        name: string().optional(),
      })
      .primaryKey('id');

    const expectedUsersRelationships = relationships(
      expectedUsers,
      ({many}) => ({
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
        usersToGroups: many({
          sourceField: ['id'],
          destField: ['userId'],
          destSchema: expectedUsersToGroups,
        }),
      }),
    );

    const expectedUsersToGroupsRelationships = relationships(
      expectedUsersToGroups,
      ({one}) => ({
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
      }),
    );

    const expectedGroupsRelationships = relationships(
      expectedGroups,
      ({many}) => ({
        usersToGroups: many({
          sourceField: ['id'],
          destField: ['groupId'],
          destSchema: expectedUsersToGroups,
        }),
      }),
    );

    const expected = createSchema({
      tables: [expectedUsers, expectedUsersToGroups, expectedGroups],
      relationships: [
        expectedUsersRelationships,
        expectedUsersToGroupsRelationships,
        expectedGroupsRelationships,
      ],
    });

    expectSchemaDeepEqual(manyToManyZeroSchema).toEqual(expected);
  });

  test('relationships - many-to-many-self-referential-fk', async () => {
    const {schema: manyToManySelfReferentialFkZeroSchema} =
      await import('./schemas/many-to-many-self-referential-fk.zero');

    const expectedDoc = table('doc')
      .columns({
        id: string(),
        title: string(),
      })
      .primaryKey('id');

    const expectedRelated = table('related')
      .columns({
        fk_from_doc: string(),
        fk_to_doc: string(),
      })
      .primaryKey('fk_from_doc', 'fk_to_doc');

    const expectedDocRelationships = relationships(expectedDoc, ({many}) => ({
      related_docs: many(
        {
          sourceField: ['id'],
          destField: ['fk_from_doc'],
          destSchema: expectedRelated,
        },
        {
          sourceField: ['fk_to_doc'],
          destField: ['id'],
          destSchema: expectedDoc,
        },
      ),
      relateds_fk_from_doc: many({
        sourceField: ['id'],
        destField: ['fk_from_doc'],
        destSchema: expectedRelated,
      }),
      relateds_fk_to_doc: many({
        sourceField: ['id'],
        destField: ['fk_to_doc'],
        destSchema: expectedRelated,
      }),
    }));

    const expectedRelatedRelationships = relationships(
      expectedRelated,
      ({one}) => ({
        doc_fk_from_doc: one({
          sourceField: ['fk_from_doc'],
          destField: ['id'],
          destSchema: expectedDoc,
        }),
        doc_fk_to_doc: one({
          sourceField: ['fk_to_doc'],
          destField: ['id'],
          destSchema: expectedDoc,
        }),
      }),
    );

    const expected = createSchema({
      tables: [expectedDoc, expectedRelated],
      relationships: [expectedDocRelationships, expectedRelatedRelationships],
    });

    expectSchemaDeepEqual(manyToManySelfReferentialFkZeroSchema).toEqual(
      expected,
    );
  });

  test('relationships - many-to-many-subset', async () => {
    const {schema: manyToManySubsetZeroSchema} =
      await import('./schemas/many-to-many-subset.zero');

    const expectedUsers = table('users')
      .from('user')
      .columns({
        id: string(),
      })
      .primaryKey('id');

    const expected = createSchema({
      tables: [expectedUsers],
    });

    expectSchemaDeepEqual(manyToManySubsetZeroSchema).toEqual(expected);
  });

  test('relationships - many-to-many-subset-2', async () => {
    const {schema: manyToManySubset2ZeroSchema} =
      await import('./schemas/many-to-many-subset-2.zero');

    const expectedUsers = table('users')
      .from('user')
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

    const expectedUsersToGroupsRelationships = relationships(
      expectedUsersToGroups,
      ({one}) => ({
        user: one({
          sourceField: ['userId'],
          destField: ['id'],
          destSchema: expectedUsers,
        }),
      }),
    );

    const usersRelationships = relationships(expectedUsers, ({many}) => ({
      usersToGroups: many({
        sourceField: ['id'],
        destField: ['userId'],
        destSchema: expectedUsersToGroups,
      }),
    }));

    const expected = createSchema({
      tables: [expectedUsers, expectedUsersToGroups],
      relationships: [usersRelationships, expectedUsersToGroupsRelationships],
    });

    expectSchemaDeepEqual(manyToManySubset2ZeroSchema).toEqual(expected);
  });

  test('relationships - many-to-many-self-referential', async () => {
    const {schema: manyToManySelfReferentialZeroSchema} =
      await import('./schemas/many-to-many-self-referential.zero');

    const expectedUsers = table('user')
      .columns({
        id: string(),
        name: string(),
      })
      .primaryKey('id');

    const expectedFriendship = table('friendship')
      .columns({
        requestingId: string().from('requesting_id'),
        acceptingId: string().from('accepting_id'),
        accepted: boolean(),
      })
      .primaryKey('requestingId', 'acceptingId');

    const expectedUsersRelationships = relationships(
      expectedUsers,
      ({many}) => ({
        friends: many(
          {
            sourceField: ['id'],
            destField: ['requestingId'],
            destSchema: expectedFriendship,
          },
          {
            sourceField: ['acceptingId'],
            destField: ['id'],
            destSchema: expectedUsers,
          },
        ),
      }),
    );

    const expected = createSchema({
      tables: [expectedUsers, expectedFriendship],
      relationships: [expectedUsersRelationships],
    });

    expectSchemaDeepEqual(manyToManySelfReferentialZeroSchema).toEqual(
      expected,
    );
  });

  test('relationships - one-to-many-casing', async () => {
    const {schema: oneToManyCasingZeroSchema} =
      await import('./schemas/one-to-many-casing.zero');

    const expectedUsers = table('users')
      .from('user')
      .columns({
        id: string(),
        name: string().optional(),
      })

      .primaryKey('id');

    const expectedComments = table('comments')
      .from('comment')
      .columns({
        id: string(),
        text: string().optional(),
        authorId: string().from('author_id').optional(),
        postId: string().from('post_id').optional(),
      })
      .primaryKey('id');

    const expectedPosts = table('posts')
      .from('post')
      .columns({
        id: string(),
        content: string().optional(),
        authorId: string().from('author_id').optional(),
      })
      .primaryKey('id');

    const expectedUsersRelationships = relationships(
      expectedUsers,
      ({many}) => ({
        posts: many({
          sourceField: ['id'],
          destField: ['authorId'],
          destSchema: expectedPosts,
        }),
      }),
    );

    const expectedCommentsRelationships = relationships(
      expectedComments,
      ({one}) => ({
        post: one({
          sourceField: ['postId'],
          destField: ['id'],
          destSchema: expectedPosts,
        }),
        author: one({
          sourceField: ['authorId'],
          destField: ['id'],
          destSchema: expectedUsers,
        }),
      }),
    );

    const expectedPostsRelationships = relationships(
      expectedPosts,
      ({one}) => ({
        author: one({
          sourceField: ['authorId'],
          destField: ['id'],
          destSchema: expectedUsers,
        }),
      }),
    );

    const expected = createSchema({
      tables: [expectedUsers, expectedPosts, expectedComments],
      relationships: [
        expectedUsersRelationships,
        expectedPostsRelationships,
        expectedCommentsRelationships,
      ],
    });

    expectSchemaDeepEqual(oneToManyCasingZeroSchema).toEqual(expected);
  });

  test('relationships - one-to-many-parent-child', async () => {
    const {schema: oneToManyParentChildZeroSchema} =
      await import('./schemas/one-to-many-parent-child.zero');

    const expectedFilters = table('filters')
      .from('filter')
      .columns({
        id: string(),
        name: string().optional(),
        parentId: string().from('parent_id').optional(),
      })
      .primaryKey('id');

    const expectedFiltersRelationships = relationships(
      expectedFilters,
      ({many, one}) => ({
        parent: one({
          sourceField: ['parentId'],
          destField: ['id'],
          destSchema: expectedFilters,
        }),
        children: many({
          sourceField: ['id'],
          destField: ['parentId'],
          destSchema: expectedFilters,
        }),
      }),
    );

    const expected = createSchema({
      tables: [expectedFilters],
      relationships: [expectedFiltersRelationships],
    });

    expectSchemaDeepEqual(oneToManyParentChildZeroSchema).toEqual(expected);
  });

  test('relationships - custom-schema', async () => {
    const {schema: customSchemaZeroSchema} =
      await import('./schemas/custom-schema.zero');

    const expectedUsers = table('users')
      .from('custom.user')
      .columns({
        id: string(),
        name: string().optional(),
        invitedBy: string().from('invited_by').optional(),
      })
      .primaryKey('id');

    const expectedUsersRelationships = relationships(
      expectedUsers,
      ({one}) => ({
        invitee: one({
          sourceField: ['invitedBy'],
          destField: ['id'],
          destSchema: expectedUsers,
        }),
      }),
    );

    const expected = createSchema({
      tables: [expectedUsers],
      relationships: [expectedUsersRelationships],
    });

    expectSchemaDeepEqual(customSchemaZeroSchema).toEqual(expected);
  });

  test('relationships - disambiguates same table name across schemas', async () => {
    const {schema: schemaCollisionZeroSchema} =
      await import('./schemas/postgres-schema-collision.zero');

    const expectedAuthUsers = table('authUsers')
      .from('auth.user')
      .columns({
        id: string(),
        name: string().optional(),
      })
      .primaryKey('id');

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
        authUserId: string().from('auth_user_id').optional(),
        userId: string().from('user_id').optional(),
      })
      .primaryKey('id');

    const expectedAuthUsersRelationships = relationships(
      expectedAuthUsers,
      ({many}) => ({
        groups: many({
          sourceField: ['id'],
          destField: ['authUserId'],
          destSchema: expectedGroups,
        }),
      }),
    );

    const expectedUsersRelationships = relationships(
      expectedUsers,
      ({many}) => ({
        groups: many({
          sourceField: ['id'],
          destField: ['userId'],
          destSchema: expectedGroups,
        }),
      }),
    );

    const expectedGroupsRelationships = relationships(
      expectedGroups,
      ({one}) => ({
        authUser: one({
          sourceField: ['authUserId'],
          destField: ['id'],
          destSchema: expectedAuthUsers,
        }),
        user: one({
          sourceField: ['userId'],
          destField: ['id'],
          destSchema: expectedUsers,
        }),
      }),
    );

    const expected = createSchema({
      tables: [expectedAuthUsers, expectedUsers, expectedGroups],
      relationships: [
        expectedAuthUsersRelationships,
        expectedUsersRelationships,
        expectedGroupsRelationships,
      ],
    });

    expectSchemaDeepEqual(schemaCollisionZeroSchema).toEqual(expected);
  });
});
