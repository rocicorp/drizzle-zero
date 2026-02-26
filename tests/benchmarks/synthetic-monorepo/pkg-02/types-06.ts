// pkg-02 / types-06  (seed 206) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord206 {
  a206: { x: number; y: string; z: boolean };
  b206: { p: string[]; q: Record<string, number> };
  c206: { nested: { deep: { deeper: { deepest: string } } } };
  d206: number;
  e206: string;
  f206: boolean;
  g206: null;
  h206: undefined;
  i206: bigint;
  j206: symbol;
}

type PartialBig206 = DeepPartial<BigRecord206>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten206<T> = T extends Array<infer U> ? Flatten206<U> : T;
type Nested206 = number[][][][][][][][][][];
type Flat206 = Flatten206<Nested206>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly206<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly206<T[K]> : T[K];
};
type DeepRequired206<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired206<T[K]> : T[K];
};
type FR206 = DeepReadonly206<DeepRequired206<PartialBig206>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion206 =
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

type ExtractAlpha206 = Extract<BigUnion206, "alpha" | "bravo" | "charlie">;
type ExcludeZulu206 = Exclude<BigUnion206, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA206 { width: number; height: number; depth: number }
interface ShapeB206 { color: string; opacity: number; blend: string }
interface ShapeC206 { x: number; y: number; z: number; w: number }
interface ShapeD206 { label: string; title: string; summary: string }

type Combined206 = ShapeA206 & ShapeB206 & ShapeC206 & ShapeD206;
type OptionalAll206 = { [K in keyof Combined206]?: Combined206[K] };
type RequiredAll206 = { [K in keyof Combined206]-?: Combined206[K] };
type ReadonlyAll206 = { readonly [K in keyof Combined206]: Combined206[K] };
type NullableAll206 = { [K in keyof Combined206]: Combined206[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString206<T> = T extends string ? true : false;
type IsNumber206<T> = T extends number ? true : false;
type TypeName206<T> = T extends string
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

type TypeNames206 = {
  [K in keyof BigRecord206]: TypeName206<BigRecord206[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb206 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource206 = "user" | "post" | "comment" | "tag" | "category";
type Action206 = `${Verb206}_${Resource206}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise206<T> = T extends Promise<infer U> ? UnwrapPromise206<U> : T;
type UnwrapArray206<T> = T extends (infer U)[] ? UnwrapArray206<U> : T;
type Head206<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail206<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation206<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation206<Exclude<T, K>>]
  : never;

type SmallUnion206 = "a" | "b" | "c" | "d";
type AllPerms206 = Permutation206<SmallUnion206>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig206,
  Flat206,
  FR206,
  BigUnion206,
  ExtractAlpha206,
  ExcludeZulu206,
  OptionalAll206,
  RequiredAll206,
  ReadonlyAll206,
  NullableAll206,
  TypeNames206,
  Action206,
  AllPerms206,
};
