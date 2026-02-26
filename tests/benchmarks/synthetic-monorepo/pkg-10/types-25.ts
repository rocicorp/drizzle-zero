// pkg-10 / types-25  (seed 1025) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord1025 {
  a1025: { x: number; y: string; z: boolean };
  b1025: { p: string[]; q: Record<string, number> };
  c1025: { nested: { deep: { deeper: { deepest: string } } } };
  d1025: number;
  e1025: string;
  f1025: boolean;
  g1025: null;
  h1025: undefined;
  i1025: bigint;
  j1025: symbol;
}

type PartialBig1025 = DeepPartial<BigRecord1025>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten1025<T> = T extends Array<infer U> ? Flatten1025<U> : T;
type Nested1025 = number[][][][][][][][][][];
type Flat1025 = Flatten1025<Nested1025>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly1025<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly1025<T[K]> : T[K];
};
type DeepRequired1025<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired1025<T[K]> : T[K];
};
type FR1025 = DeepReadonly1025<DeepRequired1025<PartialBig1025>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion1025 =
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

type ExtractAlpha1025 = Extract<BigUnion1025, "alpha" | "bravo" | "charlie">;
type ExcludeZulu1025 = Exclude<BigUnion1025, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA1025 { width: number; height: number; depth: number }
interface ShapeB1025 { color: string; opacity: number; blend: string }
interface ShapeC1025 { x: number; y: number; z: number; w: number }
interface ShapeD1025 { label: string; title: string; summary: string }

type Combined1025 = ShapeA1025 & ShapeB1025 & ShapeC1025 & ShapeD1025;
type OptionalAll1025 = { [K in keyof Combined1025]?: Combined1025[K] };
type RequiredAll1025 = { [K in keyof Combined1025]-?: Combined1025[K] };
type ReadonlyAll1025 = { readonly [K in keyof Combined1025]: Combined1025[K] };
type NullableAll1025 = { [K in keyof Combined1025]: Combined1025[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString1025<T> = T extends string ? true : false;
type IsNumber1025<T> = T extends number ? true : false;
type TypeName1025<T> = T extends string
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

type TypeNames1025 = {
  [K in keyof BigRecord1025]: TypeName1025<BigRecord1025[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb1025 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource1025 = "user" | "post" | "comment" | "tag" | "category";
type Action1025 = `${Verb1025}_${Resource1025}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise1025<T> = T extends Promise<infer U> ? UnwrapPromise1025<U> : T;
type UnwrapArray1025<T> = T extends (infer U)[] ? UnwrapArray1025<U> : T;
type Head1025<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail1025<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation1025<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation1025<Exclude<T, K>>]
  : never;

type SmallUnion1025 = "a" | "b" | "c" | "d";
type AllPerms1025 = Permutation1025<SmallUnion1025>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig1025,
  Flat1025,
  FR1025,
  BigUnion1025,
  ExtractAlpha1025,
  ExcludeZulu1025,
  OptionalAll1025,
  RequiredAll1025,
  ReadonlyAll1025,
  NullableAll1025,
  TypeNames1025,
  Action1025,
  AllPerms1025,
};
