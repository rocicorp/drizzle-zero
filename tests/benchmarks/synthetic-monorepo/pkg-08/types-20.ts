// pkg-08 / types-20  (seed 820) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord820 {
  a820: { x: number; y: string; z: boolean };
  b820: { p: string[]; q: Record<string, number> };
  c820: { nested: { deep: { deeper: { deepest: string } } } };
  d820: number;
  e820: string;
  f820: boolean;
  g820: null;
  h820: undefined;
  i820: bigint;
  j820: symbol;
}

type PartialBig820 = DeepPartial<BigRecord820>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten820<T> = T extends Array<infer U> ? Flatten820<U> : T;
type Nested820 = number[][][][][][][][][][];
type Flat820 = Flatten820<Nested820>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly820<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly820<T[K]> : T[K];
};
type DeepRequired820<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired820<T[K]> : T[K];
};
type FR820 = DeepReadonly820<DeepRequired820<PartialBig820>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion820 =
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

type ExtractAlpha820 = Extract<BigUnion820, "alpha" | "bravo" | "charlie">;
type ExcludeZulu820 = Exclude<BigUnion820, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA820 { width: number; height: number; depth: number }
interface ShapeB820 { color: string; opacity: number; blend: string }
interface ShapeC820 { x: number; y: number; z: number; w: number }
interface ShapeD820 { label: string; title: string; summary: string }

type Combined820 = ShapeA820 & ShapeB820 & ShapeC820 & ShapeD820;
type OptionalAll820 = { [K in keyof Combined820]?: Combined820[K] };
type RequiredAll820 = { [K in keyof Combined820]-?: Combined820[K] };
type ReadonlyAll820 = { readonly [K in keyof Combined820]: Combined820[K] };
type NullableAll820 = { [K in keyof Combined820]: Combined820[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString820<T> = T extends string ? true : false;
type IsNumber820<T> = T extends number ? true : false;
type TypeName820<T> = T extends string
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

type TypeNames820 = {
  [K in keyof BigRecord820]: TypeName820<BigRecord820[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb820 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource820 = "user" | "post" | "comment" | "tag" | "category";
type Action820 = `${Verb820}_${Resource820}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise820<T> = T extends Promise<infer U> ? UnwrapPromise820<U> : T;
type UnwrapArray820<T> = T extends (infer U)[] ? UnwrapArray820<U> : T;
type Head820<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail820<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation820<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation820<Exclude<T, K>>]
  : never;

type SmallUnion820 = "a" | "b" | "c" | "d";
type AllPerms820 = Permutation820<SmallUnion820>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig820,
  Flat820,
  FR820,
  BigUnion820,
  ExtractAlpha820,
  ExcludeZulu820,
  OptionalAll820,
  RequiredAll820,
  ReadonlyAll820,
  NullableAll820,
  TypeNames820,
  Action820,
  AllPerms820,
};
