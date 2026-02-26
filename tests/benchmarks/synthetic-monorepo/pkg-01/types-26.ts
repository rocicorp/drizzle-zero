// pkg-01 / types-26  (seed 126) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord126 {
  a126: { x: number; y: string; z: boolean };
  b126: { p: string[]; q: Record<string, number> };
  c126: { nested: { deep: { deeper: { deepest: string } } } };
  d126: number;
  e126: string;
  f126: boolean;
  g126: null;
  h126: undefined;
  i126: bigint;
  j126: symbol;
}

type PartialBig126 = DeepPartial<BigRecord126>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten126<T> = T extends Array<infer U> ? Flatten126<U> : T;
type Nested126 = number[][][][][][][][][][];
type Flat126 = Flatten126<Nested126>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly126<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly126<T[K]> : T[K];
};
type DeepRequired126<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired126<T[K]> : T[K];
};
type FR126 = DeepReadonly126<DeepRequired126<PartialBig126>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion126 =
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

type ExtractAlpha126 = Extract<BigUnion126, "alpha" | "bravo" | "charlie">;
type ExcludeZulu126 = Exclude<BigUnion126, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA126 { width: number; height: number; depth: number }
interface ShapeB126 { color: string; opacity: number; blend: string }
interface ShapeC126 { x: number; y: number; z: number; w: number }
interface ShapeD126 { label: string; title: string; summary: string }

type Combined126 = ShapeA126 & ShapeB126 & ShapeC126 & ShapeD126;
type OptionalAll126 = { [K in keyof Combined126]?: Combined126[K] };
type RequiredAll126 = { [K in keyof Combined126]-?: Combined126[K] };
type ReadonlyAll126 = { readonly [K in keyof Combined126]: Combined126[K] };
type NullableAll126 = { [K in keyof Combined126]: Combined126[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString126<T> = T extends string ? true : false;
type IsNumber126<T> = T extends number ? true : false;
type TypeName126<T> = T extends string
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

type TypeNames126 = {
  [K in keyof BigRecord126]: TypeName126<BigRecord126[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb126 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource126 = "user" | "post" | "comment" | "tag" | "category";
type Action126 = `${Verb126}_${Resource126}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise126<T> = T extends Promise<infer U> ? UnwrapPromise126<U> : T;
type UnwrapArray126<T> = T extends (infer U)[] ? UnwrapArray126<U> : T;
type Head126<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail126<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation126<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation126<Exclude<T, K>>]
  : never;

type SmallUnion126 = "a" | "b" | "c" | "d";
type AllPerms126 = Permutation126<SmallUnion126>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig126,
  Flat126,
  FR126,
  BigUnion126,
  ExtractAlpha126,
  ExcludeZulu126,
  OptionalAll126,
  RequiredAll126,
  ReadonlyAll126,
  NullableAll126,
  TypeNames126,
  Action126,
  AllPerms126,
};
