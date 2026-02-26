// pkg-09 / types-20  (seed 920) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord920 {
  a920: { x: number; y: string; z: boolean };
  b920: { p: string[]; q: Record<string, number> };
  c920: { nested: { deep: { deeper: { deepest: string } } } };
  d920: number;
  e920: string;
  f920: boolean;
  g920: null;
  h920: undefined;
  i920: bigint;
  j920: symbol;
}

type PartialBig920 = DeepPartial<BigRecord920>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten920<T> = T extends Array<infer U> ? Flatten920<U> : T;
type Nested920 = number[][][][][][][][][][];
type Flat920 = Flatten920<Nested920>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly920<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly920<T[K]> : T[K];
};
type DeepRequired920<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired920<T[K]> : T[K];
};
type FR920 = DeepReadonly920<DeepRequired920<PartialBig920>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion920 =
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

type ExtractAlpha920 = Extract<BigUnion920, "alpha" | "bravo" | "charlie">;
type ExcludeZulu920 = Exclude<BigUnion920, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA920 { width: number; height: number; depth: number }
interface ShapeB920 { color: string; opacity: number; blend: string }
interface ShapeC920 { x: number; y: number; z: number; w: number }
interface ShapeD920 { label: string; title: string; summary: string }

type Combined920 = ShapeA920 & ShapeB920 & ShapeC920 & ShapeD920;
type OptionalAll920 = { [K in keyof Combined920]?: Combined920[K] };
type RequiredAll920 = { [K in keyof Combined920]-?: Combined920[K] };
type ReadonlyAll920 = { readonly [K in keyof Combined920]: Combined920[K] };
type NullableAll920 = { [K in keyof Combined920]: Combined920[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString920<T> = T extends string ? true : false;
type IsNumber920<T> = T extends number ? true : false;
type TypeName920<T> = T extends string
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

type TypeNames920 = {
  [K in keyof BigRecord920]: TypeName920<BigRecord920[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb920 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource920 = "user" | "post" | "comment" | "tag" | "category";
type Action920 = `${Verb920}_${Resource920}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise920<T> = T extends Promise<infer U> ? UnwrapPromise920<U> : T;
type UnwrapArray920<T> = T extends (infer U)[] ? UnwrapArray920<U> : T;
type Head920<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail920<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation920<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation920<Exclude<T, K>>]
  : never;

type SmallUnion920 = "a" | "b" | "c" | "d";
type AllPerms920 = Permutation920<SmallUnion920>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig920,
  Flat920,
  FR920,
  BigUnion920,
  ExtractAlpha920,
  ExcludeZulu920,
  OptionalAll920,
  RequiredAll920,
  ReadonlyAll920,
  NullableAll920,
  TypeNames920,
  Action920,
  AllPerms920,
};
