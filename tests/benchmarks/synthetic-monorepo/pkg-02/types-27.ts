// pkg-02 / types-27  (seed 227) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord227 {
  a227: { x: number; y: string; z: boolean };
  b227: { p: string[]; q: Record<string, number> };
  c227: { nested: { deep: { deeper: { deepest: string } } } };
  d227: number;
  e227: string;
  f227: boolean;
  g227: null;
  h227: undefined;
  i227: bigint;
  j227: symbol;
}

type PartialBig227 = DeepPartial<BigRecord227>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten227<T> = T extends Array<infer U> ? Flatten227<U> : T;
type Nested227 = number[][][][][][][][][][];
type Flat227 = Flatten227<Nested227>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly227<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly227<T[K]> : T[K];
};
type DeepRequired227<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired227<T[K]> : T[K];
};
type FR227 = DeepReadonly227<DeepRequired227<PartialBig227>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion227 =
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

type ExtractAlpha227 = Extract<BigUnion227, "alpha" | "bravo" | "charlie">;
type ExcludeZulu227 = Exclude<BigUnion227, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA227 { width: number; height: number; depth: number }
interface ShapeB227 { color: string; opacity: number; blend: string }
interface ShapeC227 { x: number; y: number; z: number; w: number }
interface ShapeD227 { label: string; title: string; summary: string }

type Combined227 = ShapeA227 & ShapeB227 & ShapeC227 & ShapeD227;
type OptionalAll227 = { [K in keyof Combined227]?: Combined227[K] };
type RequiredAll227 = { [K in keyof Combined227]-?: Combined227[K] };
type ReadonlyAll227 = { readonly [K in keyof Combined227]: Combined227[K] };
type NullableAll227 = { [K in keyof Combined227]: Combined227[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString227<T> = T extends string ? true : false;
type IsNumber227<T> = T extends number ? true : false;
type TypeName227<T> = T extends string
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

type TypeNames227 = {
  [K in keyof BigRecord227]: TypeName227<BigRecord227[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb227 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource227 = "user" | "post" | "comment" | "tag" | "category";
type Action227 = `${Verb227}_${Resource227}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise227<T> = T extends Promise<infer U> ? UnwrapPromise227<U> : T;
type UnwrapArray227<T> = T extends (infer U)[] ? UnwrapArray227<U> : T;
type Head227<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail227<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation227<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation227<Exclude<T, K>>]
  : never;

type SmallUnion227 = "a" | "b" | "c" | "d";
type AllPerms227 = Permutation227<SmallUnion227>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig227,
  Flat227,
  FR227,
  BigUnion227,
  ExtractAlpha227,
  ExcludeZulu227,
  OptionalAll227,
  RequiredAll227,
  ReadonlyAll227,
  NullableAll227,
  TypeNames227,
  Action227,
  AllPerms227,
};
