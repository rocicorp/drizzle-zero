// pkg-10 / types-13  (seed 1013) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord1013 {
  a1013: { x: number; y: string; z: boolean };
  b1013: { p: string[]; q: Record<string, number> };
  c1013: { nested: { deep: { deeper: { deepest: string } } } };
  d1013: number;
  e1013: string;
  f1013: boolean;
  g1013: null;
  h1013: undefined;
  i1013: bigint;
  j1013: symbol;
}

type PartialBig1013 = DeepPartial<BigRecord1013>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten1013<T> = T extends Array<infer U> ? Flatten1013<U> : T;
type Nested1013 = number[][][][][][][][][][];
type Flat1013 = Flatten1013<Nested1013>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly1013<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly1013<T[K]> : T[K];
};
type DeepRequired1013<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired1013<T[K]> : T[K];
};
type FR1013 = DeepReadonly1013<DeepRequired1013<PartialBig1013>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion1013 =
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

type ExtractAlpha1013 = Extract<BigUnion1013, "alpha" | "bravo" | "charlie">;
type ExcludeZulu1013 = Exclude<BigUnion1013, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA1013 { width: number; height: number; depth: number }
interface ShapeB1013 { color: string; opacity: number; blend: string }
interface ShapeC1013 { x: number; y: number; z: number; w: number }
interface ShapeD1013 { label: string; title: string; summary: string }

type Combined1013 = ShapeA1013 & ShapeB1013 & ShapeC1013 & ShapeD1013;
type OptionalAll1013 = { [K in keyof Combined1013]?: Combined1013[K] };
type RequiredAll1013 = { [K in keyof Combined1013]-?: Combined1013[K] };
type ReadonlyAll1013 = { readonly [K in keyof Combined1013]: Combined1013[K] };
type NullableAll1013 = { [K in keyof Combined1013]: Combined1013[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString1013<T> = T extends string ? true : false;
type IsNumber1013<T> = T extends number ? true : false;
type TypeName1013<T> = T extends string
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

type TypeNames1013 = {
  [K in keyof BigRecord1013]: TypeName1013<BigRecord1013[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb1013 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource1013 = "user" | "post" | "comment" | "tag" | "category";
type Action1013 = `${Verb1013}_${Resource1013}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise1013<T> = T extends Promise<infer U> ? UnwrapPromise1013<U> : T;
type UnwrapArray1013<T> = T extends (infer U)[] ? UnwrapArray1013<U> : T;
type Head1013<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail1013<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation1013<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation1013<Exclude<T, K>>]
  : never;

type SmallUnion1013 = "a" | "b" | "c" | "d";
type AllPerms1013 = Permutation1013<SmallUnion1013>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig1013,
  Flat1013,
  FR1013,
  BigUnion1013,
  ExtractAlpha1013,
  ExcludeZulu1013,
  OptionalAll1013,
  RequiredAll1013,
  ReadonlyAll1013,
  NullableAll1013,
  TypeNames1013,
  Action1013,
  AllPerms1013,
};
