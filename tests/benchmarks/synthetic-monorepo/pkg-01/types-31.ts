// pkg-01 / types-31  (seed 131) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord131 {
  a131: { x: number; y: string; z: boolean };
  b131: { p: string[]; q: Record<string, number> };
  c131: { nested: { deep: { deeper: { deepest: string } } } };
  d131: number;
  e131: string;
  f131: boolean;
  g131: null;
  h131: undefined;
  i131: bigint;
  j131: symbol;
}

type PartialBig131 = DeepPartial<BigRecord131>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten131<T> = T extends Array<infer U> ? Flatten131<U> : T;
type Nested131 = number[][][][][][][][][][];
type Flat131 = Flatten131<Nested131>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly131<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly131<T[K]> : T[K];
};
type DeepRequired131<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired131<T[K]> : T[K];
};
type FR131 = DeepReadonly131<DeepRequired131<PartialBig131>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion131 =
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

type ExtractAlpha131 = Extract<BigUnion131, "alpha" | "bravo" | "charlie">;
type ExcludeZulu131 = Exclude<BigUnion131, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA131 { width: number; height: number; depth: number }
interface ShapeB131 { color: string; opacity: number; blend: string }
interface ShapeC131 { x: number; y: number; z: number; w: number }
interface ShapeD131 { label: string; title: string; summary: string }

type Combined131 = ShapeA131 & ShapeB131 & ShapeC131 & ShapeD131;
type OptionalAll131 = { [K in keyof Combined131]?: Combined131[K] };
type RequiredAll131 = { [K in keyof Combined131]-?: Combined131[K] };
type ReadonlyAll131 = { readonly [K in keyof Combined131]: Combined131[K] };
type NullableAll131 = { [K in keyof Combined131]: Combined131[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString131<T> = T extends string ? true : false;
type IsNumber131<T> = T extends number ? true : false;
type TypeName131<T> = T extends string
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

type TypeNames131 = {
  [K in keyof BigRecord131]: TypeName131<BigRecord131[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb131 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource131 = "user" | "post" | "comment" | "tag" | "category";
type Action131 = `${Verb131}_${Resource131}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise131<T> = T extends Promise<infer U> ? UnwrapPromise131<U> : T;
type UnwrapArray131<T> = T extends (infer U)[] ? UnwrapArray131<U> : T;
type Head131<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail131<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation131<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation131<Exclude<T, K>>]
  : never;

type SmallUnion131 = "a" | "b" | "c" | "d";
type AllPerms131 = Permutation131<SmallUnion131>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig131,
  Flat131,
  FR131,
  BigUnion131,
  ExtractAlpha131,
  ExcludeZulu131,
  OptionalAll131,
  RequiredAll131,
  ReadonlyAll131,
  NullableAll131,
  TypeNames131,
  Action131,
  AllPerms131,
};
