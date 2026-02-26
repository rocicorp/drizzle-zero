// pkg-01 / types-13  (seed 113) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord113 {
  a113: { x: number; y: string; z: boolean };
  b113: { p: string[]; q: Record<string, number> };
  c113: { nested: { deep: { deeper: { deepest: string } } } };
  d113: number;
  e113: string;
  f113: boolean;
  g113: null;
  h113: undefined;
  i113: bigint;
  j113: symbol;
}

type PartialBig113 = DeepPartial<BigRecord113>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten113<T> = T extends Array<infer U> ? Flatten113<U> : T;
type Nested113 = number[][][][][][][][][][];
type Flat113 = Flatten113<Nested113>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly113<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly113<T[K]> : T[K];
};
type DeepRequired113<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired113<T[K]> : T[K];
};
type FR113 = DeepReadonly113<DeepRequired113<PartialBig113>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion113 =
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

type ExtractAlpha113 = Extract<BigUnion113, "alpha" | "bravo" | "charlie">;
type ExcludeZulu113 = Exclude<BigUnion113, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA113 { width: number; height: number; depth: number }
interface ShapeB113 { color: string; opacity: number; blend: string }
interface ShapeC113 { x: number; y: number; z: number; w: number }
interface ShapeD113 { label: string; title: string; summary: string }

type Combined113 = ShapeA113 & ShapeB113 & ShapeC113 & ShapeD113;
type OptionalAll113 = { [K in keyof Combined113]?: Combined113[K] };
type RequiredAll113 = { [K in keyof Combined113]-?: Combined113[K] };
type ReadonlyAll113 = { readonly [K in keyof Combined113]: Combined113[K] };
type NullableAll113 = { [K in keyof Combined113]: Combined113[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString113<T> = T extends string ? true : false;
type IsNumber113<T> = T extends number ? true : false;
type TypeName113<T> = T extends string
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

type TypeNames113 = {
  [K in keyof BigRecord113]: TypeName113<BigRecord113[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb113 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource113 = "user" | "post" | "comment" | "tag" | "category";
type Action113 = `${Verb113}_${Resource113}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise113<T> = T extends Promise<infer U> ? UnwrapPromise113<U> : T;
type UnwrapArray113<T> = T extends (infer U)[] ? UnwrapArray113<U> : T;
type Head113<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail113<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation113<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation113<Exclude<T, K>>]
  : never;

type SmallUnion113 = "a" | "b" | "c" | "d";
type AllPerms113 = Permutation113<SmallUnion113>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig113,
  Flat113,
  FR113,
  BigUnion113,
  ExtractAlpha113,
  ExcludeZulu113,
  OptionalAll113,
  RequiredAll113,
  ReadonlyAll113,
  NullableAll113,
  TypeNames113,
  Action113,
  AllPerms113,
};
