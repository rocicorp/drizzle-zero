// pkg-01 / types-11  (seed 111) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord111 {
  a111: { x: number; y: string; z: boolean };
  b111: { p: string[]; q: Record<string, number> };
  c111: { nested: { deep: { deeper: { deepest: string } } } };
  d111: number;
  e111: string;
  f111: boolean;
  g111: null;
  h111: undefined;
  i111: bigint;
  j111: symbol;
}

type PartialBig111 = DeepPartial<BigRecord111>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten111<T> = T extends Array<infer U> ? Flatten111<U> : T;
type Nested111 = number[][][][][][][][][][];
type Flat111 = Flatten111<Nested111>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly111<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly111<T[K]> : T[K];
};
type DeepRequired111<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired111<T[K]> : T[K];
};
type FR111 = DeepReadonly111<DeepRequired111<PartialBig111>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion111 =
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

type ExtractAlpha111 = Extract<BigUnion111, "alpha" | "bravo" | "charlie">;
type ExcludeZulu111 = Exclude<BigUnion111, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA111 { width: number; height: number; depth: number }
interface ShapeB111 { color: string; opacity: number; blend: string }
interface ShapeC111 { x: number; y: number; z: number; w: number }
interface ShapeD111 { label: string; title: string; summary: string }

type Combined111 = ShapeA111 & ShapeB111 & ShapeC111 & ShapeD111;
type OptionalAll111 = { [K in keyof Combined111]?: Combined111[K] };
type RequiredAll111 = { [K in keyof Combined111]-?: Combined111[K] };
type ReadonlyAll111 = { readonly [K in keyof Combined111]: Combined111[K] };
type NullableAll111 = { [K in keyof Combined111]: Combined111[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString111<T> = T extends string ? true : false;
type IsNumber111<T> = T extends number ? true : false;
type TypeName111<T> = T extends string
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

type TypeNames111 = {
  [K in keyof BigRecord111]: TypeName111<BigRecord111[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb111 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource111 = "user" | "post" | "comment" | "tag" | "category";
type Action111 = `${Verb111}_${Resource111}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise111<T> = T extends Promise<infer U> ? UnwrapPromise111<U> : T;
type UnwrapArray111<T> = T extends (infer U)[] ? UnwrapArray111<U> : T;
type Head111<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail111<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation111<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation111<Exclude<T, K>>]
  : never;

type SmallUnion111 = "a" | "b" | "c" | "d";
type AllPerms111 = Permutation111<SmallUnion111>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig111,
  Flat111,
  FR111,
  BigUnion111,
  ExtractAlpha111,
  ExcludeZulu111,
  OptionalAll111,
  RequiredAll111,
  ReadonlyAll111,
  NullableAll111,
  TypeNames111,
  Action111,
  AllPerms111,
};
