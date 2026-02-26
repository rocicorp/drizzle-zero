// pkg-04 / types-01  (seed 401) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord401 {
  a401: { x: number; y: string; z: boolean };
  b401: { p: string[]; q: Record<string, number> };
  c401: { nested: { deep: { deeper: { deepest: string } } } };
  d401: number;
  e401: string;
  f401: boolean;
  g401: null;
  h401: undefined;
  i401: bigint;
  j401: symbol;
}

type PartialBig401 = DeepPartial<BigRecord401>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten401<T> = T extends Array<infer U> ? Flatten401<U> : T;
type Nested401 = number[][][][][][][][][][];
type Flat401 = Flatten401<Nested401>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly401<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly401<T[K]> : T[K];
};
type DeepRequired401<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired401<T[K]> : T[K];
};
type FR401 = DeepReadonly401<DeepRequired401<PartialBig401>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion401 =
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

type ExtractAlpha401 = Extract<BigUnion401, "alpha" | "bravo" | "charlie">;
type ExcludeZulu401 = Exclude<BigUnion401, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA401 { width: number; height: number; depth: number }
interface ShapeB401 { color: string; opacity: number; blend: string }
interface ShapeC401 { x: number; y: number; z: number; w: number }
interface ShapeD401 { label: string; title: string; summary: string }

type Combined401 = ShapeA401 & ShapeB401 & ShapeC401 & ShapeD401;
type OptionalAll401 = { [K in keyof Combined401]?: Combined401[K] };
type RequiredAll401 = { [K in keyof Combined401]-?: Combined401[K] };
type ReadonlyAll401 = { readonly [K in keyof Combined401]: Combined401[K] };
type NullableAll401 = { [K in keyof Combined401]: Combined401[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString401<T> = T extends string ? true : false;
type IsNumber401<T> = T extends number ? true : false;
type TypeName401<T> = T extends string
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

type TypeNames401 = {
  [K in keyof BigRecord401]: TypeName401<BigRecord401[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb401 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource401 = "user" | "post" | "comment" | "tag" | "category";
type Action401 = `${Verb401}_${Resource401}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise401<T> = T extends Promise<infer U> ? UnwrapPromise401<U> : T;
type UnwrapArray401<T> = T extends (infer U)[] ? UnwrapArray401<U> : T;
type Head401<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail401<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation401<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation401<Exclude<T, K>>]
  : never;

type SmallUnion401 = "a" | "b" | "c" | "d";
type AllPerms401 = Permutation401<SmallUnion401>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig401,
  Flat401,
  FR401,
  BigUnion401,
  ExtractAlpha401,
  ExcludeZulu401,
  OptionalAll401,
  RequiredAll401,
  ReadonlyAll401,
  NullableAll401,
  TypeNames401,
  Action401,
  AllPerms401,
};
