// pkg-05 / types-11  (seed 511) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord511 {
  a511: { x: number; y: string; z: boolean };
  b511: { p: string[]; q: Record<string, number> };
  c511: { nested: { deep: { deeper: { deepest: string } } } };
  d511: number;
  e511: string;
  f511: boolean;
  g511: null;
  h511: undefined;
  i511: bigint;
  j511: symbol;
}

type PartialBig511 = DeepPartial<BigRecord511>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten511<T> = T extends Array<infer U> ? Flatten511<U> : T;
type Nested511 = number[][][][][][][][][][];
type Flat511 = Flatten511<Nested511>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly511<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly511<T[K]> : T[K];
};
type DeepRequired511<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired511<T[K]> : T[K];
};
type FR511 = DeepReadonly511<DeepRequired511<PartialBig511>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion511 =
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

type ExtractAlpha511 = Extract<BigUnion511, "alpha" | "bravo" | "charlie">;
type ExcludeZulu511 = Exclude<BigUnion511, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA511 { width: number; height: number; depth: number }
interface ShapeB511 { color: string; opacity: number; blend: string }
interface ShapeC511 { x: number; y: number; z: number; w: number }
interface ShapeD511 { label: string; title: string; summary: string }

type Combined511 = ShapeA511 & ShapeB511 & ShapeC511 & ShapeD511;
type OptionalAll511 = { [K in keyof Combined511]?: Combined511[K] };
type RequiredAll511 = { [K in keyof Combined511]-?: Combined511[K] };
type ReadonlyAll511 = { readonly [K in keyof Combined511]: Combined511[K] };
type NullableAll511 = { [K in keyof Combined511]: Combined511[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString511<T> = T extends string ? true : false;
type IsNumber511<T> = T extends number ? true : false;
type TypeName511<T> = T extends string
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

type TypeNames511 = {
  [K in keyof BigRecord511]: TypeName511<BigRecord511[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb511 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource511 = "user" | "post" | "comment" | "tag" | "category";
type Action511 = `${Verb511}_${Resource511}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise511<T> = T extends Promise<infer U> ? UnwrapPromise511<U> : T;
type UnwrapArray511<T> = T extends (infer U)[] ? UnwrapArray511<U> : T;
type Head511<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail511<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation511<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation511<Exclude<T, K>>]
  : never;

type SmallUnion511 = "a" | "b" | "c" | "d";
type AllPerms511 = Permutation511<SmallUnion511>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig511,
  Flat511,
  FR511,
  BigUnion511,
  ExtractAlpha511,
  ExcludeZulu511,
  OptionalAll511,
  RequiredAll511,
  ReadonlyAll511,
  NullableAll511,
  TypeNames511,
  Action511,
  AllPerms511,
};
