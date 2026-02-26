// pkg-10 / types-37  (seed 1037) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord1037 {
  a1037: { x: number; y: string; z: boolean };
  b1037: { p: string[]; q: Record<string, number> };
  c1037: { nested: { deep: { deeper: { deepest: string } } } };
  d1037: number;
  e1037: string;
  f1037: boolean;
  g1037: null;
  h1037: undefined;
  i1037: bigint;
  j1037: symbol;
}

type PartialBig1037 = DeepPartial<BigRecord1037>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten1037<T> = T extends Array<infer U> ? Flatten1037<U> : T;
type Nested1037 = number[][][][][][][][][][];
type Flat1037 = Flatten1037<Nested1037>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly1037<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly1037<T[K]> : T[K];
};
type DeepRequired1037<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired1037<T[K]> : T[K];
};
type FR1037 = DeepReadonly1037<DeepRequired1037<PartialBig1037>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion1037 =
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

type ExtractAlpha1037 = Extract<BigUnion1037, "alpha" | "bravo" | "charlie">;
type ExcludeZulu1037 = Exclude<BigUnion1037, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA1037 { width: number; height: number; depth: number }
interface ShapeB1037 { color: string; opacity: number; blend: string }
interface ShapeC1037 { x: number; y: number; z: number; w: number }
interface ShapeD1037 { label: string; title: string; summary: string }

type Combined1037 = ShapeA1037 & ShapeB1037 & ShapeC1037 & ShapeD1037;
type OptionalAll1037 = { [K in keyof Combined1037]?: Combined1037[K] };
type RequiredAll1037 = { [K in keyof Combined1037]-?: Combined1037[K] };
type ReadonlyAll1037 = { readonly [K in keyof Combined1037]: Combined1037[K] };
type NullableAll1037 = { [K in keyof Combined1037]: Combined1037[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString1037<T> = T extends string ? true : false;
type IsNumber1037<T> = T extends number ? true : false;
type TypeName1037<T> = T extends string
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

type TypeNames1037 = {
  [K in keyof BigRecord1037]: TypeName1037<BigRecord1037[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb1037 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource1037 = "user" | "post" | "comment" | "tag" | "category";
type Action1037 = `${Verb1037}_${Resource1037}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise1037<T> = T extends Promise<infer U> ? UnwrapPromise1037<U> : T;
type UnwrapArray1037<T> = T extends (infer U)[] ? UnwrapArray1037<U> : T;
type Head1037<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail1037<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation1037<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation1037<Exclude<T, K>>]
  : never;

type SmallUnion1037 = "a" | "b" | "c" | "d";
type AllPerms1037 = Permutation1037<SmallUnion1037>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig1037,
  Flat1037,
  FR1037,
  BigUnion1037,
  ExtractAlpha1037,
  ExcludeZulu1037,
  OptionalAll1037,
  RequiredAll1037,
  ReadonlyAll1037,
  NullableAll1037,
  TypeNames1037,
  Action1037,
  AllPerms1037,
};
