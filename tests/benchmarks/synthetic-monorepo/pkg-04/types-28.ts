// pkg-04 / types-28  (seed 428) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord428 {
  a428: { x: number; y: string; z: boolean };
  b428: { p: string[]; q: Record<string, number> };
  c428: { nested: { deep: { deeper: { deepest: string } } } };
  d428: number;
  e428: string;
  f428: boolean;
  g428: null;
  h428: undefined;
  i428: bigint;
  j428: symbol;
}

type PartialBig428 = DeepPartial<BigRecord428>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten428<T> = T extends Array<infer U> ? Flatten428<U> : T;
type Nested428 = number[][][][][][][][][][];
type Flat428 = Flatten428<Nested428>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly428<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly428<T[K]> : T[K];
};
type DeepRequired428<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired428<T[K]> : T[K];
};
type FR428 = DeepReadonly428<DeepRequired428<PartialBig428>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion428 =
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

type ExtractAlpha428 = Extract<BigUnion428, "alpha" | "bravo" | "charlie">;
type ExcludeZulu428 = Exclude<BigUnion428, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA428 { width: number; height: number; depth: number }
interface ShapeB428 { color: string; opacity: number; blend: string }
interface ShapeC428 { x: number; y: number; z: number; w: number }
interface ShapeD428 { label: string; title: string; summary: string }

type Combined428 = ShapeA428 & ShapeB428 & ShapeC428 & ShapeD428;
type OptionalAll428 = { [K in keyof Combined428]?: Combined428[K] };
type RequiredAll428 = { [K in keyof Combined428]-?: Combined428[K] };
type ReadonlyAll428 = { readonly [K in keyof Combined428]: Combined428[K] };
type NullableAll428 = { [K in keyof Combined428]: Combined428[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString428<T> = T extends string ? true : false;
type IsNumber428<T> = T extends number ? true : false;
type TypeName428<T> = T extends string
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

type TypeNames428 = {
  [K in keyof BigRecord428]: TypeName428<BigRecord428[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb428 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource428 = "user" | "post" | "comment" | "tag" | "category";
type Action428 = `${Verb428}_${Resource428}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise428<T> = T extends Promise<infer U> ? UnwrapPromise428<U> : T;
type UnwrapArray428<T> = T extends (infer U)[] ? UnwrapArray428<U> : T;
type Head428<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail428<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation428<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation428<Exclude<T, K>>]
  : never;

type SmallUnion428 = "a" | "b" | "c" | "d";
type AllPerms428 = Permutation428<SmallUnion428>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig428,
  Flat428,
  FR428,
  BigUnion428,
  ExtractAlpha428,
  ExcludeZulu428,
  OptionalAll428,
  RequiredAll428,
  ReadonlyAll428,
  NullableAll428,
  TypeNames428,
  Action428,
  AllPerms428,
};
