// pkg-07 / types-22  (seed 722) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord722 {
  a722: { x: number; y: string; z: boolean };
  b722: { p: string[]; q: Record<string, number> };
  c722: { nested: { deep: { deeper: { deepest: string } } } };
  d722: number;
  e722: string;
  f722: boolean;
  g722: null;
  h722: undefined;
  i722: bigint;
  j722: symbol;
}

type PartialBig722 = DeepPartial<BigRecord722>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten722<T> = T extends Array<infer U> ? Flatten722<U> : T;
type Nested722 = number[][][][][][][][][][];
type Flat722 = Flatten722<Nested722>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly722<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly722<T[K]> : T[K];
};
type DeepRequired722<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired722<T[K]> : T[K];
};
type FR722 = DeepReadonly722<DeepRequired722<PartialBig722>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion722 =
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

type ExtractAlpha722 = Extract<BigUnion722, "alpha" | "bravo" | "charlie">;
type ExcludeZulu722 = Exclude<BigUnion722, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA722 { width: number; height: number; depth: number }
interface ShapeB722 { color: string; opacity: number; blend: string }
interface ShapeC722 { x: number; y: number; z: number; w: number }
interface ShapeD722 { label: string; title: string; summary: string }

type Combined722 = ShapeA722 & ShapeB722 & ShapeC722 & ShapeD722;
type OptionalAll722 = { [K in keyof Combined722]?: Combined722[K] };
type RequiredAll722 = { [K in keyof Combined722]-?: Combined722[K] };
type ReadonlyAll722 = { readonly [K in keyof Combined722]: Combined722[K] };
type NullableAll722 = { [K in keyof Combined722]: Combined722[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString722<T> = T extends string ? true : false;
type IsNumber722<T> = T extends number ? true : false;
type TypeName722<T> = T extends string
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

type TypeNames722 = {
  [K in keyof BigRecord722]: TypeName722<BigRecord722[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb722 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource722 = "user" | "post" | "comment" | "tag" | "category";
type Action722 = `${Verb722}_${Resource722}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise722<T> = T extends Promise<infer U> ? UnwrapPromise722<U> : T;
type UnwrapArray722<T> = T extends (infer U)[] ? UnwrapArray722<U> : T;
type Head722<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail722<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation722<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation722<Exclude<T, K>>]
  : never;

type SmallUnion722 = "a" | "b" | "c" | "d";
type AllPerms722 = Permutation722<SmallUnion722>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig722,
  Flat722,
  FR722,
  BigUnion722,
  ExtractAlpha722,
  ExcludeZulu722,
  OptionalAll722,
  RequiredAll722,
  ReadonlyAll722,
  NullableAll722,
  TypeNames722,
  Action722,
  AllPerms722,
};
