// pkg-10 / types-17  (seed 1017) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord1017 {
  a1017: { x: number; y: string; z: boolean };
  b1017: { p: string[]; q: Record<string, number> };
  c1017: { nested: { deep: { deeper: { deepest: string } } } };
  d1017: number;
  e1017: string;
  f1017: boolean;
  g1017: null;
  h1017: undefined;
  i1017: bigint;
  j1017: symbol;
}

type PartialBig1017 = DeepPartial<BigRecord1017>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten1017<T> = T extends Array<infer U> ? Flatten1017<U> : T;
type Nested1017 = number[][][][][][][][][][];
type Flat1017 = Flatten1017<Nested1017>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly1017<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly1017<T[K]> : T[K];
};
type DeepRequired1017<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired1017<T[K]> : T[K];
};
type FR1017 = DeepReadonly1017<DeepRequired1017<PartialBig1017>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion1017 =
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

type ExtractAlpha1017 = Extract<BigUnion1017, "alpha" | "bravo" | "charlie">;
type ExcludeZulu1017 = Exclude<BigUnion1017, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA1017 { width: number; height: number; depth: number }
interface ShapeB1017 { color: string; opacity: number; blend: string }
interface ShapeC1017 { x: number; y: number; z: number; w: number }
interface ShapeD1017 { label: string; title: string; summary: string }

type Combined1017 = ShapeA1017 & ShapeB1017 & ShapeC1017 & ShapeD1017;
type OptionalAll1017 = { [K in keyof Combined1017]?: Combined1017[K] };
type RequiredAll1017 = { [K in keyof Combined1017]-?: Combined1017[K] };
type ReadonlyAll1017 = { readonly [K in keyof Combined1017]: Combined1017[K] };
type NullableAll1017 = { [K in keyof Combined1017]: Combined1017[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString1017<T> = T extends string ? true : false;
type IsNumber1017<T> = T extends number ? true : false;
type TypeName1017<T> = T extends string
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

type TypeNames1017 = {
  [K in keyof BigRecord1017]: TypeName1017<BigRecord1017[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb1017 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource1017 = "user" | "post" | "comment" | "tag" | "category";
type Action1017 = `${Verb1017}_${Resource1017}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise1017<T> = T extends Promise<infer U> ? UnwrapPromise1017<U> : T;
type UnwrapArray1017<T> = T extends (infer U)[] ? UnwrapArray1017<U> : T;
type Head1017<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail1017<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation1017<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation1017<Exclude<T, K>>]
  : never;

type SmallUnion1017 = "a" | "b" | "c" | "d";
type AllPerms1017 = Permutation1017<SmallUnion1017>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig1017,
  Flat1017,
  FR1017,
  BigUnion1017,
  ExtractAlpha1017,
  ExcludeZulu1017,
  OptionalAll1017,
  RequiredAll1017,
  ReadonlyAll1017,
  NullableAll1017,
  TypeNames1017,
  Action1017,
  AllPerms1017,
};
