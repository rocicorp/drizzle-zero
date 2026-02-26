// pkg-02 / types-46  (seed 246) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord246 {
  a246: { x: number; y: string; z: boolean };
  b246: { p: string[]; q: Record<string, number> };
  c246: { nested: { deep: { deeper: { deepest: string } } } };
  d246: number;
  e246: string;
  f246: boolean;
  g246: null;
  h246: undefined;
  i246: bigint;
  j246: symbol;
}

type PartialBig246 = DeepPartial<BigRecord246>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten246<T> = T extends Array<infer U> ? Flatten246<U> : T;
type Nested246 = number[][][][][][][][][][];
type Flat246 = Flatten246<Nested246>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly246<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly246<T[K]> : T[K];
};
type DeepRequired246<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired246<T[K]> : T[K];
};
type FR246 = DeepReadonly246<DeepRequired246<PartialBig246>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion246 =
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

type ExtractAlpha246 = Extract<BigUnion246, "alpha" | "bravo" | "charlie">;
type ExcludeZulu246 = Exclude<BigUnion246, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA246 { width: number; height: number; depth: number }
interface ShapeB246 { color: string; opacity: number; blend: string }
interface ShapeC246 { x: number; y: number; z: number; w: number }
interface ShapeD246 { label: string; title: string; summary: string }

type Combined246 = ShapeA246 & ShapeB246 & ShapeC246 & ShapeD246;
type OptionalAll246 = { [K in keyof Combined246]?: Combined246[K] };
type RequiredAll246 = { [K in keyof Combined246]-?: Combined246[K] };
type ReadonlyAll246 = { readonly [K in keyof Combined246]: Combined246[K] };
type NullableAll246 = { [K in keyof Combined246]: Combined246[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString246<T> = T extends string ? true : false;
type IsNumber246<T> = T extends number ? true : false;
type TypeName246<T> = T extends string
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

type TypeNames246 = {
  [K in keyof BigRecord246]: TypeName246<BigRecord246[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb246 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource246 = "user" | "post" | "comment" | "tag" | "category";
type Action246 = `${Verb246}_${Resource246}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise246<T> = T extends Promise<infer U> ? UnwrapPromise246<U> : T;
type UnwrapArray246<T> = T extends (infer U)[] ? UnwrapArray246<U> : T;
type Head246<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail246<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation246<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation246<Exclude<T, K>>]
  : never;

type SmallUnion246 = "a" | "b" | "c" | "d";
type AllPerms246 = Permutation246<SmallUnion246>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig246,
  Flat246,
  FR246,
  BigUnion246,
  ExtractAlpha246,
  ExcludeZulu246,
  OptionalAll246,
  RequiredAll246,
  ReadonlyAll246,
  NullableAll246,
  TypeNames246,
  Action246,
  AllPerms246,
};
