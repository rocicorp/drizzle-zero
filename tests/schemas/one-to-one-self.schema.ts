import {defineRelations} from 'drizzle-orm/relations';
import {pgTable, text} from 'drizzle-orm/pg-core';

export const users = pgTable('user', {
  id: text('id').primaryKey(),
  name: text('name'),
  invitedBy: text('invited_by'),
});

export const schemaRelations = defineRelations({users}, r => ({
  users: {
    invitee: r.one.users({
      from: r.users.invitedBy,
      to: r.users.id,
    }),
  },
}));
