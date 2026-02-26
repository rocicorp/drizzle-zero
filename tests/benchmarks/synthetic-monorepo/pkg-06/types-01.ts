// pkg-06 / types-01  (seed 601) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord601 {
  a601: { x: number; y: string; z: boolean };
  b601: { p: string[]; q: Record<string, number> };
  c601: { nested: { deep: { deeper: { deepest: string } } } };
  d601: number;
  e601: string;
  f601: boolean;
  g601: null;
  h601: undefined;
  i601: bigint;
  j601: symbol;
}

type PartialBig601 = DeepPartial<BigRecord601>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten601<T> = T extends Array<infer U> ? Flatten601<U> : T;
type Nested601 = number[][][][][][][][][][];
type Flat601 = Flatten601<Nested601>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly601<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly601<T[K]> : T[K];
};
type DeepRequired601<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired601<T[K]> : T[K];
};
type FR601 = DeepReadonly601<DeepRequired601<PartialBig601>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion601 =
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

type ExtractAlpha601 = Extract<BigUnion601, "alpha" | "bravo" | "charlie">;
type ExcludeZulu601 = Exclude<BigUnion601, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA601 { width: number; height: number; depth: number }
interface ShapeB601 { color: string; opacity: number; blend: string }
interface ShapeC601 { x: number; y: number; z: number; w: number }
interface ShapeD601 { label: string; title: string; summary: string }

type Combined601 = ShapeA601 & ShapeB601 & ShapeC601 & ShapeD601;
type OptionalAll601 = { [K in keyof Combined601]?: Combined601[K] };
type RequiredAll601 = { [K in keyof Combined601]-?: Combined601[K] };
type ReadonlyAll601 = { readonly [K in keyof Combined601]: Combined601[K] };
type NullableAll601 = { [K in keyof Combined601]: Combined601[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString601<T> = T extends string ? true : false;
type IsNumber601<T> = T extends number ? true : false;
type TypeName601<T> = T extends string
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

type TypeNames601 = {
  [K in keyof BigRecord601]: TypeName601<BigRecord601[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb601 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource601 = "user" | "post" | "comment" | "tag" | "category";
type Action601 = `${Verb601}_${Resource601}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise601<T> = T extends Promise<infer U> ? UnwrapPromise601<U> : T;
type UnwrapArray601<T> = T extends (infer U)[] ? UnwrapArray601<U> : T;
type Head601<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail601<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation601<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation601<Exclude<T, K>>]
  : never;

type SmallUnion601 = "a" | "b" | "c" | "d";
type AllPerms601 = Permutation601<SmallUnion601>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig601,
  Flat601,
  FR601,
  BigUnion601,
  ExtractAlpha601,
  ExcludeZulu601,
  OptionalAll601,
  RequiredAll601,
  ReadonlyAll601,
  NullableAll601,
  TypeNames601,
  Action601,
  AllPerms601,
};
