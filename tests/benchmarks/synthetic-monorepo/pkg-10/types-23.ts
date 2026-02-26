// pkg-10 / types-23  (seed 1023) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord1023 {
  a1023: { x: number; y: string; z: boolean };
  b1023: { p: string[]; q: Record<string, number> };
  c1023: { nested: { deep: { deeper: { deepest: string } } } };
  d1023: number;
  e1023: string;
  f1023: boolean;
  g1023: null;
  h1023: undefined;
  i1023: bigint;
  j1023: symbol;
}

type PartialBig1023 = DeepPartial<BigRecord1023>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten1023<T> = T extends Array<infer U> ? Flatten1023<U> : T;
type Nested1023 = number[][][][][][][][][][];
type Flat1023 = Flatten1023<Nested1023>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly1023<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly1023<T[K]> : T[K];
};
type DeepRequired1023<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired1023<T[K]> : T[K];
};
type FR1023 = DeepReadonly1023<DeepRequired1023<PartialBig1023>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion1023 =
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

type ExtractAlpha1023 = Extract<BigUnion1023, "alpha" | "bravo" | "charlie">;
type ExcludeZulu1023 = Exclude<BigUnion1023, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA1023 { width: number; height: number; depth: number }
interface ShapeB1023 { color: string; opacity: number; blend: string }
interface ShapeC1023 { x: number; y: number; z: number; w: number }
interface ShapeD1023 { label: string; title: string; summary: string }

type Combined1023 = ShapeA1023 & ShapeB1023 & ShapeC1023 & ShapeD1023;
type OptionalAll1023 = { [K in keyof Combined1023]?: Combined1023[K] };
type RequiredAll1023 = { [K in keyof Combined1023]-?: Combined1023[K] };
type ReadonlyAll1023 = { readonly [K in keyof Combined1023]: Combined1023[K] };
type NullableAll1023 = { [K in keyof Combined1023]: Combined1023[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString1023<T> = T extends string ? true : false;
type IsNumber1023<T> = T extends number ? true : false;
type TypeName1023<T> = T extends string
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

type TypeNames1023 = {
  [K in keyof BigRecord1023]: TypeName1023<BigRecord1023[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb1023 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource1023 = "user" | "post" | "comment" | "tag" | "category";
type Action1023 = `${Verb1023}_${Resource1023}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise1023<T> = T extends Promise<infer U> ? UnwrapPromise1023<U> : T;
type UnwrapArray1023<T> = T extends (infer U)[] ? UnwrapArray1023<U> : T;
type Head1023<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail1023<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation1023<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation1023<Exclude<T, K>>]
  : never;

type SmallUnion1023 = "a" | "b" | "c" | "d";
type AllPerms1023 = Permutation1023<SmallUnion1023>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig1023,
  Flat1023,
  FR1023,
  BigUnion1023,
  ExtractAlpha1023,
  ExcludeZulu1023,
  OptionalAll1023,
  RequiredAll1023,
  ReadonlyAll1023,
  NullableAll1023,
  TypeNames1023,
  Action1023,
  AllPerms1023,
};
