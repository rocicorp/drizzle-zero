// pkg-06 / types-05  (seed 605) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord605 {
  a605: { x: number; y: string; z: boolean };
  b605: { p: string[]; q: Record<string, number> };
  c605: { nested: { deep: { deeper: { deepest: string } } } };
  d605: number;
  e605: string;
  f605: boolean;
  g605: null;
  h605: undefined;
  i605: bigint;
  j605: symbol;
}

type PartialBig605 = DeepPartial<BigRecord605>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten605<T> = T extends Array<infer U> ? Flatten605<U> : T;
type Nested605 = number[][][][][][][][][][];
type Flat605 = Flatten605<Nested605>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly605<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly605<T[K]> : T[K];
};
type DeepRequired605<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired605<T[K]> : T[K];
};
type FR605 = DeepReadonly605<DeepRequired605<PartialBig605>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion605 =
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

type ExtractAlpha605 = Extract<BigUnion605, "alpha" | "bravo" | "charlie">;
type ExcludeZulu605 = Exclude<BigUnion605, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA605 { width: number; height: number; depth: number }
interface ShapeB605 { color: string; opacity: number; blend: string }
interface ShapeC605 { x: number; y: number; z: number; w: number }
interface ShapeD605 { label: string; title: string; summary: string }

type Combined605 = ShapeA605 & ShapeB605 & ShapeC605 & ShapeD605;
type OptionalAll605 = { [K in keyof Combined605]?: Combined605[K] };
type RequiredAll605 = { [K in keyof Combined605]-?: Combined605[K] };
type ReadonlyAll605 = { readonly [K in keyof Combined605]: Combined605[K] };
type NullableAll605 = { [K in keyof Combined605]: Combined605[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString605<T> = T extends string ? true : false;
type IsNumber605<T> = T extends number ? true : false;
type TypeName605<T> = T extends string
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

type TypeNames605 = {
  [K in keyof BigRecord605]: TypeName605<BigRecord605[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb605 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource605 = "user" | "post" | "comment" | "tag" | "category";
type Action605 = `${Verb605}_${Resource605}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise605<T> = T extends Promise<infer U> ? UnwrapPromise605<U> : T;
type UnwrapArray605<T> = T extends (infer U)[] ? UnwrapArray605<U> : T;
type Head605<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail605<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation605<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation605<Exclude<T, K>>]
  : never;

type SmallUnion605 = "a" | "b" | "c" | "d";
type AllPerms605 = Permutation605<SmallUnion605>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig605,
  Flat605,
  FR605,
  BigUnion605,
  ExtractAlpha605,
  ExcludeZulu605,
  OptionalAll605,
  RequiredAll605,
  ReadonlyAll605,
  NullableAll605,
  TypeNames605,
  Action605,
  AllPerms605,
};
