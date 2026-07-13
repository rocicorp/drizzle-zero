import {defineRelations} from 'drizzle-orm/relations';
import {pgTable, text} from 'drizzle-orm/pg-core';

export const filters = pgTable('filter', {
  id: text('id').primaryKey(),
  name: text('name'),
  parentId: text('parent_id'),
});

export const schemaRelations = defineRelations({filters}, r => ({
  filters: {
    parent: r.one.filters({
      from: r.filters.parentId,
      to: r.filters.id,
    }),
    children: r.many.filters(),
  },
}));
