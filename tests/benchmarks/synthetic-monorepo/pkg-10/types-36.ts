// pkg-10 / types-36  (seed 1036) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord1036 {
  a1036: { x: number; y: string; z: boolean };
  b1036: { p: string[]; q: Record<string, number> };
  c1036: { nested: { deep: { deeper: { deepest: string } } } };
  d1036: number;
  e1036: string;
  f1036: boolean;
  g1036: null;
  h1036: undefined;
  i1036: bigint;
  j1036: symbol;
}

type PartialBig1036 = DeepPartial<BigRecord1036>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten1036<T> = T extends Array<infer U> ? Flatten1036<U> : T;
type Nested1036 = number[][][][][][][][][][];
type Flat1036 = Flatten1036<Nested1036>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly1036<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly1036<T[K]> : T[K];
};
type DeepRequired1036<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired1036<T[K]> : T[K];
};
type FR1036 = DeepReadonly1036<DeepRequired1036<PartialBig1036>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion1036 =
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

type ExtractAlpha1036 = Extract<BigUnion1036, "alpha" | "bravo" | "charlie">;
type ExcludeZulu1036 = Exclude<BigUnion1036, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA1036 { width: number; height: number; depth: number }
interface ShapeB1036 { color: string; opacity: number; blend: string }
interface ShapeC1036 { x: number; y: number; z: number; w: number }
interface ShapeD1036 { label: string; title: string; summary: string }

type Combined1036 = ShapeA1036 & ShapeB1036 & ShapeC1036 & ShapeD1036;
type OptionalAll1036 = { [K in keyof Combined1036]?: Combined1036[K] };
type RequiredAll1036 = { [K in keyof Combined1036]-?: Combined1036[K] };
type ReadonlyAll1036 = { readonly [K in keyof Combined1036]: Combined1036[K] };
type NullableAll1036 = { [K in keyof Combined1036]: Combined1036[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString1036<T> = T extends string ? true : false;
type IsNumber1036<T> = T extends number ? true : false;
type TypeName1036<T> = T extends string
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

type TypeNames1036 = {
  [K in keyof BigRecord1036]: TypeName1036<BigRecord1036[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb1036 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource1036 = "user" | "post" | "comment" | "tag" | "category";
type Action1036 = `${Verb1036}_${Resource1036}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise1036<T> = T extends Promise<infer U> ? UnwrapPromise1036<U> : T;
type UnwrapArray1036<T> = T extends (infer U)[] ? UnwrapArray1036<U> : T;
type Head1036<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail1036<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation1036<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation1036<Exclude<T, K>>]
  : never;

type SmallUnion1036 = "a" | "b" | "c" | "d";
type AllPerms1036 = Permutation1036<SmallUnion1036>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig1036,
  Flat1036,
  FR1036,
  BigUnion1036,
  ExtractAlpha1036,
  ExcludeZulu1036,
  OptionalAll1036,
  RequiredAll1036,
  ReadonlyAll1036,
  NullableAll1036,
  TypeNames1036,
  Action1036,
  AllPerms1036,
};
