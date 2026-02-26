// pkg-05 / types-03  (seed 503) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord503 {
  a503: { x: number; y: string; z: boolean };
  b503: { p: string[]; q: Record<string, number> };
  c503: { nested: { deep: { deeper: { deepest: string } } } };
  d503: number;
  e503: string;
  f503: boolean;
  g503: null;
  h503: undefined;
  i503: bigint;
  j503: symbol;
}

type PartialBig503 = DeepPartial<BigRecord503>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten503<T> = T extends Array<infer U> ? Flatten503<U> : T;
type Nested503 = number[][][][][][][][][][];
type Flat503 = Flatten503<Nested503>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly503<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly503<T[K]> : T[K];
};
type DeepRequired503<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired503<T[K]> : T[K];
};
type FR503 = DeepReadonly503<DeepRequired503<PartialBig503>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion503 =
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

type ExtractAlpha503 = Extract<BigUnion503, "alpha" | "bravo" | "charlie">;
type ExcludeZulu503 = Exclude<BigUnion503, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA503 { width: number; height: number; depth: number }
interface ShapeB503 { color: string; opacity: number; blend: string }
interface ShapeC503 { x: number; y: number; z: number; w: number }
interface ShapeD503 { label: string; title: string; summary: string }

type Combined503 = ShapeA503 & ShapeB503 & ShapeC503 & ShapeD503;
type OptionalAll503 = { [K in keyof Combined503]?: Combined503[K] };
type RequiredAll503 = { [K in keyof Combined503]-?: Combined503[K] };
type ReadonlyAll503 = { readonly [K in keyof Combined503]: Combined503[K] };
type NullableAll503 = { [K in keyof Combined503]: Combined503[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString503<T> = T extends string ? true : false;
type IsNumber503<T> = T extends number ? true : false;
type TypeName503<T> = T extends string
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

type TypeNames503 = {
  [K in keyof BigRecord503]: TypeName503<BigRecord503[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb503 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource503 = "user" | "post" | "comment" | "tag" | "category";
type Action503 = `${Verb503}_${Resource503}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise503<T> = T extends Promise<infer U> ? UnwrapPromise503<U> : T;
type UnwrapArray503<T> = T extends (infer U)[] ? UnwrapArray503<U> : T;
type Head503<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail503<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation503<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation503<Exclude<T, K>>]
  : never;

type SmallUnion503 = "a" | "b" | "c" | "d";
type AllPerms503 = Permutation503<SmallUnion503>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig503,
  Flat503,
  FR503,
  BigUnion503,
  ExtractAlpha503,
  ExcludeZulu503,
  OptionalAll503,
  RequiredAll503,
  ReadonlyAll503,
  NullableAll503,
  TypeNames503,
  Action503,
  AllPerms503,
};
