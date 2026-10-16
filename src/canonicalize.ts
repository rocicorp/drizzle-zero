/**
 * Orders the parts of a Zero schema that carry no meaning so that generating
 * from an unchanged Drizzle schema always produces the same output.
 *
 * Nothing downstream reads these key orders: `normalizeClientSchema` sorts
 * tables and columns before hashing the client schema, and every other
 * consumer looks entries up by name. Without this pass the orders are simply
 * whatever order the schema happened to be written in, so moving a table
 * between two exports or a column between two lines rewrote the generated
 * file for no reason.
 *
 * Ordering that *does* carry meaning is left alone: a table's `primaryKey`,
 * the hops of a relationship, and the parallel `sourceField`/`destField`
 * arrays inside a hop, which pair up by position.
 */

/** Code-unit order, so the result never depends on the host locale. */
export const compareKeys = (a: string, b: string): number =>
  a < b ? -1 : a > b ? 1 : 0;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const sortKeys = <T>(value: Record<string, T>): Record<string, T> =>
  Object.fromEntries(
    Object.entries(value).sort(([a], [b]) => compareKeys(a, b)),
  );

const canonicalizeTable = (table: unknown): unknown => {
  if (!isRecord(table) || !isRecord(table.columns)) {
    return table;
  }

  return {...table, columns: sortKeys(table.columns)};
};

/**
 * Sorts a schema's tables, columns, relationship owners and relationship
 * names. Idempotent, so it is safe to apply again on the way into codegen.
 */
export function canonicalizeZeroSchema<TSchema>(schema: TSchema): TSchema {
  if (!isRecord(schema)) {
    return schema;
  }

  const canonical: Record<string, unknown> = {...schema};

  if (isRecord(schema.tables)) {
    canonical.tables = sortKeys(
      Object.fromEntries(
        Object.entries(schema.tables).map(([name, table]) => [
          name,
          canonicalizeTable(table),
        ]),
      ),
    );
  }

  if (isRecord(schema.relationships)) {
    canonical.relationships = sortKeys(
      Object.fromEntries(
        Object.entries(schema.relationships).map(([name, relationships]) => [
          name,
          isRecord(relationships) ? sortKeys(relationships) : relationships,
        ]),
      ),
    );
  }

  return canonical as TSchema;
}
