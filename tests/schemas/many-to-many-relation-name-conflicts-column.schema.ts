import {defineRelations} from 'drizzle-orm/relations';
import {pgTable, primaryKey, text} from 'drizzle-orm/pg-core';

export const users = pgTable('user', {
  id: text('id').primaryKey(),
  name: text('name'),
  groups: text('groups'),
});

export const usersToGroups = pgTable(
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

export const groups = pgTable('group', {
  id: text('id').primaryKey(),
  name: text('name'),
});

export const schemaRelations = defineRelations(
  {users, usersToGroups, groups},
  r => ({
    users: {
      usersToGroups: r.many.usersToGroups(),
      groups: r.many.groups({
        from: r.users.id.through(r.usersToGroups.userId),
        to: r.groups.id.through(r.usersToGroups.groupId),
      }),
    },
    usersToGroups: {
      group: r.one.groups({
        from: r.usersToGroups.groupId,
        to: r.groups.id,
        optional: false,
      }),
      user: r.one.users({
        from: r.usersToGroups.userId,
        to: r.users.id,
        optional: false,
      }),
    },
    groups: {
      usersToGroups: r.many.usersToGroups(),
    },
  }),
);
