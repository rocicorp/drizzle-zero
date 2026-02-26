// pkg-01 / types-22  (seed 122) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord122 {
  a122: { x: number; y: string; z: boolean };
  b122: { p: string[]; q: Record<string, number> };
  c122: { nested: { deep: { deeper: { deepest: string } } } };
  d122: number;
  e122: string;
  f122: boolean;
  g122: null;
  h122: undefined;
  i122: bigint;
  j122: symbol;
}

type PartialBig122 = DeepPartial<BigRecord122>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten122<T> = T extends Array<infer U> ? Flatten122<U> : T;
type Nested122 = number[][][][][][][][][][];
type Flat122 = Flatten122<Nested122>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly122<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly122<T[K]> : T[K];
};
type DeepRequired122<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired122<T[K]> : T[K];
};
type FR122 = DeepReadonly122<DeepRequired122<PartialBig122>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion122 =
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

type ExtractAlpha122 = Extract<BigUnion122, "alpha" | "bravo" | "charlie">;
type ExcludeZulu122 = Exclude<BigUnion122, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA122 { width: number; height: number; depth: number }
interface ShapeB122 { color: string; opacity: number; blend: string }
interface ShapeC122 { x: number; y: number; z: number; w: number }
interface ShapeD122 { label: string; title: string; summary: string }

type Combined122 = ShapeA122 & ShapeB122 & ShapeC122 & ShapeD122;
type OptionalAll122 = { [K in keyof Combined122]?: Combined122[K] };
type RequiredAll122 = { [K in keyof Combined122]-?: Combined122[K] };
type ReadonlyAll122 = { readonly [K in keyof Combined122]: Combined122[K] };
type NullableAll122 = { [K in keyof Combined122]: Combined122[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString122<T> = T extends string ? true : false;
type IsNumber122<T> = T extends number ? true : false;
type TypeName122<T> = T extends string
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

type TypeNames122 = {
  [K in keyof BigRecord122]: TypeName122<BigRecord122[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb122 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource122 = "user" | "post" | "comment" | "tag" | "category";
type Action122 = `${Verb122}_${Resource122}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise122<T> = T extends Promise<infer U> ? UnwrapPromise122<U> : T;
type UnwrapArray122<T> = T extends (infer U)[] ? UnwrapArray122<U> : T;
type Head122<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail122<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation122<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation122<Exclude<T, K>>]
  : never;

type SmallUnion122 = "a" | "b" | "c" | "d";
type AllPerms122 = Permutation122<SmallUnion122>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig122,
  Flat122,
  FR122,
  BigUnion122,
  ExtractAlpha122,
  ExcludeZulu122,
  OptionalAll122,
  RequiredAll122,
  ReadonlyAll122,
  NullableAll122,
  TypeNames122,
  Action122,
  AllPerms122,
};
