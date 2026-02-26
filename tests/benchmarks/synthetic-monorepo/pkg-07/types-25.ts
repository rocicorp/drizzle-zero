// pkg-07 / types-25  (seed 725) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord725 {
  a725: { x: number; y: string; z: boolean };
  b725: { p: string[]; q: Record<string, number> };
  c725: { nested: { deep: { deeper: { deepest: string } } } };
  d725: number;
  e725: string;
  f725: boolean;
  g725: null;
  h725: undefined;
  i725: bigint;
  j725: symbol;
}

type PartialBig725 = DeepPartial<BigRecord725>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten725<T> = T extends Array<infer U> ? Flatten725<U> : T;
type Nested725 = number[][][][][][][][][][];
type Flat725 = Flatten725<Nested725>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly725<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly725<T[K]> : T[K];
};
type DeepRequired725<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired725<T[K]> : T[K];
};
type FR725 = DeepReadonly725<DeepRequired725<PartialBig725>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion725 =
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

type ExtractAlpha725 = Extract<BigUnion725, "alpha" | "bravo" | "charlie">;
type ExcludeZulu725 = Exclude<BigUnion725, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA725 { width: number; height: number; depth: number }
interface ShapeB725 { color: string; opacity: number; blend: string }
interface ShapeC725 { x: number; y: number; z: number; w: number }
interface ShapeD725 { label: string; title: string; summary: string }

type Combined725 = ShapeA725 & ShapeB725 & ShapeC725 & ShapeD725;
type OptionalAll725 = { [K in keyof Combined725]?: Combined725[K] };
type RequiredAll725 = { [K in keyof Combined725]-?: Combined725[K] };
type ReadonlyAll725 = { readonly [K in keyof Combined725]: Combined725[K] };
type NullableAll725 = { [K in keyof Combined725]: Combined725[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString725<T> = T extends string ? true : false;
type IsNumber725<T> = T extends number ? true : false;
type TypeName725<T> = T extends string
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

type TypeNames725 = {
  [K in keyof BigRecord725]: TypeName725<BigRecord725[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb725 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource725 = "user" | "post" | "comment" | "tag" | "category";
type Action725 = `${Verb725}_${Resource725}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise725<T> = T extends Promise<infer U> ? UnwrapPromise725<U> : T;
type UnwrapArray725<T> = T extends (infer U)[] ? UnwrapArray725<U> : T;
type Head725<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail725<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation725<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation725<Exclude<T, K>>]
  : never;

type SmallUnion725 = "a" | "b" | "c" | "d";
type AllPerms725 = Permutation725<SmallUnion725>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig725,
  Flat725,
  FR725,
  BigUnion725,
  ExtractAlpha725,
  ExcludeZulu725,
  OptionalAll725,
  RequiredAll725,
  ReadonlyAll725,
  NullableAll725,
  TypeNames725,
  Action725,
  AllPerms725,
};
