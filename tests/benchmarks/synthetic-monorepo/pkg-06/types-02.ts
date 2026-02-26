// pkg-06 / types-02  (seed 602) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord602 {
  a602: { x: number; y: string; z: boolean };
  b602: { p: string[]; q: Record<string, number> };
  c602: { nested: { deep: { deeper: { deepest: string } } } };
  d602: number;
  e602: string;
  f602: boolean;
  g602: null;
  h602: undefined;
  i602: bigint;
  j602: symbol;
}

type PartialBig602 = DeepPartial<BigRecord602>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten602<T> = T extends Array<infer U> ? Flatten602<U> : T;
type Nested602 = number[][][][][][][][][][];
type Flat602 = Flatten602<Nested602>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly602<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly602<T[K]> : T[K];
};
type DeepRequired602<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired602<T[K]> : T[K];
};
type FR602 = DeepReadonly602<DeepRequired602<PartialBig602>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion602 =
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

type ExtractAlpha602 = Extract<BigUnion602, "alpha" | "bravo" | "charlie">;
type ExcludeZulu602 = Exclude<BigUnion602, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA602 { width: number; height: number; depth: number }
interface ShapeB602 { color: string; opacity: number; blend: string }
interface ShapeC602 { x: number; y: number; z: number; w: number }
interface ShapeD602 { label: string; title: string; summary: string }

type Combined602 = ShapeA602 & ShapeB602 & ShapeC602 & ShapeD602;
type OptionalAll602 = { [K in keyof Combined602]?: Combined602[K] };
type RequiredAll602 = { [K in keyof Combined602]-?: Combined602[K] };
type ReadonlyAll602 = { readonly [K in keyof Combined602]: Combined602[K] };
type NullableAll602 = { [K in keyof Combined602]: Combined602[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString602<T> = T extends string ? true : false;
type IsNumber602<T> = T extends number ? true : false;
type TypeName602<T> = T extends string
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

type TypeNames602 = {
  [K in keyof BigRecord602]: TypeName602<BigRecord602[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb602 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource602 = "user" | "post" | "comment" | "tag" | "category";
type Action602 = `${Verb602}_${Resource602}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise602<T> = T extends Promise<infer U> ? UnwrapPromise602<U> : T;
type UnwrapArray602<T> = T extends (infer U)[] ? UnwrapArray602<U> : T;
type Head602<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail602<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation602<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation602<Exclude<T, K>>]
  : never;

type SmallUnion602 = "a" | "b" | "c" | "d";
type AllPerms602 = Permutation602<SmallUnion602>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig602,
  Flat602,
  FR602,
  BigUnion602,
  ExtractAlpha602,
  ExcludeZulu602,
  OptionalAll602,
  RequiredAll602,
  ReadonlyAll602,
  NullableAll602,
  TypeNames602,
  Action602,
  AllPerms602,
};
