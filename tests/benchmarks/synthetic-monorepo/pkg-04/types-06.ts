// pkg-04 / types-06  (seed 406) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord406 {
  a406: { x: number; y: string; z: boolean };
  b406: { p: string[]; q: Record<string, number> };
  c406: { nested: { deep: { deeper: { deepest: string } } } };
  d406: number;
  e406: string;
  f406: boolean;
  g406: null;
  h406: undefined;
  i406: bigint;
  j406: symbol;
}

type PartialBig406 = DeepPartial<BigRecord406>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten406<T> = T extends Array<infer U> ? Flatten406<U> : T;
type Nested406 = number[][][][][][][][][][];
type Flat406 = Flatten406<Nested406>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly406<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly406<T[K]> : T[K];
};
type DeepRequired406<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired406<T[K]> : T[K];
};
type FR406 = DeepReadonly406<DeepRequired406<PartialBig406>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion406 =
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

type ExtractAlpha406 = Extract<BigUnion406, "alpha" | "bravo" | "charlie">;
type ExcludeZulu406 = Exclude<BigUnion406, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA406 { width: number; height: number; depth: number }
interface ShapeB406 { color: string; opacity: number; blend: string }
interface ShapeC406 { x: number; y: number; z: number; w: number }
interface ShapeD406 { label: string; title: string; summary: string }

type Combined406 = ShapeA406 & ShapeB406 & ShapeC406 & ShapeD406;
type OptionalAll406 = { [K in keyof Combined406]?: Combined406[K] };
type RequiredAll406 = { [K in keyof Combined406]-?: Combined406[K] };
type ReadonlyAll406 = { readonly [K in keyof Combined406]: Combined406[K] };
type NullableAll406 = { [K in keyof Combined406]: Combined406[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString406<T> = T extends string ? true : false;
type IsNumber406<T> = T extends number ? true : false;
type TypeName406<T> = T extends string
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

type TypeNames406 = {
  [K in keyof BigRecord406]: TypeName406<BigRecord406[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb406 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource406 = "user" | "post" | "comment" | "tag" | "category";
type Action406 = `${Verb406}_${Resource406}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise406<T> = T extends Promise<infer U> ? UnwrapPromise406<U> : T;
type UnwrapArray406<T> = T extends (infer U)[] ? UnwrapArray406<U> : T;
type Head406<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail406<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation406<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation406<Exclude<T, K>>]
  : never;

type SmallUnion406 = "a" | "b" | "c" | "d";
type AllPerms406 = Permutation406<SmallUnion406>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig406,
  Flat406,
  FR406,
  BigUnion406,
  ExtractAlpha406,
  ExcludeZulu406,
  OptionalAll406,
  RequiredAll406,
  ReadonlyAll406,
  NullableAll406,
  TypeNames406,
  Action406,
  AllPerms406,
};
