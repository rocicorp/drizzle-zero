// pkg-04 / types-08  (seed 408) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord408 {
  a408: { x: number; y: string; z: boolean };
  b408: { p: string[]; q: Record<string, number> };
  c408: { nested: { deep: { deeper: { deepest: string } } } };
  d408: number;
  e408: string;
  f408: boolean;
  g408: null;
  h408: undefined;
  i408: bigint;
  j408: symbol;
}

type PartialBig408 = DeepPartial<BigRecord408>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten408<T> = T extends Array<infer U> ? Flatten408<U> : T;
type Nested408 = number[][][][][][][][][][];
type Flat408 = Flatten408<Nested408>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly408<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly408<T[K]> : T[K];
};
type DeepRequired408<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired408<T[K]> : T[K];
};
type FR408 = DeepReadonly408<DeepRequired408<PartialBig408>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion408 =
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

type ExtractAlpha408 = Extract<BigUnion408, "alpha" | "bravo" | "charlie">;
type ExcludeZulu408 = Exclude<BigUnion408, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA408 { width: number; height: number; depth: number }
interface ShapeB408 { color: string; opacity: number; blend: string }
interface ShapeC408 { x: number; y: number; z: number; w: number }
interface ShapeD408 { label: string; title: string; summary: string }

type Combined408 = ShapeA408 & ShapeB408 & ShapeC408 & ShapeD408;
type OptionalAll408 = { [K in keyof Combined408]?: Combined408[K] };
type RequiredAll408 = { [K in keyof Combined408]-?: Combined408[K] };
type ReadonlyAll408 = { readonly [K in keyof Combined408]: Combined408[K] };
type NullableAll408 = { [K in keyof Combined408]: Combined408[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString408<T> = T extends string ? true : false;
type IsNumber408<T> = T extends number ? true : false;
type TypeName408<T> = T extends string
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

type TypeNames408 = {
  [K in keyof BigRecord408]: TypeName408<BigRecord408[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb408 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource408 = "user" | "post" | "comment" | "tag" | "category";
type Action408 = `${Verb408}_${Resource408}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise408<T> = T extends Promise<infer U> ? UnwrapPromise408<U> : T;
type UnwrapArray408<T> = T extends (infer U)[] ? UnwrapArray408<U> : T;
type Head408<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail408<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation408<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation408<Exclude<T, K>>]
  : never;

type SmallUnion408 = "a" | "b" | "c" | "d";
type AllPerms408 = Permutation408<SmallUnion408>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig408,
  Flat408,
  FR408,
  BigUnion408,
  ExtractAlpha408,
  ExcludeZulu408,
  OptionalAll408,
  RequiredAll408,
  ReadonlyAll408,
  NullableAll408,
  TypeNames408,
  Action408,
  AllPerms408,
};
