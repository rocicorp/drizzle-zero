// pkg-10 / types-04  (seed 1004) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord1004 {
  a1004: { x: number; y: string; z: boolean };
  b1004: { p: string[]; q: Record<string, number> };
  c1004: { nested: { deep: { deeper: { deepest: string } } } };
  d1004: number;
  e1004: string;
  f1004: boolean;
  g1004: null;
  h1004: undefined;
  i1004: bigint;
  j1004: symbol;
}

type PartialBig1004 = DeepPartial<BigRecord1004>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten1004<T> = T extends Array<infer U> ? Flatten1004<U> : T;
type Nested1004 = number[][][][][][][][][][];
type Flat1004 = Flatten1004<Nested1004>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly1004<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly1004<T[K]> : T[K];
};
type DeepRequired1004<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired1004<T[K]> : T[K];
};
type FR1004 = DeepReadonly1004<DeepRequired1004<PartialBig1004>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion1004 =
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

type ExtractAlpha1004 = Extract<BigUnion1004, "alpha" | "bravo" | "charlie">;
type ExcludeZulu1004 = Exclude<BigUnion1004, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA1004 { width: number; height: number; depth: number }
interface ShapeB1004 { color: string; opacity: number; blend: string }
interface ShapeC1004 { x: number; y: number; z: number; w: number }
interface ShapeD1004 { label: string; title: string; summary: string }

type Combined1004 = ShapeA1004 & ShapeB1004 & ShapeC1004 & ShapeD1004;
type OptionalAll1004 = { [K in keyof Combined1004]?: Combined1004[K] };
type RequiredAll1004 = { [K in keyof Combined1004]-?: Combined1004[K] };
type ReadonlyAll1004 = { readonly [K in keyof Combined1004]: Combined1004[K] };
type NullableAll1004 = { [K in keyof Combined1004]: Combined1004[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString1004<T> = T extends string ? true : false;
type IsNumber1004<T> = T extends number ? true : false;
type TypeName1004<T> = T extends string
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

type TypeNames1004 = {
  [K in keyof BigRecord1004]: TypeName1004<BigRecord1004[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb1004 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource1004 = "user" | "post" | "comment" | "tag" | "category";
type Action1004 = `${Verb1004}_${Resource1004}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise1004<T> = T extends Promise<infer U> ? UnwrapPromise1004<U> : T;
type UnwrapArray1004<T> = T extends (infer U)[] ? UnwrapArray1004<U> : T;
type Head1004<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail1004<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation1004<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation1004<Exclude<T, K>>]
  : never;

type SmallUnion1004 = "a" | "b" | "c" | "d";
type AllPerms1004 = Permutation1004<SmallUnion1004>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig1004,
  Flat1004,
  FR1004,
  BigUnion1004,
  ExtractAlpha1004,
  ExcludeZulu1004,
  OptionalAll1004,
  RequiredAll1004,
  ReadonlyAll1004,
  NullableAll1004,
  TypeNames1004,
  Action1004,
  AllPerms1004,
};
