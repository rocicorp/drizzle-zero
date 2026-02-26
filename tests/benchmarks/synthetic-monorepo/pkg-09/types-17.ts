// pkg-09 / types-17  (seed 917) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord917 {
  a917: { x: number; y: string; z: boolean };
  b917: { p: string[]; q: Record<string, number> };
  c917: { nested: { deep: { deeper: { deepest: string } } } };
  d917: number;
  e917: string;
  f917: boolean;
  g917: null;
  h917: undefined;
  i917: bigint;
  j917: symbol;
}

type PartialBig917 = DeepPartial<BigRecord917>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten917<T> = T extends Array<infer U> ? Flatten917<U> : T;
type Nested917 = number[][][][][][][][][][];
type Flat917 = Flatten917<Nested917>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly917<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly917<T[K]> : T[K];
};
type DeepRequired917<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired917<T[K]> : T[K];
};
type FR917 = DeepReadonly917<DeepRequired917<PartialBig917>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion917 =
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

type ExtractAlpha917 = Extract<BigUnion917, "alpha" | "bravo" | "charlie">;
type ExcludeZulu917 = Exclude<BigUnion917, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA917 { width: number; height: number; depth: number }
interface ShapeB917 { color: string; opacity: number; blend: string }
interface ShapeC917 { x: number; y: number; z: number; w: number }
interface ShapeD917 { label: string; title: string; summary: string }

type Combined917 = ShapeA917 & ShapeB917 & ShapeC917 & ShapeD917;
type OptionalAll917 = { [K in keyof Combined917]?: Combined917[K] };
type RequiredAll917 = { [K in keyof Combined917]-?: Combined917[K] };
type ReadonlyAll917 = { readonly [K in keyof Combined917]: Combined917[K] };
type NullableAll917 = { [K in keyof Combined917]: Combined917[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString917<T> = T extends string ? true : false;
type IsNumber917<T> = T extends number ? true : false;
type TypeName917<T> = T extends string
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

type TypeNames917 = {
  [K in keyof BigRecord917]: TypeName917<BigRecord917[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb917 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource917 = "user" | "post" | "comment" | "tag" | "category";
type Action917 = `${Verb917}_${Resource917}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise917<T> = T extends Promise<infer U> ? UnwrapPromise917<U> : T;
type UnwrapArray917<T> = T extends (infer U)[] ? UnwrapArray917<U> : T;
type Head917<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail917<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation917<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation917<Exclude<T, K>>]
  : never;

type SmallUnion917 = "a" | "b" | "c" | "d";
type AllPerms917 = Permutation917<SmallUnion917>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig917,
  Flat917,
  FR917,
  BigUnion917,
  ExtractAlpha917,
  ExcludeZulu917,
  OptionalAll917,
  RequiredAll917,
  ReadonlyAll917,
  NullableAll917,
  TypeNames917,
  Action917,
  AllPerms917,
};
