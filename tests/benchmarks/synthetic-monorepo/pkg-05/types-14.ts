// pkg-05 / types-14  (seed 514) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord514 {
  a514: { x: number; y: string; z: boolean };
  b514: { p: string[]; q: Record<string, number> };
  c514: { nested: { deep: { deeper: { deepest: string } } } };
  d514: number;
  e514: string;
  f514: boolean;
  g514: null;
  h514: undefined;
  i514: bigint;
  j514: symbol;
}

type PartialBig514 = DeepPartial<BigRecord514>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten514<T> = T extends Array<infer U> ? Flatten514<U> : T;
type Nested514 = number[][][][][][][][][][];
type Flat514 = Flatten514<Nested514>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly514<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly514<T[K]> : T[K];
};
type DeepRequired514<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired514<T[K]> : T[K];
};
type FR514 = DeepReadonly514<DeepRequired514<PartialBig514>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion514 =
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

type ExtractAlpha514 = Extract<BigUnion514, "alpha" | "bravo" | "charlie">;
type ExcludeZulu514 = Exclude<BigUnion514, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA514 { width: number; height: number; depth: number }
interface ShapeB514 { color: string; opacity: number; blend: string }
interface ShapeC514 { x: number; y: number; z: number; w: number }
interface ShapeD514 { label: string; title: string; summary: string }

type Combined514 = ShapeA514 & ShapeB514 & ShapeC514 & ShapeD514;
type OptionalAll514 = { [K in keyof Combined514]?: Combined514[K] };
type RequiredAll514 = { [K in keyof Combined514]-?: Combined514[K] };
type ReadonlyAll514 = { readonly [K in keyof Combined514]: Combined514[K] };
type NullableAll514 = { [K in keyof Combined514]: Combined514[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString514<T> = T extends string ? true : false;
type IsNumber514<T> = T extends number ? true : false;
type TypeName514<T> = T extends string
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

type TypeNames514 = {
  [K in keyof BigRecord514]: TypeName514<BigRecord514[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb514 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource514 = "user" | "post" | "comment" | "tag" | "category";
type Action514 = `${Verb514}_${Resource514}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise514<T> = T extends Promise<infer U> ? UnwrapPromise514<U> : T;
type UnwrapArray514<T> = T extends (infer U)[] ? UnwrapArray514<U> : T;
type Head514<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail514<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation514<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation514<Exclude<T, K>>]
  : never;

type SmallUnion514 = "a" | "b" | "c" | "d";
type AllPerms514 = Permutation514<SmallUnion514>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig514,
  Flat514,
  FR514,
  BigUnion514,
  ExtractAlpha514,
  ExcludeZulu514,
  OptionalAll514,
  RequiredAll514,
  ReadonlyAll514,
  NullableAll514,
  TypeNames514,
  Action514,
  AllPerms514,
};
