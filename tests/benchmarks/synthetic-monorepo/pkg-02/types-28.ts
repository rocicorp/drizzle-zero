// pkg-02 / types-28  (seed 228) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord228 {
  a228: { x: number; y: string; z: boolean };
  b228: { p: string[]; q: Record<string, number> };
  c228: { nested: { deep: { deeper: { deepest: string } } } };
  d228: number;
  e228: string;
  f228: boolean;
  g228: null;
  h228: undefined;
  i228: bigint;
  j228: symbol;
}

type PartialBig228 = DeepPartial<BigRecord228>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten228<T> = T extends Array<infer U> ? Flatten228<U> : T;
type Nested228 = number[][][][][][][][][][];
type Flat228 = Flatten228<Nested228>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly228<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly228<T[K]> : T[K];
};
type DeepRequired228<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired228<T[K]> : T[K];
};
type FR228 = DeepReadonly228<DeepRequired228<PartialBig228>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion228 =
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

type ExtractAlpha228 = Extract<BigUnion228, "alpha" | "bravo" | "charlie">;
type ExcludeZulu228 = Exclude<BigUnion228, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA228 { width: number; height: number; depth: number }
interface ShapeB228 { color: string; opacity: number; blend: string }
interface ShapeC228 { x: number; y: number; z: number; w: number }
interface ShapeD228 { label: string; title: string; summary: string }

type Combined228 = ShapeA228 & ShapeB228 & ShapeC228 & ShapeD228;
type OptionalAll228 = { [K in keyof Combined228]?: Combined228[K] };
type RequiredAll228 = { [K in keyof Combined228]-?: Combined228[K] };
type ReadonlyAll228 = { readonly [K in keyof Combined228]: Combined228[K] };
type NullableAll228 = { [K in keyof Combined228]: Combined228[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString228<T> = T extends string ? true : false;
type IsNumber228<T> = T extends number ? true : false;
type TypeName228<T> = T extends string
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

type TypeNames228 = {
  [K in keyof BigRecord228]: TypeName228<BigRecord228[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb228 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource228 = "user" | "post" | "comment" | "tag" | "category";
type Action228 = `${Verb228}_${Resource228}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise228<T> = T extends Promise<infer U> ? UnwrapPromise228<U> : T;
type UnwrapArray228<T> = T extends (infer U)[] ? UnwrapArray228<U> : T;
type Head228<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail228<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation228<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation228<Exclude<T, K>>]
  : never;

type SmallUnion228 = "a" | "b" | "c" | "d";
type AllPerms228 = Permutation228<SmallUnion228>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig228,
  Flat228,
  FR228,
  BigUnion228,
  ExtractAlpha228,
  ExcludeZulu228,
  OptionalAll228,
  RequiredAll228,
  ReadonlyAll228,
  NullableAll228,
  TypeNames228,
  Action228,
  AllPerms228,
};
