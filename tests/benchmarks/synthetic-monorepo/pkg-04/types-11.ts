// pkg-04 / types-11  (seed 411) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord411 {
  a411: { x: number; y: string; z: boolean };
  b411: { p: string[]; q: Record<string, number> };
  c411: { nested: { deep: { deeper: { deepest: string } } } };
  d411: number;
  e411: string;
  f411: boolean;
  g411: null;
  h411: undefined;
  i411: bigint;
  j411: symbol;
}

type PartialBig411 = DeepPartial<BigRecord411>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten411<T> = T extends Array<infer U> ? Flatten411<U> : T;
type Nested411 = number[][][][][][][][][][];
type Flat411 = Flatten411<Nested411>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly411<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly411<T[K]> : T[K];
};
type DeepRequired411<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired411<T[K]> : T[K];
};
type FR411 = DeepReadonly411<DeepRequired411<PartialBig411>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion411 =
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

type ExtractAlpha411 = Extract<BigUnion411, "alpha" | "bravo" | "charlie">;
type ExcludeZulu411 = Exclude<BigUnion411, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA411 { width: number; height: number; depth: number }
interface ShapeB411 { color: string; opacity: number; blend: string }
interface ShapeC411 { x: number; y: number; z: number; w: number }
interface ShapeD411 { label: string; title: string; summary: string }

type Combined411 = ShapeA411 & ShapeB411 & ShapeC411 & ShapeD411;
type OptionalAll411 = { [K in keyof Combined411]?: Combined411[K] };
type RequiredAll411 = { [K in keyof Combined411]-?: Combined411[K] };
type ReadonlyAll411 = { readonly [K in keyof Combined411]: Combined411[K] };
type NullableAll411 = { [K in keyof Combined411]: Combined411[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString411<T> = T extends string ? true : false;
type IsNumber411<T> = T extends number ? true : false;
type TypeName411<T> = T extends string
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

type TypeNames411 = {
  [K in keyof BigRecord411]: TypeName411<BigRecord411[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb411 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource411 = "user" | "post" | "comment" | "tag" | "category";
type Action411 = `${Verb411}_${Resource411}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise411<T> = T extends Promise<infer U> ? UnwrapPromise411<U> : T;
type UnwrapArray411<T> = T extends (infer U)[] ? UnwrapArray411<U> : T;
type Head411<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail411<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation411<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation411<Exclude<T, K>>]
  : never;

type SmallUnion411 = "a" | "b" | "c" | "d";
type AllPerms411 = Permutation411<SmallUnion411>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig411,
  Flat411,
  FR411,
  BigUnion411,
  ExtractAlpha411,
  ExcludeZulu411,
  OptionalAll411,
  RequiredAll411,
  ReadonlyAll411,
  NullableAll411,
  TypeNames411,
  Action411,
  AllPerms411,
};
