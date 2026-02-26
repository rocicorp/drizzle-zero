// pkg-05 / types-05  (seed 505) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord505 {
  a505: { x: number; y: string; z: boolean };
  b505: { p: string[]; q: Record<string, number> };
  c505: { nested: { deep: { deeper: { deepest: string } } } };
  d505: number;
  e505: string;
  f505: boolean;
  g505: null;
  h505: undefined;
  i505: bigint;
  j505: symbol;
}

type PartialBig505 = DeepPartial<BigRecord505>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten505<T> = T extends Array<infer U> ? Flatten505<U> : T;
type Nested505 = number[][][][][][][][][][];
type Flat505 = Flatten505<Nested505>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly505<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly505<T[K]> : T[K];
};
type DeepRequired505<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired505<T[K]> : T[K];
};
type FR505 = DeepReadonly505<DeepRequired505<PartialBig505>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion505 =
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

type ExtractAlpha505 = Extract<BigUnion505, "alpha" | "bravo" | "charlie">;
type ExcludeZulu505 = Exclude<BigUnion505, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA505 { width: number; height: number; depth: number }
interface ShapeB505 { color: string; opacity: number; blend: string }
interface ShapeC505 { x: number; y: number; z: number; w: number }
interface ShapeD505 { label: string; title: string; summary: string }

type Combined505 = ShapeA505 & ShapeB505 & ShapeC505 & ShapeD505;
type OptionalAll505 = { [K in keyof Combined505]?: Combined505[K] };
type RequiredAll505 = { [K in keyof Combined505]-?: Combined505[K] };
type ReadonlyAll505 = { readonly [K in keyof Combined505]: Combined505[K] };
type NullableAll505 = { [K in keyof Combined505]: Combined505[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString505<T> = T extends string ? true : false;
type IsNumber505<T> = T extends number ? true : false;
type TypeName505<T> = T extends string
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

type TypeNames505 = {
  [K in keyof BigRecord505]: TypeName505<BigRecord505[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb505 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource505 = "user" | "post" | "comment" | "tag" | "category";
type Action505 = `${Verb505}_${Resource505}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise505<T> = T extends Promise<infer U> ? UnwrapPromise505<U> : T;
type UnwrapArray505<T> = T extends (infer U)[] ? UnwrapArray505<U> : T;
type Head505<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail505<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation505<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation505<Exclude<T, K>>]
  : never;

type SmallUnion505 = "a" | "b" | "c" | "d";
type AllPerms505 = Permutation505<SmallUnion505>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig505,
  Flat505,
  FR505,
  BigUnion505,
  ExtractAlpha505,
  ExcludeZulu505,
  OptionalAll505,
  RequiredAll505,
  ReadonlyAll505,
  NullableAll505,
  TypeNames505,
  Action505,
  AllPerms505,
};
