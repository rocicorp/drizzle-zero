// pkg-04 / types-09  (seed 409) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord409 {
  a409: { x: number; y: string; z: boolean };
  b409: { p: string[]; q: Record<string, number> };
  c409: { nested: { deep: { deeper: { deepest: string } } } };
  d409: number;
  e409: string;
  f409: boolean;
  g409: null;
  h409: undefined;
  i409: bigint;
  j409: symbol;
}

type PartialBig409 = DeepPartial<BigRecord409>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten409<T> = T extends Array<infer U> ? Flatten409<U> : T;
type Nested409 = number[][][][][][][][][][];
type Flat409 = Flatten409<Nested409>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly409<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly409<T[K]> : T[K];
};
type DeepRequired409<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired409<T[K]> : T[K];
};
type FR409 = DeepReadonly409<DeepRequired409<PartialBig409>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion409 =
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

type ExtractAlpha409 = Extract<BigUnion409, "alpha" | "bravo" | "charlie">;
type ExcludeZulu409 = Exclude<BigUnion409, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA409 { width: number; height: number; depth: number }
interface ShapeB409 { color: string; opacity: number; blend: string }
interface ShapeC409 { x: number; y: number; z: number; w: number }
interface ShapeD409 { label: string; title: string; summary: string }

type Combined409 = ShapeA409 & ShapeB409 & ShapeC409 & ShapeD409;
type OptionalAll409 = { [K in keyof Combined409]?: Combined409[K] };
type RequiredAll409 = { [K in keyof Combined409]-?: Combined409[K] };
type ReadonlyAll409 = { readonly [K in keyof Combined409]: Combined409[K] };
type NullableAll409 = { [K in keyof Combined409]: Combined409[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString409<T> = T extends string ? true : false;
type IsNumber409<T> = T extends number ? true : false;
type TypeName409<T> = T extends string
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

type TypeNames409 = {
  [K in keyof BigRecord409]: TypeName409<BigRecord409[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb409 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource409 = "user" | "post" | "comment" | "tag" | "category";
type Action409 = `${Verb409}_${Resource409}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise409<T> = T extends Promise<infer U> ? UnwrapPromise409<U> : T;
type UnwrapArray409<T> = T extends (infer U)[] ? UnwrapArray409<U> : T;
type Head409<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail409<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation409<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation409<Exclude<T, K>>]
  : never;

type SmallUnion409 = "a" | "b" | "c" | "d";
type AllPerms409 = Permutation409<SmallUnion409>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig409,
  Flat409,
  FR409,
  BigUnion409,
  ExtractAlpha409,
  ExcludeZulu409,
  OptionalAll409,
  RequiredAll409,
  ReadonlyAll409,
  NullableAll409,
  TypeNames409,
  Action409,
  AllPerms409,
};
