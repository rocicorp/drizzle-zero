// pkg-03 / types-13  (seed 313) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord313 {
  a313: { x: number; y: string; z: boolean };
  b313: { p: string[]; q: Record<string, number> };
  c313: { nested: { deep: { deeper: { deepest: string } } } };
  d313: number;
  e313: string;
  f313: boolean;
  g313: null;
  h313: undefined;
  i313: bigint;
  j313: symbol;
}

type PartialBig313 = DeepPartial<BigRecord313>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten313<T> = T extends Array<infer U> ? Flatten313<U> : T;
type Nested313 = number[][][][][][][][][][];
type Flat313 = Flatten313<Nested313>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly313<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly313<T[K]> : T[K];
};
type DeepRequired313<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired313<T[K]> : T[K];
};
type FR313 = DeepReadonly313<DeepRequired313<PartialBig313>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion313 =
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

type ExtractAlpha313 = Extract<BigUnion313, "alpha" | "bravo" | "charlie">;
type ExcludeZulu313 = Exclude<BigUnion313, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA313 { width: number; height: number; depth: number }
interface ShapeB313 { color: string; opacity: number; blend: string }
interface ShapeC313 { x: number; y: number; z: number; w: number }
interface ShapeD313 { label: string; title: string; summary: string }

type Combined313 = ShapeA313 & ShapeB313 & ShapeC313 & ShapeD313;
type OptionalAll313 = { [K in keyof Combined313]?: Combined313[K] };
type RequiredAll313 = { [K in keyof Combined313]-?: Combined313[K] };
type ReadonlyAll313 = { readonly [K in keyof Combined313]: Combined313[K] };
type NullableAll313 = { [K in keyof Combined313]: Combined313[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString313<T> = T extends string ? true : false;
type IsNumber313<T> = T extends number ? true : false;
type TypeName313<T> = T extends string
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

type TypeNames313 = {
  [K in keyof BigRecord313]: TypeName313<BigRecord313[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb313 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource313 = "user" | "post" | "comment" | "tag" | "category";
type Action313 = `${Verb313}_${Resource313}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise313<T> = T extends Promise<infer U> ? UnwrapPromise313<U> : T;
type UnwrapArray313<T> = T extends (infer U)[] ? UnwrapArray313<U> : T;
type Head313<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail313<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation313<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation313<Exclude<T, K>>]
  : never;

type SmallUnion313 = "a" | "b" | "c" | "d";
type AllPerms313 = Permutation313<SmallUnion313>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig313,
  Flat313,
  FR313,
  BigUnion313,
  ExtractAlpha313,
  ExcludeZulu313,
  OptionalAll313,
  RequiredAll313,
  ReadonlyAll313,
  NullableAll313,
  TypeNames313,
  Action313,
  AllPerms313,
};
