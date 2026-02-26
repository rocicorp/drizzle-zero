// pkg-09 / types-40  (seed 940) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord940 {
  a940: { x: number; y: string; z: boolean };
  b940: { p: string[]; q: Record<string, number> };
  c940: { nested: { deep: { deeper: { deepest: string } } } };
  d940: number;
  e940: string;
  f940: boolean;
  g940: null;
  h940: undefined;
  i940: bigint;
  j940: symbol;
}

type PartialBig940 = DeepPartial<BigRecord940>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten940<T> = T extends Array<infer U> ? Flatten940<U> : T;
type Nested940 = number[][][][][][][][][][];
type Flat940 = Flatten940<Nested940>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly940<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly940<T[K]> : T[K];
};
type DeepRequired940<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired940<T[K]> : T[K];
};
type FR940 = DeepReadonly940<DeepRequired940<PartialBig940>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion940 =
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

type ExtractAlpha940 = Extract<BigUnion940, "alpha" | "bravo" | "charlie">;
type ExcludeZulu940 = Exclude<BigUnion940, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA940 { width: number; height: number; depth: number }
interface ShapeB940 { color: string; opacity: number; blend: string }
interface ShapeC940 { x: number; y: number; z: number; w: number }
interface ShapeD940 { label: string; title: string; summary: string }

type Combined940 = ShapeA940 & ShapeB940 & ShapeC940 & ShapeD940;
type OptionalAll940 = { [K in keyof Combined940]?: Combined940[K] };
type RequiredAll940 = { [K in keyof Combined940]-?: Combined940[K] };
type ReadonlyAll940 = { readonly [K in keyof Combined940]: Combined940[K] };
type NullableAll940 = { [K in keyof Combined940]: Combined940[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString940<T> = T extends string ? true : false;
type IsNumber940<T> = T extends number ? true : false;
type TypeName940<T> = T extends string
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

type TypeNames940 = {
  [K in keyof BigRecord940]: TypeName940<BigRecord940[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb940 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource940 = "user" | "post" | "comment" | "tag" | "category";
type Action940 = `${Verb940}_${Resource940}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise940<T> = T extends Promise<infer U> ? UnwrapPromise940<U> : T;
type UnwrapArray940<T> = T extends (infer U)[] ? UnwrapArray940<U> : T;
type Head940<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail940<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation940<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation940<Exclude<T, K>>]
  : never;

type SmallUnion940 = "a" | "b" | "c" | "d";
type AllPerms940 = Permutation940<SmallUnion940>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig940,
  Flat940,
  FR940,
  BigUnion940,
  ExtractAlpha940,
  ExcludeZulu940,
  OptionalAll940,
  RequiredAll940,
  ReadonlyAll940,
  NullableAll940,
  TypeNames940,
  Action940,
  AllPerms940,
};
