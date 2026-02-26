// pkg-09 / types-21  (seed 921) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord921 {
  a921: { x: number; y: string; z: boolean };
  b921: { p: string[]; q: Record<string, number> };
  c921: { nested: { deep: { deeper: { deepest: string } } } };
  d921: number;
  e921: string;
  f921: boolean;
  g921: null;
  h921: undefined;
  i921: bigint;
  j921: symbol;
}

type PartialBig921 = DeepPartial<BigRecord921>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten921<T> = T extends Array<infer U> ? Flatten921<U> : T;
type Nested921 = number[][][][][][][][][][];
type Flat921 = Flatten921<Nested921>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly921<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly921<T[K]> : T[K];
};
type DeepRequired921<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired921<T[K]> : T[K];
};
type FR921 = DeepReadonly921<DeepRequired921<PartialBig921>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion921 =
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

type ExtractAlpha921 = Extract<BigUnion921, "alpha" | "bravo" | "charlie">;
type ExcludeZulu921 = Exclude<BigUnion921, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA921 { width: number; height: number; depth: number }
interface ShapeB921 { color: string; opacity: number; blend: string }
interface ShapeC921 { x: number; y: number; z: number; w: number }
interface ShapeD921 { label: string; title: string; summary: string }

type Combined921 = ShapeA921 & ShapeB921 & ShapeC921 & ShapeD921;
type OptionalAll921 = { [K in keyof Combined921]?: Combined921[K] };
type RequiredAll921 = { [K in keyof Combined921]-?: Combined921[K] };
type ReadonlyAll921 = { readonly [K in keyof Combined921]: Combined921[K] };
type NullableAll921 = { [K in keyof Combined921]: Combined921[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString921<T> = T extends string ? true : false;
type IsNumber921<T> = T extends number ? true : false;
type TypeName921<T> = T extends string
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

type TypeNames921 = {
  [K in keyof BigRecord921]: TypeName921<BigRecord921[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb921 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource921 = "user" | "post" | "comment" | "tag" | "category";
type Action921 = `${Verb921}_${Resource921}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise921<T> = T extends Promise<infer U> ? UnwrapPromise921<U> : T;
type UnwrapArray921<T> = T extends (infer U)[] ? UnwrapArray921<U> : T;
type Head921<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail921<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation921<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation921<Exclude<T, K>>]
  : never;

type SmallUnion921 = "a" | "b" | "c" | "d";
type AllPerms921 = Permutation921<SmallUnion921>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig921,
  Flat921,
  FR921,
  BigUnion921,
  ExtractAlpha921,
  ExcludeZulu921,
  OptionalAll921,
  RequiredAll921,
  ReadonlyAll921,
  NullableAll921,
  TypeNames921,
  Action921,
  AllPerms921,
};
