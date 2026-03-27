import {defineRelations} from 'drizzle-orm/relations';
import {pgTable, text} from 'drizzle-orm/pg-core';

export const users = pgTable('user', {
  id: text('id').primaryKey(),
  name: text('name'),
  posts: text('posts'),
});

export const posts = pgTable('post', {
  id: text('id').primaryKey(),
  content: text('content'),
  authorId: text('author_id').references(() => users.id),
});

export const schemaRelations = defineRelations({users, posts}, r => ({
  users: {
    posts: r.many.posts(),
  },
  posts: {
    author: r.one.users({
      from: r.posts.authorId,
      to: r.users.id,
    }),
  },
}));
