// pkg-03 / types-38  (seed 338) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord338 {
  a338: { x: number; y: string; z: boolean };
  b338: { p: string[]; q: Record<string, number> };
  c338: { nested: { deep: { deeper: { deepest: string } } } };
  d338: number;
  e338: string;
  f338: boolean;
  g338: null;
  h338: undefined;
  i338: bigint;
  j338: symbol;
}

type PartialBig338 = DeepPartial<BigRecord338>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten338<T> = T extends Array<infer U> ? Flatten338<U> : T;
type Nested338 = number[][][][][][][][][][];
type Flat338 = Flatten338<Nested338>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly338<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly338<T[K]> : T[K];
};
type DeepRequired338<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired338<T[K]> : T[K];
};
type FR338 = DeepReadonly338<DeepRequired338<PartialBig338>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion338 =
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

type ExtractAlpha338 = Extract<BigUnion338, "alpha" | "bravo" | "charlie">;
type ExcludeZulu338 = Exclude<BigUnion338, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA338 { width: number; height: number; depth: number }
interface ShapeB338 { color: string; opacity: number; blend: string }
interface ShapeC338 { x: number; y: number; z: number; w: number }
interface ShapeD338 { label: string; title: string; summary: string }

type Combined338 = ShapeA338 & ShapeB338 & ShapeC338 & ShapeD338;
type OptionalAll338 = { [K in keyof Combined338]?: Combined338[K] };
type RequiredAll338 = { [K in keyof Combined338]-?: Combined338[K] };
type ReadonlyAll338 = { readonly [K in keyof Combined338]: Combined338[K] };
type NullableAll338 = { [K in keyof Combined338]: Combined338[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString338<T> = T extends string ? true : false;
type IsNumber338<T> = T extends number ? true : false;
type TypeName338<T> = T extends string
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

type TypeNames338 = {
  [K in keyof BigRecord338]: TypeName338<BigRecord338[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb338 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource338 = "user" | "post" | "comment" | "tag" | "category";
type Action338 = `${Verb338}_${Resource338}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise338<T> = T extends Promise<infer U> ? UnwrapPromise338<U> : T;
type UnwrapArray338<T> = T extends (infer U)[] ? UnwrapArray338<U> : T;
type Head338<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail338<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation338<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation338<Exclude<T, K>>]
  : never;

type SmallUnion338 = "a" | "b" | "c" | "d";
type AllPerms338 = Permutation338<SmallUnion338>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig338,
  Flat338,
  FR338,
  BigUnion338,
  ExtractAlpha338,
  ExcludeZulu338,
  OptionalAll338,
  RequiredAll338,
  ReadonlyAll338,
  NullableAll338,
  TypeNames338,
  Action338,
  AllPerms338,
};
