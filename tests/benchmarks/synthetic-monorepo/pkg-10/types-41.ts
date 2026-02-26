// pkg-10 / types-41  (seed 1041) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord1041 {
  a1041: { x: number; y: string; z: boolean };
  b1041: { p: string[]; q: Record<string, number> };
  c1041: { nested: { deep: { deeper: { deepest: string } } } };
  d1041: number;
  e1041: string;
  f1041: boolean;
  g1041: null;
  h1041: undefined;
  i1041: bigint;
  j1041: symbol;
}

type PartialBig1041 = DeepPartial<BigRecord1041>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten1041<T> = T extends Array<infer U> ? Flatten1041<U> : T;
type Nested1041 = number[][][][][][][][][][];
type Flat1041 = Flatten1041<Nested1041>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly1041<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly1041<T[K]> : T[K];
};
type DeepRequired1041<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired1041<T[K]> : T[K];
};
type FR1041 = DeepReadonly1041<DeepRequired1041<PartialBig1041>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion1041 =
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

type ExtractAlpha1041 = Extract<BigUnion1041, "alpha" | "bravo" | "charlie">;
type ExcludeZulu1041 = Exclude<BigUnion1041, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA1041 { width: number; height: number; depth: number }
interface ShapeB1041 { color: string; opacity: number; blend: string }
interface ShapeC1041 { x: number; y: number; z: number; w: number }
interface ShapeD1041 { label: string; title: string; summary: string }

type Combined1041 = ShapeA1041 & ShapeB1041 & ShapeC1041 & ShapeD1041;
type OptionalAll1041 = { [K in keyof Combined1041]?: Combined1041[K] };
type RequiredAll1041 = { [K in keyof Combined1041]-?: Combined1041[K] };
type ReadonlyAll1041 = { readonly [K in keyof Combined1041]: Combined1041[K] };
type NullableAll1041 = { [K in keyof Combined1041]: Combined1041[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString1041<T> = T extends string ? true : false;
type IsNumber1041<T> = T extends number ? true : false;
type TypeName1041<T> = T extends string
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

type TypeNames1041 = {
  [K in keyof BigRecord1041]: TypeName1041<BigRecord1041[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb1041 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource1041 = "user" | "post" | "comment" | "tag" | "category";
type Action1041 = `${Verb1041}_${Resource1041}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise1041<T> = T extends Promise<infer U> ? UnwrapPromise1041<U> : T;
type UnwrapArray1041<T> = T extends (infer U)[] ? UnwrapArray1041<U> : T;
type Head1041<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail1041<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation1041<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation1041<Exclude<T, K>>]
  : never;

type SmallUnion1041 = "a" | "b" | "c" | "d";
type AllPerms1041 = Permutation1041<SmallUnion1041>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig1041,
  Flat1041,
  FR1041,
  BigUnion1041,
  ExtractAlpha1041,
  ExcludeZulu1041,
  OptionalAll1041,
  RequiredAll1041,
  ReadonlyAll1041,
  NullableAll1041,
  TypeNames1041,
  Action1041,
  AllPerms1041,
};
