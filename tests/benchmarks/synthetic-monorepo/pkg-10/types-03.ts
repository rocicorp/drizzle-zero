// pkg-10 / types-03  (seed 1003) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord1003 {
  a1003: { x: number; y: string; z: boolean };
  b1003: { p: string[]; q: Record<string, number> };
  c1003: { nested: { deep: { deeper: { deepest: string } } } };
  d1003: number;
  e1003: string;
  f1003: boolean;
  g1003: null;
  h1003: undefined;
  i1003: bigint;
  j1003: symbol;
}

type PartialBig1003 = DeepPartial<BigRecord1003>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten1003<T> = T extends Array<infer U> ? Flatten1003<U> : T;
type Nested1003 = number[][][][][][][][][][];
type Flat1003 = Flatten1003<Nested1003>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly1003<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly1003<T[K]> : T[K];
};
type DeepRequired1003<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired1003<T[K]> : T[K];
};
type FR1003 = DeepReadonly1003<DeepRequired1003<PartialBig1003>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion1003 =
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

type ExtractAlpha1003 = Extract<BigUnion1003, "alpha" | "bravo" | "charlie">;
type ExcludeZulu1003 = Exclude<BigUnion1003, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA1003 { width: number; height: number; depth: number }
interface ShapeB1003 { color: string; opacity: number; blend: string }
interface ShapeC1003 { x: number; y: number; z: number; w: number }
interface ShapeD1003 { label: string; title: string; summary: string }

type Combined1003 = ShapeA1003 & ShapeB1003 & ShapeC1003 & ShapeD1003;
type OptionalAll1003 = { [K in keyof Combined1003]?: Combined1003[K] };
type RequiredAll1003 = { [K in keyof Combined1003]-?: Combined1003[K] };
type ReadonlyAll1003 = { readonly [K in keyof Combined1003]: Combined1003[K] };
type NullableAll1003 = { [K in keyof Combined1003]: Combined1003[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString1003<T> = T extends string ? true : false;
type IsNumber1003<T> = T extends number ? true : false;
type TypeName1003<T> = T extends string
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

type TypeNames1003 = {
  [K in keyof BigRecord1003]: TypeName1003<BigRecord1003[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb1003 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource1003 = "user" | "post" | "comment" | "tag" | "category";
type Action1003 = `${Verb1003}_${Resource1003}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise1003<T> = T extends Promise<infer U> ? UnwrapPromise1003<U> : T;
type UnwrapArray1003<T> = T extends (infer U)[] ? UnwrapArray1003<U> : T;
type Head1003<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail1003<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation1003<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation1003<Exclude<T, K>>]
  : never;

type SmallUnion1003 = "a" | "b" | "c" | "d";
type AllPerms1003 = Permutation1003<SmallUnion1003>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig1003,
  Flat1003,
  FR1003,
  BigUnion1003,
  ExtractAlpha1003,
  ExcludeZulu1003,
  OptionalAll1003,
  RequiredAll1003,
  ReadonlyAll1003,
  NullableAll1003,
  TypeNames1003,
  Action1003,
  AllPerms1003,
};
