// pkg-09 / types-13  (seed 913) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord913 {
  a913: { x: number; y: string; z: boolean };
  b913: { p: string[]; q: Record<string, number> };
  c913: { nested: { deep: { deeper: { deepest: string } } } };
  d913: number;
  e913: string;
  f913: boolean;
  g913: null;
  h913: undefined;
  i913: bigint;
  j913: symbol;
}

type PartialBig913 = DeepPartial<BigRecord913>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten913<T> = T extends Array<infer U> ? Flatten913<U> : T;
type Nested913 = number[][][][][][][][][][];
type Flat913 = Flatten913<Nested913>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly913<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly913<T[K]> : T[K];
};
type DeepRequired913<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired913<T[K]> : T[K];
};
type FR913 = DeepReadonly913<DeepRequired913<PartialBig913>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion913 =
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

type ExtractAlpha913 = Extract<BigUnion913, "alpha" | "bravo" | "charlie">;
type ExcludeZulu913 = Exclude<BigUnion913, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA913 { width: number; height: number; depth: number }
interface ShapeB913 { color: string; opacity: number; blend: string }
interface ShapeC913 { x: number; y: number; z: number; w: number }
interface ShapeD913 { label: string; title: string; summary: string }

type Combined913 = ShapeA913 & ShapeB913 & ShapeC913 & ShapeD913;
type OptionalAll913 = { [K in keyof Combined913]?: Combined913[K] };
type RequiredAll913 = { [K in keyof Combined913]-?: Combined913[K] };
type ReadonlyAll913 = { readonly [K in keyof Combined913]: Combined913[K] };
type NullableAll913 = { [K in keyof Combined913]: Combined913[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString913<T> = T extends string ? true : false;
type IsNumber913<T> = T extends number ? true : false;
type TypeName913<T> = T extends string
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

type TypeNames913 = {
  [K in keyof BigRecord913]: TypeName913<BigRecord913[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb913 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource913 = "user" | "post" | "comment" | "tag" | "category";
type Action913 = `${Verb913}_${Resource913}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise913<T> = T extends Promise<infer U> ? UnwrapPromise913<U> : T;
type UnwrapArray913<T> = T extends (infer U)[] ? UnwrapArray913<U> : T;
type Head913<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail913<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation913<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation913<Exclude<T, K>>]
  : never;

type SmallUnion913 = "a" | "b" | "c" | "d";
type AllPerms913 = Permutation913<SmallUnion913>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig913,
  Flat913,
  FR913,
  BigUnion913,
  ExtractAlpha913,
  ExcludeZulu913,
  OptionalAll913,
  RequiredAll913,
  ReadonlyAll913,
  NullableAll913,
  TypeNames913,
  Action913,
  AllPerms913,
};
