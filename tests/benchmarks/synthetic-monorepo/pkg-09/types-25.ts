// pkg-09 / types-25  (seed 925) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord925 {
  a925: { x: number; y: string; z: boolean };
  b925: { p: string[]; q: Record<string, number> };
  c925: { nested: { deep: { deeper: { deepest: string } } } };
  d925: number;
  e925: string;
  f925: boolean;
  g925: null;
  h925: undefined;
  i925: bigint;
  j925: symbol;
}

type PartialBig925 = DeepPartial<BigRecord925>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten925<T> = T extends Array<infer U> ? Flatten925<U> : T;
type Nested925 = number[][][][][][][][][][];
type Flat925 = Flatten925<Nested925>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly925<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly925<T[K]> : T[K];
};
type DeepRequired925<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired925<T[K]> : T[K];
};
type FR925 = DeepReadonly925<DeepRequired925<PartialBig925>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion925 =
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

type ExtractAlpha925 = Extract<BigUnion925, "alpha" | "bravo" | "charlie">;
type ExcludeZulu925 = Exclude<BigUnion925, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA925 { width: number; height: number; depth: number }
interface ShapeB925 { color: string; opacity: number; blend: string }
interface ShapeC925 { x: number; y: number; z: number; w: number }
interface ShapeD925 { label: string; title: string; summary: string }

type Combined925 = ShapeA925 & ShapeB925 & ShapeC925 & ShapeD925;
type OptionalAll925 = { [K in keyof Combined925]?: Combined925[K] };
type RequiredAll925 = { [K in keyof Combined925]-?: Combined925[K] };
type ReadonlyAll925 = { readonly [K in keyof Combined925]: Combined925[K] };
type NullableAll925 = { [K in keyof Combined925]: Combined925[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString925<T> = T extends string ? true : false;
type IsNumber925<T> = T extends number ? true : false;
type TypeName925<T> = T extends string
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

type TypeNames925 = {
  [K in keyof BigRecord925]: TypeName925<BigRecord925[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb925 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource925 = "user" | "post" | "comment" | "tag" | "category";
type Action925 = `${Verb925}_${Resource925}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise925<T> = T extends Promise<infer U> ? UnwrapPromise925<U> : T;
type UnwrapArray925<T> = T extends (infer U)[] ? UnwrapArray925<U> : T;
type Head925<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail925<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation925<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation925<Exclude<T, K>>]
  : never;

type SmallUnion925 = "a" | "b" | "c" | "d";
type AllPerms925 = Permutation925<SmallUnion925>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig925,
  Flat925,
  FR925,
  BigUnion925,
  ExtractAlpha925,
  ExcludeZulu925,
  OptionalAll925,
  RequiredAll925,
  ReadonlyAll925,
  NullableAll925,
  TypeNames925,
  Action925,
  AllPerms925,
};
