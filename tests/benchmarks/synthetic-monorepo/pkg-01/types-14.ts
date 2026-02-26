// pkg-01 / types-14  (seed 114) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord114 {
  a114: { x: number; y: string; z: boolean };
  b114: { p: string[]; q: Record<string, number> };
  c114: { nested: { deep: { deeper: { deepest: string } } } };
  d114: number;
  e114: string;
  f114: boolean;
  g114: null;
  h114: undefined;
  i114: bigint;
  j114: symbol;
}

type PartialBig114 = DeepPartial<BigRecord114>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten114<T> = T extends Array<infer U> ? Flatten114<U> : T;
type Nested114 = number[][][][][][][][][][];
type Flat114 = Flatten114<Nested114>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly114<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly114<T[K]> : T[K];
};
type DeepRequired114<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired114<T[K]> : T[K];
};
type FR114 = DeepReadonly114<DeepRequired114<PartialBig114>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion114 =
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

type ExtractAlpha114 = Extract<BigUnion114, "alpha" | "bravo" | "charlie">;
type ExcludeZulu114 = Exclude<BigUnion114, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA114 { width: number; height: number; depth: number }
interface ShapeB114 { color: string; opacity: number; blend: string }
interface ShapeC114 { x: number; y: number; z: number; w: number }
interface ShapeD114 { label: string; title: string; summary: string }

type Combined114 = ShapeA114 & ShapeB114 & ShapeC114 & ShapeD114;
type OptionalAll114 = { [K in keyof Combined114]?: Combined114[K] };
type RequiredAll114 = { [K in keyof Combined114]-?: Combined114[K] };
type ReadonlyAll114 = { readonly [K in keyof Combined114]: Combined114[K] };
type NullableAll114 = { [K in keyof Combined114]: Combined114[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString114<T> = T extends string ? true : false;
type IsNumber114<T> = T extends number ? true : false;
type TypeName114<T> = T extends string
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

type TypeNames114 = {
  [K in keyof BigRecord114]: TypeName114<BigRecord114[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb114 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource114 = "user" | "post" | "comment" | "tag" | "category";
type Action114 = `${Verb114}_${Resource114}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise114<T> = T extends Promise<infer U> ? UnwrapPromise114<U> : T;
type UnwrapArray114<T> = T extends (infer U)[] ? UnwrapArray114<U> : T;
type Head114<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail114<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation114<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation114<Exclude<T, K>>]
  : never;

type SmallUnion114 = "a" | "b" | "c" | "d";
type AllPerms114 = Permutation114<SmallUnion114>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig114,
  Flat114,
  FR114,
  BigUnion114,
  ExtractAlpha114,
  ExcludeZulu114,
  OptionalAll114,
  RequiredAll114,
  ReadonlyAll114,
  NullableAll114,
  TypeNames114,
  Action114,
  AllPerms114,
};
