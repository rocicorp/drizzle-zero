// pkg-03 / types-27  (seed 327) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord327 {
  a327: { x: number; y: string; z: boolean };
  b327: { p: string[]; q: Record<string, number> };
  c327: { nested: { deep: { deeper: { deepest: string } } } };
  d327: number;
  e327: string;
  f327: boolean;
  g327: null;
  h327: undefined;
  i327: bigint;
  j327: symbol;
}

type PartialBig327 = DeepPartial<BigRecord327>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten327<T> = T extends Array<infer U> ? Flatten327<U> : T;
type Nested327 = number[][][][][][][][][][];
type Flat327 = Flatten327<Nested327>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly327<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly327<T[K]> : T[K];
};
type DeepRequired327<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired327<T[K]> : T[K];
};
type FR327 = DeepReadonly327<DeepRequired327<PartialBig327>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion327 =
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

type ExtractAlpha327 = Extract<BigUnion327, "alpha" | "bravo" | "charlie">;
type ExcludeZulu327 = Exclude<BigUnion327, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA327 { width: number; height: number; depth: number }
interface ShapeB327 { color: string; opacity: number; blend: string }
interface ShapeC327 { x: number; y: number; z: number; w: number }
interface ShapeD327 { label: string; title: string; summary: string }

type Combined327 = ShapeA327 & ShapeB327 & ShapeC327 & ShapeD327;
type OptionalAll327 = { [K in keyof Combined327]?: Combined327[K] };
type RequiredAll327 = { [K in keyof Combined327]-?: Combined327[K] };
type ReadonlyAll327 = { readonly [K in keyof Combined327]: Combined327[K] };
type NullableAll327 = { [K in keyof Combined327]: Combined327[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString327<T> = T extends string ? true : false;
type IsNumber327<T> = T extends number ? true : false;
type TypeName327<T> = T extends string
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

type TypeNames327 = {
  [K in keyof BigRecord327]: TypeName327<BigRecord327[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb327 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource327 = "user" | "post" | "comment" | "tag" | "category";
type Action327 = `${Verb327}_${Resource327}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise327<T> = T extends Promise<infer U> ? UnwrapPromise327<U> : T;
type UnwrapArray327<T> = T extends (infer U)[] ? UnwrapArray327<U> : T;
type Head327<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail327<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation327<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation327<Exclude<T, K>>]
  : never;

type SmallUnion327 = "a" | "b" | "c" | "d";
type AllPerms327 = Permutation327<SmallUnion327>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig327,
  Flat327,
  FR327,
  BigUnion327,
  ExtractAlpha327,
  ExcludeZulu327,
  OptionalAll327,
  RequiredAll327,
  ReadonlyAll327,
  NullableAll327,
  TypeNames327,
  Action327,
  AllPerms327,
};
