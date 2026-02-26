// pkg-09 / types-18  (seed 918) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord918 {
  a918: { x: number; y: string; z: boolean };
  b918: { p: string[]; q: Record<string, number> };
  c918: { nested: { deep: { deeper: { deepest: string } } } };
  d918: number;
  e918: string;
  f918: boolean;
  g918: null;
  h918: undefined;
  i918: bigint;
  j918: symbol;
}

type PartialBig918 = DeepPartial<BigRecord918>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten918<T> = T extends Array<infer U> ? Flatten918<U> : T;
type Nested918 = number[][][][][][][][][][];
type Flat918 = Flatten918<Nested918>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly918<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly918<T[K]> : T[K];
};
type DeepRequired918<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired918<T[K]> : T[K];
};
type FR918 = DeepReadonly918<DeepRequired918<PartialBig918>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion918 =
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

type ExtractAlpha918 = Extract<BigUnion918, "alpha" | "bravo" | "charlie">;
type ExcludeZulu918 = Exclude<BigUnion918, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA918 { width: number; height: number; depth: number }
interface ShapeB918 { color: string; opacity: number; blend: string }
interface ShapeC918 { x: number; y: number; z: number; w: number }
interface ShapeD918 { label: string; title: string; summary: string }

type Combined918 = ShapeA918 & ShapeB918 & ShapeC918 & ShapeD918;
type OptionalAll918 = { [K in keyof Combined918]?: Combined918[K] };
type RequiredAll918 = { [K in keyof Combined918]-?: Combined918[K] };
type ReadonlyAll918 = { readonly [K in keyof Combined918]: Combined918[K] };
type NullableAll918 = { [K in keyof Combined918]: Combined918[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString918<T> = T extends string ? true : false;
type IsNumber918<T> = T extends number ? true : false;
type TypeName918<T> = T extends string
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

type TypeNames918 = {
  [K in keyof BigRecord918]: TypeName918<BigRecord918[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb918 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource918 = "user" | "post" | "comment" | "tag" | "category";
type Action918 = `${Verb918}_${Resource918}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise918<T> = T extends Promise<infer U> ? UnwrapPromise918<U> : T;
type UnwrapArray918<T> = T extends (infer U)[] ? UnwrapArray918<U> : T;
type Head918<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail918<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation918<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation918<Exclude<T, K>>]
  : never;

type SmallUnion918 = "a" | "b" | "c" | "d";
type AllPerms918 = Permutation918<SmallUnion918>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig918,
  Flat918,
  FR918,
  BigUnion918,
  ExtractAlpha918,
  ExcludeZulu918,
  OptionalAll918,
  RequiredAll918,
  ReadonlyAll918,
  NullableAll918,
  TypeNames918,
  Action918,
  AllPerms918,
};
