// pkg-07 / types-14  (seed 714) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord714 {
  a714: { x: number; y: string; z: boolean };
  b714: { p: string[]; q: Record<string, number> };
  c714: { nested: { deep: { deeper: { deepest: string } } } };
  d714: number;
  e714: string;
  f714: boolean;
  g714: null;
  h714: undefined;
  i714: bigint;
  j714: symbol;
}

type PartialBig714 = DeepPartial<BigRecord714>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten714<T> = T extends Array<infer U> ? Flatten714<U> : T;
type Nested714 = number[][][][][][][][][][];
type Flat714 = Flatten714<Nested714>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly714<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly714<T[K]> : T[K];
};
type DeepRequired714<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired714<T[K]> : T[K];
};
type FR714 = DeepReadonly714<DeepRequired714<PartialBig714>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion714 =
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

type ExtractAlpha714 = Extract<BigUnion714, "alpha" | "bravo" | "charlie">;
type ExcludeZulu714 = Exclude<BigUnion714, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA714 { width: number; height: number; depth: number }
interface ShapeB714 { color: string; opacity: number; blend: string }
interface ShapeC714 { x: number; y: number; z: number; w: number }
interface ShapeD714 { label: string; title: string; summary: string }

type Combined714 = ShapeA714 & ShapeB714 & ShapeC714 & ShapeD714;
type OptionalAll714 = { [K in keyof Combined714]?: Combined714[K] };
type RequiredAll714 = { [K in keyof Combined714]-?: Combined714[K] };
type ReadonlyAll714 = { readonly [K in keyof Combined714]: Combined714[K] };
type NullableAll714 = { [K in keyof Combined714]: Combined714[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString714<T> = T extends string ? true : false;
type IsNumber714<T> = T extends number ? true : false;
type TypeName714<T> = T extends string
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

type TypeNames714 = {
  [K in keyof BigRecord714]: TypeName714<BigRecord714[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb714 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource714 = "user" | "post" | "comment" | "tag" | "category";
type Action714 = `${Verb714}_${Resource714}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise714<T> = T extends Promise<infer U> ? UnwrapPromise714<U> : T;
type UnwrapArray714<T> = T extends (infer U)[] ? UnwrapArray714<U> : T;
type Head714<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail714<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation714<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation714<Exclude<T, K>>]
  : never;

type SmallUnion714 = "a" | "b" | "c" | "d";
type AllPerms714 = Permutation714<SmallUnion714>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig714,
  Flat714,
  FR714,
  BigUnion714,
  ExtractAlpha714,
  ExcludeZulu714,
  OptionalAll714,
  RequiredAll714,
  ReadonlyAll714,
  NullableAll714,
  TypeNames714,
  Action714,
  AllPerms714,
};
