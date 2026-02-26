// pkg-10 / types-30  (seed 1030) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord1030 {
  a1030: { x: number; y: string; z: boolean };
  b1030: { p: string[]; q: Record<string, number> };
  c1030: { nested: { deep: { deeper: { deepest: string } } } };
  d1030: number;
  e1030: string;
  f1030: boolean;
  g1030: null;
  h1030: undefined;
  i1030: bigint;
  j1030: symbol;
}

type PartialBig1030 = DeepPartial<BigRecord1030>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten1030<T> = T extends Array<infer U> ? Flatten1030<U> : T;
type Nested1030 = number[][][][][][][][][][];
type Flat1030 = Flatten1030<Nested1030>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly1030<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly1030<T[K]> : T[K];
};
type DeepRequired1030<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired1030<T[K]> : T[K];
};
type FR1030 = DeepReadonly1030<DeepRequired1030<PartialBig1030>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion1030 =
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

type ExtractAlpha1030 = Extract<BigUnion1030, "alpha" | "bravo" | "charlie">;
type ExcludeZulu1030 = Exclude<BigUnion1030, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA1030 { width: number; height: number; depth: number }
interface ShapeB1030 { color: string; opacity: number; blend: string }
interface ShapeC1030 { x: number; y: number; z: number; w: number }
interface ShapeD1030 { label: string; title: string; summary: string }

type Combined1030 = ShapeA1030 & ShapeB1030 & ShapeC1030 & ShapeD1030;
type OptionalAll1030 = { [K in keyof Combined1030]?: Combined1030[K] };
type RequiredAll1030 = { [K in keyof Combined1030]-?: Combined1030[K] };
type ReadonlyAll1030 = { readonly [K in keyof Combined1030]: Combined1030[K] };
type NullableAll1030 = { [K in keyof Combined1030]: Combined1030[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString1030<T> = T extends string ? true : false;
type IsNumber1030<T> = T extends number ? true : false;
type TypeName1030<T> = T extends string
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

type TypeNames1030 = {
  [K in keyof BigRecord1030]: TypeName1030<BigRecord1030[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb1030 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource1030 = "user" | "post" | "comment" | "tag" | "category";
type Action1030 = `${Verb1030}_${Resource1030}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise1030<T> = T extends Promise<infer U> ? UnwrapPromise1030<U> : T;
type UnwrapArray1030<T> = T extends (infer U)[] ? UnwrapArray1030<U> : T;
type Head1030<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail1030<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation1030<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation1030<Exclude<T, K>>]
  : never;

type SmallUnion1030 = "a" | "b" | "c" | "d";
type AllPerms1030 = Permutation1030<SmallUnion1030>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig1030,
  Flat1030,
  FR1030,
  BigUnion1030,
  ExtractAlpha1030,
  ExcludeZulu1030,
  OptionalAll1030,
  RequiredAll1030,
  ReadonlyAll1030,
  NullableAll1030,
  TypeNames1030,
  Action1030,
  AllPerms1030,
};
