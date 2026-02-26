// pkg-06 / types-25  (seed 625) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord625 {
  a625: { x: number; y: string; z: boolean };
  b625: { p: string[]; q: Record<string, number> };
  c625: { nested: { deep: { deeper: { deepest: string } } } };
  d625: number;
  e625: string;
  f625: boolean;
  g625: null;
  h625: undefined;
  i625: bigint;
  j625: symbol;
}

type PartialBig625 = DeepPartial<BigRecord625>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten625<T> = T extends Array<infer U> ? Flatten625<U> : T;
type Nested625 = number[][][][][][][][][][];
type Flat625 = Flatten625<Nested625>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly625<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly625<T[K]> : T[K];
};
type DeepRequired625<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired625<T[K]> : T[K];
};
type FR625 = DeepReadonly625<DeepRequired625<PartialBig625>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion625 =
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

type ExtractAlpha625 = Extract<BigUnion625, "alpha" | "bravo" | "charlie">;
type ExcludeZulu625 = Exclude<BigUnion625, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA625 { width: number; height: number; depth: number }
interface ShapeB625 { color: string; opacity: number; blend: string }
interface ShapeC625 { x: number; y: number; z: number; w: number }
interface ShapeD625 { label: string; title: string; summary: string }

type Combined625 = ShapeA625 & ShapeB625 & ShapeC625 & ShapeD625;
type OptionalAll625 = { [K in keyof Combined625]?: Combined625[K] };
type RequiredAll625 = { [K in keyof Combined625]-?: Combined625[K] };
type ReadonlyAll625 = { readonly [K in keyof Combined625]: Combined625[K] };
type NullableAll625 = { [K in keyof Combined625]: Combined625[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString625<T> = T extends string ? true : false;
type IsNumber625<T> = T extends number ? true : false;
type TypeName625<T> = T extends string
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

type TypeNames625 = {
  [K in keyof BigRecord625]: TypeName625<BigRecord625[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb625 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource625 = "user" | "post" | "comment" | "tag" | "category";
type Action625 = `${Verb625}_${Resource625}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise625<T> = T extends Promise<infer U> ? UnwrapPromise625<U> : T;
type UnwrapArray625<T> = T extends (infer U)[] ? UnwrapArray625<U> : T;
type Head625<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail625<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation625<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation625<Exclude<T, K>>]
  : never;

type SmallUnion625 = "a" | "b" | "c" | "d";
type AllPerms625 = Permutation625<SmallUnion625>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig625,
  Flat625,
  FR625,
  BigUnion625,
  ExtractAlpha625,
  ExcludeZulu625,
  OptionalAll625,
  RequiredAll625,
  ReadonlyAll625,
  NullableAll625,
  TypeNames625,
  Action625,
  AllPerms625,
};
