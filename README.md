# drizzle-zero

Generate [Zero](https://zero.rocicorp.dev/) schemas from [Drizzle ORM](https://orm.drizzle.team) schemas.

## Installation

`drizzle-zero` now targets Drizzle beta relations only.

```bash
npm install drizzle-zero drizzle-orm@beta
# or
bun add drizzle-zero drizzle-orm@beta
# or
yarn add drizzle-zero drizzle-orm@beta
# or
pnpm add drizzle-zero drizzle-orm@beta
```

## Usage

Here is a beta Drizzle example with bidirectional relationships:

### Define Drizzle schema

```ts
import {defineRelations} from 'drizzle-orm/relations';
import {jsonb, pgTable, text} from 'drizzle-orm/pg-core';

export const users = pgTable('user', {
  id: text('id').primaryKey(),
  name: text('name'),
  email: text('email').$type<`${string}@${string}`>().notNull(),
});

export const posts = pgTable('post', {
  id: text('id').primaryKey(),
  content: jsonb('content').$type<{textValue: string}>().notNull(),
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
```

> Legacy Drizzle `relations(...)` exports are not supported.

See `db/drizzle/schema.ts` for a larger beta-only example.

### Add schema generation script

```json
{
  "scripts": {
    "generate": "drizzle-zero generate --format",
    "postinstall": "npm run generate"
  }
}
```

This command looks for `drizzle.config.ts` in the current directory and uses the Drizzle schema defined there. The schema entry must resolve to a single TypeScript file so type resolution works correctly.

You can override that behavior with:

- `-s, --schema <input-file>` for the Drizzle schema file
- `-k, --drizzle-kit-config <input-file>` for the Drizzle Kit config file
- `-o, --output <output-file>` for the generated Zero schema path
- `-t, --tsconfig <tsconfig-file>` for a custom tsconfig path

By default, output goes to `zero-schema.gen.ts`.

If Prettier is installed, you can format the generated output with `-f, --format`.

The CLI automatically detects whether `.js` file extensions are needed in imports from your tsconfig `moduleResolution`. You can override that behavior with `-j, --js-file-extension` if needed.

Optional generator flags:

- `--skip-types`: skip generating table `Row[]` type exports
- `--skip-builder`: skip generating the query `createBuilder` export
- `--skip-declare`: skip generating the Zero module augmentation
- `--enable-legacy-mutators`: set `enableLegacyMutators` on the generated schema
- `--enable-legacy-queries`: set `enableLegacyQueries` on the generated schema
- `--suppress-defaults-warning`: hide warnings for database defaults that Zero clients cannot use directly

For more information on disabling legacy mutators and queries, see the [Zero documentation](https://zero.rocicorp.dev/docs/custom-mutators#disabling-crud-mutators).

**Important:** your Drizzle schema must be included in your tsconfig for type resolution to work.

Please reference the Zero docs for how to use your generated schema: [https://zero.rocicorp.dev/docs/reading-data](https://zero.rocicorp.dev/docs/reading-data).

## Customize with `drizzle-zero.config.ts`

You can optionally create `drizzle-zero.config.ts` to control which tables and columns are synced:

> **Important:** the config file currently struggles with types for very large schemas. In those cases, prefer the default CLI behavior.

```ts
import {drizzleZeroConfig} from 'drizzle-zero';
import * as drizzleSchema from './drizzle-schema';

export default drizzleZeroConfig(drizzleSchema, {
  tables: {
    users: {
      id: true,
      name: true,
      email: true,
    },
    posts: {
      id: true,
      content: true,
      authorId: true,
    },
  },

  // Optional casing override.
  // casing: 'snake_case',
});
```

The imported Drizzle schema must include your beta relation exports too.

You can customize the config file path with `-c, --config <input-file>`.

**Important:** `drizzle-zero.config.ts` must also be included in your tsconfig for type resolution to work.

## Many-to-Many with `through(...)`

`drizzle-zero` now pulls many-to-many relationships directly from beta Drizzle relations. Do not configure them with the legacy `manyToMany` config.

```ts
import {defineRelations} from 'drizzle-orm/relations';
import {pgTable, primaryKey, text} from 'drizzle-orm/pg-core';

export const users = pgTable('user', {
  id: text('id').primaryKey(),
  name: text('name'),
});

export const groups = pgTable('group', {
  id: text('id').primaryKey(),
  name: text('name'),
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

export const schemaRelations = defineRelations(
  {users, groups, usersToGroups},
  r => ({
    users: {
      usersToGroups: r.many.usersToGroups(),
      groups: r.many.groups({
        from: r.users.id.through(r.usersToGroups.userId),
        to: r.groups.id.through(r.usersToGroups.groupId),
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
    groups: {
      usersToGroups: r.many.usersToGroups(),
    },
  }),
);
```

Then query as usual, skipping the junction table in your Zero query:

```tsx
const userQuery = syncedQuery(
  z.query.user.where('id', '=', '1').related('groups').one(),
);

const [user] = useQuery(userQuery());
```

## Large Schemas

For large schemas, split relation exports with `defineRelationsPart(...)` and export all parts from the same schema module. `drizzle-zero` will merge them during discovery.

## v1 Migration Notes

Upgrade order:

1. Upgrade `drizzle-orm` to the npm `beta` tag or another version in the supported beta range.
2. Upgrade `drizzle-zero` to the matching beta-only release line.
3. Replace legacy `relations(...)` exports with beta `defineRelations(...)` or `defineRelationsPart(...)`.
4. Replace old `manyToMany` config with beta `through(...)` relations in the Drizzle schema itself.

Concept mapping:

- legacy `relations(...)` -> beta `defineRelations(...)` / `defineRelationsPart(...)`
- config `manyToMany` -> beta `through(...)`
- reverse-inferred many-to-many edges -> explicit beta hop definitions via `through(...)`

Dropped support:

- legacy Drizzle `relations(...)`
- `manyToMany` config in `drizzleZeroConfig(...)`

## Features

- Output static schemas from the CLI
- Convert Drizzle ORM schemas to Zero schemas
- Sync a subset of tables and columns
- Handle Drizzle column types supported by Zero
- Preserve custom column types in generated output
- Support beta Drizzle relationships:
  - one-to-one
  - one-to-many
  - many-to-many via `through(...)`
  - self-referential relationships
  - split relation definitions via `defineRelationsPart(...)`
- Handle custom schemas and column mappings
