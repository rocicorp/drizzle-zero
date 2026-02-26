// pkg-04 / types-36  (seed 436) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord436 {
  a436: { x: number; y: string; z: boolean };
  b436: { p: string[]; q: Record<string, number> };
  c436: { nested: { deep: { deeper: { deepest: string } } } };
  d436: number;
  e436: string;
  f436: boolean;
  g436: null;
  h436: undefined;
  i436: bigint;
  j436: symbol;
}

type PartialBig436 = DeepPartial<BigRecord436>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten436<T> = T extends Array<infer U> ? Flatten436<U> : T;
type Nested436 = number[][][][][][][][][][];
type Flat436 = Flatten436<Nested436>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly436<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly436<T[K]> : T[K];
};
type DeepRequired436<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired436<T[K]> : T[K];
};
type FR436 = DeepReadonly436<DeepRequired436<PartialBig436>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion436 =
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

type ExtractAlpha436 = Extract<BigUnion436, "alpha" | "bravo" | "charlie">;
type ExcludeZulu436 = Exclude<BigUnion436, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA436 { width: number; height: number; depth: number }
interface ShapeB436 { color: string; opacity: number; blend: string }
interface ShapeC436 { x: number; y: number; z: number; w: number }
interface ShapeD436 { label: string; title: string; summary: string }

type Combined436 = ShapeA436 & ShapeB436 & ShapeC436 & ShapeD436;
type OptionalAll436 = { [K in keyof Combined436]?: Combined436[K] };
type RequiredAll436 = { [K in keyof Combined436]-?: Combined436[K] };
type ReadonlyAll436 = { readonly [K in keyof Combined436]: Combined436[K] };
type NullableAll436 = { [K in keyof Combined436]: Combined436[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString436<T> = T extends string ? true : false;
type IsNumber436<T> = T extends number ? true : false;
type TypeName436<T> = T extends string
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

type TypeNames436 = {
  [K in keyof BigRecord436]: TypeName436<BigRecord436[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb436 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource436 = "user" | "post" | "comment" | "tag" | "category";
type Action436 = `${Verb436}_${Resource436}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise436<T> = T extends Promise<infer U> ? UnwrapPromise436<U> : T;
type UnwrapArray436<T> = T extends (infer U)[] ? UnwrapArray436<U> : T;
type Head436<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail436<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation436<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation436<Exclude<T, K>>]
  : never;

type SmallUnion436 = "a" | "b" | "c" | "d";
type AllPerms436 = Permutation436<SmallUnion436>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig436,
  Flat436,
  FR436,
  BigUnion436,
  ExtractAlpha436,
  ExcludeZulu436,
  OptionalAll436,
  RequiredAll436,
  ReadonlyAll436,
  NullableAll436,
  TypeNames436,
  Action436,
  AllPerms436,
};
