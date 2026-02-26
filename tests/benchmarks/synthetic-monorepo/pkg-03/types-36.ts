// pkg-03 / types-36  (seed 336) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord336 {
  a336: { x: number; y: string; z: boolean };
  b336: { p: string[]; q: Record<string, number> };
  c336: { nested: { deep: { deeper: { deepest: string } } } };
  d336: number;
  e336: string;
  f336: boolean;
  g336: null;
  h336: undefined;
  i336: bigint;
  j336: symbol;
}

type PartialBig336 = DeepPartial<BigRecord336>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten336<T> = T extends Array<infer U> ? Flatten336<U> : T;
type Nested336 = number[][][][][][][][][][];
type Flat336 = Flatten336<Nested336>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly336<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly336<T[K]> : T[K];
};
type DeepRequired336<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired336<T[K]> : T[K];
};
type FR336 = DeepReadonly336<DeepRequired336<PartialBig336>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion336 =
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

type ExtractAlpha336 = Extract<BigUnion336, "alpha" | "bravo" | "charlie">;
type ExcludeZulu336 = Exclude<BigUnion336, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA336 { width: number; height: number; depth: number }
interface ShapeB336 { color: string; opacity: number; blend: string }
interface ShapeC336 { x: number; y: number; z: number; w: number }
interface ShapeD336 { label: string; title: string; summary: string }

type Combined336 = ShapeA336 & ShapeB336 & ShapeC336 & ShapeD336;
type OptionalAll336 = { [K in keyof Combined336]?: Combined336[K] };
type RequiredAll336 = { [K in keyof Combined336]-?: Combined336[K] };
type ReadonlyAll336 = { readonly [K in keyof Combined336]: Combined336[K] };
type NullableAll336 = { [K in keyof Combined336]: Combined336[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString336<T> = T extends string ? true : false;
type IsNumber336<T> = T extends number ? true : false;
type TypeName336<T> = T extends string
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

type TypeNames336 = {
  [K in keyof BigRecord336]: TypeName336<BigRecord336[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb336 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource336 = "user" | "post" | "comment" | "tag" | "category";
type Action336 = `${Verb336}_${Resource336}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise336<T> = T extends Promise<infer U> ? UnwrapPromise336<U> : T;
type UnwrapArray336<T> = T extends (infer U)[] ? UnwrapArray336<U> : T;
type Head336<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail336<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation336<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation336<Exclude<T, K>>]
  : never;

type SmallUnion336 = "a" | "b" | "c" | "d";
type AllPerms336 = Permutation336<SmallUnion336>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig336,
  Flat336,
  FR336,
  BigUnion336,
  ExtractAlpha336,
  ExcludeZulu336,
  OptionalAll336,
  RequiredAll336,
  ReadonlyAll336,
  NullableAll336,
  TypeNames336,
  Action336,
  AllPerms336,
};
