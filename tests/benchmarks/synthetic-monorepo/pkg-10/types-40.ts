// pkg-10 / types-40  (seed 1040) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord1040 {
  a1040: { x: number; y: string; z: boolean };
  b1040: { p: string[]; q: Record<string, number> };
  c1040: { nested: { deep: { deeper: { deepest: string } } } };
  d1040: number;
  e1040: string;
  f1040: boolean;
  g1040: null;
  h1040: undefined;
  i1040: bigint;
  j1040: symbol;
}

type PartialBig1040 = DeepPartial<BigRecord1040>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten1040<T> = T extends Array<infer U> ? Flatten1040<U> : T;
type Nested1040 = number[][][][][][][][][][];
type Flat1040 = Flatten1040<Nested1040>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly1040<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly1040<T[K]> : T[K];
};
type DeepRequired1040<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired1040<T[K]> : T[K];
};
type FR1040 = DeepReadonly1040<DeepRequired1040<PartialBig1040>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion1040 =
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

type ExtractAlpha1040 = Extract<BigUnion1040, "alpha" | "bravo" | "charlie">;
type ExcludeZulu1040 = Exclude<BigUnion1040, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA1040 { width: number; height: number; depth: number }
interface ShapeB1040 { color: string; opacity: number; blend: string }
interface ShapeC1040 { x: number; y: number; z: number; w: number }
interface ShapeD1040 { label: string; title: string; summary: string }

type Combined1040 = ShapeA1040 & ShapeB1040 & ShapeC1040 & ShapeD1040;
type OptionalAll1040 = { [K in keyof Combined1040]?: Combined1040[K] };
type RequiredAll1040 = { [K in keyof Combined1040]-?: Combined1040[K] };
type ReadonlyAll1040 = { readonly [K in keyof Combined1040]: Combined1040[K] };
type NullableAll1040 = { [K in keyof Combined1040]: Combined1040[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString1040<T> = T extends string ? true : false;
type IsNumber1040<T> = T extends number ? true : false;
type TypeName1040<T> = T extends string
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

type TypeNames1040 = {
  [K in keyof BigRecord1040]: TypeName1040<BigRecord1040[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb1040 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource1040 = "user" | "post" | "comment" | "tag" | "category";
type Action1040 = `${Verb1040}_${Resource1040}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise1040<T> = T extends Promise<infer U> ? UnwrapPromise1040<U> : T;
type UnwrapArray1040<T> = T extends (infer U)[] ? UnwrapArray1040<U> : T;
type Head1040<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail1040<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation1040<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation1040<Exclude<T, K>>]
  : never;

type SmallUnion1040 = "a" | "b" | "c" | "d";
type AllPerms1040 = Permutation1040<SmallUnion1040>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig1040,
  Flat1040,
  FR1040,
  BigUnion1040,
  ExtractAlpha1040,
  ExcludeZulu1040,
  OptionalAll1040,
  RequiredAll1040,
  ReadonlyAll1040,
  NullableAll1040,
  TypeNames1040,
  Action1040,
  AllPerms1040,
};
