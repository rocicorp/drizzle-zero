// pkg-02 / types-21  (seed 221) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord221 {
  a221: { x: number; y: string; z: boolean };
  b221: { p: string[]; q: Record<string, number> };
  c221: { nested: { deep: { deeper: { deepest: string } } } };
  d221: number;
  e221: string;
  f221: boolean;
  g221: null;
  h221: undefined;
  i221: bigint;
  j221: symbol;
}

type PartialBig221 = DeepPartial<BigRecord221>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten221<T> = T extends Array<infer U> ? Flatten221<U> : T;
type Nested221 = number[][][][][][][][][][];
type Flat221 = Flatten221<Nested221>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly221<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly221<T[K]> : T[K];
};
type DeepRequired221<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired221<T[K]> : T[K];
};
type FR221 = DeepReadonly221<DeepRequired221<PartialBig221>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion221 =
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

type ExtractAlpha221 = Extract<BigUnion221, "alpha" | "bravo" | "charlie">;
type ExcludeZulu221 = Exclude<BigUnion221, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA221 { width: number; height: number; depth: number }
interface ShapeB221 { color: string; opacity: number; blend: string }
interface ShapeC221 { x: number; y: number; z: number; w: number }
interface ShapeD221 { label: string; title: string; summary: string }

type Combined221 = ShapeA221 & ShapeB221 & ShapeC221 & ShapeD221;
type OptionalAll221 = { [K in keyof Combined221]?: Combined221[K] };
type RequiredAll221 = { [K in keyof Combined221]-?: Combined221[K] };
type ReadonlyAll221 = { readonly [K in keyof Combined221]: Combined221[K] };
type NullableAll221 = { [K in keyof Combined221]: Combined221[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString221<T> = T extends string ? true : false;
type IsNumber221<T> = T extends number ? true : false;
type TypeName221<T> = T extends string
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

type TypeNames221 = {
  [K in keyof BigRecord221]: TypeName221<BigRecord221[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb221 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource221 = "user" | "post" | "comment" | "tag" | "category";
type Action221 = `${Verb221}_${Resource221}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise221<T> = T extends Promise<infer U> ? UnwrapPromise221<U> : T;
type UnwrapArray221<T> = T extends (infer U)[] ? UnwrapArray221<U> : T;
type Head221<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail221<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation221<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation221<Exclude<T, K>>]
  : never;

type SmallUnion221 = "a" | "b" | "c" | "d";
type AllPerms221 = Permutation221<SmallUnion221>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig221,
  Flat221,
  FR221,
  BigUnion221,
  ExtractAlpha221,
  ExcludeZulu221,
  OptionalAll221,
  RequiredAll221,
  ReadonlyAll221,
  NullableAll221,
  TypeNames221,
  Action221,
  AllPerms221,
};
