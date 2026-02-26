// pkg-04 / types-20  (seed 420) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord420 {
  a420: { x: number; y: string; z: boolean };
  b420: { p: string[]; q: Record<string, number> };
  c420: { nested: { deep: { deeper: { deepest: string } } } };
  d420: number;
  e420: string;
  f420: boolean;
  g420: null;
  h420: undefined;
  i420: bigint;
  j420: symbol;
}

type PartialBig420 = DeepPartial<BigRecord420>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten420<T> = T extends Array<infer U> ? Flatten420<U> : T;
type Nested420 = number[][][][][][][][][][];
type Flat420 = Flatten420<Nested420>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly420<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly420<T[K]> : T[K];
};
type DeepRequired420<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired420<T[K]> : T[K];
};
type FR420 = DeepReadonly420<DeepRequired420<PartialBig420>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion420 =
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

type ExtractAlpha420 = Extract<BigUnion420, "alpha" | "bravo" | "charlie">;
type ExcludeZulu420 = Exclude<BigUnion420, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA420 { width: number; height: number; depth: number }
interface ShapeB420 { color: string; opacity: number; blend: string }
interface ShapeC420 { x: number; y: number; z: number; w: number }
interface ShapeD420 { label: string; title: string; summary: string }

type Combined420 = ShapeA420 & ShapeB420 & ShapeC420 & ShapeD420;
type OptionalAll420 = { [K in keyof Combined420]?: Combined420[K] };
type RequiredAll420 = { [K in keyof Combined420]-?: Combined420[K] };
type ReadonlyAll420 = { readonly [K in keyof Combined420]: Combined420[K] };
type NullableAll420 = { [K in keyof Combined420]: Combined420[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString420<T> = T extends string ? true : false;
type IsNumber420<T> = T extends number ? true : false;
type TypeName420<T> = T extends string
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

type TypeNames420 = {
  [K in keyof BigRecord420]: TypeName420<BigRecord420[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb420 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource420 = "user" | "post" | "comment" | "tag" | "category";
type Action420 = `${Verb420}_${Resource420}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise420<T> = T extends Promise<infer U> ? UnwrapPromise420<U> : T;
type UnwrapArray420<T> = T extends (infer U)[] ? UnwrapArray420<U> : T;
type Head420<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail420<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation420<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation420<Exclude<T, K>>]
  : never;

type SmallUnion420 = "a" | "b" | "c" | "d";
type AllPerms420 = Permutation420<SmallUnion420>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig420,
  Flat420,
  FR420,
  BigUnion420,
  ExtractAlpha420,
  ExcludeZulu420,
  OptionalAll420,
  RequiredAll420,
  ReadonlyAll420,
  NullableAll420,
  TypeNames420,
  Action420,
  AllPerms420,
};
