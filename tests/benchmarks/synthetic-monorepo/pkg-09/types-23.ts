// pkg-09 / types-23  (seed 923) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord923 {
  a923: { x: number; y: string; z: boolean };
  b923: { p: string[]; q: Record<string, number> };
  c923: { nested: { deep: { deeper: { deepest: string } } } };
  d923: number;
  e923: string;
  f923: boolean;
  g923: null;
  h923: undefined;
  i923: bigint;
  j923: symbol;
}

type PartialBig923 = DeepPartial<BigRecord923>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten923<T> = T extends Array<infer U> ? Flatten923<U> : T;
type Nested923 = number[][][][][][][][][][];
type Flat923 = Flatten923<Nested923>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly923<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly923<T[K]> : T[K];
};
type DeepRequired923<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired923<T[K]> : T[K];
};
type FR923 = DeepReadonly923<DeepRequired923<PartialBig923>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion923 =
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

type ExtractAlpha923 = Extract<BigUnion923, "alpha" | "bravo" | "charlie">;
type ExcludeZulu923 = Exclude<BigUnion923, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA923 { width: number; height: number; depth: number }
interface ShapeB923 { color: string; opacity: number; blend: string }
interface ShapeC923 { x: number; y: number; z: number; w: number }
interface ShapeD923 { label: string; title: string; summary: string }

type Combined923 = ShapeA923 & ShapeB923 & ShapeC923 & ShapeD923;
type OptionalAll923 = { [K in keyof Combined923]?: Combined923[K] };
type RequiredAll923 = { [K in keyof Combined923]-?: Combined923[K] };
type ReadonlyAll923 = { readonly [K in keyof Combined923]: Combined923[K] };
type NullableAll923 = { [K in keyof Combined923]: Combined923[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString923<T> = T extends string ? true : false;
type IsNumber923<T> = T extends number ? true : false;
type TypeName923<T> = T extends string
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

type TypeNames923 = {
  [K in keyof BigRecord923]: TypeName923<BigRecord923[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb923 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource923 = "user" | "post" | "comment" | "tag" | "category";
type Action923 = `${Verb923}_${Resource923}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise923<T> = T extends Promise<infer U> ? UnwrapPromise923<U> : T;
type UnwrapArray923<T> = T extends (infer U)[] ? UnwrapArray923<U> : T;
type Head923<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail923<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation923<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation923<Exclude<T, K>>]
  : never;

type SmallUnion923 = "a" | "b" | "c" | "d";
type AllPerms923 = Permutation923<SmallUnion923>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig923,
  Flat923,
  FR923,
  BigUnion923,
  ExtractAlpha923,
  ExcludeZulu923,
  OptionalAll923,
  RequiredAll923,
  ReadonlyAll923,
  NullableAll923,
  TypeNames923,
  Action923,
  AllPerms923,
};
