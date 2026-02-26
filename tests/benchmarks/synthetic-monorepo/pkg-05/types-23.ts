// pkg-05 / types-23  (seed 523) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord523 {
  a523: { x: number; y: string; z: boolean };
  b523: { p: string[]; q: Record<string, number> };
  c523: { nested: { deep: { deeper: { deepest: string } } } };
  d523: number;
  e523: string;
  f523: boolean;
  g523: null;
  h523: undefined;
  i523: bigint;
  j523: symbol;
}

type PartialBig523 = DeepPartial<BigRecord523>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten523<T> = T extends Array<infer U> ? Flatten523<U> : T;
type Nested523 = number[][][][][][][][][][];
type Flat523 = Flatten523<Nested523>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly523<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly523<T[K]> : T[K];
};
type DeepRequired523<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired523<T[K]> : T[K];
};
type FR523 = DeepReadonly523<DeepRequired523<PartialBig523>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion523 =
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

type ExtractAlpha523 = Extract<BigUnion523, "alpha" | "bravo" | "charlie">;
type ExcludeZulu523 = Exclude<BigUnion523, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA523 { width: number; height: number; depth: number }
interface ShapeB523 { color: string; opacity: number; blend: string }
interface ShapeC523 { x: number; y: number; z: number; w: number }
interface ShapeD523 { label: string; title: string; summary: string }

type Combined523 = ShapeA523 & ShapeB523 & ShapeC523 & ShapeD523;
type OptionalAll523 = { [K in keyof Combined523]?: Combined523[K] };
type RequiredAll523 = { [K in keyof Combined523]-?: Combined523[K] };
type ReadonlyAll523 = { readonly [K in keyof Combined523]: Combined523[K] };
type NullableAll523 = { [K in keyof Combined523]: Combined523[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString523<T> = T extends string ? true : false;
type IsNumber523<T> = T extends number ? true : false;
type TypeName523<T> = T extends string
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

type TypeNames523 = {
  [K in keyof BigRecord523]: TypeName523<BigRecord523[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb523 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource523 = "user" | "post" | "comment" | "tag" | "category";
type Action523 = `${Verb523}_${Resource523}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise523<T> = T extends Promise<infer U> ? UnwrapPromise523<U> : T;
type UnwrapArray523<T> = T extends (infer U)[] ? UnwrapArray523<U> : T;
type Head523<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail523<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation523<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation523<Exclude<T, K>>]
  : never;

type SmallUnion523 = "a" | "b" | "c" | "d";
type AllPerms523 = Permutation523<SmallUnion523>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig523,
  Flat523,
  FR523,
  BigUnion523,
  ExtractAlpha523,
  ExcludeZulu523,
  OptionalAll523,
  RequiredAll523,
  ReadonlyAll523,
  NullableAll523,
  TypeNames523,
  Action523,
  AllPerms523,
};
