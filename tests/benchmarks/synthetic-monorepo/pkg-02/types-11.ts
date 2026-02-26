// pkg-02 / types-11  (seed 211) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord211 {
  a211: { x: number; y: string; z: boolean };
  b211: { p: string[]; q: Record<string, number> };
  c211: { nested: { deep: { deeper: { deepest: string } } } };
  d211: number;
  e211: string;
  f211: boolean;
  g211: null;
  h211: undefined;
  i211: bigint;
  j211: symbol;
}

type PartialBig211 = DeepPartial<BigRecord211>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten211<T> = T extends Array<infer U> ? Flatten211<U> : T;
type Nested211 = number[][][][][][][][][][];
type Flat211 = Flatten211<Nested211>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly211<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly211<T[K]> : T[K];
};
type DeepRequired211<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired211<T[K]> : T[K];
};
type FR211 = DeepReadonly211<DeepRequired211<PartialBig211>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion211 =
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

type ExtractAlpha211 = Extract<BigUnion211, "alpha" | "bravo" | "charlie">;
type ExcludeZulu211 = Exclude<BigUnion211, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA211 { width: number; height: number; depth: number }
interface ShapeB211 { color: string; opacity: number; blend: string }
interface ShapeC211 { x: number; y: number; z: number; w: number }
interface ShapeD211 { label: string; title: string; summary: string }

type Combined211 = ShapeA211 & ShapeB211 & ShapeC211 & ShapeD211;
type OptionalAll211 = { [K in keyof Combined211]?: Combined211[K] };
type RequiredAll211 = { [K in keyof Combined211]-?: Combined211[K] };
type ReadonlyAll211 = { readonly [K in keyof Combined211]: Combined211[K] };
type NullableAll211 = { [K in keyof Combined211]: Combined211[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString211<T> = T extends string ? true : false;
type IsNumber211<T> = T extends number ? true : false;
type TypeName211<T> = T extends string
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

type TypeNames211 = {
  [K in keyof BigRecord211]: TypeName211<BigRecord211[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb211 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource211 = "user" | "post" | "comment" | "tag" | "category";
type Action211 = `${Verb211}_${Resource211}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise211<T> = T extends Promise<infer U> ? UnwrapPromise211<U> : T;
type UnwrapArray211<T> = T extends (infer U)[] ? UnwrapArray211<U> : T;
type Head211<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail211<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation211<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation211<Exclude<T, K>>]
  : never;

type SmallUnion211 = "a" | "b" | "c" | "d";
type AllPerms211 = Permutation211<SmallUnion211>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig211,
  Flat211,
  FR211,
  BigUnion211,
  ExtractAlpha211,
  ExcludeZulu211,
  OptionalAll211,
  RequiredAll211,
  ReadonlyAll211,
  NullableAll211,
  TypeNames211,
  Action211,
  AllPerms211,
};
