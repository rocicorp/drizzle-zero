// pkg-07 / types-36  (seed 736) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord736 {
  a736: { x: number; y: string; z: boolean };
  b736: { p: string[]; q: Record<string, number> };
  c736: { nested: { deep: { deeper: { deepest: string } } } };
  d736: number;
  e736: string;
  f736: boolean;
  g736: null;
  h736: undefined;
  i736: bigint;
  j736: symbol;
}

type PartialBig736 = DeepPartial<BigRecord736>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten736<T> = T extends Array<infer U> ? Flatten736<U> : T;
type Nested736 = number[][][][][][][][][][];
type Flat736 = Flatten736<Nested736>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly736<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly736<T[K]> : T[K];
};
type DeepRequired736<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired736<T[K]> : T[K];
};
type FR736 = DeepReadonly736<DeepRequired736<PartialBig736>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion736 =
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

type ExtractAlpha736 = Extract<BigUnion736, "alpha" | "bravo" | "charlie">;
type ExcludeZulu736 = Exclude<BigUnion736, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA736 { width: number; height: number; depth: number }
interface ShapeB736 { color: string; opacity: number; blend: string }
interface ShapeC736 { x: number; y: number; z: number; w: number }
interface ShapeD736 { label: string; title: string; summary: string }

type Combined736 = ShapeA736 & ShapeB736 & ShapeC736 & ShapeD736;
type OptionalAll736 = { [K in keyof Combined736]?: Combined736[K] };
type RequiredAll736 = { [K in keyof Combined736]-?: Combined736[K] };
type ReadonlyAll736 = { readonly [K in keyof Combined736]: Combined736[K] };
type NullableAll736 = { [K in keyof Combined736]: Combined736[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString736<T> = T extends string ? true : false;
type IsNumber736<T> = T extends number ? true : false;
type TypeName736<T> = T extends string
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

type TypeNames736 = {
  [K in keyof BigRecord736]: TypeName736<BigRecord736[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb736 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource736 = "user" | "post" | "comment" | "tag" | "category";
type Action736 = `${Verb736}_${Resource736}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise736<T> = T extends Promise<infer U> ? UnwrapPromise736<U> : T;
type UnwrapArray736<T> = T extends (infer U)[] ? UnwrapArray736<U> : T;
type Head736<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail736<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation736<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation736<Exclude<T, K>>]
  : never;

type SmallUnion736 = "a" | "b" | "c" | "d";
type AllPerms736 = Permutation736<SmallUnion736>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig736,
  Flat736,
  FR736,
  BigUnion736,
  ExtractAlpha736,
  ExcludeZulu736,
  OptionalAll736,
  RequiredAll736,
  ReadonlyAll736,
  NullableAll736,
  TypeNames736,
  Action736,
  AllPerms736,
};
