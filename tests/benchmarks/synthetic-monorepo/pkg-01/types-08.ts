// pkg-01 / types-08  (seed 108) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord108 {
  a108: { x: number; y: string; z: boolean };
  b108: { p: string[]; q: Record<string, number> };
  c108: { nested: { deep: { deeper: { deepest: string } } } };
  d108: number;
  e108: string;
  f108: boolean;
  g108: null;
  h108: undefined;
  i108: bigint;
  j108: symbol;
}

type PartialBig108 = DeepPartial<BigRecord108>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten108<T> = T extends Array<infer U> ? Flatten108<U> : T;
type Nested108 = number[][][][][][][][][][];
type Flat108 = Flatten108<Nested108>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly108<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly108<T[K]> : T[K];
};
type DeepRequired108<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired108<T[K]> : T[K];
};
type FR108 = DeepReadonly108<DeepRequired108<PartialBig108>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion108 =
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

type ExtractAlpha108 = Extract<BigUnion108, "alpha" | "bravo" | "charlie">;
type ExcludeZulu108 = Exclude<BigUnion108, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA108 { width: number; height: number; depth: number }
interface ShapeB108 { color: string; opacity: number; blend: string }
interface ShapeC108 { x: number; y: number; z: number; w: number }
interface ShapeD108 { label: string; title: string; summary: string }

type Combined108 = ShapeA108 & ShapeB108 & ShapeC108 & ShapeD108;
type OptionalAll108 = { [K in keyof Combined108]?: Combined108[K] };
type RequiredAll108 = { [K in keyof Combined108]-?: Combined108[K] };
type ReadonlyAll108 = { readonly [K in keyof Combined108]: Combined108[K] };
type NullableAll108 = { [K in keyof Combined108]: Combined108[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString108<T> = T extends string ? true : false;
type IsNumber108<T> = T extends number ? true : false;
type TypeName108<T> = T extends string
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

type TypeNames108 = {
  [K in keyof BigRecord108]: TypeName108<BigRecord108[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb108 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource108 = "user" | "post" | "comment" | "tag" | "category";
type Action108 = `${Verb108}_${Resource108}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise108<T> = T extends Promise<infer U> ? UnwrapPromise108<U> : T;
type UnwrapArray108<T> = T extends (infer U)[] ? UnwrapArray108<U> : T;
type Head108<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail108<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation108<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation108<Exclude<T, K>>]
  : never;

type SmallUnion108 = "a" | "b" | "c" | "d";
type AllPerms108 = Permutation108<SmallUnion108>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig108,
  Flat108,
  FR108,
  BigUnion108,
  ExtractAlpha108,
  ExcludeZulu108,
  OptionalAll108,
  RequiredAll108,
  ReadonlyAll108,
  NullableAll108,
  TypeNames108,
  Action108,
  AllPerms108,
};
