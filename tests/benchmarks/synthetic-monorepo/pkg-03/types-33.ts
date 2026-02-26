// pkg-03 / types-33  (seed 333) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord333 {
  a333: { x: number; y: string; z: boolean };
  b333: { p: string[]; q: Record<string, number> };
  c333: { nested: { deep: { deeper: { deepest: string } } } };
  d333: number;
  e333: string;
  f333: boolean;
  g333: null;
  h333: undefined;
  i333: bigint;
  j333: symbol;
}

type PartialBig333 = DeepPartial<BigRecord333>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten333<T> = T extends Array<infer U> ? Flatten333<U> : T;
type Nested333 = number[][][][][][][][][][];
type Flat333 = Flatten333<Nested333>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly333<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly333<T[K]> : T[K];
};
type DeepRequired333<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired333<T[K]> : T[K];
};
type FR333 = DeepReadonly333<DeepRequired333<PartialBig333>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion333 =
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

type ExtractAlpha333 = Extract<BigUnion333, "alpha" | "bravo" | "charlie">;
type ExcludeZulu333 = Exclude<BigUnion333, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA333 { width: number; height: number; depth: number }
interface ShapeB333 { color: string; opacity: number; blend: string }
interface ShapeC333 { x: number; y: number; z: number; w: number }
interface ShapeD333 { label: string; title: string; summary: string }

type Combined333 = ShapeA333 & ShapeB333 & ShapeC333 & ShapeD333;
type OptionalAll333 = { [K in keyof Combined333]?: Combined333[K] };
type RequiredAll333 = { [K in keyof Combined333]-?: Combined333[K] };
type ReadonlyAll333 = { readonly [K in keyof Combined333]: Combined333[K] };
type NullableAll333 = { [K in keyof Combined333]: Combined333[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString333<T> = T extends string ? true : false;
type IsNumber333<T> = T extends number ? true : false;
type TypeName333<T> = T extends string
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

type TypeNames333 = {
  [K in keyof BigRecord333]: TypeName333<BigRecord333[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb333 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource333 = "user" | "post" | "comment" | "tag" | "category";
type Action333 = `${Verb333}_${Resource333}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise333<T> = T extends Promise<infer U> ? UnwrapPromise333<U> : T;
type UnwrapArray333<T> = T extends (infer U)[] ? UnwrapArray333<U> : T;
type Head333<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail333<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation333<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation333<Exclude<T, K>>]
  : never;

type SmallUnion333 = "a" | "b" | "c" | "d";
type AllPerms333 = Permutation333<SmallUnion333>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig333,
  Flat333,
  FR333,
  BigUnion333,
  ExtractAlpha333,
  ExcludeZulu333,
  OptionalAll333,
  RequiredAll333,
  ReadonlyAll333,
  NullableAll333,
  TypeNames333,
  Action333,
  AllPerms333,
};
