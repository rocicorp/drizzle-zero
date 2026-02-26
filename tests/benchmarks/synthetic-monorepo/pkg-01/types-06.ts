// pkg-01 / types-06  (seed 106) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord106 {
  a106: { x: number; y: string; z: boolean };
  b106: { p: string[]; q: Record<string, number> };
  c106: { nested: { deep: { deeper: { deepest: string } } } };
  d106: number;
  e106: string;
  f106: boolean;
  g106: null;
  h106: undefined;
  i106: bigint;
  j106: symbol;
}

type PartialBig106 = DeepPartial<BigRecord106>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten106<T> = T extends Array<infer U> ? Flatten106<U> : T;
type Nested106 = number[][][][][][][][][][];
type Flat106 = Flatten106<Nested106>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly106<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly106<T[K]> : T[K];
};
type DeepRequired106<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired106<T[K]> : T[K];
};
type FR106 = DeepReadonly106<DeepRequired106<PartialBig106>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion106 =
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

type ExtractAlpha106 = Extract<BigUnion106, "alpha" | "bravo" | "charlie">;
type ExcludeZulu106 = Exclude<BigUnion106, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA106 { width: number; height: number; depth: number }
interface ShapeB106 { color: string; opacity: number; blend: string }
interface ShapeC106 { x: number; y: number; z: number; w: number }
interface ShapeD106 { label: string; title: string; summary: string }

type Combined106 = ShapeA106 & ShapeB106 & ShapeC106 & ShapeD106;
type OptionalAll106 = { [K in keyof Combined106]?: Combined106[K] };
type RequiredAll106 = { [K in keyof Combined106]-?: Combined106[K] };
type ReadonlyAll106 = { readonly [K in keyof Combined106]: Combined106[K] };
type NullableAll106 = { [K in keyof Combined106]: Combined106[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString106<T> = T extends string ? true : false;
type IsNumber106<T> = T extends number ? true : false;
type TypeName106<T> = T extends string
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

type TypeNames106 = {
  [K in keyof BigRecord106]: TypeName106<BigRecord106[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb106 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource106 = "user" | "post" | "comment" | "tag" | "category";
type Action106 = `${Verb106}_${Resource106}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise106<T> = T extends Promise<infer U> ? UnwrapPromise106<U> : T;
type UnwrapArray106<T> = T extends (infer U)[] ? UnwrapArray106<U> : T;
type Head106<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail106<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation106<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation106<Exclude<T, K>>]
  : never;

type SmallUnion106 = "a" | "b" | "c" | "d";
type AllPerms106 = Permutation106<SmallUnion106>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig106,
  Flat106,
  FR106,
  BigUnion106,
  ExtractAlpha106,
  ExcludeZulu106,
  OptionalAll106,
  RequiredAll106,
  ReadonlyAll106,
  NullableAll106,
  TypeNames106,
  Action106,
  AllPerms106,
};
