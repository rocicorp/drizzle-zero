// pkg-01 / types-05  (seed 105) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord105 {
  a105: { x: number; y: string; z: boolean };
  b105: { p: string[]; q: Record<string, number> };
  c105: { nested: { deep: { deeper: { deepest: string } } } };
  d105: number;
  e105: string;
  f105: boolean;
  g105: null;
  h105: undefined;
  i105: bigint;
  j105: symbol;
}

type PartialBig105 = DeepPartial<BigRecord105>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten105<T> = T extends Array<infer U> ? Flatten105<U> : T;
type Nested105 = number[][][][][][][][][][];
type Flat105 = Flatten105<Nested105>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly105<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly105<T[K]> : T[K];
};
type DeepRequired105<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired105<T[K]> : T[K];
};
type FR105 = DeepReadonly105<DeepRequired105<PartialBig105>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion105 =
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

type ExtractAlpha105 = Extract<BigUnion105, "alpha" | "bravo" | "charlie">;
type ExcludeZulu105 = Exclude<BigUnion105, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA105 { width: number; height: number; depth: number }
interface ShapeB105 { color: string; opacity: number; blend: string }
interface ShapeC105 { x: number; y: number; z: number; w: number }
interface ShapeD105 { label: string; title: string; summary: string }

type Combined105 = ShapeA105 & ShapeB105 & ShapeC105 & ShapeD105;
type OptionalAll105 = { [K in keyof Combined105]?: Combined105[K] };
type RequiredAll105 = { [K in keyof Combined105]-?: Combined105[K] };
type ReadonlyAll105 = { readonly [K in keyof Combined105]: Combined105[K] };
type NullableAll105 = { [K in keyof Combined105]: Combined105[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString105<T> = T extends string ? true : false;
type IsNumber105<T> = T extends number ? true : false;
type TypeName105<T> = T extends string
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

type TypeNames105 = {
  [K in keyof BigRecord105]: TypeName105<BigRecord105[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb105 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource105 = "user" | "post" | "comment" | "tag" | "category";
type Action105 = `${Verb105}_${Resource105}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise105<T> = T extends Promise<infer U> ? UnwrapPromise105<U> : T;
type UnwrapArray105<T> = T extends (infer U)[] ? UnwrapArray105<U> : T;
type Head105<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail105<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation105<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation105<Exclude<T, K>>]
  : never;

type SmallUnion105 = "a" | "b" | "c" | "d";
type AllPerms105 = Permutation105<SmallUnion105>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig105,
  Flat105,
  FR105,
  BigUnion105,
  ExtractAlpha105,
  ExcludeZulu105,
  OptionalAll105,
  RequiredAll105,
  ReadonlyAll105,
  NullableAll105,
  TypeNames105,
  Action105,
  AllPerms105,
};
