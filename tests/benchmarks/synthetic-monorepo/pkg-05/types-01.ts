// pkg-05 / types-01  (seed 501) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord501 {
  a501: { x: number; y: string; z: boolean };
  b501: { p: string[]; q: Record<string, number> };
  c501: { nested: { deep: { deeper: { deepest: string } } } };
  d501: number;
  e501: string;
  f501: boolean;
  g501: null;
  h501: undefined;
  i501: bigint;
  j501: symbol;
}

type PartialBig501 = DeepPartial<BigRecord501>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten501<T> = T extends Array<infer U> ? Flatten501<U> : T;
type Nested501 = number[][][][][][][][][][];
type Flat501 = Flatten501<Nested501>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly501<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly501<T[K]> : T[K];
};
type DeepRequired501<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired501<T[K]> : T[K];
};
type FR501 = DeepReadonly501<DeepRequired501<PartialBig501>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion501 =
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

type ExtractAlpha501 = Extract<BigUnion501, "alpha" | "bravo" | "charlie">;
type ExcludeZulu501 = Exclude<BigUnion501, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA501 { width: number; height: number; depth: number }
interface ShapeB501 { color: string; opacity: number; blend: string }
interface ShapeC501 { x: number; y: number; z: number; w: number }
interface ShapeD501 { label: string; title: string; summary: string }

type Combined501 = ShapeA501 & ShapeB501 & ShapeC501 & ShapeD501;
type OptionalAll501 = { [K in keyof Combined501]?: Combined501[K] };
type RequiredAll501 = { [K in keyof Combined501]-?: Combined501[K] };
type ReadonlyAll501 = { readonly [K in keyof Combined501]: Combined501[K] };
type NullableAll501 = { [K in keyof Combined501]: Combined501[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString501<T> = T extends string ? true : false;
type IsNumber501<T> = T extends number ? true : false;
type TypeName501<T> = T extends string
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

type TypeNames501 = {
  [K in keyof BigRecord501]: TypeName501<BigRecord501[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb501 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource501 = "user" | "post" | "comment" | "tag" | "category";
type Action501 = `${Verb501}_${Resource501}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise501<T> = T extends Promise<infer U> ? UnwrapPromise501<U> : T;
type UnwrapArray501<T> = T extends (infer U)[] ? UnwrapArray501<U> : T;
type Head501<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail501<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation501<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation501<Exclude<T, K>>]
  : never;

type SmallUnion501 = "a" | "b" | "c" | "d";
type AllPerms501 = Permutation501<SmallUnion501>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig501,
  Flat501,
  FR501,
  BigUnion501,
  ExtractAlpha501,
  ExcludeZulu501,
  OptionalAll501,
  RequiredAll501,
  ReadonlyAll501,
  NullableAll501,
  TypeNames501,
  Action501,
  AllPerms501,
};
