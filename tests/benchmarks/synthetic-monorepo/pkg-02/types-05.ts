// pkg-02 / types-05  (seed 205) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord205 {
  a205: { x: number; y: string; z: boolean };
  b205: { p: string[]; q: Record<string, number> };
  c205: { nested: { deep: { deeper: { deepest: string } } } };
  d205: number;
  e205: string;
  f205: boolean;
  g205: null;
  h205: undefined;
  i205: bigint;
  j205: symbol;
}

type PartialBig205 = DeepPartial<BigRecord205>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten205<T> = T extends Array<infer U> ? Flatten205<U> : T;
type Nested205 = number[][][][][][][][][][];
type Flat205 = Flatten205<Nested205>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly205<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly205<T[K]> : T[K];
};
type DeepRequired205<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired205<T[K]> : T[K];
};
type FR205 = DeepReadonly205<DeepRequired205<PartialBig205>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion205 =
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

type ExtractAlpha205 = Extract<BigUnion205, "alpha" | "bravo" | "charlie">;
type ExcludeZulu205 = Exclude<BigUnion205, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA205 { width: number; height: number; depth: number }
interface ShapeB205 { color: string; opacity: number; blend: string }
interface ShapeC205 { x: number; y: number; z: number; w: number }
interface ShapeD205 { label: string; title: string; summary: string }

type Combined205 = ShapeA205 & ShapeB205 & ShapeC205 & ShapeD205;
type OptionalAll205 = { [K in keyof Combined205]?: Combined205[K] };
type RequiredAll205 = { [K in keyof Combined205]-?: Combined205[K] };
type ReadonlyAll205 = { readonly [K in keyof Combined205]: Combined205[K] };
type NullableAll205 = { [K in keyof Combined205]: Combined205[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString205<T> = T extends string ? true : false;
type IsNumber205<T> = T extends number ? true : false;
type TypeName205<T> = T extends string
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

type TypeNames205 = {
  [K in keyof BigRecord205]: TypeName205<BigRecord205[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb205 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource205 = "user" | "post" | "comment" | "tag" | "category";
type Action205 = `${Verb205}_${Resource205}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise205<T> = T extends Promise<infer U> ? UnwrapPromise205<U> : T;
type UnwrapArray205<T> = T extends (infer U)[] ? UnwrapArray205<U> : T;
type Head205<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail205<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation205<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation205<Exclude<T, K>>]
  : never;

type SmallUnion205 = "a" | "b" | "c" | "d";
type AllPerms205 = Permutation205<SmallUnion205>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig205,
  Flat205,
  FR205,
  BigUnion205,
  ExtractAlpha205,
  ExcludeZulu205,
  OptionalAll205,
  RequiredAll205,
  ReadonlyAll205,
  NullableAll205,
  TypeNames205,
  Action205,
  AllPerms205,
};
