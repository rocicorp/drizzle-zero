// pkg-02 / types-20  (seed 220) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord220 {
  a220: { x: number; y: string; z: boolean };
  b220: { p: string[]; q: Record<string, number> };
  c220: { nested: { deep: { deeper: { deepest: string } } } };
  d220: number;
  e220: string;
  f220: boolean;
  g220: null;
  h220: undefined;
  i220: bigint;
  j220: symbol;
}

type PartialBig220 = DeepPartial<BigRecord220>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten220<T> = T extends Array<infer U> ? Flatten220<U> : T;
type Nested220 = number[][][][][][][][][][];
type Flat220 = Flatten220<Nested220>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly220<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly220<T[K]> : T[K];
};
type DeepRequired220<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired220<T[K]> : T[K];
};
type FR220 = DeepReadonly220<DeepRequired220<PartialBig220>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion220 =
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

type ExtractAlpha220 = Extract<BigUnion220, "alpha" | "bravo" | "charlie">;
type ExcludeZulu220 = Exclude<BigUnion220, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA220 { width: number; height: number; depth: number }
interface ShapeB220 { color: string; opacity: number; blend: string }
interface ShapeC220 { x: number; y: number; z: number; w: number }
interface ShapeD220 { label: string; title: string; summary: string }

type Combined220 = ShapeA220 & ShapeB220 & ShapeC220 & ShapeD220;
type OptionalAll220 = { [K in keyof Combined220]?: Combined220[K] };
type RequiredAll220 = { [K in keyof Combined220]-?: Combined220[K] };
type ReadonlyAll220 = { readonly [K in keyof Combined220]: Combined220[K] };
type NullableAll220 = { [K in keyof Combined220]: Combined220[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString220<T> = T extends string ? true : false;
type IsNumber220<T> = T extends number ? true : false;
type TypeName220<T> = T extends string
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

type TypeNames220 = {
  [K in keyof BigRecord220]: TypeName220<BigRecord220[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb220 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource220 = "user" | "post" | "comment" | "tag" | "category";
type Action220 = `${Verb220}_${Resource220}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise220<T> = T extends Promise<infer U> ? UnwrapPromise220<U> : T;
type UnwrapArray220<T> = T extends (infer U)[] ? UnwrapArray220<U> : T;
type Head220<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail220<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation220<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation220<Exclude<T, K>>]
  : never;

type SmallUnion220 = "a" | "b" | "c" | "d";
type AllPerms220 = Permutation220<SmallUnion220>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig220,
  Flat220,
  FR220,
  BigUnion220,
  ExtractAlpha220,
  ExcludeZulu220,
  OptionalAll220,
  RequiredAll220,
  ReadonlyAll220,
  NullableAll220,
  TypeNames220,
  Action220,
  AllPerms220,
};
