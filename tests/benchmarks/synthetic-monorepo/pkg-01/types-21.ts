// pkg-01 / types-21  (seed 121) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord121 {
  a121: { x: number; y: string; z: boolean };
  b121: { p: string[]; q: Record<string, number> };
  c121: { nested: { deep: { deeper: { deepest: string } } } };
  d121: number;
  e121: string;
  f121: boolean;
  g121: null;
  h121: undefined;
  i121: bigint;
  j121: symbol;
}

type PartialBig121 = DeepPartial<BigRecord121>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten121<T> = T extends Array<infer U> ? Flatten121<U> : T;
type Nested121 = number[][][][][][][][][][];
type Flat121 = Flatten121<Nested121>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly121<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly121<T[K]> : T[K];
};
type DeepRequired121<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired121<T[K]> : T[K];
};
type FR121 = DeepReadonly121<DeepRequired121<PartialBig121>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion121 =
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

type ExtractAlpha121 = Extract<BigUnion121, "alpha" | "bravo" | "charlie">;
type ExcludeZulu121 = Exclude<BigUnion121, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA121 { width: number; height: number; depth: number }
interface ShapeB121 { color: string; opacity: number; blend: string }
interface ShapeC121 { x: number; y: number; z: number; w: number }
interface ShapeD121 { label: string; title: string; summary: string }

type Combined121 = ShapeA121 & ShapeB121 & ShapeC121 & ShapeD121;
type OptionalAll121 = { [K in keyof Combined121]?: Combined121[K] };
type RequiredAll121 = { [K in keyof Combined121]-?: Combined121[K] };
type ReadonlyAll121 = { readonly [K in keyof Combined121]: Combined121[K] };
type NullableAll121 = { [K in keyof Combined121]: Combined121[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString121<T> = T extends string ? true : false;
type IsNumber121<T> = T extends number ? true : false;
type TypeName121<T> = T extends string
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

type TypeNames121 = {
  [K in keyof BigRecord121]: TypeName121<BigRecord121[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb121 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource121 = "user" | "post" | "comment" | "tag" | "category";
type Action121 = `${Verb121}_${Resource121}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise121<T> = T extends Promise<infer U> ? UnwrapPromise121<U> : T;
type UnwrapArray121<T> = T extends (infer U)[] ? UnwrapArray121<U> : T;
type Head121<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail121<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation121<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation121<Exclude<T, K>>]
  : never;

type SmallUnion121 = "a" | "b" | "c" | "d";
type AllPerms121 = Permutation121<SmallUnion121>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig121,
  Flat121,
  FR121,
  BigUnion121,
  ExtractAlpha121,
  ExcludeZulu121,
  OptionalAll121,
  RequiredAll121,
  ReadonlyAll121,
  NullableAll121,
  TypeNames121,
  Action121,
  AllPerms121,
};
