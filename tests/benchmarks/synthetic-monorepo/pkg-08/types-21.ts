// pkg-08 / types-21  (seed 821) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord821 {
  a821: { x: number; y: string; z: boolean };
  b821: { p: string[]; q: Record<string, number> };
  c821: { nested: { deep: { deeper: { deepest: string } } } };
  d821: number;
  e821: string;
  f821: boolean;
  g821: null;
  h821: undefined;
  i821: bigint;
  j821: symbol;
}

type PartialBig821 = DeepPartial<BigRecord821>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten821<T> = T extends Array<infer U> ? Flatten821<U> : T;
type Nested821 = number[][][][][][][][][][];
type Flat821 = Flatten821<Nested821>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly821<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly821<T[K]> : T[K];
};
type DeepRequired821<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired821<T[K]> : T[K];
};
type FR821 = DeepReadonly821<DeepRequired821<PartialBig821>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion821 =
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

type ExtractAlpha821 = Extract<BigUnion821, "alpha" | "bravo" | "charlie">;
type ExcludeZulu821 = Exclude<BigUnion821, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA821 { width: number; height: number; depth: number }
interface ShapeB821 { color: string; opacity: number; blend: string }
interface ShapeC821 { x: number; y: number; z: number; w: number }
interface ShapeD821 { label: string; title: string; summary: string }

type Combined821 = ShapeA821 & ShapeB821 & ShapeC821 & ShapeD821;
type OptionalAll821 = { [K in keyof Combined821]?: Combined821[K] };
type RequiredAll821 = { [K in keyof Combined821]-?: Combined821[K] };
type ReadonlyAll821 = { readonly [K in keyof Combined821]: Combined821[K] };
type NullableAll821 = { [K in keyof Combined821]: Combined821[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString821<T> = T extends string ? true : false;
type IsNumber821<T> = T extends number ? true : false;
type TypeName821<T> = T extends string
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

type TypeNames821 = {
  [K in keyof BigRecord821]: TypeName821<BigRecord821[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb821 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource821 = "user" | "post" | "comment" | "tag" | "category";
type Action821 = `${Verb821}_${Resource821}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise821<T> = T extends Promise<infer U> ? UnwrapPromise821<U> : T;
type UnwrapArray821<T> = T extends (infer U)[] ? UnwrapArray821<U> : T;
type Head821<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail821<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation821<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation821<Exclude<T, K>>]
  : never;

type SmallUnion821 = "a" | "b" | "c" | "d";
type AllPerms821 = Permutation821<SmallUnion821>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig821,
  Flat821,
  FR821,
  BigUnion821,
  ExtractAlpha821,
  ExcludeZulu821,
  OptionalAll821,
  RequiredAll821,
  ReadonlyAll821,
  NullableAll821,
  TypeNames821,
  Action821,
  AllPerms821,
};
