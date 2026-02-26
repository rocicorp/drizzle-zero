// pkg-09 / types-46  (seed 946) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord946 {
  a946: { x: number; y: string; z: boolean };
  b946: { p: string[]; q: Record<string, number> };
  c946: { nested: { deep: { deeper: { deepest: string } } } };
  d946: number;
  e946: string;
  f946: boolean;
  g946: null;
  h946: undefined;
  i946: bigint;
  j946: symbol;
}

type PartialBig946 = DeepPartial<BigRecord946>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten946<T> = T extends Array<infer U> ? Flatten946<U> : T;
type Nested946 = number[][][][][][][][][][];
type Flat946 = Flatten946<Nested946>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly946<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly946<T[K]> : T[K];
};
type DeepRequired946<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired946<T[K]> : T[K];
};
type FR946 = DeepReadonly946<DeepRequired946<PartialBig946>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion946 =
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

type ExtractAlpha946 = Extract<BigUnion946, "alpha" | "bravo" | "charlie">;
type ExcludeZulu946 = Exclude<BigUnion946, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA946 { width: number; height: number; depth: number }
interface ShapeB946 { color: string; opacity: number; blend: string }
interface ShapeC946 { x: number; y: number; z: number; w: number }
interface ShapeD946 { label: string; title: string; summary: string }

type Combined946 = ShapeA946 & ShapeB946 & ShapeC946 & ShapeD946;
type OptionalAll946 = { [K in keyof Combined946]?: Combined946[K] };
type RequiredAll946 = { [K in keyof Combined946]-?: Combined946[K] };
type ReadonlyAll946 = { readonly [K in keyof Combined946]: Combined946[K] };
type NullableAll946 = { [K in keyof Combined946]: Combined946[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString946<T> = T extends string ? true : false;
type IsNumber946<T> = T extends number ? true : false;
type TypeName946<T> = T extends string
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

type TypeNames946 = {
  [K in keyof BigRecord946]: TypeName946<BigRecord946[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb946 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource946 = "user" | "post" | "comment" | "tag" | "category";
type Action946 = `${Verb946}_${Resource946}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise946<T> = T extends Promise<infer U> ? UnwrapPromise946<U> : T;
type UnwrapArray946<T> = T extends (infer U)[] ? UnwrapArray946<U> : T;
type Head946<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail946<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation946<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation946<Exclude<T, K>>]
  : never;

type SmallUnion946 = "a" | "b" | "c" | "d";
type AllPerms946 = Permutation946<SmallUnion946>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig946,
  Flat946,
  FR946,
  BigUnion946,
  ExtractAlpha946,
  ExcludeZulu946,
  OptionalAll946,
  RequiredAll946,
  ReadonlyAll946,
  NullableAll946,
  TypeNames946,
  Action946,
  AllPerms946,
};
