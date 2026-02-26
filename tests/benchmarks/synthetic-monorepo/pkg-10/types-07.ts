// pkg-10 / types-07  (seed 1007) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord1007 {
  a1007: { x: number; y: string; z: boolean };
  b1007: { p: string[]; q: Record<string, number> };
  c1007: { nested: { deep: { deeper: { deepest: string } } } };
  d1007: number;
  e1007: string;
  f1007: boolean;
  g1007: null;
  h1007: undefined;
  i1007: bigint;
  j1007: symbol;
}

type PartialBig1007 = DeepPartial<BigRecord1007>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten1007<T> = T extends Array<infer U> ? Flatten1007<U> : T;
type Nested1007 = number[][][][][][][][][][];
type Flat1007 = Flatten1007<Nested1007>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly1007<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly1007<T[K]> : T[K];
};
type DeepRequired1007<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired1007<T[K]> : T[K];
};
type FR1007 = DeepReadonly1007<DeepRequired1007<PartialBig1007>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion1007 =
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

type ExtractAlpha1007 = Extract<BigUnion1007, "alpha" | "bravo" | "charlie">;
type ExcludeZulu1007 = Exclude<BigUnion1007, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA1007 { width: number; height: number; depth: number }
interface ShapeB1007 { color: string; opacity: number; blend: string }
interface ShapeC1007 { x: number; y: number; z: number; w: number }
interface ShapeD1007 { label: string; title: string; summary: string }

type Combined1007 = ShapeA1007 & ShapeB1007 & ShapeC1007 & ShapeD1007;
type OptionalAll1007 = { [K in keyof Combined1007]?: Combined1007[K] };
type RequiredAll1007 = { [K in keyof Combined1007]-?: Combined1007[K] };
type ReadonlyAll1007 = { readonly [K in keyof Combined1007]: Combined1007[K] };
type NullableAll1007 = { [K in keyof Combined1007]: Combined1007[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString1007<T> = T extends string ? true : false;
type IsNumber1007<T> = T extends number ? true : false;
type TypeName1007<T> = T extends string
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

type TypeNames1007 = {
  [K in keyof BigRecord1007]: TypeName1007<BigRecord1007[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb1007 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource1007 = "user" | "post" | "comment" | "tag" | "category";
type Action1007 = `${Verb1007}_${Resource1007}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise1007<T> = T extends Promise<infer U> ? UnwrapPromise1007<U> : T;
type UnwrapArray1007<T> = T extends (infer U)[] ? UnwrapArray1007<U> : T;
type Head1007<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail1007<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation1007<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation1007<Exclude<T, K>>]
  : never;

type SmallUnion1007 = "a" | "b" | "c" | "d";
type AllPerms1007 = Permutation1007<SmallUnion1007>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig1007,
  Flat1007,
  FR1007,
  BigUnion1007,
  ExtractAlpha1007,
  ExcludeZulu1007,
  OptionalAll1007,
  RequiredAll1007,
  ReadonlyAll1007,
  NullableAll1007,
  TypeNames1007,
  Action1007,
  AllPerms1007,
};
