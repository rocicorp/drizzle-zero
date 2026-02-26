// pkg-04 / types-41  (seed 441) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord441 {
  a441: { x: number; y: string; z: boolean };
  b441: { p: string[]; q: Record<string, number> };
  c441: { nested: { deep: { deeper: { deepest: string } } } };
  d441: number;
  e441: string;
  f441: boolean;
  g441: null;
  h441: undefined;
  i441: bigint;
  j441: symbol;
}

type PartialBig441 = DeepPartial<BigRecord441>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten441<T> = T extends Array<infer U> ? Flatten441<U> : T;
type Nested441 = number[][][][][][][][][][];
type Flat441 = Flatten441<Nested441>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly441<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly441<T[K]> : T[K];
};
type DeepRequired441<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired441<T[K]> : T[K];
};
type FR441 = DeepReadonly441<DeepRequired441<PartialBig441>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion441 =
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

type ExtractAlpha441 = Extract<BigUnion441, "alpha" | "bravo" | "charlie">;
type ExcludeZulu441 = Exclude<BigUnion441, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA441 { width: number; height: number; depth: number }
interface ShapeB441 { color: string; opacity: number; blend: string }
interface ShapeC441 { x: number; y: number; z: number; w: number }
interface ShapeD441 { label: string; title: string; summary: string }

type Combined441 = ShapeA441 & ShapeB441 & ShapeC441 & ShapeD441;
type OptionalAll441 = { [K in keyof Combined441]?: Combined441[K] };
type RequiredAll441 = { [K in keyof Combined441]-?: Combined441[K] };
type ReadonlyAll441 = { readonly [K in keyof Combined441]: Combined441[K] };
type NullableAll441 = { [K in keyof Combined441]: Combined441[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString441<T> = T extends string ? true : false;
type IsNumber441<T> = T extends number ? true : false;
type TypeName441<T> = T extends string
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

type TypeNames441 = {
  [K in keyof BigRecord441]: TypeName441<BigRecord441[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb441 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource441 = "user" | "post" | "comment" | "tag" | "category";
type Action441 = `${Verb441}_${Resource441}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise441<T> = T extends Promise<infer U> ? UnwrapPromise441<U> : T;
type UnwrapArray441<T> = T extends (infer U)[] ? UnwrapArray441<U> : T;
type Head441<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail441<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation441<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation441<Exclude<T, K>>]
  : never;

type SmallUnion441 = "a" | "b" | "c" | "d";
type AllPerms441 = Permutation441<SmallUnion441>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig441,
  Flat441,
  FR441,
  BigUnion441,
  ExtractAlpha441,
  ExcludeZulu441,
  OptionalAll441,
  RequiredAll441,
  ReadonlyAll441,
  NullableAll441,
  TypeNames441,
  Action441,
  AllPerms441,
};
