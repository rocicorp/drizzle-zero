// pkg-04 / types-21  (seed 421) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord421 {
  a421: { x: number; y: string; z: boolean };
  b421: { p: string[]; q: Record<string, number> };
  c421: { nested: { deep: { deeper: { deepest: string } } } };
  d421: number;
  e421: string;
  f421: boolean;
  g421: null;
  h421: undefined;
  i421: bigint;
  j421: symbol;
}

type PartialBig421 = DeepPartial<BigRecord421>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten421<T> = T extends Array<infer U> ? Flatten421<U> : T;
type Nested421 = number[][][][][][][][][][];
type Flat421 = Flatten421<Nested421>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly421<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly421<T[K]> : T[K];
};
type DeepRequired421<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired421<T[K]> : T[K];
};
type FR421 = DeepReadonly421<DeepRequired421<PartialBig421>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion421 =
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

type ExtractAlpha421 = Extract<BigUnion421, "alpha" | "bravo" | "charlie">;
type ExcludeZulu421 = Exclude<BigUnion421, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA421 { width: number; height: number; depth: number }
interface ShapeB421 { color: string; opacity: number; blend: string }
interface ShapeC421 { x: number; y: number; z: number; w: number }
interface ShapeD421 { label: string; title: string; summary: string }

type Combined421 = ShapeA421 & ShapeB421 & ShapeC421 & ShapeD421;
type OptionalAll421 = { [K in keyof Combined421]?: Combined421[K] };
type RequiredAll421 = { [K in keyof Combined421]-?: Combined421[K] };
type ReadonlyAll421 = { readonly [K in keyof Combined421]: Combined421[K] };
type NullableAll421 = { [K in keyof Combined421]: Combined421[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString421<T> = T extends string ? true : false;
type IsNumber421<T> = T extends number ? true : false;
type TypeName421<T> = T extends string
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

type TypeNames421 = {
  [K in keyof BigRecord421]: TypeName421<BigRecord421[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb421 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource421 = "user" | "post" | "comment" | "tag" | "category";
type Action421 = `${Verb421}_${Resource421}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise421<T> = T extends Promise<infer U> ? UnwrapPromise421<U> : T;
type UnwrapArray421<T> = T extends (infer U)[] ? UnwrapArray421<U> : T;
type Head421<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail421<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation421<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation421<Exclude<T, K>>]
  : never;

type SmallUnion421 = "a" | "b" | "c" | "d";
type AllPerms421 = Permutation421<SmallUnion421>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig421,
  Flat421,
  FR421,
  BigUnion421,
  ExtractAlpha421,
  ExcludeZulu421,
  OptionalAll421,
  RequiredAll421,
  ReadonlyAll421,
  NullableAll421,
  TypeNames421,
  Action421,
  AllPerms421,
};
