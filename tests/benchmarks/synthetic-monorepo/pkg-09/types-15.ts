// pkg-09 / types-15  (seed 915) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord915 {
  a915: { x: number; y: string; z: boolean };
  b915: { p: string[]; q: Record<string, number> };
  c915: { nested: { deep: { deeper: { deepest: string } } } };
  d915: number;
  e915: string;
  f915: boolean;
  g915: null;
  h915: undefined;
  i915: bigint;
  j915: symbol;
}

type PartialBig915 = DeepPartial<BigRecord915>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten915<T> = T extends Array<infer U> ? Flatten915<U> : T;
type Nested915 = number[][][][][][][][][][];
type Flat915 = Flatten915<Nested915>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly915<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly915<T[K]> : T[K];
};
type DeepRequired915<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired915<T[K]> : T[K];
};
type FR915 = DeepReadonly915<DeepRequired915<PartialBig915>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion915 =
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

type ExtractAlpha915 = Extract<BigUnion915, "alpha" | "bravo" | "charlie">;
type ExcludeZulu915 = Exclude<BigUnion915, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA915 { width: number; height: number; depth: number }
interface ShapeB915 { color: string; opacity: number; blend: string }
interface ShapeC915 { x: number; y: number; z: number; w: number }
interface ShapeD915 { label: string; title: string; summary: string }

type Combined915 = ShapeA915 & ShapeB915 & ShapeC915 & ShapeD915;
type OptionalAll915 = { [K in keyof Combined915]?: Combined915[K] };
type RequiredAll915 = { [K in keyof Combined915]-?: Combined915[K] };
type ReadonlyAll915 = { readonly [K in keyof Combined915]: Combined915[K] };
type NullableAll915 = { [K in keyof Combined915]: Combined915[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString915<T> = T extends string ? true : false;
type IsNumber915<T> = T extends number ? true : false;
type TypeName915<T> = T extends string
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

type TypeNames915 = {
  [K in keyof BigRecord915]: TypeName915<BigRecord915[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb915 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource915 = "user" | "post" | "comment" | "tag" | "category";
type Action915 = `${Verb915}_${Resource915}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise915<T> = T extends Promise<infer U> ? UnwrapPromise915<U> : T;
type UnwrapArray915<T> = T extends (infer U)[] ? UnwrapArray915<U> : T;
type Head915<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail915<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation915<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation915<Exclude<T, K>>]
  : never;

type SmallUnion915 = "a" | "b" | "c" | "d";
type AllPerms915 = Permutation915<SmallUnion915>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig915,
  Flat915,
  FR915,
  BigUnion915,
  ExtractAlpha915,
  ExcludeZulu915,
  OptionalAll915,
  RequiredAll915,
  ReadonlyAll915,
  NullableAll915,
  TypeNames915,
  Action915,
  AllPerms915,
};
