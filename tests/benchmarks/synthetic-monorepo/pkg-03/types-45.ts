// pkg-03 / types-45  (seed 345) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord345 {
  a345: { x: number; y: string; z: boolean };
  b345: { p: string[]; q: Record<string, number> };
  c345: { nested: { deep: { deeper: { deepest: string } } } };
  d345: number;
  e345: string;
  f345: boolean;
  g345: null;
  h345: undefined;
  i345: bigint;
  j345: symbol;
}

type PartialBig345 = DeepPartial<BigRecord345>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten345<T> = T extends Array<infer U> ? Flatten345<U> : T;
type Nested345 = number[][][][][][][][][][];
type Flat345 = Flatten345<Nested345>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly345<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly345<T[K]> : T[K];
};
type DeepRequired345<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired345<T[K]> : T[K];
};
type FR345 = DeepReadonly345<DeepRequired345<PartialBig345>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion345 =
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

type ExtractAlpha345 = Extract<BigUnion345, "alpha" | "bravo" | "charlie">;
type ExcludeZulu345 = Exclude<BigUnion345, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA345 { width: number; height: number; depth: number }
interface ShapeB345 { color: string; opacity: number; blend: string }
interface ShapeC345 { x: number; y: number; z: number; w: number }
interface ShapeD345 { label: string; title: string; summary: string }

type Combined345 = ShapeA345 & ShapeB345 & ShapeC345 & ShapeD345;
type OptionalAll345 = { [K in keyof Combined345]?: Combined345[K] };
type RequiredAll345 = { [K in keyof Combined345]-?: Combined345[K] };
type ReadonlyAll345 = { readonly [K in keyof Combined345]: Combined345[K] };
type NullableAll345 = { [K in keyof Combined345]: Combined345[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString345<T> = T extends string ? true : false;
type IsNumber345<T> = T extends number ? true : false;
type TypeName345<T> = T extends string
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

type TypeNames345 = {
  [K in keyof BigRecord345]: TypeName345<BigRecord345[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb345 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource345 = "user" | "post" | "comment" | "tag" | "category";
type Action345 = `${Verb345}_${Resource345}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise345<T> = T extends Promise<infer U> ? UnwrapPromise345<U> : T;
type UnwrapArray345<T> = T extends (infer U)[] ? UnwrapArray345<U> : T;
type Head345<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail345<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation345<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation345<Exclude<T, K>>]
  : never;

type SmallUnion345 = "a" | "b" | "c" | "d";
type AllPerms345 = Permutation345<SmallUnion345>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig345,
  Flat345,
  FR345,
  BigUnion345,
  ExtractAlpha345,
  ExcludeZulu345,
  OptionalAll345,
  RequiredAll345,
  ReadonlyAll345,
  NullableAll345,
  TypeNames345,
  Action345,
  AllPerms345,
};
