// pkg-02 / types-33  (seed 233) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord233 {
  a233: { x: number; y: string; z: boolean };
  b233: { p: string[]; q: Record<string, number> };
  c233: { nested: { deep: { deeper: { deepest: string } } } };
  d233: number;
  e233: string;
  f233: boolean;
  g233: null;
  h233: undefined;
  i233: bigint;
  j233: symbol;
}

type PartialBig233 = DeepPartial<BigRecord233>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten233<T> = T extends Array<infer U> ? Flatten233<U> : T;
type Nested233 = number[][][][][][][][][][];
type Flat233 = Flatten233<Nested233>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly233<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly233<T[K]> : T[K];
};
type DeepRequired233<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired233<T[K]> : T[K];
};
type FR233 = DeepReadonly233<DeepRequired233<PartialBig233>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion233 =
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

type ExtractAlpha233 = Extract<BigUnion233, "alpha" | "bravo" | "charlie">;
type ExcludeZulu233 = Exclude<BigUnion233, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA233 { width: number; height: number; depth: number }
interface ShapeB233 { color: string; opacity: number; blend: string }
interface ShapeC233 { x: number; y: number; z: number; w: number }
interface ShapeD233 { label: string; title: string; summary: string }

type Combined233 = ShapeA233 & ShapeB233 & ShapeC233 & ShapeD233;
type OptionalAll233 = { [K in keyof Combined233]?: Combined233[K] };
type RequiredAll233 = { [K in keyof Combined233]-?: Combined233[K] };
type ReadonlyAll233 = { readonly [K in keyof Combined233]: Combined233[K] };
type NullableAll233 = { [K in keyof Combined233]: Combined233[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString233<T> = T extends string ? true : false;
type IsNumber233<T> = T extends number ? true : false;
type TypeName233<T> = T extends string
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

type TypeNames233 = {
  [K in keyof BigRecord233]: TypeName233<BigRecord233[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb233 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource233 = "user" | "post" | "comment" | "tag" | "category";
type Action233 = `${Verb233}_${Resource233}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise233<T> = T extends Promise<infer U> ? UnwrapPromise233<U> : T;
type UnwrapArray233<T> = T extends (infer U)[] ? UnwrapArray233<U> : T;
type Head233<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail233<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation233<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation233<Exclude<T, K>>]
  : never;

type SmallUnion233 = "a" | "b" | "c" | "d";
type AllPerms233 = Permutation233<SmallUnion233>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig233,
  Flat233,
  FR233,
  BigUnion233,
  ExtractAlpha233,
  ExcludeZulu233,
  OptionalAll233,
  RequiredAll233,
  ReadonlyAll233,
  NullableAll233,
  TypeNames233,
  Action233,
  AllPerms233,
};
