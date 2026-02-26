// pkg-01 / types-42  (seed 142) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord142 {
  a142: { x: number; y: string; z: boolean };
  b142: { p: string[]; q: Record<string, number> };
  c142: { nested: { deep: { deeper: { deepest: string } } } };
  d142: number;
  e142: string;
  f142: boolean;
  g142: null;
  h142: undefined;
  i142: bigint;
  j142: symbol;
}

type PartialBig142 = DeepPartial<BigRecord142>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten142<T> = T extends Array<infer U> ? Flatten142<U> : T;
type Nested142 = number[][][][][][][][][][];
type Flat142 = Flatten142<Nested142>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly142<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly142<T[K]> : T[K];
};
type DeepRequired142<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired142<T[K]> : T[K];
};
type FR142 = DeepReadonly142<DeepRequired142<PartialBig142>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion142 =
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

type ExtractAlpha142 = Extract<BigUnion142, "alpha" | "bravo" | "charlie">;
type ExcludeZulu142 = Exclude<BigUnion142, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA142 { width: number; height: number; depth: number }
interface ShapeB142 { color: string; opacity: number; blend: string }
interface ShapeC142 { x: number; y: number; z: number; w: number }
interface ShapeD142 { label: string; title: string; summary: string }

type Combined142 = ShapeA142 & ShapeB142 & ShapeC142 & ShapeD142;
type OptionalAll142 = { [K in keyof Combined142]?: Combined142[K] };
type RequiredAll142 = { [K in keyof Combined142]-?: Combined142[K] };
type ReadonlyAll142 = { readonly [K in keyof Combined142]: Combined142[K] };
type NullableAll142 = { [K in keyof Combined142]: Combined142[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString142<T> = T extends string ? true : false;
type IsNumber142<T> = T extends number ? true : false;
type TypeName142<T> = T extends string
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

type TypeNames142 = {
  [K in keyof BigRecord142]: TypeName142<BigRecord142[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb142 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource142 = "user" | "post" | "comment" | "tag" | "category";
type Action142 = `${Verb142}_${Resource142}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise142<T> = T extends Promise<infer U> ? UnwrapPromise142<U> : T;
type UnwrapArray142<T> = T extends (infer U)[] ? UnwrapArray142<U> : T;
type Head142<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail142<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation142<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation142<Exclude<T, K>>]
  : never;

type SmallUnion142 = "a" | "b" | "c" | "d";
type AllPerms142 = Permutation142<SmallUnion142>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig142,
  Flat142,
  FR142,
  BigUnion142,
  ExtractAlpha142,
  ExcludeZulu142,
  OptionalAll142,
  RequiredAll142,
  ReadonlyAll142,
  NullableAll142,
  TypeNames142,
  Action142,
  AllPerms142,
};
