// pkg-09 / types-04  (seed 904) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord904 {
  a904: { x: number; y: string; z: boolean };
  b904: { p: string[]; q: Record<string, number> };
  c904: { nested: { deep: { deeper: { deepest: string } } } };
  d904: number;
  e904: string;
  f904: boolean;
  g904: null;
  h904: undefined;
  i904: bigint;
  j904: symbol;
}

type PartialBig904 = DeepPartial<BigRecord904>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten904<T> = T extends Array<infer U> ? Flatten904<U> : T;
type Nested904 = number[][][][][][][][][][];
type Flat904 = Flatten904<Nested904>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly904<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly904<T[K]> : T[K];
};
type DeepRequired904<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired904<T[K]> : T[K];
};
type FR904 = DeepReadonly904<DeepRequired904<PartialBig904>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion904 =
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

type ExtractAlpha904 = Extract<BigUnion904, "alpha" | "bravo" | "charlie">;
type ExcludeZulu904 = Exclude<BigUnion904, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA904 { width: number; height: number; depth: number }
interface ShapeB904 { color: string; opacity: number; blend: string }
interface ShapeC904 { x: number; y: number; z: number; w: number }
interface ShapeD904 { label: string; title: string; summary: string }

type Combined904 = ShapeA904 & ShapeB904 & ShapeC904 & ShapeD904;
type OptionalAll904 = { [K in keyof Combined904]?: Combined904[K] };
type RequiredAll904 = { [K in keyof Combined904]-?: Combined904[K] };
type ReadonlyAll904 = { readonly [K in keyof Combined904]: Combined904[K] };
type NullableAll904 = { [K in keyof Combined904]: Combined904[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString904<T> = T extends string ? true : false;
type IsNumber904<T> = T extends number ? true : false;
type TypeName904<T> = T extends string
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

type TypeNames904 = {
  [K in keyof BigRecord904]: TypeName904<BigRecord904[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb904 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource904 = "user" | "post" | "comment" | "tag" | "category";
type Action904 = `${Verb904}_${Resource904}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise904<T> = T extends Promise<infer U> ? UnwrapPromise904<U> : T;
type UnwrapArray904<T> = T extends (infer U)[] ? UnwrapArray904<U> : T;
type Head904<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail904<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation904<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation904<Exclude<T, K>>]
  : never;

type SmallUnion904 = "a" | "b" | "c" | "d";
type AllPerms904 = Permutation904<SmallUnion904>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig904,
  Flat904,
  FR904,
  BigUnion904,
  ExtractAlpha904,
  ExcludeZulu904,
  OptionalAll904,
  RequiredAll904,
  ReadonlyAll904,
  NullableAll904,
  TypeNames904,
  Action904,
  AllPerms904,
};
