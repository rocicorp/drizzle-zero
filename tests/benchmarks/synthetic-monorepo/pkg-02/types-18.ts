// pkg-02 / types-18  (seed 218) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord218 {
  a218: { x: number; y: string; z: boolean };
  b218: { p: string[]; q: Record<string, number> };
  c218: { nested: { deep: { deeper: { deepest: string } } } };
  d218: number;
  e218: string;
  f218: boolean;
  g218: null;
  h218: undefined;
  i218: bigint;
  j218: symbol;
}

type PartialBig218 = DeepPartial<BigRecord218>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten218<T> = T extends Array<infer U> ? Flatten218<U> : T;
type Nested218 = number[][][][][][][][][][];
type Flat218 = Flatten218<Nested218>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly218<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly218<T[K]> : T[K];
};
type DeepRequired218<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired218<T[K]> : T[K];
};
type FR218 = DeepReadonly218<DeepRequired218<PartialBig218>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion218 =
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

type ExtractAlpha218 = Extract<BigUnion218, "alpha" | "bravo" | "charlie">;
type ExcludeZulu218 = Exclude<BigUnion218, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA218 { width: number; height: number; depth: number }
interface ShapeB218 { color: string; opacity: number; blend: string }
interface ShapeC218 { x: number; y: number; z: number; w: number }
interface ShapeD218 { label: string; title: string; summary: string }

type Combined218 = ShapeA218 & ShapeB218 & ShapeC218 & ShapeD218;
type OptionalAll218 = { [K in keyof Combined218]?: Combined218[K] };
type RequiredAll218 = { [K in keyof Combined218]-?: Combined218[K] };
type ReadonlyAll218 = { readonly [K in keyof Combined218]: Combined218[K] };
type NullableAll218 = { [K in keyof Combined218]: Combined218[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString218<T> = T extends string ? true : false;
type IsNumber218<T> = T extends number ? true : false;
type TypeName218<T> = T extends string
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

type TypeNames218 = {
  [K in keyof BigRecord218]: TypeName218<BigRecord218[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb218 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource218 = "user" | "post" | "comment" | "tag" | "category";
type Action218 = `${Verb218}_${Resource218}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise218<T> = T extends Promise<infer U> ? UnwrapPromise218<U> : T;
type UnwrapArray218<T> = T extends (infer U)[] ? UnwrapArray218<U> : T;
type Head218<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail218<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation218<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation218<Exclude<T, K>>]
  : never;

type SmallUnion218 = "a" | "b" | "c" | "d";
type AllPerms218 = Permutation218<SmallUnion218>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig218,
  Flat218,
  FR218,
  BigUnion218,
  ExtractAlpha218,
  ExcludeZulu218,
  OptionalAll218,
  RequiredAll218,
  ReadonlyAll218,
  NullableAll218,
  TypeNames218,
  Action218,
  AllPerms218,
};
