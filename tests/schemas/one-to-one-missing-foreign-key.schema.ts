import {defineRelations} from 'drizzle-orm/relations';
import {pgTable, text} from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: text('id').primaryKey(),
  name: text('name'),
});

export const posts = pgTable('posts', {
  id: text('id').primaryKey(),
  name: text('name'),
  author: text('author').notNull(),
});

export const schemaRelations = defineRelations({users, posts}, r => ({
  users: {
    userPosts: r.one.posts(),
  },
  posts: {
    postAuthor: r.one.users({
      from: r.posts.author,
      to: r.users.id,
      optional: false,
    }),
  },
}));
