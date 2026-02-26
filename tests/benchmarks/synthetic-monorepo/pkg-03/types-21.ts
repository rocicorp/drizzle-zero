// pkg-03 / types-21  (seed 321) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord321 {
  a321: { x: number; y: string; z: boolean };
  b321: { p: string[]; q: Record<string, number> };
  c321: { nested: { deep: { deeper: { deepest: string } } } };
  d321: number;
  e321: string;
  f321: boolean;
  g321: null;
  h321: undefined;
  i321: bigint;
  j321: symbol;
}

type PartialBig321 = DeepPartial<BigRecord321>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten321<T> = T extends Array<infer U> ? Flatten321<U> : T;
type Nested321 = number[][][][][][][][][][];
type Flat321 = Flatten321<Nested321>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly321<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly321<T[K]> : T[K];
};
type DeepRequired321<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired321<T[K]> : T[K];
};
type FR321 = DeepReadonly321<DeepRequired321<PartialBig321>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion321 =
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

type ExtractAlpha321 = Extract<BigUnion321, "alpha" | "bravo" | "charlie">;
type ExcludeZulu321 = Exclude<BigUnion321, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA321 { width: number; height: number; depth: number }
interface ShapeB321 { color: string; opacity: number; blend: string }
interface ShapeC321 { x: number; y: number; z: number; w: number }
interface ShapeD321 { label: string; title: string; summary: string }

type Combined321 = ShapeA321 & ShapeB321 & ShapeC321 & ShapeD321;
type OptionalAll321 = { [K in keyof Combined321]?: Combined321[K] };
type RequiredAll321 = { [K in keyof Combined321]-?: Combined321[K] };
type ReadonlyAll321 = { readonly [K in keyof Combined321]: Combined321[K] };
type NullableAll321 = { [K in keyof Combined321]: Combined321[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString321<T> = T extends string ? true : false;
type IsNumber321<T> = T extends number ? true : false;
type TypeName321<T> = T extends string
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

type TypeNames321 = {
  [K in keyof BigRecord321]: TypeName321<BigRecord321[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb321 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource321 = "user" | "post" | "comment" | "tag" | "category";
type Action321 = `${Verb321}_${Resource321}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise321<T> = T extends Promise<infer U> ? UnwrapPromise321<U> : T;
type UnwrapArray321<T> = T extends (infer U)[] ? UnwrapArray321<U> : T;
type Head321<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail321<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation321<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation321<Exclude<T, K>>]
  : never;

type SmallUnion321 = "a" | "b" | "c" | "d";
type AllPerms321 = Permutation321<SmallUnion321>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig321,
  Flat321,
  FR321,
  BigUnion321,
  ExtractAlpha321,
  ExcludeZulu321,
  OptionalAll321,
  RequiredAll321,
  ReadonlyAll321,
  NullableAll321,
  TypeNames321,
  Action321,
  AllPerms321,
};
