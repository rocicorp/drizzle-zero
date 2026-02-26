// pkg-08 / types-09  (seed 809) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord809 {
  a809: { x: number; y: string; z: boolean };
  b809: { p: string[]; q: Record<string, number> };
  c809: { nested: { deep: { deeper: { deepest: string } } } };
  d809: number;
  e809: string;
  f809: boolean;
  g809: null;
  h809: undefined;
  i809: bigint;
  j809: symbol;
}

type PartialBig809 = DeepPartial<BigRecord809>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten809<T> = T extends Array<infer U> ? Flatten809<U> : T;
type Nested809 = number[][][][][][][][][][];
type Flat809 = Flatten809<Nested809>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly809<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly809<T[K]> : T[K];
};
type DeepRequired809<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired809<T[K]> : T[K];
};
type FR809 = DeepReadonly809<DeepRequired809<PartialBig809>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion809 =
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

type ExtractAlpha809 = Extract<BigUnion809, "alpha" | "bravo" | "charlie">;
type ExcludeZulu809 = Exclude<BigUnion809, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA809 { width: number; height: number; depth: number }
interface ShapeB809 { color: string; opacity: number; blend: string }
interface ShapeC809 { x: number; y: number; z: number; w: number }
interface ShapeD809 { label: string; title: string; summary: string }

type Combined809 = ShapeA809 & ShapeB809 & ShapeC809 & ShapeD809;
type OptionalAll809 = { [K in keyof Combined809]?: Combined809[K] };
type RequiredAll809 = { [K in keyof Combined809]-?: Combined809[K] };
type ReadonlyAll809 = { readonly [K in keyof Combined809]: Combined809[K] };
type NullableAll809 = { [K in keyof Combined809]: Combined809[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString809<T> = T extends string ? true : false;
type IsNumber809<T> = T extends number ? true : false;
type TypeName809<T> = T extends string
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

type TypeNames809 = {
  [K in keyof BigRecord809]: TypeName809<BigRecord809[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb809 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource809 = "user" | "post" | "comment" | "tag" | "category";
type Action809 = `${Verb809}_${Resource809}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise809<T> = T extends Promise<infer U> ? UnwrapPromise809<U> : T;
type UnwrapArray809<T> = T extends (infer U)[] ? UnwrapArray809<U> : T;
type Head809<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail809<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation809<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation809<Exclude<T, K>>]
  : never;

type SmallUnion809 = "a" | "b" | "c" | "d";
type AllPerms809 = Permutation809<SmallUnion809>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig809,
  Flat809,
  FR809,
  BigUnion809,
  ExtractAlpha809,
  ExcludeZulu809,
  OptionalAll809,
  RequiredAll809,
  ReadonlyAll809,
  NullableAll809,
  TypeNames809,
  Action809,
  AllPerms809,
};
