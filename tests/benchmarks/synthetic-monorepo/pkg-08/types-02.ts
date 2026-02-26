// pkg-08 / types-02  (seed 802) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord802 {
  a802: { x: number; y: string; z: boolean };
  b802: { p: string[]; q: Record<string, number> };
  c802: { nested: { deep: { deeper: { deepest: string } } } };
  d802: number;
  e802: string;
  f802: boolean;
  g802: null;
  h802: undefined;
  i802: bigint;
  j802: symbol;
}

type PartialBig802 = DeepPartial<BigRecord802>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten802<T> = T extends Array<infer U> ? Flatten802<U> : T;
type Nested802 = number[][][][][][][][][][];
type Flat802 = Flatten802<Nested802>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly802<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly802<T[K]> : T[K];
};
type DeepRequired802<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired802<T[K]> : T[K];
};
type FR802 = DeepReadonly802<DeepRequired802<PartialBig802>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion802 =
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

type ExtractAlpha802 = Extract<BigUnion802, "alpha" | "bravo" | "charlie">;
type ExcludeZulu802 = Exclude<BigUnion802, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA802 { width: number; height: number; depth: number }
interface ShapeB802 { color: string; opacity: number; blend: string }
interface ShapeC802 { x: number; y: number; z: number; w: number }
interface ShapeD802 { label: string; title: string; summary: string }

type Combined802 = ShapeA802 & ShapeB802 & ShapeC802 & ShapeD802;
type OptionalAll802 = { [K in keyof Combined802]?: Combined802[K] };
type RequiredAll802 = { [K in keyof Combined802]-?: Combined802[K] };
type ReadonlyAll802 = { readonly [K in keyof Combined802]: Combined802[K] };
type NullableAll802 = { [K in keyof Combined802]: Combined802[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString802<T> = T extends string ? true : false;
type IsNumber802<T> = T extends number ? true : false;
type TypeName802<T> = T extends string
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

type TypeNames802 = {
  [K in keyof BigRecord802]: TypeName802<BigRecord802[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb802 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource802 = "user" | "post" | "comment" | "tag" | "category";
type Action802 = `${Verb802}_${Resource802}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise802<T> = T extends Promise<infer U> ? UnwrapPromise802<U> : T;
type UnwrapArray802<T> = T extends (infer U)[] ? UnwrapArray802<U> : T;
type Head802<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail802<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation802<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation802<Exclude<T, K>>]
  : never;

type SmallUnion802 = "a" | "b" | "c" | "d";
type AllPerms802 = Permutation802<SmallUnion802>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig802,
  Flat802,
  FR802,
  BigUnion802,
  ExtractAlpha802,
  ExcludeZulu802,
  OptionalAll802,
  RequiredAll802,
  ReadonlyAll802,
  NullableAll802,
  TypeNames802,
  Action802,
  AllPerms802,
};
