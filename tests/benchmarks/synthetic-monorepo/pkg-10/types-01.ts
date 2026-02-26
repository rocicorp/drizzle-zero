// pkg-10 / types-01  (seed 1001) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord1001 {
  a1001: { x: number; y: string; z: boolean };
  b1001: { p: string[]; q: Record<string, number> };
  c1001: { nested: { deep: { deeper: { deepest: string } } } };
  d1001: number;
  e1001: string;
  f1001: boolean;
  g1001: null;
  h1001: undefined;
  i1001: bigint;
  j1001: symbol;
}

type PartialBig1001 = DeepPartial<BigRecord1001>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten1001<T> = T extends Array<infer U> ? Flatten1001<U> : T;
type Nested1001 = number[][][][][][][][][][];
type Flat1001 = Flatten1001<Nested1001>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly1001<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly1001<T[K]> : T[K];
};
type DeepRequired1001<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired1001<T[K]> : T[K];
};
type FR1001 = DeepReadonly1001<DeepRequired1001<PartialBig1001>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion1001 =
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

type ExtractAlpha1001 = Extract<BigUnion1001, "alpha" | "bravo" | "charlie">;
type ExcludeZulu1001 = Exclude<BigUnion1001, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA1001 { width: number; height: number; depth: number }
interface ShapeB1001 { color: string; opacity: number; blend: string }
interface ShapeC1001 { x: number; y: number; z: number; w: number }
interface ShapeD1001 { label: string; title: string; summary: string }

type Combined1001 = ShapeA1001 & ShapeB1001 & ShapeC1001 & ShapeD1001;
type OptionalAll1001 = { [K in keyof Combined1001]?: Combined1001[K] };
type RequiredAll1001 = { [K in keyof Combined1001]-?: Combined1001[K] };
type ReadonlyAll1001 = { readonly [K in keyof Combined1001]: Combined1001[K] };
type NullableAll1001 = { [K in keyof Combined1001]: Combined1001[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString1001<T> = T extends string ? true : false;
type IsNumber1001<T> = T extends number ? true : false;
type TypeName1001<T> = T extends string
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

type TypeNames1001 = {
  [K in keyof BigRecord1001]: TypeName1001<BigRecord1001[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb1001 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource1001 = "user" | "post" | "comment" | "tag" | "category";
type Action1001 = `${Verb1001}_${Resource1001}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise1001<T> = T extends Promise<infer U> ? UnwrapPromise1001<U> : T;
type UnwrapArray1001<T> = T extends (infer U)[] ? UnwrapArray1001<U> : T;
type Head1001<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail1001<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation1001<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation1001<Exclude<T, K>>]
  : never;

type SmallUnion1001 = "a" | "b" | "c" | "d";
type AllPerms1001 = Permutation1001<SmallUnion1001>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig1001,
  Flat1001,
  FR1001,
  BigUnion1001,
  ExtractAlpha1001,
  ExcludeZulu1001,
  OptionalAll1001,
  RequiredAll1001,
  ReadonlyAll1001,
  NullableAll1001,
  TypeNames1001,
  Action1001,
  AllPerms1001,
};
