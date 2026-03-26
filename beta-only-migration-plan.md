# Beta-Only Migration Plan

This is the working migration plan for moving `drizzle-zero` to `drizzle-orm@1.0.0-beta.x` only.

## Progress Checklist

- [x] Phase 1: Upgrade dependencies and establish the breaking release target
- [x] Phase 2: Replace column compatibility logic with beta-aware helpers
- [ ] Phase 3: Rewrite type-level column mapping around beta `Column['_']` metadata
- [ ] Phase 4: Update runtime table generation to use the new beta helpers
- [ ] Phase 5: Rewrite relation discovery and normalization for beta `defineRelations(...)` / `defineRelationsPart(...)`
- [ ] Phase 6: Migrate unit fixtures and relation tests to beta syntax
- [ ] Phase 7: Migrate integration schemas and generated outputs to beta syntax
- [ ] Phase 8: Update docs and migration messaging
- [ ] Phase 9: Run verification, fix regressions, and prepare release

## Target Outcome

- `drizzle-zero` supports `drizzle-orm@>=1.0.0-beta.19 <2` only.
- Legacy `relations(...)` schemas are no longer supported.
- Beta `defineRelations(...)` and `defineRelationsPart(...)` are the only supported relation inputs.
- Beta `through(...)` is the canonical many-to-many source.
- `manyToMany` config remains temporarily, but only as a deprecated fallback path.
- Beta arrays always map to Zero `json`.
- Existing logical type behavior for JSON, branded/custom strings, enums, timestamps, time fields, and explicit overrides remains intact.

## Phase 1 - Dependencies And Release Target

Checklist:

- [x] Update package versions and peer ranges
- [x] Refresh lockfile
- [x] Set the breaking release version target

Details:

- Update the root `package.json` peer dependency to `"drizzle-orm": ">=1.0.0-beta.19 <2"`.
- Update the root dev dependency to `drizzle-orm@1.0.0-beta.19`.
- Update workspace packages that depend on Drizzle, especially `db/package.json`.
- Update `drizzle-kit` to the matching beta line anywhere we keep it, so the repo is internally consistent.
- Decide the next `drizzle-zero` version as either a prerelease or another clearly breaking line.

Done:

- Set `drizzle-zero` to `0.19.0-beta.0` for the migration line.
- Pinned repo Drizzle dependencies to `1.0.0-beta.19` and refreshed `pnpm-lock.yaml`.

## Phase 2 - Column Compatibility Helpers

Checklist:

- [x] Rewrite `src/drizzle-to-zero.ts`
- [x] Add beta-aware runtime helper functions
- [x] Encode the new Zero type resolution order

Details:

- Replace the current narrow mappings in `src/drizzle-to-zero.ts` with helpers that understand beta extended `dataType` strings.
- Add a helper to normalize `dataType` values so runtime logic can reason about beta strings like `string timestamp`, `object json`, `string enum`, `bigint int64`, and array-like variants.
- Add a runtime array detector that handles beta array cases correctly:
  - PostgreSQL array columns via `dimensions`
  - Cockroach/Gel-style array wrappers via `baseColumn`
  - any special array-like extended `dataType` strings
- Add a single runtime Zero type resolver with this precedence:
  1. array detection
  2. enum detection for non-arrays
  3. `columnType`
  4. normalized `dataType`
  5. `getSQLType()` fallback
- Ensure beta arrays always resolve to Zero `json` even if the base element type is numeric, enum, UUID, or JSON.

Done:

- Rewrote `src/drizzle-to-zero.ts` around beta-aware runtime parsing, conservative data-type normalization, array detection, and one exported Zero type resolver.
- Added focused helper coverage in `tests/drizzle-to-zero.test.ts` for normalization, `dimensions`, `baseColumn`, enum-array precedence, SQL fallback, and unsupported tuple-style array-like types.
- Verified the new helper tests with `pnpm vitest run --typecheck.enabled false tests/drizzle-to-zero.test.ts`.

## Phase 3 - Type-Level Column Mapping

Checklist:

- [ ] Add shared metadata helpers in `src/types.ts`
- [ ] Remove dependence on legacy internal fields
- [ ] Preserve current custom-type behavior under beta

Details:

- Rework `src/types.ts` so the type-level path is based on beta `Column['_']` metadata.
- Rely on these fields for type mapping:
  - `Column['_']['data']`
  - `Column['_']['dataType']`
  - `Column['_']['enumValues']`
  - `Column['_']['isPrimaryKey']`
- Stop relying on old assumptions around:
  - `Column['_']['columnType']`
  - `Column['_']['$type']`
- Rewrite custom-type extraction so built columns infer from `['_']['data']`, not from old builder internals.
- Preserve behavior for:
  - JSON `$type`
  - branded text/string types
  - enum unions
  - array custom types
  - timestamp/time columns mapping to Zero `number`
  - explicit timestamp overrides that should win over the default mapping

## Phase 4 - Runtime Table Generation

Checklist:

- [ ] Update `src/tables.ts` to use the new helpers
- [ ] Keep existing table-shaping behavior stable
- [ ] Add or update beta-focused table/type tests

Details:

- Route runtime column mapping in `src/tables.ts` through the new beta compatibility helpers.
- Keep existing behavior unchanged for:
  - primary key inclusion
  - primary key optionality rules
  - default value warnings
  - not-null/optional handling
  - casing and `.from(...)` name mapping
