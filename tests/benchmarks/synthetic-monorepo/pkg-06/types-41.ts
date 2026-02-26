// pkg-06 / types-41  (seed 641) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord641 {
  a641: { x: number; y: string; z: boolean };
  b641: { p: string[]; q: Record<string, number> };
  c641: { nested: { deep: { deeper: { deepest: string } } } };
  d641: number;
  e641: string;
  f641: boolean;
  g641: null;
  h641: undefined;
  i641: bigint;
  j641: symbol;
}

type PartialBig641 = DeepPartial<BigRecord641>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten641<T> = T extends Array<infer U> ? Flatten641<U> : T;
type Nested641 = number[][][][][][][][][][];
type Flat641 = Flatten641<Nested641>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly641<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly641<T[K]> : T[K];
};
type DeepRequired641<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired641<T[K]> : T[K];
};
type FR641 = DeepReadonly641<DeepRequired641<PartialBig641>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion641 =
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

type ExtractAlpha641 = Extract<BigUnion641, "alpha" | "bravo" | "charlie">;
type ExcludeZulu641 = Exclude<BigUnion641, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA641 { width: number; height: number; depth: number }
interface ShapeB641 { color: string; opacity: number; blend: string }
interface ShapeC641 { x: number; y: number; z: number; w: number }
interface ShapeD641 { label: string; title: string; summary: string }

type Combined641 = ShapeA641 & ShapeB641 & ShapeC641 & ShapeD641;
type OptionalAll641 = { [K in keyof Combined641]?: Combined641[K] };
type RequiredAll641 = { [K in keyof Combined641]-?: Combined641[K] };
type ReadonlyAll641 = { readonly [K in keyof Combined641]: Combined641[K] };
type NullableAll641 = { [K in keyof Combined641]: Combined641[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString641<T> = T extends string ? true : false;
type IsNumber641<T> = T extends number ? true : false;
type TypeName641<T> = T extends string
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

type TypeNames641 = {
  [K in keyof BigRecord641]: TypeName641<BigRecord641[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb641 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource641 = "user" | "post" | "comment" | "tag" | "category";
type Action641 = `${Verb641}_${Resource641}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise641<T> = T extends Promise<infer U> ? UnwrapPromise641<U> : T;
type UnwrapArray641<T> = T extends (infer U)[] ? UnwrapArray641<U> : T;
type Head641<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail641<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation641<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation641<Exclude<T, K>>]
  : never;

type SmallUnion641 = "a" | "b" | "c" | "d";
type AllPerms641 = Permutation641<SmallUnion641>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig641,
  Flat641,
  FR641,
  BigUnion641,
  ExtractAlpha641,
  ExcludeZulu641,
  OptionalAll641,
  RequiredAll641,
  ReadonlyAll641,
  NullableAll641,
  TypeNames641,
  Action641,
  AllPerms641,
};
