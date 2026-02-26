// pkg-03 / types-41  (seed 341) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord341 {
  a341: { x: number; y: string; z: boolean };
  b341: { p: string[]; q: Record<string, number> };
  c341: { nested: { deep: { deeper: { deepest: string } } } };
  d341: number;
  e341: string;
  f341: boolean;
  g341: null;
  h341: undefined;
  i341: bigint;
  j341: symbol;
}

type PartialBig341 = DeepPartial<BigRecord341>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten341<T> = T extends Array<infer U> ? Flatten341<U> : T;
type Nested341 = number[][][][][][][][][][];
type Flat341 = Flatten341<Nested341>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly341<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly341<T[K]> : T[K];
};
type DeepRequired341<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired341<T[K]> : T[K];
};
type FR341 = DeepReadonly341<DeepRequired341<PartialBig341>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion341 =
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

type ExtractAlpha341 = Extract<BigUnion341, "alpha" | "bravo" | "charlie">;
type ExcludeZulu341 = Exclude<BigUnion341, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA341 { width: number; height: number; depth: number }
interface ShapeB341 { color: string; opacity: number; blend: string }
interface ShapeC341 { x: number; y: number; z: number; w: number }
interface ShapeD341 { label: string; title: string; summary: string }

type Combined341 = ShapeA341 & ShapeB341 & ShapeC341 & ShapeD341;
type OptionalAll341 = { [K in keyof Combined341]?: Combined341[K] };
type RequiredAll341 = { [K in keyof Combined341]-?: Combined341[K] };
type ReadonlyAll341 = { readonly [K in keyof Combined341]: Combined341[K] };
type NullableAll341 = { [K in keyof Combined341]: Combined341[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString341<T> = T extends string ? true : false;
type IsNumber341<T> = T extends number ? true : false;
type TypeName341<T> = T extends string
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

type TypeNames341 = {
  [K in keyof BigRecord341]: TypeName341<BigRecord341[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb341 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource341 = "user" | "post" | "comment" | "tag" | "category";
type Action341 = `${Verb341}_${Resource341}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise341<T> = T extends Promise<infer U> ? UnwrapPromise341<U> : T;
type UnwrapArray341<T> = T extends (infer U)[] ? UnwrapArray341<U> : T;
type Head341<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail341<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation341<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation341<Exclude<T, K>>]
  : never;

type SmallUnion341 = "a" | "b" | "c" | "d";
type AllPerms341 = Permutation341<SmallUnion341>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig341,
  Flat341,
  FR341,
  BigUnion341,
  ExtractAlpha341,
  ExcludeZulu341,
  OptionalAll341,
  RequiredAll341,
  ReadonlyAll341,
  NullableAll341,
  TypeNames341,
  Action341,
  AllPerms341,
};
