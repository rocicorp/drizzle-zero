// pkg-07 / types-31  (seed 731) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord731 {
  a731: { x: number; y: string; z: boolean };
  b731: { p: string[]; q: Record<string, number> };
  c731: { nested: { deep: { deeper: { deepest: string } } } };
  d731: number;
  e731: string;
  f731: boolean;
  g731: null;
  h731: undefined;
  i731: bigint;
  j731: symbol;
}

type PartialBig731 = DeepPartial<BigRecord731>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten731<T> = T extends Array<infer U> ? Flatten731<U> : T;
type Nested731 = number[][][][][][][][][][];
type Flat731 = Flatten731<Nested731>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly731<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly731<T[K]> : T[K];
};
type DeepRequired731<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired731<T[K]> : T[K];
};
type FR731 = DeepReadonly731<DeepRequired731<PartialBig731>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion731 =
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

type ExtractAlpha731 = Extract<BigUnion731, "alpha" | "bravo" | "charlie">;
type ExcludeZulu731 = Exclude<BigUnion731, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA731 { width: number; height: number; depth: number }
interface ShapeB731 { color: string; opacity: number; blend: string }
interface ShapeC731 { x: number; y: number; z: number; w: number }
interface ShapeD731 { label: string; title: string; summary: string }

type Combined731 = ShapeA731 & ShapeB731 & ShapeC731 & ShapeD731;
type OptionalAll731 = { [K in keyof Combined731]?: Combined731[K] };
type RequiredAll731 = { [K in keyof Combined731]-?: Combined731[K] };
type ReadonlyAll731 = { readonly [K in keyof Combined731]: Combined731[K] };
type NullableAll731 = { [K in keyof Combined731]: Combined731[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString731<T> = T extends string ? true : false;
type IsNumber731<T> = T extends number ? true : false;
type TypeName731<T> = T extends string
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

type TypeNames731 = {
  [K in keyof BigRecord731]: TypeName731<BigRecord731[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb731 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource731 = "user" | "post" | "comment" | "tag" | "category";
type Action731 = `${Verb731}_${Resource731}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise731<T> = T extends Promise<infer U> ? UnwrapPromise731<U> : T;
type UnwrapArray731<T> = T extends (infer U)[] ? UnwrapArray731<U> : T;
type Head731<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail731<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation731<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation731<Exclude<T, K>>]
  : never;

type SmallUnion731 = "a" | "b" | "c" | "d";
type AllPerms731 = Permutation731<SmallUnion731>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig731,
  Flat731,
  FR731,
  BigUnion731,
  ExtractAlpha731,
  ExcludeZulu731,
  OptionalAll731,
  RequiredAll731,
  ReadonlyAll731,
  NullableAll731,
  TypeNames731,
  Action731,
  AllPerms731,
};
