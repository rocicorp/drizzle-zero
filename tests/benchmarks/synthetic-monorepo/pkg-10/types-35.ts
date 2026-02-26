// pkg-10 / types-35  (seed 1035) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord1035 {
  a1035: { x: number; y: string; z: boolean };
  b1035: { p: string[]; q: Record<string, number> };
  c1035: { nested: { deep: { deeper: { deepest: string } } } };
  d1035: number;
  e1035: string;
  f1035: boolean;
  g1035: null;
  h1035: undefined;
  i1035: bigint;
  j1035: symbol;
}

type PartialBig1035 = DeepPartial<BigRecord1035>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten1035<T> = T extends Array<infer U> ? Flatten1035<U> : T;
type Nested1035 = number[][][][][][][][][][];
type Flat1035 = Flatten1035<Nested1035>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly1035<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly1035<T[K]> : T[K];
};
type DeepRequired1035<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired1035<T[K]> : T[K];
};
type FR1035 = DeepReadonly1035<DeepRequired1035<PartialBig1035>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion1035 =
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

type ExtractAlpha1035 = Extract<BigUnion1035, "alpha" | "bravo" | "charlie">;
type ExcludeZulu1035 = Exclude<BigUnion1035, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA1035 { width: number; height: number; depth: number }
interface ShapeB1035 { color: string; opacity: number; blend: string }
interface ShapeC1035 { x: number; y: number; z: number; w: number }
interface ShapeD1035 { label: string; title: string; summary: string }

type Combined1035 = ShapeA1035 & ShapeB1035 & ShapeC1035 & ShapeD1035;
type OptionalAll1035 = { [K in keyof Combined1035]?: Combined1035[K] };
type RequiredAll1035 = { [K in keyof Combined1035]-?: Combined1035[K] };
type ReadonlyAll1035 = { readonly [K in keyof Combined1035]: Combined1035[K] };
type NullableAll1035 = { [K in keyof Combined1035]: Combined1035[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString1035<T> = T extends string ? true : false;
type IsNumber1035<T> = T extends number ? true : false;
type TypeName1035<T> = T extends string
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

type TypeNames1035 = {
  [K in keyof BigRecord1035]: TypeName1035<BigRecord1035[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb1035 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource1035 = "user" | "post" | "comment" | "tag" | "category";
type Action1035 = `${Verb1035}_${Resource1035}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise1035<T> = T extends Promise<infer U> ? UnwrapPromise1035<U> : T;
type UnwrapArray1035<T> = T extends (infer U)[] ? UnwrapArray1035<U> : T;
type Head1035<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail1035<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation1035<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation1035<Exclude<T, K>>]
  : never;

type SmallUnion1035 = "a" | "b" | "c" | "d";
type AllPerms1035 = Permutation1035<SmallUnion1035>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig1035,
  Flat1035,
  FR1035,
  BigUnion1035,
  ExtractAlpha1035,
  ExcludeZulu1035,
  OptionalAll1035,
  RequiredAll1035,
  ReadonlyAll1035,
  NullableAll1035,
  TypeNames1035,
  Action1035,
  AllPerms1035,
};
