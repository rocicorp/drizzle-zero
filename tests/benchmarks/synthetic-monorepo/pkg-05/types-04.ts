// pkg-05 / types-04  (seed 504) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord504 {
  a504: { x: number; y: string; z: boolean };
  b504: { p: string[]; q: Record<string, number> };
  c504: { nested: { deep: { deeper: { deepest: string } } } };
  d504: number;
  e504: string;
  f504: boolean;
  g504: null;
  h504: undefined;
  i504: bigint;
  j504: symbol;
}

type PartialBig504 = DeepPartial<BigRecord504>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten504<T> = T extends Array<infer U> ? Flatten504<U> : T;
type Nested504 = number[][][][][][][][][][];
type Flat504 = Flatten504<Nested504>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly504<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly504<T[K]> : T[K];
};
type DeepRequired504<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired504<T[K]> : T[K];
};
type FR504 = DeepReadonly504<DeepRequired504<PartialBig504>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion504 =
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

type ExtractAlpha504 = Extract<BigUnion504, "alpha" | "bravo" | "charlie">;
type ExcludeZulu504 = Exclude<BigUnion504, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA504 { width: number; height: number; depth: number }
interface ShapeB504 { color: string; opacity: number; blend: string }
interface ShapeC504 { x: number; y: number; z: number; w: number }
interface ShapeD504 { label: string; title: string; summary: string }

type Combined504 = ShapeA504 & ShapeB504 & ShapeC504 & ShapeD504;
type OptionalAll504 = { [K in keyof Combined504]?: Combined504[K] };
type RequiredAll504 = { [K in keyof Combined504]-?: Combined504[K] };
type ReadonlyAll504 = { readonly [K in keyof Combined504]: Combined504[K] };
type NullableAll504 = { [K in keyof Combined504]: Combined504[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString504<T> = T extends string ? true : false;
type IsNumber504<T> = T extends number ? true : false;
type TypeName504<T> = T extends string
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

type TypeNames504 = {
  [K in keyof BigRecord504]: TypeName504<BigRecord504[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb504 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource504 = "user" | "post" | "comment" | "tag" | "category";
type Action504 = `${Verb504}_${Resource504}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise504<T> = T extends Promise<infer U> ? UnwrapPromise504<U> : T;
type UnwrapArray504<T> = T extends (infer U)[] ? UnwrapArray504<U> : T;
type Head504<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail504<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation504<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation504<Exclude<T, K>>]
  : never;

type SmallUnion504 = "a" | "b" | "c" | "d";
type AllPerms504 = Permutation504<SmallUnion504>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig504,
  Flat504,
  FR504,
  BigUnion504,
  ExtractAlpha504,
  ExcludeZulu504,
  OptionalAll504,
  RequiredAll504,
  ReadonlyAll504,
  NullableAll504,
  TypeNames504,
  Action504,
  AllPerms504,
};
