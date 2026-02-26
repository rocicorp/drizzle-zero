// pkg-10 / types-15  (seed 1015) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord1015 {
  a1015: { x: number; y: string; z: boolean };
  b1015: { p: string[]; q: Record<string, number> };
  c1015: { nested: { deep: { deeper: { deepest: string } } } };
  d1015: number;
  e1015: string;
  f1015: boolean;
  g1015: null;
  h1015: undefined;
  i1015: bigint;
  j1015: symbol;
}

type PartialBig1015 = DeepPartial<BigRecord1015>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten1015<T> = T extends Array<infer U> ? Flatten1015<U> : T;
type Nested1015 = number[][][][][][][][][][];
type Flat1015 = Flatten1015<Nested1015>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly1015<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly1015<T[K]> : T[K];
};
type DeepRequired1015<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired1015<T[K]> : T[K];
};
type FR1015 = DeepReadonly1015<DeepRequired1015<PartialBig1015>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion1015 =
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

type ExtractAlpha1015 = Extract<BigUnion1015, "alpha" | "bravo" | "charlie">;
type ExcludeZulu1015 = Exclude<BigUnion1015, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA1015 { width: number; height: number; depth: number }
interface ShapeB1015 { color: string; opacity: number; blend: string }
interface ShapeC1015 { x: number; y: number; z: number; w: number }
interface ShapeD1015 { label: string; title: string; summary: string }

type Combined1015 = ShapeA1015 & ShapeB1015 & ShapeC1015 & ShapeD1015;
type OptionalAll1015 = { [K in keyof Combined1015]?: Combined1015[K] };
type RequiredAll1015 = { [K in keyof Combined1015]-?: Combined1015[K] };
type ReadonlyAll1015 = { readonly [K in keyof Combined1015]: Combined1015[K] };
type NullableAll1015 = { [K in keyof Combined1015]: Combined1015[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString1015<T> = T extends string ? true : false;
type IsNumber1015<T> = T extends number ? true : false;
type TypeName1015<T> = T extends string
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

type TypeNames1015 = {
  [K in keyof BigRecord1015]: TypeName1015<BigRecord1015[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb1015 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource1015 = "user" | "post" | "comment" | "tag" | "category";
type Action1015 = `${Verb1015}_${Resource1015}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise1015<T> = T extends Promise<infer U> ? UnwrapPromise1015<U> : T;
type UnwrapArray1015<T> = T extends (infer U)[] ? UnwrapArray1015<U> : T;
type Head1015<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail1015<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation1015<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation1015<Exclude<T, K>>]
  : never;

type SmallUnion1015 = "a" | "b" | "c" | "d";
type AllPerms1015 = Permutation1015<SmallUnion1015>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig1015,
  Flat1015,
  FR1015,
  BigUnion1015,
  ExtractAlpha1015,
  ExcludeZulu1015,
  OptionalAll1015,
  RequiredAll1015,
  ReadonlyAll1015,
  NullableAll1015,
  TypeNames1015,
  Action1015,
  AllPerms1015,
};
