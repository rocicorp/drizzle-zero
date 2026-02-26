// pkg-09 / types-14  (seed 914) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord914 {
  a914: { x: number; y: string; z: boolean };
  b914: { p: string[]; q: Record<string, number> };
  c914: { nested: { deep: { deeper: { deepest: string } } } };
  d914: number;
  e914: string;
  f914: boolean;
  g914: null;
  h914: undefined;
  i914: bigint;
  j914: symbol;
}

type PartialBig914 = DeepPartial<BigRecord914>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten914<T> = T extends Array<infer U> ? Flatten914<U> : T;
type Nested914 = number[][][][][][][][][][];
type Flat914 = Flatten914<Nested914>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly914<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly914<T[K]> : T[K];
};
type DeepRequired914<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired914<T[K]> : T[K];
};
type FR914 = DeepReadonly914<DeepRequired914<PartialBig914>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion914 =
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

type ExtractAlpha914 = Extract<BigUnion914, "alpha" | "bravo" | "charlie">;
type ExcludeZulu914 = Exclude<BigUnion914, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA914 { width: number; height: number; depth: number }
interface ShapeB914 { color: string; opacity: number; blend: string }
interface ShapeC914 { x: number; y: number; z: number; w: number }
interface ShapeD914 { label: string; title: string; summary: string }

type Combined914 = ShapeA914 & ShapeB914 & ShapeC914 & ShapeD914;
type OptionalAll914 = { [K in keyof Combined914]?: Combined914[K] };
type RequiredAll914 = { [K in keyof Combined914]-?: Combined914[K] };
type ReadonlyAll914 = { readonly [K in keyof Combined914]: Combined914[K] };
type NullableAll914 = { [K in keyof Combined914]: Combined914[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString914<T> = T extends string ? true : false;
type IsNumber914<T> = T extends number ? true : false;
type TypeName914<T> = T extends string
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

type TypeNames914 = {
  [K in keyof BigRecord914]: TypeName914<BigRecord914[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb914 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource914 = "user" | "post" | "comment" | "tag" | "category";
type Action914 = `${Verb914}_${Resource914}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise914<T> = T extends Promise<infer U> ? UnwrapPromise914<U> : T;
type UnwrapArray914<T> = T extends (infer U)[] ? UnwrapArray914<U> : T;
type Head914<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail914<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation914<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation914<Exclude<T, K>>]
  : never;

type SmallUnion914 = "a" | "b" | "c" | "d";
type AllPerms914 = Permutation914<SmallUnion914>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig914,
  Flat914,
  FR914,
  BigUnion914,
  ExtractAlpha914,
  ExcludeZulu914,
  OptionalAll914,
  RequiredAll914,
  ReadonlyAll914,
  NullableAll914,
  TypeNames914,
  Action914,
  AllPerms914,
};
