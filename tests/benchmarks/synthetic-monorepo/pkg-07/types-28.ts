// pkg-07 / types-28  (seed 728) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord728 {
  a728: { x: number; y: string; z: boolean };
  b728: { p: string[]; q: Record<string, number> };
  c728: { nested: { deep: { deeper: { deepest: string } } } };
  d728: number;
  e728: string;
  f728: boolean;
  g728: null;
  h728: undefined;
  i728: bigint;
  j728: symbol;
}

type PartialBig728 = DeepPartial<BigRecord728>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten728<T> = T extends Array<infer U> ? Flatten728<U> : T;
type Nested728 = number[][][][][][][][][][];
type Flat728 = Flatten728<Nested728>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly728<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly728<T[K]> : T[K];
};
type DeepRequired728<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired728<T[K]> : T[K];
};
type FR728 = DeepReadonly728<DeepRequired728<PartialBig728>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion728 =
  | "alpha" | "bravo" | "charlie" | "delta" | "echo"
  | "foxtrot" | "golf" | "hotel" | "india" | "juliet"
  | "kilo" | "lima" | "mike" | "november" | "oscar"
  | "papa" | "quebec" | "romeo" | "sierra" | "tango"
  | "uniform" | "victor" | "whiskey" | "xray" | "yankee"
  | "zulu" | "one" | "two" | "three" | "four"
  | "five" | "six" | "seven" | "eight" | "nine"
  | "ten" | "eleven" | "twelve" | "thirteen" | "fourteen"
  | "fifteen" | "sixteen" | "seventeen" | "eighteen" | "nineteen"
  | "twenty" | "twentyone" | "twentytwo" | "twentythree" | "twentyfour"
  | "twentyfive";

type ExtractAlpha728 = Extract<BigUnion728, "alpha" | "bravo" | "charlie">;
type ExcludeZulu728 = Exclude<BigUnion728, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA728 { width: number; height: number; depth: number }
interface ShapeB728 { color: string; opacity: number; blend: string }
interface ShapeC728 { x: number; y: number; z: number; w: number }
interface ShapeD728 { label: string; title: string; summary: string }

type Combined728 = ShapeA728 & ShapeB728 & ShapeC728 & ShapeD728;
type OptionalAll728 = { [K in keyof Combined728]?: Combined728[K] };
type RequiredAll728 = { [K in keyof Combined728]-?: Combined728[K] };
type ReadonlyAll728 = { readonly [K in keyof Combined728]: Combined728[K] };
type NullableAll728 = { [K in keyof Combined728]: Combined728[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString728<T> = T extends string ? true : false;
type IsNumber728<T> = T extends number ? true : false;
type TypeName728<T> = T extends string
  ? "string"
  : T extends number
  ? "number"
  : T extends boolean
  ? "boolean"
  : T extends null
  ? "null"
  : T extends undefined
  ? "undefined"
  : T extends symbol
  ? "symbol"
  : T extends bigint
  ? "bigint"
  : "object";

type TypeNames728 = {
  [K in keyof BigRecord728]: TypeName728<BigRecord728[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb728 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource728 = "user" | "post" | "comment" | "tag" | "category";
type Action728 = `${Verb728}_${Resource728}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise728<T> = T extends Promise<infer U> ? UnwrapPromise728<U> : T;
type UnwrapArray728<T> = T extends (infer U)[] ? UnwrapArray728<U> : T;
type Head728<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail728<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation728<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation728<Exclude<T, K>>]
  : never;

type SmallUnion728 = "a" | "b" | "c" | "d";
type AllPerms728 = Permutation728<SmallUnion728>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig728,
  Flat728,
  FR728,
  BigUnion728,
  ExtractAlpha728,
  ExcludeZulu728,
  OptionalAll728,
  RequiredAll728,
  ReadonlyAll728,
  NullableAll728,
  TypeNames728,
  Action728,
  AllPerms728,
};
