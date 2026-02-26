// pkg-04 / types-07  (seed 407) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord407 {
  a407: { x: number; y: string; z: boolean };
  b407: { p: string[]; q: Record<string, number> };
  c407: { nested: { deep: { deeper: { deepest: string } } } };
  d407: number;
  e407: string;
  f407: boolean;
  g407: null;
  h407: undefined;
  i407: bigint;
  j407: symbol;
}

type PartialBig407 = DeepPartial<BigRecord407>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten407<T> = T extends Array<infer U> ? Flatten407<U> : T;
type Nested407 = number[][][][][][][][][][];
type Flat407 = Flatten407<Nested407>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly407<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly407<T[K]> : T[K];
};
type DeepRequired407<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired407<T[K]> : T[K];
};
type FR407 = DeepReadonly407<DeepRequired407<PartialBig407>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion407 =
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

type ExtractAlpha407 = Extract<BigUnion407, "alpha" | "bravo" | "charlie">;
type ExcludeZulu407 = Exclude<BigUnion407, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA407 { width: number; height: number; depth: number }
interface ShapeB407 { color: string; opacity: number; blend: string }
interface ShapeC407 { x: number; y: number; z: number; w: number }
interface ShapeD407 { label: string; title: string; summary: string }

type Combined407 = ShapeA407 & ShapeB407 & ShapeC407 & ShapeD407;
type OptionalAll407 = { [K in keyof Combined407]?: Combined407[K] };
type RequiredAll407 = { [K in keyof Combined407]-?: Combined407[K] };
type ReadonlyAll407 = { readonly [K in keyof Combined407]: Combined407[K] };
type NullableAll407 = { [K in keyof Combined407]: Combined407[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString407<T> = T extends string ? true : false;
type IsNumber407<T> = T extends number ? true : false;
type TypeName407<T> = T extends string
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

type TypeNames407 = {
  [K in keyof BigRecord407]: TypeName407<BigRecord407[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb407 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource407 = "user" | "post" | "comment" | "tag" | "category";
type Action407 = `${Verb407}_${Resource407}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise407<T> = T extends Promise<infer U> ? UnwrapPromise407<U> : T;
type UnwrapArray407<T> = T extends (infer U)[] ? UnwrapArray407<U> : T;
type Head407<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail407<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation407<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation407<Exclude<T, K>>]
  : never;

type SmallUnion407 = "a" | "b" | "c" | "d";
type AllPerms407 = Permutation407<SmallUnion407>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig407,
  Flat407,
  FR407,
  BigUnion407,
  ExtractAlpha407,
  ExcludeZulu407,
  OptionalAll407,
  RequiredAll407,
  ReadonlyAll407,
  NullableAll407,
  TypeNames407,
  Action407,
  AllPerms407,
};
