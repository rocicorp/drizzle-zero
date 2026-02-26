// pkg-10 / types-20  (seed 1020) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord1020 {
  a1020: { x: number; y: string; z: boolean };
  b1020: { p: string[]; q: Record<string, number> };
  c1020: { nested: { deep: { deeper: { deepest: string } } } };
  d1020: number;
  e1020: string;
  f1020: boolean;
  g1020: null;
  h1020: undefined;
  i1020: bigint;
  j1020: symbol;
}

type PartialBig1020 = DeepPartial<BigRecord1020>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten1020<T> = T extends Array<infer U> ? Flatten1020<U> : T;
type Nested1020 = number[][][][][][][][][][];
type Flat1020 = Flatten1020<Nested1020>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly1020<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly1020<T[K]> : T[K];
};
type DeepRequired1020<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired1020<T[K]> : T[K];
};
type FR1020 = DeepReadonly1020<DeepRequired1020<PartialBig1020>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion1020 =
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

type ExtractAlpha1020 = Extract<BigUnion1020, "alpha" | "bravo" | "charlie">;
type ExcludeZulu1020 = Exclude<BigUnion1020, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA1020 { width: number; height: number; depth: number }
interface ShapeB1020 { color: string; opacity: number; blend: string }
interface ShapeC1020 { x: number; y: number; z: number; w: number }
interface ShapeD1020 { label: string; title: string; summary: string }

type Combined1020 = ShapeA1020 & ShapeB1020 & ShapeC1020 & ShapeD1020;
type OptionalAll1020 = { [K in keyof Combined1020]?: Combined1020[K] };
type RequiredAll1020 = { [K in keyof Combined1020]-?: Combined1020[K] };
type ReadonlyAll1020 = { readonly [K in keyof Combined1020]: Combined1020[K] };
type NullableAll1020 = { [K in keyof Combined1020]: Combined1020[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString1020<T> = T extends string ? true : false;
type IsNumber1020<T> = T extends number ? true : false;
type TypeName1020<T> = T extends string
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

type TypeNames1020 = {
  [K in keyof BigRecord1020]: TypeName1020<BigRecord1020[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb1020 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource1020 = "user" | "post" | "comment" | "tag" | "category";
type Action1020 = `${Verb1020}_${Resource1020}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise1020<T> = T extends Promise<infer U> ? UnwrapPromise1020<U> : T;
type UnwrapArray1020<T> = T extends (infer U)[] ? UnwrapArray1020<U> : T;
type Head1020<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail1020<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation1020<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation1020<Exclude<T, K>>]
  : never;

type SmallUnion1020 = "a" | "b" | "c" | "d";
type AllPerms1020 = Permutation1020<SmallUnion1020>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig1020,
  Flat1020,
  FR1020,
  BigUnion1020,
  ExtractAlpha1020,
  ExcludeZulu1020,
  OptionalAll1020,
  RequiredAll1020,
  ReadonlyAll1020,
  NullableAll1020,
  TypeNames1020,
  Action1020,
  AllPerms1020,
};
