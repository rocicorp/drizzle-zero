// pkg-08 / types-25  (seed 825) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord825 {
  a825: { x: number; y: string; z: boolean };
  b825: { p: string[]; q: Record<string, number> };
  c825: { nested: { deep: { deeper: { deepest: string } } } };
  d825: number;
  e825: string;
  f825: boolean;
  g825: null;
  h825: undefined;
  i825: bigint;
  j825: symbol;
}

type PartialBig825 = DeepPartial<BigRecord825>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten825<T> = T extends Array<infer U> ? Flatten825<U> : T;
type Nested825 = number[][][][][][][][][][];
type Flat825 = Flatten825<Nested825>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly825<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly825<T[K]> : T[K];
};
type DeepRequired825<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired825<T[K]> : T[K];
};
type FR825 = DeepReadonly825<DeepRequired825<PartialBig825>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion825 =
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

type ExtractAlpha825 = Extract<BigUnion825, "alpha" | "bravo" | "charlie">;
type ExcludeZulu825 = Exclude<BigUnion825, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA825 { width: number; height: number; depth: number }
interface ShapeB825 { color: string; opacity: number; blend: string }
interface ShapeC825 { x: number; y: number; z: number; w: number }
interface ShapeD825 { label: string; title: string; summary: string }

type Combined825 = ShapeA825 & ShapeB825 & ShapeC825 & ShapeD825;
type OptionalAll825 = { [K in keyof Combined825]?: Combined825[K] };
type RequiredAll825 = { [K in keyof Combined825]-?: Combined825[K] };
type ReadonlyAll825 = { readonly [K in keyof Combined825]: Combined825[K] };
type NullableAll825 = { [K in keyof Combined825]: Combined825[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString825<T> = T extends string ? true : false;
type IsNumber825<T> = T extends number ? true : false;
type TypeName825<T> = T extends string
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

type TypeNames825 = {
  [K in keyof BigRecord825]: TypeName825<BigRecord825[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb825 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource825 = "user" | "post" | "comment" | "tag" | "category";
type Action825 = `${Verb825}_${Resource825}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise825<T> = T extends Promise<infer U> ? UnwrapPromise825<U> : T;
type UnwrapArray825<T> = T extends (infer U)[] ? UnwrapArray825<U> : T;
type Head825<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail825<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation825<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation825<Exclude<T, K>>]
  : never;

type SmallUnion825 = "a" | "b" | "c" | "d";
type AllPerms825 = Permutation825<SmallUnion825>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig825,
  Flat825,
  FR825,
  BigUnion825,
  ExtractAlpha825,
  ExcludeZulu825,
  OptionalAll825,
  RequiredAll825,
  ReadonlyAll825,
  NullableAll825,
  TypeNames825,
  Action825,
  AllPerms825,
};
