// pkg-10 / types-05  (seed 1005) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord1005 {
  a1005: { x: number; y: string; z: boolean };
  b1005: { p: string[]; q: Record<string, number> };
  c1005: { nested: { deep: { deeper: { deepest: string } } } };
  d1005: number;
  e1005: string;
  f1005: boolean;
  g1005: null;
  h1005: undefined;
  i1005: bigint;
  j1005: symbol;
}

type PartialBig1005 = DeepPartial<BigRecord1005>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten1005<T> = T extends Array<infer U> ? Flatten1005<U> : T;
type Nested1005 = number[][][][][][][][][][];
type Flat1005 = Flatten1005<Nested1005>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly1005<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly1005<T[K]> : T[K];
};
type DeepRequired1005<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired1005<T[K]> : T[K];
};
type FR1005 = DeepReadonly1005<DeepRequired1005<PartialBig1005>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion1005 =
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

type ExtractAlpha1005 = Extract<BigUnion1005, "alpha" | "bravo" | "charlie">;
type ExcludeZulu1005 = Exclude<BigUnion1005, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA1005 { width: number; height: number; depth: number }
interface ShapeB1005 { color: string; opacity: number; blend: string }
interface ShapeC1005 { x: number; y: number; z: number; w: number }
interface ShapeD1005 { label: string; title: string; summary: string }

type Combined1005 = ShapeA1005 & ShapeB1005 & ShapeC1005 & ShapeD1005;
type OptionalAll1005 = { [K in keyof Combined1005]?: Combined1005[K] };
type RequiredAll1005 = { [K in keyof Combined1005]-?: Combined1005[K] };
type ReadonlyAll1005 = { readonly [K in keyof Combined1005]: Combined1005[K] };
type NullableAll1005 = { [K in keyof Combined1005]: Combined1005[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString1005<T> = T extends string ? true : false;
type IsNumber1005<T> = T extends number ? true : false;
type TypeName1005<T> = T extends string
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

type TypeNames1005 = {
  [K in keyof BigRecord1005]: TypeName1005<BigRecord1005[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb1005 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource1005 = "user" | "post" | "comment" | "tag" | "category";
type Action1005 = `${Verb1005}_${Resource1005}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise1005<T> = T extends Promise<infer U> ? UnwrapPromise1005<U> : T;
type UnwrapArray1005<T> = T extends (infer U)[] ? UnwrapArray1005<U> : T;
type Head1005<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail1005<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation1005<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation1005<Exclude<T, K>>]
  : never;

type SmallUnion1005 = "a" | "b" | "c" | "d";
type AllPerms1005 = Permutation1005<SmallUnion1005>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig1005,
  Flat1005,
  FR1005,
  BigUnion1005,
  ExtractAlpha1005,
  ExcludeZulu1005,
  OptionalAll1005,
  RequiredAll1005,
  ReadonlyAll1005,
  NullableAll1005,
  TypeNames1005,
  Action1005,
  AllPerms1005,
};
