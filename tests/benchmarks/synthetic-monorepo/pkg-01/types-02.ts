// pkg-01 / types-02  (seed 102) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord102 {
  a102: { x: number; y: string; z: boolean };
  b102: { p: string[]; q: Record<string, number> };
  c102: { nested: { deep: { deeper: { deepest: string } } } };
  d102: number;
  e102: string;
  f102: boolean;
  g102: null;
  h102: undefined;
  i102: bigint;
  j102: symbol;
}

type PartialBig102 = DeepPartial<BigRecord102>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten102<T> = T extends Array<infer U> ? Flatten102<U> : T;
type Nested102 = number[][][][][][][][][][];
type Flat102 = Flatten102<Nested102>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly102<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly102<T[K]> : T[K];
};
type DeepRequired102<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired102<T[K]> : T[K];
};
type FR102 = DeepReadonly102<DeepRequired102<PartialBig102>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion102 =
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

type ExtractAlpha102 = Extract<BigUnion102, "alpha" | "bravo" | "charlie">;
type ExcludeZulu102 = Exclude<BigUnion102, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA102 { width: number; height: number; depth: number }
interface ShapeB102 { color: string; opacity: number; blend: string }
interface ShapeC102 { x: number; y: number; z: number; w: number }
interface ShapeD102 { label: string; title: string; summary: string }

type Combined102 = ShapeA102 & ShapeB102 & ShapeC102 & ShapeD102;
type OptionalAll102 = { [K in keyof Combined102]?: Combined102[K] };
type RequiredAll102 = { [K in keyof Combined102]-?: Combined102[K] };
type ReadonlyAll102 = { readonly [K in keyof Combined102]: Combined102[K] };
type NullableAll102 = { [K in keyof Combined102]: Combined102[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString102<T> = T extends string ? true : false;
type IsNumber102<T> = T extends number ? true : false;
type TypeName102<T> = T extends string
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

type TypeNames102 = {
  [K in keyof BigRecord102]: TypeName102<BigRecord102[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb102 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource102 = "user" | "post" | "comment" | "tag" | "category";
type Action102 = `${Verb102}_${Resource102}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise102<T> = T extends Promise<infer U> ? UnwrapPromise102<U> : T;
type UnwrapArray102<T> = T extends (infer U)[] ? UnwrapArray102<U> : T;
type Head102<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail102<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation102<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation102<Exclude<T, K>>]
  : never;

type SmallUnion102 = "a" | "b" | "c" | "d";
type AllPerms102 = Permutation102<SmallUnion102>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig102,
  Flat102,
  FR102,
  BigUnion102,
  ExtractAlpha102,
  ExcludeZulu102,
  OptionalAll102,
  RequiredAll102,
  ReadonlyAll102,
  NullableAll102,
  TypeNames102,
  Action102,
  AllPerms102,
};