- Update tests to cover beta behavior specifically for:
  - arrays, including nested arrays and enum arrays
  - custom text/branded types
  - JSON and JSON `$type`
  - enums
  - timestamp/time/date behavior
  - explicit overrides

## Phase 5 - Relation Engine Rewrite

Checklist:

- [ ] Rewrite `src/relations.ts` to be beta-only for relation discovery
- [ ] Normalize beta relations into a shared hop-based IR
- [ ] Keep `manyToMany` only as a deprecated fallback path

Details:

- Remove all legacy relation support in `src/relations.ts`:
  - old wrapper detection
  - old `Relations` / `One` / `Many` scanning logic
  - reverse inference that tries to recover missing foreign keys from old relation wrappers
- Discover beta relation exports by detecting values that match the runtime shape:
  - `{ table, name, relations }`
- Support both beta entry points:
  - `defineRelations(...)`
  - `defineRelationsPart(...)`
- Normalize all discovered beta relations into one internal representation:
  - direct `one` / `many` relations become one hop
  - `through(...)` relations become two hops
- Build Zero relationships from that normalized representation rather than branching heavily by source style.
- Route deprecated explicit `manyToMany` config into the same normalized representation so it does not introduce a separate behavior model.
- Keep conflict detection strict and deterministic for:
  - duplicate relationship names
  - relation names that collide with selected columns
  - ambiguous or conflicting relation definitions
- Preserve stable table key resolution, especially for schema-qualified tables and same-name tables across schemas.

## Phase 6 - Unit Tests And Fixtures

Checklist:

- [ ] Rewrite relation fixtures under `tests/schemas/`
- [ ] Remove legacy-only compatibility tests
- [ ] Add beta-focused coverage for direct and `through(...)` relations

Details:

- Rewrite relation schema fixtures to use beta relation syntax only.
- Keep the same logical coverage where it still matters, but stop testing old `relations(...)` exports.
- Remove tests that exist only to validate legacy reverse-scanning behavior.
- Make sure the beta test matrix covers:
  - tables only
  - one-to-many
  - named dual relations via `alias`
  - self relations
  - schema-qualified tables
  - one-hop relations
  - two-hop relations
  - `through(...)` many-to-many
  - self-referential `through(...)`
  - relation name conflicts
  - arrays and custom types under beta column metadata

## Phase 7 - Integration Migration

Checklist:

- [ ] Migrate `db/drizzle/schema.ts` to beta relation exports
- [ ] Migrate `integration/` to beta-only relation inputs
- [ ] Migrate `no-config-integration/` to beta-only relation inputs

Details:

- Rewrite `db/drizzle/schema.ts` so its relation exports use beta syntax instead of `relations(...)`.
- Update `integration/drizzle-zero.config.ts` so new many-to-many behavior comes from beta `through(...)` instead of expanding `manyToMany` usage.
- Keep at least one deprecated `manyToMany` path covered if we still want temporary compatibility.
- Regenerate `integration/zero-schema.gen.ts` and `no-config-integration/zero-schema.gen.ts` after the migration.
- Run the existing integration query suites and confirm the generated relationship names and shapes still match expected usage.

## Phase 8 - Docs And Migration Messaging

Checklist:

- [ ] Rewrite `README.md` examples to beta syntax only
- [ ] Document dropped legacy support and deprecated `manyToMany`
- [ ] Add a migration section for users

Details:

- Update all README examples to beta Drizzle relation syntax.
- State clearly that legacy `relations(...)` exports are no longer supported.
- State clearly that `manyToMany` is deprecated and beta `through(...)` is preferred.
- Add migration guidance mapping old concepts to new ones:
  - legacy `relations(...)` -> beta `defineRelations(...)` / `defineRelationsPart(...)`
  - explicit many-to-many config -> beta `through(...)`
- Include the user-facing upgrade order: upgrade to Drizzle beta first, then upgrade `drizzle-zero`.

## Phase 9 - Verification And Release Readiness

Checklist:

- [ ] Run the repo test and typecheck flows
- [ ] Search for remaining legacy relation API usage
- [ ] Confirm acceptance criteria before release

Details:

- Run at minimum:
  - `pnpm check-types`
  - `pnpm test`
  - integration generation/build/test flows
  - no-config integration generation/build/test flows
- Search the repo for remaining legacy relation APIs and examples.
- Confirm all acceptance criteria:
  - installs against `drizzle-orm@1.0.0-beta.19`
  - no source file imports old-only relation APIs
  - beta relation exports are discovered automatically
  - beta `through(...)` generates correct two-hop Zero relationships
  - beta arrays map to Zero `json`
  - logical type behavior is preserved under beta
  - README and integration examples are beta-only

## Main Risks To Watch

- Same table name across multiple Postgres schemas still needs deterministic resolution.
- Self-relations and aliased dual relations are easy to break if normalization is too aggressive.
- Subset table configs must continue to skip relationships safely when one side is excluded.
- Composite key relations must preserve field ordering exactly.
- Deprecated `manyToMany` must not diverge from the beta normalization path.

## Suggested Execution Order

1. Upgrade dependencies.
2. Add beta column helpers.
3. Rewrite type-level column mapping.
4. Refactor runtime table mapping.
5. Rewrite the relation engine.
6. Rewrite unit fixtures and tests.
7. Migrate integration schemas and regenerate outputs.
8. Update docs.
9. Run full verification and fix regressions.

## Notes

- Use this file for phase-level progress, not micro-step tracking.
- If a phase reveals unexpected scope, add a short note under that phase rather than exploding the checklist again.
