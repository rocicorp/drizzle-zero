// pkg-07 / types-11  (seed 711) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord711 {
  a711: { x: number; y: string; z: boolean };
  b711: { p: string[]; q: Record<string, number> };
  c711: { nested: { deep: { deeper: { deepest: string } } } };
  d711: number;
  e711: string;
  f711: boolean;
  g711: null;
  h711: undefined;
  i711: bigint;
  j711: symbol;
}

type PartialBig711 = DeepPartial<BigRecord711>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten711<T> = T extends Array<infer U> ? Flatten711<U> : T;
type Nested711 = number[][][][][][][][][][];
type Flat711 = Flatten711<Nested711>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly711<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly711<T[K]> : T[K];
};
type DeepRequired711<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired711<T[K]> : T[K];
};
type FR711 = DeepReadonly711<DeepRequired711<PartialBig711>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion711 =
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

type ExtractAlpha711 = Extract<BigUnion711, "alpha" | "bravo" | "charlie">;
type ExcludeZulu711 = Exclude<BigUnion711, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA711 { width: number; height: number; depth: number }
interface ShapeB711 { color: string; opacity: number; blend: string }
interface ShapeC711 { x: number; y: number; z: number; w: number }
interface ShapeD711 { label: string; title: string; summary: string }

type Combined711 = ShapeA711 & ShapeB711 & ShapeC711 & ShapeD711;
type OptionalAll711 = { [K in keyof Combined711]?: Combined711[K] };
type RequiredAll711 = { [K in keyof Combined711]-?: Combined711[K] };
type ReadonlyAll711 = { readonly [K in keyof Combined711]: Combined711[K] };
type NullableAll711 = { [K in keyof Combined711]: Combined711[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString711<T> = T extends string ? true : false;
type IsNumber711<T> = T extends number ? true : false;
type TypeName711<T> = T extends string
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

type TypeNames711 = {
  [K in keyof BigRecord711]: TypeName711<BigRecord711[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb711 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource711 = "user" | "post" | "comment" | "tag" | "category";
type Action711 = `${Verb711}_${Resource711}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise711<T> = T extends Promise<infer U> ? UnwrapPromise711<U> : T;
type UnwrapArray711<T> = T extends (infer U)[] ? UnwrapArray711<U> : T;
type Head711<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail711<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation711<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation711<Exclude<T, K>>]
  : never;

type SmallUnion711 = "a" | "b" | "c" | "d";
type AllPerms711 = Permutation711<SmallUnion711>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig711,
  Flat711,
  FR711,
  BigUnion711,
  ExtractAlpha711,
  ExcludeZulu711,
  OptionalAll711,
  RequiredAll711,
  ReadonlyAll711,
  NullableAll711,
  TypeNames711,
  Action711,
  AllPerms711,
};
