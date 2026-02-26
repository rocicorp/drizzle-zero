// pkg-07 / types-41  (seed 741) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord741 {
  a741: { x: number; y: string; z: boolean };
  b741: { p: string[]; q: Record<string, number> };
  c741: { nested: { deep: { deeper: { deepest: string } } } };
  d741: number;
  e741: string;
  f741: boolean;
  g741: null;
  h741: undefined;
  i741: bigint;
  j741: symbol;
}

type PartialBig741 = DeepPartial<BigRecord741>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten741<T> = T extends Array<infer U> ? Flatten741<U> : T;
type Nested741 = number[][][][][][][][][][];
type Flat741 = Flatten741<Nested741>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly741<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly741<T[K]> : T[K];
};
type DeepRequired741<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired741<T[K]> : T[K];
};
type FR741 = DeepReadonly741<DeepRequired741<PartialBig741>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion741 =
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

type ExtractAlpha741 = Extract<BigUnion741, "alpha" | "bravo" | "charlie">;
type ExcludeZulu741 = Exclude<BigUnion741, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA741 { width: number; height: number; depth: number }
interface ShapeB741 { color: string; opacity: number; blend: string }
interface ShapeC741 { x: number; y: number; z: number; w: number }
interface ShapeD741 { label: string; title: string; summary: string }

type Combined741 = ShapeA741 & ShapeB741 & ShapeC741 & ShapeD741;
type OptionalAll741 = { [K in keyof Combined741]?: Combined741[K] };
type RequiredAll741 = { [K in keyof Combined741]-?: Combined741[K] };
type ReadonlyAll741 = { readonly [K in keyof Combined741]: Combined741[K] };
type NullableAll741 = { [K in keyof Combined741]: Combined741[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString741<T> = T extends string ? true : false;
type IsNumber741<T> = T extends number ? true : false;
type TypeName741<T> = T extends string
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

type TypeNames741 = {
  [K in keyof BigRecord741]: TypeName741<BigRecord741[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb741 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource741 = "user" | "post" | "comment" | "tag" | "category";
type Action741 = `${Verb741}_${Resource741}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise741<T> = T extends Promise<infer U> ? UnwrapPromise741<U> : T;
type UnwrapArray741<T> = T extends (infer U)[] ? UnwrapArray741<U> : T;
type Head741<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail741<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation741<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation741<Exclude<T, K>>]
  : never;

type SmallUnion741 = "a" | "b" | "c" | "d";
type AllPerms741 = Permutation741<SmallUnion741>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig741,
  Flat741,
  FR741,
  BigUnion741,
  ExtractAlpha741,
  ExcludeZulu741,
  OptionalAll741,
  RequiredAll741,
  ReadonlyAll741,
  NullableAll741,
  TypeNames741,
  Action741,
  AllPerms741,
};
