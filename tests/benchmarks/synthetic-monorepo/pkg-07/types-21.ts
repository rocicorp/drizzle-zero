// pkg-07 / types-21  (seed 721) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord721 {
  a721: { x: number; y: string; z: boolean };
  b721: { p: string[]; q: Record<string, number> };
  c721: { nested: { deep: { deeper: { deepest: string } } } };
  d721: number;
  e721: string;
  f721: boolean;
  g721: null;
  h721: undefined;
  i721: bigint;
  j721: symbol;
}

type PartialBig721 = DeepPartial<BigRecord721>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten721<T> = T extends Array<infer U> ? Flatten721<U> : T;
type Nested721 = number[][][][][][][][][][];
type Flat721 = Flatten721<Nested721>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly721<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly721<T[K]> : T[K];
};
type DeepRequired721<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired721<T[K]> : T[K];
};
type FR721 = DeepReadonly721<DeepRequired721<PartialBig721>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion721 =
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

type ExtractAlpha721 = Extract<BigUnion721, "alpha" | "bravo" | "charlie">;
type ExcludeZulu721 = Exclude<BigUnion721, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA721 { width: number; height: number; depth: number }
interface ShapeB721 { color: string; opacity: number; blend: string }
interface ShapeC721 { x: number; y: number; z: number; w: number }
interface ShapeD721 { label: string; title: string; summary: string }

type Combined721 = ShapeA721 & ShapeB721 & ShapeC721 & ShapeD721;
type OptionalAll721 = { [K in keyof Combined721]?: Combined721[K] };
type RequiredAll721 = { [K in keyof Combined721]-?: Combined721[K] };
type ReadonlyAll721 = { readonly [K in keyof Combined721]: Combined721[K] };
type NullableAll721 = { [K in keyof Combined721]: Combined721[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString721<T> = T extends string ? true : false;
type IsNumber721<T> = T extends number ? true : false;
type TypeName721<T> = T extends string
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

type TypeNames721 = {
  [K in keyof BigRecord721]: TypeName721<BigRecord721[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb721 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource721 = "user" | "post" | "comment" | "tag" | "category";
type Action721 = `${Verb721}_${Resource721}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise721<T> = T extends Promise<infer U> ? UnwrapPromise721<U> : T;
type UnwrapArray721<T> = T extends (infer U)[] ? UnwrapArray721<U> : T;
type Head721<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail721<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation721<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation721<Exclude<T, K>>]
  : never;

type SmallUnion721 = "a" | "b" | "c" | "d";
type AllPerms721 = Permutation721<SmallUnion721>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig721,
  Flat721,
  FR721,
  BigUnion721,
  ExtractAlpha721,
  ExcludeZulu721,
  OptionalAll721,
  RequiredAll721,
  ReadonlyAll721,
  NullableAll721,
  TypeNames721,
  Action721,
  AllPerms721,
};
