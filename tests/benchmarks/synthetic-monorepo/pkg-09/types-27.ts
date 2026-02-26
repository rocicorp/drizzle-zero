// pkg-09 / types-27  (seed 927) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord927 {
  a927: { x: number; y: string; z: boolean };
  b927: { p: string[]; q: Record<string, number> };
  c927: { nested: { deep: { deeper: { deepest: string } } } };
  d927: number;
  e927: string;
  f927: boolean;
  g927: null;
  h927: undefined;
  i927: bigint;
  j927: symbol;
}

type PartialBig927 = DeepPartial<BigRecord927>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten927<T> = T extends Array<infer U> ? Flatten927<U> : T;
type Nested927 = number[][][][][][][][][][];
type Flat927 = Flatten927<Nested927>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly927<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly927<T[K]> : T[K];
};
type DeepRequired927<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired927<T[K]> : T[K];
};
type FR927 = DeepReadonly927<DeepRequired927<PartialBig927>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion927 =
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

type ExtractAlpha927 = Extract<BigUnion927, "alpha" | "bravo" | "charlie">;
type ExcludeZulu927 = Exclude<BigUnion927, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA927 { width: number; height: number; depth: number }
interface ShapeB927 { color: string; opacity: number; blend: string }
interface ShapeC927 { x: number; y: number; z: number; w: number }
interface ShapeD927 { label: string; title: string; summary: string }

type Combined927 = ShapeA927 & ShapeB927 & ShapeC927 & ShapeD927;
type OptionalAll927 = { [K in keyof Combined927]?: Combined927[K] };
type RequiredAll927 = { [K in keyof Combined927]-?: Combined927[K] };
type ReadonlyAll927 = { readonly [K in keyof Combined927]: Combined927[K] };
type NullableAll927 = { [K in keyof Combined927]: Combined927[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString927<T> = T extends string ? true : false;
type IsNumber927<T> = T extends number ? true : false;
type TypeName927<T> = T extends string
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

type TypeNames927 = {
  [K in keyof BigRecord927]: TypeName927<BigRecord927[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb927 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource927 = "user" | "post" | "comment" | "tag" | "category";
type Action927 = `${Verb927}_${Resource927}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise927<T> = T extends Promise<infer U> ? UnwrapPromise927<U> : T;
type UnwrapArray927<T> = T extends (infer U)[] ? UnwrapArray927<U> : T;
type Head927<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail927<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation927<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation927<Exclude<T, K>>]
  : never;

type SmallUnion927 = "a" | "b" | "c" | "d";
type AllPerms927 = Permutation927<SmallUnion927>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig927,
  Flat927,
  FR927,
  BigUnion927,
  ExtractAlpha927,
  ExcludeZulu927,
  OptionalAll927,
  RequiredAll927,
  ReadonlyAll927,
  NullableAll927,
  TypeNames927,
  Action927,
  AllPerms927,
};
