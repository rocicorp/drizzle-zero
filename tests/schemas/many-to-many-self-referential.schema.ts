import {defineRelations} from 'drizzle-orm/relations';
import {boolean, pgTable, primaryKey, text} from 'drizzle-orm/pg-core';

export const user = pgTable('user', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
});

export const friendship = pgTable(
  'friendship',
  {
    requestingId: text('requesting_id')
      .notNull()
      .references(() => user.id),
    acceptingId: text('accepting_id')
      .notNull()
      .references(() => user.id),
    accepted: boolean('accepted').notNull(),
  },
  t => [primaryKey({columns: [t.requestingId, t.acceptingId]})],
);

export const schemaRelations = defineRelations({user, friendship}, r => ({
  user: {
    friends: r.many.user({
      from: r.user.id.through(r.friendship.requestingId),
      to: r.user.id.through(r.friendship.acceptingId),
    }),
  },
}));
