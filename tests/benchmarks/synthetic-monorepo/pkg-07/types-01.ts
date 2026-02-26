// pkg-07 / types-01  (seed 701) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord701 {
  a701: { x: number; y: string; z: boolean };
  b701: { p: string[]; q: Record<string, number> };
  c701: { nested: { deep: { deeper: { deepest: string } } } };
  d701: number;
  e701: string;
  f701: boolean;
  g701: null;
  h701: undefined;
  i701: bigint;
  j701: symbol;
}

type PartialBig701 = DeepPartial<BigRecord701>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten701<T> = T extends Array<infer U> ? Flatten701<U> : T;
type Nested701 = number[][][][][][][][][][];
type Flat701 = Flatten701<Nested701>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly701<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly701<T[K]> : T[K];
};
type DeepRequired701<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired701<T[K]> : T[K];
};
type FR701 = DeepReadonly701<DeepRequired701<PartialBig701>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion701 =
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

type ExtractAlpha701 = Extract<BigUnion701, "alpha" | "bravo" | "charlie">;
type ExcludeZulu701 = Exclude<BigUnion701, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA701 { width: number; height: number; depth: number }
interface ShapeB701 { color: string; opacity: number; blend: string }
interface ShapeC701 { x: number; y: number; z: number; w: number }
interface ShapeD701 { label: string; title: string; summary: string }

type Combined701 = ShapeA701 & ShapeB701 & ShapeC701 & ShapeD701;
type OptionalAll701 = { [K in keyof Combined701]?: Combined701[K] };
type RequiredAll701 = { [K in keyof Combined701]-?: Combined701[K] };
type ReadonlyAll701 = { readonly [K in keyof Combined701]: Combined701[K] };
type NullableAll701 = { [K in keyof Combined701]: Combined701[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString701<T> = T extends string ? true : false;
type IsNumber701<T> = T extends number ? true : false;
type TypeName701<T> = T extends string
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

type TypeNames701 = {
  [K in keyof BigRecord701]: TypeName701<BigRecord701[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb701 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource701 = "user" | "post" | "comment" | "tag" | "category";
type Action701 = `${Verb701}_${Resource701}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise701<T> = T extends Promise<infer U> ? UnwrapPromise701<U> : T;
type UnwrapArray701<T> = T extends (infer U)[] ? UnwrapArray701<U> : T;
type Head701<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail701<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation701<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation701<Exclude<T, K>>]
  : never;

type SmallUnion701 = "a" | "b" | "c" | "d";
type AllPerms701 = Permutation701<SmallUnion701>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig701,
  Flat701,
  FR701,
  BigUnion701,
  ExtractAlpha701,
  ExcludeZulu701,
  OptionalAll701,
  RequiredAll701,
  ReadonlyAll701,
  NullableAll701,
  TypeNames701,
  Action701,
  AllPerms701,
};
