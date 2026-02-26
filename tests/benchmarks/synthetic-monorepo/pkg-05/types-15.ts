// pkg-05 / types-15  (seed 515) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord515 {
  a515: { x: number; y: string; z: boolean };
  b515: { p: string[]; q: Record<string, number> };
  c515: { nested: { deep: { deeper: { deepest: string } } } };
  d515: number;
  e515: string;
  f515: boolean;
  g515: null;
  h515: undefined;
  i515: bigint;
  j515: symbol;
}

type PartialBig515 = DeepPartial<BigRecord515>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten515<T> = T extends Array<infer U> ? Flatten515<U> : T;
type Nested515 = number[][][][][][][][][][];
type Flat515 = Flatten515<Nested515>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly515<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly515<T[K]> : T[K];
};
type DeepRequired515<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired515<T[K]> : T[K];
};
type FR515 = DeepReadonly515<DeepRequired515<PartialBig515>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion515 =
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

type ExtractAlpha515 = Extract<BigUnion515, "alpha" | "bravo" | "charlie">;
type ExcludeZulu515 = Exclude<BigUnion515, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA515 { width: number; height: number; depth: number }
interface ShapeB515 { color: string; opacity: number; blend: string }
interface ShapeC515 { x: number; y: number; z: number; w: number }
interface ShapeD515 { label: string; title: string; summary: string }

type Combined515 = ShapeA515 & ShapeB515 & ShapeC515 & ShapeD515;
type OptionalAll515 = { [K in keyof Combined515]?: Combined515[K] };
type RequiredAll515 = { [K in keyof Combined515]-?: Combined515[K] };
type ReadonlyAll515 = { readonly [K in keyof Combined515]: Combined515[K] };
type NullableAll515 = { [K in keyof Combined515]: Combined515[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString515<T> = T extends string ? true : false;
type IsNumber515<T> = T extends number ? true : false;
type TypeName515<T> = T extends string
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

type TypeNames515 = {
  [K in keyof BigRecord515]: TypeName515<BigRecord515[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb515 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource515 = "user" | "post" | "comment" | "tag" | "category";
type Action515 = `${Verb515}_${Resource515}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise515<T> = T extends Promise<infer U> ? UnwrapPromise515<U> : T;
type UnwrapArray515<T> = T extends (infer U)[] ? UnwrapArray515<U> : T;
type Head515<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail515<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation515<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation515<Exclude<T, K>>]
  : never;

type SmallUnion515 = "a" | "b" | "c" | "d";
type AllPerms515 = Permutation515<SmallUnion515>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig515,
  Flat515,
  FR515,
  BigUnion515,
  ExtractAlpha515,
  ExcludeZulu515,
  OptionalAll515,
  RequiredAll515,
  ReadonlyAll515,
  NullableAll515,
  TypeNames515,
  Action515,
  AllPerms515,
};
