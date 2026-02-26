// pkg-10 / types-26  (seed 1026) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord1026 {
  a1026: { x: number; y: string; z: boolean };
  b1026: { p: string[]; q: Record<string, number> };
  c1026: { nested: { deep: { deeper: { deepest: string } } } };
  d1026: number;
  e1026: string;
  f1026: boolean;
  g1026: null;
  h1026: undefined;
  i1026: bigint;
  j1026: symbol;
}

type PartialBig1026 = DeepPartial<BigRecord1026>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten1026<T> = T extends Array<infer U> ? Flatten1026<U> : T;
type Nested1026 = number[][][][][][][][][][];
type Flat1026 = Flatten1026<Nested1026>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly1026<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly1026<T[K]> : T[K];
};
type DeepRequired1026<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired1026<T[K]> : T[K];
};
type FR1026 = DeepReadonly1026<DeepRequired1026<PartialBig1026>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion1026 =
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

type ExtractAlpha1026 = Extract<BigUnion1026, "alpha" | "bravo" | "charlie">;
type ExcludeZulu1026 = Exclude<BigUnion1026, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA1026 { width: number; height: number; depth: number }
interface ShapeB1026 { color: string; opacity: number; blend: string }
interface ShapeC1026 { x: number; y: number; z: number; w: number }
interface ShapeD1026 { label: string; title: string; summary: string }

type Combined1026 = ShapeA1026 & ShapeB1026 & ShapeC1026 & ShapeD1026;
type OptionalAll1026 = { [K in keyof Combined1026]?: Combined1026[K] };
type RequiredAll1026 = { [K in keyof Combined1026]-?: Combined1026[K] };
type ReadonlyAll1026 = { readonly [K in keyof Combined1026]: Combined1026[K] };
type NullableAll1026 = { [K in keyof Combined1026]: Combined1026[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString1026<T> = T extends string ? true : false;
type IsNumber1026<T> = T extends number ? true : false;
type TypeName1026<T> = T extends string
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

type TypeNames1026 = {
  [K in keyof BigRecord1026]: TypeName1026<BigRecord1026[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb1026 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource1026 = "user" | "post" | "comment" | "tag" | "category";
type Action1026 = `${Verb1026}_${Resource1026}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise1026<T> = T extends Promise<infer U> ? UnwrapPromise1026<U> : T;
type UnwrapArray1026<T> = T extends (infer U)[] ? UnwrapArray1026<U> : T;
type Head1026<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail1026<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation1026<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation1026<Exclude<T, K>>]
  : never;

type SmallUnion1026 = "a" | "b" | "c" | "d";
type AllPerms1026 = Permutation1026<SmallUnion1026>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig1026,
  Flat1026,
  FR1026,
  BigUnion1026,
  ExtractAlpha1026,
  ExcludeZulu1026,
  OptionalAll1026,
  RequiredAll1026,
  ReadonlyAll1026,
  NullableAll1026,
  TypeNames1026,
  Action1026,
  AllPerms1026,
};
