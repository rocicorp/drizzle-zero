// pkg-06 / types-23  (seed 623) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord623 {
  a623: { x: number; y: string; z: boolean };
  b623: { p: string[]; q: Record<string, number> };
  c623: { nested: { deep: { deeper: { deepest: string } } } };
  d623: number;
  e623: string;
  f623: boolean;
  g623: null;
  h623: undefined;
  i623: bigint;
  j623: symbol;
}

type PartialBig623 = DeepPartial<BigRecord623>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten623<T> = T extends Array<infer U> ? Flatten623<U> : T;
type Nested623 = number[][][][][][][][][][];
type Flat623 = Flatten623<Nested623>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly623<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly623<T[K]> : T[K];
};
type DeepRequired623<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired623<T[K]> : T[K];
};
type FR623 = DeepReadonly623<DeepRequired623<PartialBig623>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion623 =
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

type ExtractAlpha623 = Extract<BigUnion623, "alpha" | "bravo" | "charlie">;
type ExcludeZulu623 = Exclude<BigUnion623, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA623 { width: number; height: number; depth: number }
interface ShapeB623 { color: string; opacity: number; blend: string }
interface ShapeC623 { x: number; y: number; z: number; w: number }
interface ShapeD623 { label: string; title: string; summary: string }

type Combined623 = ShapeA623 & ShapeB623 & ShapeC623 & ShapeD623;
type OptionalAll623 = { [K in keyof Combined623]?: Combined623[K] };
type RequiredAll623 = { [K in keyof Combined623]-?: Combined623[K] };
type ReadonlyAll623 = { readonly [K in keyof Combined623]: Combined623[K] };
type NullableAll623 = { [K in keyof Combined623]: Combined623[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString623<T> = T extends string ? true : false;
type IsNumber623<T> = T extends number ? true : false;
type TypeName623<T> = T extends string
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

type TypeNames623 = {
  [K in keyof BigRecord623]: TypeName623<BigRecord623[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb623 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource623 = "user" | "post" | "comment" | "tag" | "category";
type Action623 = `${Verb623}_${Resource623}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise623<T> = T extends Promise<infer U> ? UnwrapPromise623<U> : T;
type UnwrapArray623<T> = T extends (infer U)[] ? UnwrapArray623<U> : T;
type Head623<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail623<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation623<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation623<Exclude<T, K>>]
  : never;

type SmallUnion623 = "a" | "b" | "c" | "d";
type AllPerms623 = Permutation623<SmallUnion623>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig623,
  Flat623,
  FR623,
  BigUnion623,
  ExtractAlpha623,
  ExcludeZulu623,
  OptionalAll623,
  RequiredAll623,
  ReadonlyAll623,
  NullableAll623,
  TypeNames623,
  Action623,
  AllPerms623,
};
