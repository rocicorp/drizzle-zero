// pkg-07 / types-29  (seed 729) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord729 {
  a729: { x: number; y: string; z: boolean };
  b729: { p: string[]; q: Record<string, number> };
  c729: { nested: { deep: { deeper: { deepest: string } } } };
  d729: number;
  e729: string;
  f729: boolean;
  g729: null;
  h729: undefined;
  i729: bigint;
  j729: symbol;
}

type PartialBig729 = DeepPartial<BigRecord729>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten729<T> = T extends Array<infer U> ? Flatten729<U> : T;
type Nested729 = number[][][][][][][][][][];
type Flat729 = Flatten729<Nested729>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly729<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly729<T[K]> : T[K];
};
type DeepRequired729<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired729<T[K]> : T[K];
};
type FR729 = DeepReadonly729<DeepRequired729<PartialBig729>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion729 =
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

type ExtractAlpha729 = Extract<BigUnion729, "alpha" | "bravo" | "charlie">;
type ExcludeZulu729 = Exclude<BigUnion729, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA729 { width: number; height: number; depth: number }
interface ShapeB729 { color: string; opacity: number; blend: string }
interface ShapeC729 { x: number; y: number; z: number; w: number }
interface ShapeD729 { label: string; title: string; summary: string }

type Combined729 = ShapeA729 & ShapeB729 & ShapeC729 & ShapeD729;
type OptionalAll729 = { [K in keyof Combined729]?: Combined729[K] };
type RequiredAll729 = { [K in keyof Combined729]-?: Combined729[K] };
type ReadonlyAll729 = { readonly [K in keyof Combined729]: Combined729[K] };
type NullableAll729 = { [K in keyof Combined729]: Combined729[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString729<T> = T extends string ? true : false;
type IsNumber729<T> = T extends number ? true : false;
type TypeName729<T> = T extends string
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

type TypeNames729 = {
  [K in keyof BigRecord729]: TypeName729<BigRecord729[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb729 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource729 = "user" | "post" | "comment" | "tag" | "category";
type Action729 = `${Verb729}_${Resource729}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise729<T> = T extends Promise<infer U> ? UnwrapPromise729<U> : T;
type UnwrapArray729<T> = T extends (infer U)[] ? UnwrapArray729<U> : T;
type Head729<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail729<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation729<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation729<Exclude<T, K>>]
  : never;

type SmallUnion729 = "a" | "b" | "c" | "d";
type AllPerms729 = Permutation729<SmallUnion729>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig729,
  Flat729,
  FR729,
  BigUnion729,
  ExtractAlpha729,
  ExcludeZulu729,
  OptionalAll729,
  RequiredAll729,
  ReadonlyAll729,
  NullableAll729,
  TypeNames729,
  Action729,
  AllPerms729,
};
