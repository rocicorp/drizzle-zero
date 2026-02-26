// pkg-05 / types-17  (seed 517) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord517 {
  a517: { x: number; y: string; z: boolean };
  b517: { p: string[]; q: Record<string, number> };
  c517: { nested: { deep: { deeper: { deepest: string } } } };
  d517: number;
  e517: string;
  f517: boolean;
  g517: null;
  h517: undefined;
  i517: bigint;
  j517: symbol;
}

type PartialBig517 = DeepPartial<BigRecord517>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten517<T> = T extends Array<infer U> ? Flatten517<U> : T;
type Nested517 = number[][][][][][][][][][];
type Flat517 = Flatten517<Nested517>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly517<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly517<T[K]> : T[K];
};
type DeepRequired517<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired517<T[K]> : T[K];
};
type FR517 = DeepReadonly517<DeepRequired517<PartialBig517>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion517 =
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

type ExtractAlpha517 = Extract<BigUnion517, "alpha" | "bravo" | "charlie">;
type ExcludeZulu517 = Exclude<BigUnion517, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA517 { width: number; height: number; depth: number }
interface ShapeB517 { color: string; opacity: number; blend: string }
interface ShapeC517 { x: number; y: number; z: number; w: number }
interface ShapeD517 { label: string; title: string; summary: string }

type Combined517 = ShapeA517 & ShapeB517 & ShapeC517 & ShapeD517;
type OptionalAll517 = { [K in keyof Combined517]?: Combined517[K] };
type RequiredAll517 = { [K in keyof Combined517]-?: Combined517[K] };
type ReadonlyAll517 = { readonly [K in keyof Combined517]: Combined517[K] };
type NullableAll517 = { [K in keyof Combined517]: Combined517[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString517<T> = T extends string ? true : false;
type IsNumber517<T> = T extends number ? true : false;
type TypeName517<T> = T extends string
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

type TypeNames517 = {
  [K in keyof BigRecord517]: TypeName517<BigRecord517[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb517 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource517 = "user" | "post" | "comment" | "tag" | "category";
type Action517 = `${Verb517}_${Resource517}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise517<T> = T extends Promise<infer U> ? UnwrapPromise517<U> : T;
type UnwrapArray517<T> = T extends (infer U)[] ? UnwrapArray517<U> : T;
type Head517<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail517<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation517<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation517<Exclude<T, K>>]
  : never;

type SmallUnion517 = "a" | "b" | "c" | "d";
type AllPerms517 = Permutation517<SmallUnion517>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig517,
  Flat517,
  FR517,
  BigUnion517,
  ExtractAlpha517,
  ExcludeZulu517,
  OptionalAll517,
  RequiredAll517,
  ReadonlyAll517,
  NullableAll517,
  TypeNames517,
  Action517,
  AllPerms517,
};
