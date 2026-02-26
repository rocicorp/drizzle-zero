// pkg-07 / types-06  (seed 706) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord706 {
  a706: { x: number; y: string; z: boolean };
  b706: { p: string[]; q: Record<string, number> };
  c706: { nested: { deep: { deeper: { deepest: string } } } };
  d706: number;
  e706: string;
  f706: boolean;
  g706: null;
  h706: undefined;
  i706: bigint;
  j706: symbol;
}

type PartialBig706 = DeepPartial<BigRecord706>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten706<T> = T extends Array<infer U> ? Flatten706<U> : T;
type Nested706 = number[][][][][][][][][][];
type Flat706 = Flatten706<Nested706>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly706<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly706<T[K]> : T[K];
};
type DeepRequired706<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired706<T[K]> : T[K];
};
type FR706 = DeepReadonly706<DeepRequired706<PartialBig706>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion706 =
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

type ExtractAlpha706 = Extract<BigUnion706, "alpha" | "bravo" | "charlie">;
type ExcludeZulu706 = Exclude<BigUnion706, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA706 { width: number; height: number; depth: number }
interface ShapeB706 { color: string; opacity: number; blend: string }
interface ShapeC706 { x: number; y: number; z: number; w: number }
interface ShapeD706 { label: string; title: string; summary: string }

type Combined706 = ShapeA706 & ShapeB706 & ShapeC706 & ShapeD706;
type OptionalAll706 = { [K in keyof Combined706]?: Combined706[K] };
type RequiredAll706 = { [K in keyof Combined706]-?: Combined706[K] };
type ReadonlyAll706 = { readonly [K in keyof Combined706]: Combined706[K] };
type NullableAll706 = { [K in keyof Combined706]: Combined706[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString706<T> = T extends string ? true : false;
type IsNumber706<T> = T extends number ? true : false;
type TypeName706<T> = T extends string
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

type TypeNames706 = {
  [K in keyof BigRecord706]: TypeName706<BigRecord706[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb706 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource706 = "user" | "post" | "comment" | "tag" | "category";
type Action706 = `${Verb706}_${Resource706}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise706<T> = T extends Promise<infer U> ? UnwrapPromise706<U> : T;
type UnwrapArray706<T> = T extends (infer U)[] ? UnwrapArray706<U> : T;
type Head706<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail706<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation706<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation706<Exclude<T, K>>]
  : never;

type SmallUnion706 = "a" | "b" | "c" | "d";
type AllPerms706 = Permutation706<SmallUnion706>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig706,
  Flat706,
  FR706,
  BigUnion706,
  ExtractAlpha706,
  ExcludeZulu706,
  OptionalAll706,
  RequiredAll706,
  ReadonlyAll706,
  NullableAll706,
  TypeNames706,
  Action706,
  AllPerms706,
};
