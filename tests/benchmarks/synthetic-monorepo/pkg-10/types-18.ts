// pkg-10 / types-18  (seed 1018) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord1018 {
  a1018: { x: number; y: string; z: boolean };
  b1018: { p: string[]; q: Record<string, number> };
  c1018: { nested: { deep: { deeper: { deepest: string } } } };
  d1018: number;
  e1018: string;
  f1018: boolean;
  g1018: null;
  h1018: undefined;
  i1018: bigint;
  j1018: symbol;
}

type PartialBig1018 = DeepPartial<BigRecord1018>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten1018<T> = T extends Array<infer U> ? Flatten1018<U> : T;
type Nested1018 = number[][][][][][][][][][];
type Flat1018 = Flatten1018<Nested1018>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly1018<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly1018<T[K]> : T[K];
};
type DeepRequired1018<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired1018<T[K]> : T[K];
};
type FR1018 = DeepReadonly1018<DeepRequired1018<PartialBig1018>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion1018 =
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

type ExtractAlpha1018 = Extract<BigUnion1018, "alpha" | "bravo" | "charlie">;
type ExcludeZulu1018 = Exclude<BigUnion1018, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA1018 { width: number; height: number; depth: number }
interface ShapeB1018 { color: string; opacity: number; blend: string }
interface ShapeC1018 { x: number; y: number; z: number; w: number }
interface ShapeD1018 { label: string; title: string; summary: string }

type Combined1018 = ShapeA1018 & ShapeB1018 & ShapeC1018 & ShapeD1018;
type OptionalAll1018 = { [K in keyof Combined1018]?: Combined1018[K] };
type RequiredAll1018 = { [K in keyof Combined1018]-?: Combined1018[K] };
type ReadonlyAll1018 = { readonly [K in keyof Combined1018]: Combined1018[K] };
type NullableAll1018 = { [K in keyof Combined1018]: Combined1018[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString1018<T> = T extends string ? true : false;
type IsNumber1018<T> = T extends number ? true : false;
type TypeName1018<T> = T extends string
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

type TypeNames1018 = {
  [K in keyof BigRecord1018]: TypeName1018<BigRecord1018[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb1018 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource1018 = "user" | "post" | "comment" | "tag" | "category";
type Action1018 = `${Verb1018}_${Resource1018}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise1018<T> = T extends Promise<infer U> ? UnwrapPromise1018<U> : T;
type UnwrapArray1018<T> = T extends (infer U)[] ? UnwrapArray1018<U> : T;
type Head1018<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail1018<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation1018<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation1018<Exclude<T, K>>]
  : never;

type SmallUnion1018 = "a" | "b" | "c" | "d";
type AllPerms1018 = Permutation1018<SmallUnion1018>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig1018,
  Flat1018,
  FR1018,
  BigUnion1018,
  ExtractAlpha1018,
  ExcludeZulu1018,
  OptionalAll1018,
  RequiredAll1018,
  ReadonlyAll1018,
  NullableAll1018,
  TypeNames1018,
  Action1018,
  AllPerms1018,
};
