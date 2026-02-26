// pkg-03 / types-04  (seed 304) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord304 {
  a304: { x: number; y: string; z: boolean };
  b304: { p: string[]; q: Record<string, number> };
  c304: { nested: { deep: { deeper: { deepest: string } } } };
  d304: number;
  e304: string;
  f304: boolean;
  g304: null;
  h304: undefined;
  i304: bigint;
  j304: symbol;
}

type PartialBig304 = DeepPartial<BigRecord304>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten304<T> = T extends Array<infer U> ? Flatten304<U> : T;
type Nested304 = number[][][][][][][][][][];
type Flat304 = Flatten304<Nested304>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly304<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly304<T[K]> : T[K];
};
type DeepRequired304<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired304<T[K]> : T[K];
};
type FR304 = DeepReadonly304<DeepRequired304<PartialBig304>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion304 =
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

type ExtractAlpha304 = Extract<BigUnion304, "alpha" | "bravo" | "charlie">;
type ExcludeZulu304 = Exclude<BigUnion304, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA304 { width: number; height: number; depth: number }
interface ShapeB304 { color: string; opacity: number; blend: string }
interface ShapeC304 { x: number; y: number; z: number; w: number }
interface ShapeD304 { label: string; title: string; summary: string }

type Combined304 = ShapeA304 & ShapeB304 & ShapeC304 & ShapeD304;
type OptionalAll304 = { [K in keyof Combined304]?: Combined304[K] };
type RequiredAll304 = { [K in keyof Combined304]-?: Combined304[K] };
type ReadonlyAll304 = { readonly [K in keyof Combined304]: Combined304[K] };
type NullableAll304 = { [K in keyof Combined304]: Combined304[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString304<T> = T extends string ? true : false;
type IsNumber304<T> = T extends number ? true : false;
type TypeName304<T> = T extends string
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

type TypeNames304 = {
  [K in keyof BigRecord304]: TypeName304<BigRecord304[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb304 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource304 = "user" | "post" | "comment" | "tag" | "category";
type Action304 = `${Verb304}_${Resource304}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise304<T> = T extends Promise<infer U> ? UnwrapPromise304<U> : T;
type UnwrapArray304<T> = T extends (infer U)[] ? UnwrapArray304<U> : T;
type Head304<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail304<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation304<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation304<Exclude<T, K>>]
  : never;

type SmallUnion304 = "a" | "b" | "c" | "d";
type AllPerms304 = Permutation304<SmallUnion304>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig304,
  Flat304,
  FR304,
  BigUnion304,
  ExtractAlpha304,
  ExcludeZulu304,
  OptionalAll304,
  RequiredAll304,
  ReadonlyAll304,
  NullableAll304,
  TypeNames304,
  Action304,
  AllPerms304,
};
