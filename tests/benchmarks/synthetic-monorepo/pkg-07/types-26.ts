// pkg-07 / types-26  (seed 726) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord726 {
  a726: { x: number; y: string; z: boolean };
  b726: { p: string[]; q: Record<string, number> };
  c726: { nested: { deep: { deeper: { deepest: string } } } };
  d726: number;
  e726: string;
  f726: boolean;
  g726: null;
  h726: undefined;
  i726: bigint;
  j726: symbol;
}

type PartialBig726 = DeepPartial<BigRecord726>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten726<T> = T extends Array<infer U> ? Flatten726<U> : T;
type Nested726 = number[][][][][][][][][][];
type Flat726 = Flatten726<Nested726>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly726<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly726<T[K]> : T[K];
};
type DeepRequired726<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired726<T[K]> : T[K];
};
type FR726 = DeepReadonly726<DeepRequired726<PartialBig726>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion726 =
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

type ExtractAlpha726 = Extract<BigUnion726, "alpha" | "bravo" | "charlie">;
type ExcludeZulu726 = Exclude<BigUnion726, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA726 { width: number; height: number; depth: number }
interface ShapeB726 { color: string; opacity: number; blend: string }
interface ShapeC726 { x: number; y: number; z: number; w: number }
interface ShapeD726 { label: string; title: string; summary: string }

type Combined726 = ShapeA726 & ShapeB726 & ShapeC726 & ShapeD726;
type OptionalAll726 = { [K in keyof Combined726]?: Combined726[K] };
type RequiredAll726 = { [K in keyof Combined726]-?: Combined726[K] };
type ReadonlyAll726 = { readonly [K in keyof Combined726]: Combined726[K] };
type NullableAll726 = { [K in keyof Combined726]: Combined726[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString726<T> = T extends string ? true : false;
type IsNumber726<T> = T extends number ? true : false;
type TypeName726<T> = T extends string
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

type TypeNames726 = {
  [K in keyof BigRecord726]: TypeName726<BigRecord726[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb726 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource726 = "user" | "post" | "comment" | "tag" | "category";
type Action726 = `${Verb726}_${Resource726}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise726<T> = T extends Promise<infer U> ? UnwrapPromise726<U> : T;
type UnwrapArray726<T> = T extends (infer U)[] ? UnwrapArray726<U> : T;
type Head726<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail726<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation726<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation726<Exclude<T, K>>]
  : never;

type SmallUnion726 = "a" | "b" | "c" | "d";
type AllPerms726 = Permutation726<SmallUnion726>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig726,
  Flat726,
  FR726,
  BigUnion726,
  ExtractAlpha726,
  ExcludeZulu726,
  OptionalAll726,
  RequiredAll726,
  ReadonlyAll726,
  NullableAll726,
  TypeNames726,
  Action726,
  AllPerms726,
};
