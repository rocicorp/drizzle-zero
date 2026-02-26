// pkg-08 / types-11  (seed 811) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord811 {
  a811: { x: number; y: string; z: boolean };
  b811: { p: string[]; q: Record<string, number> };
  c811: { nested: { deep: { deeper: { deepest: string } } } };
  d811: number;
  e811: string;
  f811: boolean;
  g811: null;
  h811: undefined;
  i811: bigint;
  j811: symbol;
}

type PartialBig811 = DeepPartial<BigRecord811>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten811<T> = T extends Array<infer U> ? Flatten811<U> : T;
type Nested811 = number[][][][][][][][][][];
type Flat811 = Flatten811<Nested811>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly811<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly811<T[K]> : T[K];
};
type DeepRequired811<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired811<T[K]> : T[K];
};
type FR811 = DeepReadonly811<DeepRequired811<PartialBig811>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion811 =
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

type ExtractAlpha811 = Extract<BigUnion811, "alpha" | "bravo" | "charlie">;
type ExcludeZulu811 = Exclude<BigUnion811, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA811 { width: number; height: number; depth: number }
interface ShapeB811 { color: string; opacity: number; blend: string }
interface ShapeC811 { x: number; y: number; z: number; w: number }
interface ShapeD811 { label: string; title: string; summary: string }

type Combined811 = ShapeA811 & ShapeB811 & ShapeC811 & ShapeD811;
type OptionalAll811 = { [K in keyof Combined811]?: Combined811[K] };
type RequiredAll811 = { [K in keyof Combined811]-?: Combined811[K] };
type ReadonlyAll811 = { readonly [K in keyof Combined811]: Combined811[K] };
type NullableAll811 = { [K in keyof Combined811]: Combined811[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString811<T> = T extends string ? true : false;
type IsNumber811<T> = T extends number ? true : false;
type TypeName811<T> = T extends string
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

type TypeNames811 = {
  [K in keyof BigRecord811]: TypeName811<BigRecord811[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb811 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource811 = "user" | "post" | "comment" | "tag" | "category";
type Action811 = `${Verb811}_${Resource811}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise811<T> = T extends Promise<infer U> ? UnwrapPromise811<U> : T;
type UnwrapArray811<T> = T extends (infer U)[] ? UnwrapArray811<U> : T;
type Head811<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail811<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation811<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation811<Exclude<T, K>>]
  : never;

type SmallUnion811 = "a" | "b" | "c" | "d";
type AllPerms811 = Permutation811<SmallUnion811>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig811,
  Flat811,
  FR811,
  BigUnion811,
  ExtractAlpha811,
  ExcludeZulu811,
  OptionalAll811,
  RequiredAll811,
  ReadonlyAll811,
  NullableAll811,
  TypeNames811,
  Action811,
  AllPerms811,
};
