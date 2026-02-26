// pkg-01 / types-38  (seed 138) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord138 {
  a138: { x: number; y: string; z: boolean };
  b138: { p: string[]; q: Record<string, number> };
  c138: { nested: { deep: { deeper: { deepest: string } } } };
  d138: number;
  e138: string;
  f138: boolean;
  g138: null;
  h138: undefined;
  i138: bigint;
  j138: symbol;
}

type PartialBig138 = DeepPartial<BigRecord138>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten138<T> = T extends Array<infer U> ? Flatten138<U> : T;
type Nested138 = number[][][][][][][][][][];
type Flat138 = Flatten138<Nested138>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly138<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly138<T[K]> : T[K];
};
type DeepRequired138<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired138<T[K]> : T[K];
};
type FR138 = DeepReadonly138<DeepRequired138<PartialBig138>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion138 =
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

type ExtractAlpha138 = Extract<BigUnion138, "alpha" | "bravo" | "charlie">;
type ExcludeZulu138 = Exclude<BigUnion138, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA138 { width: number; height: number; depth: number }
interface ShapeB138 { color: string; opacity: number; blend: string }
interface ShapeC138 { x: number; y: number; z: number; w: number }
interface ShapeD138 { label: string; title: string; summary: string }

type Combined138 = ShapeA138 & ShapeB138 & ShapeC138 & ShapeD138;
type OptionalAll138 = { [K in keyof Combined138]?: Combined138[K] };
type RequiredAll138 = { [K in keyof Combined138]-?: Combined138[K] };
type ReadonlyAll138 = { readonly [K in keyof Combined138]: Combined138[K] };
type NullableAll138 = { [K in keyof Combined138]: Combined138[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString138<T> = T extends string ? true : false;
type IsNumber138<T> = T extends number ? true : false;
type TypeName138<T> = T extends string
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

type TypeNames138 = {
  [K in keyof BigRecord138]: TypeName138<BigRecord138[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb138 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource138 = "user" | "post" | "comment" | "tag" | "category";
type Action138 = `${Verb138}_${Resource138}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise138<T> = T extends Promise<infer U> ? UnwrapPromise138<U> : T;
type UnwrapArray138<T> = T extends (infer U)[] ? UnwrapArray138<U> : T;
type Head138<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail138<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation138<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation138<Exclude<T, K>>]
  : never;

type SmallUnion138 = "a" | "b" | "c" | "d";
type AllPerms138 = Permutation138<SmallUnion138>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig138,
  Flat138,
  FR138,
  BigUnion138,
  ExtractAlpha138,
  ExcludeZulu138,
  OptionalAll138,
  RequiredAll138,
  ReadonlyAll138,
  NullableAll138,
  TypeNames138,
  Action138,
  AllPerms138,
};
