// pkg-02 / types-14  (seed 214) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord214 {
  a214: { x: number; y: string; z: boolean };
  b214: { p: string[]; q: Record<string, number> };
  c214: { nested: { deep: { deeper: { deepest: string } } } };
  d214: number;
  e214: string;
  f214: boolean;
  g214: null;
  h214: undefined;
  i214: bigint;
  j214: symbol;
}

type PartialBig214 = DeepPartial<BigRecord214>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten214<T> = T extends Array<infer U> ? Flatten214<U> : T;
type Nested214 = number[][][][][][][][][][];
type Flat214 = Flatten214<Nested214>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly214<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly214<T[K]> : T[K];
};
type DeepRequired214<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired214<T[K]> : T[K];
};
type FR214 = DeepReadonly214<DeepRequired214<PartialBig214>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion214 =
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

type ExtractAlpha214 = Extract<BigUnion214, "alpha" | "bravo" | "charlie">;
type ExcludeZulu214 = Exclude<BigUnion214, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA214 { width: number; height: number; depth: number }
interface ShapeB214 { color: string; opacity: number; blend: string }
interface ShapeC214 { x: number; y: number; z: number; w: number }
interface ShapeD214 { label: string; title: string; summary: string }

type Combined214 = ShapeA214 & ShapeB214 & ShapeC214 & ShapeD214;
type OptionalAll214 = { [K in keyof Combined214]?: Combined214[K] };
type RequiredAll214 = { [K in keyof Combined214]-?: Combined214[K] };
type ReadonlyAll214 = { readonly [K in keyof Combined214]: Combined214[K] };
type NullableAll214 = { [K in keyof Combined214]: Combined214[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString214<T> = T extends string ? true : false;
type IsNumber214<T> = T extends number ? true : false;
type TypeName214<T> = T extends string
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

type TypeNames214 = {
  [K in keyof BigRecord214]: TypeName214<BigRecord214[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb214 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource214 = "user" | "post" | "comment" | "tag" | "category";
type Action214 = `${Verb214}_${Resource214}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise214<T> = T extends Promise<infer U> ? UnwrapPromise214<U> : T;
type UnwrapArray214<T> = T extends (infer U)[] ? UnwrapArray214<U> : T;
type Head214<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail214<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation214<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation214<Exclude<T, K>>]
  : never;

type SmallUnion214 = "a" | "b" | "c" | "d";
type AllPerms214 = Permutation214<SmallUnion214>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig214,
  Flat214,
  FR214,
  BigUnion214,
  ExtractAlpha214,
  ExcludeZulu214,
  OptionalAll214,
  RequiredAll214,
  ReadonlyAll214,
  NullableAll214,
  TypeNames214,
  Action214,
  AllPerms214,
};
