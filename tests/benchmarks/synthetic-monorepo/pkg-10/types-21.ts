// pkg-10 / types-21  (seed 1021) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord1021 {
  a1021: { x: number; y: string; z: boolean };
  b1021: { p: string[]; q: Record<string, number> };
  c1021: { nested: { deep: { deeper: { deepest: string } } } };
  d1021: number;
  e1021: string;
  f1021: boolean;
  g1021: null;
  h1021: undefined;
  i1021: bigint;
  j1021: symbol;
}

type PartialBig1021 = DeepPartial<BigRecord1021>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten1021<T> = T extends Array<infer U> ? Flatten1021<U> : T;
type Nested1021 = number[][][][][][][][][][];
type Flat1021 = Flatten1021<Nested1021>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly1021<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly1021<T[K]> : T[K];
};
type DeepRequired1021<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired1021<T[K]> : T[K];
};
type FR1021 = DeepReadonly1021<DeepRequired1021<PartialBig1021>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion1021 =
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

type ExtractAlpha1021 = Extract<BigUnion1021, "alpha" | "bravo" | "charlie">;
type ExcludeZulu1021 = Exclude<BigUnion1021, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA1021 { width: number; height: number; depth: number }
interface ShapeB1021 { color: string; opacity: number; blend: string }
interface ShapeC1021 { x: number; y: number; z: number; w: number }
interface ShapeD1021 { label: string; title: string; summary: string }

type Combined1021 = ShapeA1021 & ShapeB1021 & ShapeC1021 & ShapeD1021;
type OptionalAll1021 = { [K in keyof Combined1021]?: Combined1021[K] };
type RequiredAll1021 = { [K in keyof Combined1021]-?: Combined1021[K] };
type ReadonlyAll1021 = { readonly [K in keyof Combined1021]: Combined1021[K] };
type NullableAll1021 = { [K in keyof Combined1021]: Combined1021[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString1021<T> = T extends string ? true : false;
type IsNumber1021<T> = T extends number ? true : false;
type TypeName1021<T> = T extends string
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

type TypeNames1021 = {
  [K in keyof BigRecord1021]: TypeName1021<BigRecord1021[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb1021 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource1021 = "user" | "post" | "comment" | "tag" | "category";
type Action1021 = `${Verb1021}_${Resource1021}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise1021<T> = T extends Promise<infer U> ? UnwrapPromise1021<U> : T;
type UnwrapArray1021<T> = T extends (infer U)[] ? UnwrapArray1021<U> : T;
type Head1021<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail1021<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation1021<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation1021<Exclude<T, K>>]
  : never;

type SmallUnion1021 = "a" | "b" | "c" | "d";
type AllPerms1021 = Permutation1021<SmallUnion1021>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig1021,
  Flat1021,
  FR1021,
  BigUnion1021,
  ExtractAlpha1021,
  ExcludeZulu1021,
  OptionalAll1021,
  RequiredAll1021,
  ReadonlyAll1021,
  NullableAll1021,
  TypeNames1021,
  Action1021,
  AllPerms1021,
};
