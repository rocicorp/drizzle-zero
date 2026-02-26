// pkg-07 / types-40  (seed 740) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord740 {
  a740: { x: number; y: string; z: boolean };
  b740: { p: string[]; q: Record<string, number> };
  c740: { nested: { deep: { deeper: { deepest: string } } } };
  d740: number;
  e740: string;
  f740: boolean;
  g740: null;
  h740: undefined;
  i740: bigint;
  j740: symbol;
}

type PartialBig740 = DeepPartial<BigRecord740>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten740<T> = T extends Array<infer U> ? Flatten740<U> : T;
type Nested740 = number[][][][][][][][][][];
type Flat740 = Flatten740<Nested740>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly740<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly740<T[K]> : T[K];
};
type DeepRequired740<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired740<T[K]> : T[K];
};
type FR740 = DeepReadonly740<DeepRequired740<PartialBig740>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion740 =
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

type ExtractAlpha740 = Extract<BigUnion740, "alpha" | "bravo" | "charlie">;
type ExcludeZulu740 = Exclude<BigUnion740, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA740 { width: number; height: number; depth: number }
interface ShapeB740 { color: string; opacity: number; blend: string }
interface ShapeC740 { x: number; y: number; z: number; w: number }
interface ShapeD740 { label: string; title: string; summary: string }

type Combined740 = ShapeA740 & ShapeB740 & ShapeC740 & ShapeD740;
type OptionalAll740 = { [K in keyof Combined740]?: Combined740[K] };
type RequiredAll740 = { [K in keyof Combined740]-?: Combined740[K] };
type ReadonlyAll740 = { readonly [K in keyof Combined740]: Combined740[K] };
type NullableAll740 = { [K in keyof Combined740]: Combined740[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString740<T> = T extends string ? true : false;
type IsNumber740<T> = T extends number ? true : false;
type TypeName740<T> = T extends string
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

type TypeNames740 = {
  [K in keyof BigRecord740]: TypeName740<BigRecord740[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb740 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource740 = "user" | "post" | "comment" | "tag" | "category";
type Action740 = `${Verb740}_${Resource740}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise740<T> = T extends Promise<infer U> ? UnwrapPromise740<U> : T;
type UnwrapArray740<T> = T extends (infer U)[] ? UnwrapArray740<U> : T;
type Head740<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail740<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation740<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation740<Exclude<T, K>>]
  : never;

type SmallUnion740 = "a" | "b" | "c" | "d";
type AllPerms740 = Permutation740<SmallUnion740>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig740,
  Flat740,
  FR740,
  BigUnion740,
  ExtractAlpha740,
  ExcludeZulu740,
  OptionalAll740,
  RequiredAll740,
  ReadonlyAll740,
  NullableAll740,
  TypeNames740,
  Action740,
  AllPerms740,
};
