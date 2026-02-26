// pkg-04 / types-17  (seed 417) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord417 {
  a417: { x: number; y: string; z: boolean };
  b417: { p: string[]; q: Record<string, number> };
  c417: { nested: { deep: { deeper: { deepest: string } } } };
  d417: number;
  e417: string;
  f417: boolean;
  g417: null;
  h417: undefined;
  i417: bigint;
  j417: symbol;
}

type PartialBig417 = DeepPartial<BigRecord417>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten417<T> = T extends Array<infer U> ? Flatten417<U> : T;
type Nested417 = number[][][][][][][][][][];
type Flat417 = Flatten417<Nested417>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly417<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly417<T[K]> : T[K];
};
type DeepRequired417<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired417<T[K]> : T[K];
};
type FR417 = DeepReadonly417<DeepRequired417<PartialBig417>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion417 =
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

type ExtractAlpha417 = Extract<BigUnion417, "alpha" | "bravo" | "charlie">;
type ExcludeZulu417 = Exclude<BigUnion417, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA417 { width: number; height: number; depth: number }
interface ShapeB417 { color: string; opacity: number; blend: string }
interface ShapeC417 { x: number; y: number; z: number; w: number }
interface ShapeD417 { label: string; title: string; summary: string }

type Combined417 = ShapeA417 & ShapeB417 & ShapeC417 & ShapeD417;
type OptionalAll417 = { [K in keyof Combined417]?: Combined417[K] };
type RequiredAll417 = { [K in keyof Combined417]-?: Combined417[K] };
type ReadonlyAll417 = { readonly [K in keyof Combined417]: Combined417[K] };
type NullableAll417 = { [K in keyof Combined417]: Combined417[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString417<T> = T extends string ? true : false;
type IsNumber417<T> = T extends number ? true : false;
type TypeName417<T> = T extends string
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

type TypeNames417 = {
  [K in keyof BigRecord417]: TypeName417<BigRecord417[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb417 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource417 = "user" | "post" | "comment" | "tag" | "category";
type Action417 = `${Verb417}_${Resource417}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise417<T> = T extends Promise<infer U> ? UnwrapPromise417<U> : T;
type UnwrapArray417<T> = T extends (infer U)[] ? UnwrapArray417<U> : T;
type Head417<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail417<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation417<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation417<Exclude<T, K>>]
  : never;

type SmallUnion417 = "a" | "b" | "c" | "d";
type AllPerms417 = Permutation417<SmallUnion417>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig417,
  Flat417,
  FR417,
  BigUnion417,
  ExtractAlpha417,
  ExcludeZulu417,
  OptionalAll417,
  RequiredAll417,
  ReadonlyAll417,
  NullableAll417,
  TypeNames417,
  Action417,
  AllPerms417,
};
