// pkg-04 / types-13  (seed 413) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord413 {
  a413: { x: number; y: string; z: boolean };
  b413: { p: string[]; q: Record<string, number> };
  c413: { nested: { deep: { deeper: { deepest: string } } } };
  d413: number;
  e413: string;
  f413: boolean;
  g413: null;
  h413: undefined;
  i413: bigint;
  j413: symbol;
}

type PartialBig413 = DeepPartial<BigRecord413>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten413<T> = T extends Array<infer U> ? Flatten413<U> : T;
type Nested413 = number[][][][][][][][][][];
type Flat413 = Flatten413<Nested413>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly413<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly413<T[K]> : T[K];
};
type DeepRequired413<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired413<T[K]> : T[K];
};
type FR413 = DeepReadonly413<DeepRequired413<PartialBig413>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion413 =
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

type ExtractAlpha413 = Extract<BigUnion413, "alpha" | "bravo" | "charlie">;
type ExcludeZulu413 = Exclude<BigUnion413, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA413 { width: number; height: number; depth: number }
interface ShapeB413 { color: string; opacity: number; blend: string }
interface ShapeC413 { x: number; y: number; z: number; w: number }
interface ShapeD413 { label: string; title: string; summary: string }

type Combined413 = ShapeA413 & ShapeB413 & ShapeC413 & ShapeD413;
type OptionalAll413 = { [K in keyof Combined413]?: Combined413[K] };
type RequiredAll413 = { [K in keyof Combined413]-?: Combined413[K] };
type ReadonlyAll413 = { readonly [K in keyof Combined413]: Combined413[K] };
type NullableAll413 = { [K in keyof Combined413]: Combined413[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString413<T> = T extends string ? true : false;
type IsNumber413<T> = T extends number ? true : false;
type TypeName413<T> = T extends string
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

type TypeNames413 = {
  [K in keyof BigRecord413]: TypeName413<BigRecord413[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb413 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource413 = "user" | "post" | "comment" | "tag" | "category";
type Action413 = `${Verb413}_${Resource413}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise413<T> = T extends Promise<infer U> ? UnwrapPromise413<U> : T;
type UnwrapArray413<T> = T extends (infer U)[] ? UnwrapArray413<U> : T;
type Head413<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail413<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation413<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation413<Exclude<T, K>>]
  : never;

type SmallUnion413 = "a" | "b" | "c" | "d";
type AllPerms413 = Permutation413<SmallUnion413>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig413,
  Flat413,
  FR413,
  BigUnion413,
  ExtractAlpha413,
  ExcludeZulu413,
  OptionalAll413,
  RequiredAll413,
  ReadonlyAll413,
  NullableAll413,
  TypeNames413,
  Action413,
  AllPerms413,
};
