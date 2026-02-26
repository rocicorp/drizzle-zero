// pkg-07 / types-38  (seed 738) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord738 {
  a738: { x: number; y: string; z: boolean };
  b738: { p: string[]; q: Record<string, number> };
  c738: { nested: { deep: { deeper: { deepest: string } } } };
  d738: number;
  e738: string;
  f738: boolean;
  g738: null;
  h738: undefined;
  i738: bigint;
  j738: symbol;
}

type PartialBig738 = DeepPartial<BigRecord738>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten738<T> = T extends Array<infer U> ? Flatten738<U> : T;
type Nested738 = number[][][][][][][][][][];
type Flat738 = Flatten738<Nested738>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly738<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly738<T[K]> : T[K];
};
type DeepRequired738<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired738<T[K]> : T[K];
};
type FR738 = DeepReadonly738<DeepRequired738<PartialBig738>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion738 =
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

type ExtractAlpha738 = Extract<BigUnion738, "alpha" | "bravo" | "charlie">;
type ExcludeZulu738 = Exclude<BigUnion738, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA738 { width: number; height: number; depth: number }
interface ShapeB738 { color: string; opacity: number; blend: string }
interface ShapeC738 { x: number; y: number; z: number; w: number }
interface ShapeD738 { label: string; title: string; summary: string }

type Combined738 = ShapeA738 & ShapeB738 & ShapeC738 & ShapeD738;
type OptionalAll738 = { [K in keyof Combined738]?: Combined738[K] };
type RequiredAll738 = { [K in keyof Combined738]-?: Combined738[K] };
type ReadonlyAll738 = { readonly [K in keyof Combined738]: Combined738[K] };
type NullableAll738 = { [K in keyof Combined738]: Combined738[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString738<T> = T extends string ? true : false;
type IsNumber738<T> = T extends number ? true : false;
type TypeName738<T> = T extends string
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

type TypeNames738 = {
  [K in keyof BigRecord738]: TypeName738<BigRecord738[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb738 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource738 = "user" | "post" | "comment" | "tag" | "category";
type Action738 = `${Verb738}_${Resource738}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise738<T> = T extends Promise<infer U> ? UnwrapPromise738<U> : T;
type UnwrapArray738<T> = T extends (infer U)[] ? UnwrapArray738<U> : T;
type Head738<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail738<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation738<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation738<Exclude<T, K>>]
  : never;

type SmallUnion738 = "a" | "b" | "c" | "d";
type AllPerms738 = Permutation738<SmallUnion738>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig738,
  Flat738,
  FR738,
  BigUnion738,
  ExtractAlpha738,
  ExcludeZulu738,
  OptionalAll738,
  RequiredAll738,
  ReadonlyAll738,
  NullableAll738,
  TypeNames738,
  Action738,
  AllPerms738,
};
