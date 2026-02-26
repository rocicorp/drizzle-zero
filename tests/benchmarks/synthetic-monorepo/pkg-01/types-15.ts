// pkg-01 / types-15  (seed 115) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord115 {
  a115: { x: number; y: string; z: boolean };
  b115: { p: string[]; q: Record<string, number> };
  c115: { nested: { deep: { deeper: { deepest: string } } } };
  d115: number;
  e115: string;
  f115: boolean;
  g115: null;
  h115: undefined;
  i115: bigint;
  j115: symbol;
}

type PartialBig115 = DeepPartial<BigRecord115>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten115<T> = T extends Array<infer U> ? Flatten115<U> : T;
type Nested115 = number[][][][][][][][][][];
type Flat115 = Flatten115<Nested115>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly115<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly115<T[K]> : T[K];
};
type DeepRequired115<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired115<T[K]> : T[K];
};
type FR115 = DeepReadonly115<DeepRequired115<PartialBig115>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion115 =
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

type ExtractAlpha115 = Extract<BigUnion115, "alpha" | "bravo" | "charlie">;
type ExcludeZulu115 = Exclude<BigUnion115, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA115 { width: number; height: number; depth: number }
interface ShapeB115 { color: string; opacity: number; blend: string }
interface ShapeC115 { x: number; y: number; z: number; w: number }
interface ShapeD115 { label: string; title: string; summary: string }

type Combined115 = ShapeA115 & ShapeB115 & ShapeC115 & ShapeD115;
type OptionalAll115 = { [K in keyof Combined115]?: Combined115[K] };
type RequiredAll115 = { [K in keyof Combined115]-?: Combined115[K] };
type ReadonlyAll115 = { readonly [K in keyof Combined115]: Combined115[K] };
type NullableAll115 = { [K in keyof Combined115]: Combined115[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString115<T> = T extends string ? true : false;
type IsNumber115<T> = T extends number ? true : false;
type TypeName115<T> = T extends string
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

type TypeNames115 = {
  [K in keyof BigRecord115]: TypeName115<BigRecord115[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb115 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource115 = "user" | "post" | "comment" | "tag" | "category";
type Action115 = `${Verb115}_${Resource115}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise115<T> = T extends Promise<infer U> ? UnwrapPromise115<U> : T;
type UnwrapArray115<T> = T extends (infer U)[] ? UnwrapArray115<U> : T;
type Head115<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail115<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation115<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation115<Exclude<T, K>>]
  : never;

type SmallUnion115 = "a" | "b" | "c" | "d";
type AllPerms115 = Permutation115<SmallUnion115>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig115,
  Flat115,
  FR115,
  BigUnion115,
  ExtractAlpha115,
  ExcludeZulu115,
  OptionalAll115,
  RequiredAll115,
  ReadonlyAll115,
  NullableAll115,
  TypeNames115,
  Action115,
  AllPerms115,
};
