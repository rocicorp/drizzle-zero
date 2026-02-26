// pkg-01 / types-12  (seed 112) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord112 {
  a112: { x: number; y: string; z: boolean };
  b112: { p: string[]; q: Record<string, number> };
  c112: { nested: { deep: { deeper: { deepest: string } } } };
  d112: number;
  e112: string;
  f112: boolean;
  g112: null;
  h112: undefined;
  i112: bigint;
  j112: symbol;
}

type PartialBig112 = DeepPartial<BigRecord112>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten112<T> = T extends Array<infer U> ? Flatten112<U> : T;
type Nested112 = number[][][][][][][][][][];
type Flat112 = Flatten112<Nested112>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly112<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly112<T[K]> : T[K];
};
type DeepRequired112<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired112<T[K]> : T[K];
};
type FR112 = DeepReadonly112<DeepRequired112<PartialBig112>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion112 =
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

type ExtractAlpha112 = Extract<BigUnion112, "alpha" | "bravo" | "charlie">;
type ExcludeZulu112 = Exclude<BigUnion112, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA112 { width: number; height: number; depth: number }
interface ShapeB112 { color: string; opacity: number; blend: string }
interface ShapeC112 { x: number; y: number; z: number; w: number }
interface ShapeD112 { label: string; title: string; summary: string }

type Combined112 = ShapeA112 & ShapeB112 & ShapeC112 & ShapeD112;
type OptionalAll112 = { [K in keyof Combined112]?: Combined112[K] };
type RequiredAll112 = { [K in keyof Combined112]-?: Combined112[K] };
type ReadonlyAll112 = { readonly [K in keyof Combined112]: Combined112[K] };
type NullableAll112 = { [K in keyof Combined112]: Combined112[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString112<T> = T extends string ? true : false;
type IsNumber112<T> = T extends number ? true : false;
type TypeName112<T> = T extends string
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

type TypeNames112 = {
  [K in keyof BigRecord112]: TypeName112<BigRecord112[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb112 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource112 = "user" | "post" | "comment" | "tag" | "category";
type Action112 = `${Verb112}_${Resource112}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise112<T> = T extends Promise<infer U> ? UnwrapPromise112<U> : T;
type UnwrapArray112<T> = T extends (infer U)[] ? UnwrapArray112<U> : T;
type Head112<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail112<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation112<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation112<Exclude<T, K>>]
  : never;

type SmallUnion112 = "a" | "b" | "c" | "d";
type AllPerms112 = Permutation112<SmallUnion112>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig112,
  Flat112,
  FR112,
  BigUnion112,
  ExtractAlpha112,
  ExcludeZulu112,
  OptionalAll112,
  RequiredAll112,
  ReadonlyAll112,
  NullableAll112,
  TypeNames112,
  Action112,
  AllPerms112,
};
