// pkg-10 / types-06  (seed 1006) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord1006 {
  a1006: { x: number; y: string; z: boolean };
  b1006: { p: string[]; q: Record<string, number> };
  c1006: { nested: { deep: { deeper: { deepest: string } } } };
  d1006: number;
  e1006: string;
  f1006: boolean;
  g1006: null;
  h1006: undefined;
  i1006: bigint;
  j1006: symbol;
}

type PartialBig1006 = DeepPartial<BigRecord1006>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten1006<T> = T extends Array<infer U> ? Flatten1006<U> : T;
type Nested1006 = number[][][][][][][][][][];
type Flat1006 = Flatten1006<Nested1006>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly1006<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly1006<T[K]> : T[K];
};
type DeepRequired1006<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired1006<T[K]> : T[K];
};
type FR1006 = DeepReadonly1006<DeepRequired1006<PartialBig1006>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion1006 =
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

type ExtractAlpha1006 = Extract<BigUnion1006, "alpha" | "bravo" | "charlie">;
type ExcludeZulu1006 = Exclude<BigUnion1006, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA1006 { width: number; height: number; depth: number }
interface ShapeB1006 { color: string; opacity: number; blend: string }
interface ShapeC1006 { x: number; y: number; z: number; w: number }
interface ShapeD1006 { label: string; title: string; summary: string }

type Combined1006 = ShapeA1006 & ShapeB1006 & ShapeC1006 & ShapeD1006;
type OptionalAll1006 = { [K in keyof Combined1006]?: Combined1006[K] };
type RequiredAll1006 = { [K in keyof Combined1006]-?: Combined1006[K] };
type ReadonlyAll1006 = { readonly [K in keyof Combined1006]: Combined1006[K] };
type NullableAll1006 = { [K in keyof Combined1006]: Combined1006[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString1006<T> = T extends string ? true : false;
type IsNumber1006<T> = T extends number ? true : false;
type TypeName1006<T> = T extends string
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

type TypeNames1006 = {
  [K in keyof BigRecord1006]: TypeName1006<BigRecord1006[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb1006 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource1006 = "user" | "post" | "comment" | "tag" | "category";
type Action1006 = `${Verb1006}_${Resource1006}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise1006<T> = T extends Promise<infer U> ? UnwrapPromise1006<U> : T;
type UnwrapArray1006<T> = T extends (infer U)[] ? UnwrapArray1006<U> : T;
type Head1006<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail1006<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation1006<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation1006<Exclude<T, K>>]
  : never;

type SmallUnion1006 = "a" | "b" | "c" | "d";
type AllPerms1006 = Permutation1006<SmallUnion1006>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig1006,
  Flat1006,
  FR1006,
  BigUnion1006,
  ExtractAlpha1006,
  ExcludeZulu1006,
  OptionalAll1006,
  RequiredAll1006,
  ReadonlyAll1006,
  NullableAll1006,
  TypeNames1006,
  Action1006,
  AllPerms1006,
};
