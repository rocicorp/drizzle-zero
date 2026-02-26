// pkg-10 / types-02  (seed 1002) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord1002 {
  a1002: { x: number; y: string; z: boolean };
  b1002: { p: string[]; q: Record<string, number> };
  c1002: { nested: { deep: { deeper: { deepest: string } } } };
  d1002: number;
  e1002: string;
  f1002: boolean;
  g1002: null;
  h1002: undefined;
  i1002: bigint;
  j1002: symbol;
}

type PartialBig1002 = DeepPartial<BigRecord1002>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten1002<T> = T extends Array<infer U> ? Flatten1002<U> : T;
type Nested1002 = number[][][][][][][][][][];
type Flat1002 = Flatten1002<Nested1002>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly1002<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly1002<T[K]> : T[K];
};
type DeepRequired1002<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired1002<T[K]> : T[K];
};
type FR1002 = DeepReadonly1002<DeepRequired1002<PartialBig1002>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion1002 =
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

type ExtractAlpha1002 = Extract<BigUnion1002, "alpha" | "bravo" | "charlie">;
type ExcludeZulu1002 = Exclude<BigUnion1002, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA1002 { width: number; height: number; depth: number }
interface ShapeB1002 { color: string; opacity: number; blend: string }
interface ShapeC1002 { x: number; y: number; z: number; w: number }
interface ShapeD1002 { label: string; title: string; summary: string }

type Combined1002 = ShapeA1002 & ShapeB1002 & ShapeC1002 & ShapeD1002;
type OptionalAll1002 = { [K in keyof Combined1002]?: Combined1002[K] };
type RequiredAll1002 = { [K in keyof Combined1002]-?: Combined1002[K] };
type ReadonlyAll1002 = { readonly [K in keyof Combined1002]: Combined1002[K] };
type NullableAll1002 = { [K in keyof Combined1002]: Combined1002[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString1002<T> = T extends string ? true : false;
type IsNumber1002<T> = T extends number ? true : false;
type TypeName1002<T> = T extends string
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

type TypeNames1002 = {
  [K in keyof BigRecord1002]: TypeName1002<BigRecord1002[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb1002 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource1002 = "user" | "post" | "comment" | "tag" | "category";
type Action1002 = `${Verb1002}_${Resource1002}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise1002<T> = T extends Promise<infer U> ? UnwrapPromise1002<U> : T;
type UnwrapArray1002<T> = T extends (infer U)[] ? UnwrapArray1002<U> : T;
type Head1002<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail1002<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation1002<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation1002<Exclude<T, K>>]
  : never;

type SmallUnion1002 = "a" | "b" | "c" | "d";
type AllPerms1002 = Permutation1002<SmallUnion1002>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig1002,
  Flat1002,
  FR1002,
  BigUnion1002,
  ExtractAlpha1002,
  ExcludeZulu1002,
  OptionalAll1002,
  RequiredAll1002,
  ReadonlyAll1002,
  NullableAll1002,
  TypeNames1002,
  Action1002,
  AllPerms1002,
};
