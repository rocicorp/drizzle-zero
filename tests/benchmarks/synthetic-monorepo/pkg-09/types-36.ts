// pkg-09 / types-36  (seed 936) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord936 {
  a936: { x: number; y: string; z: boolean };
  b936: { p: string[]; q: Record<string, number> };
  c936: { nested: { deep: { deeper: { deepest: string } } } };
  d936: number;
  e936: string;
  f936: boolean;
  g936: null;
  h936: undefined;
  i936: bigint;
  j936: symbol;
}

type PartialBig936 = DeepPartial<BigRecord936>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten936<T> = T extends Array<infer U> ? Flatten936<U> : T;
type Nested936 = number[][][][][][][][][][];
type Flat936 = Flatten936<Nested936>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly936<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly936<T[K]> : T[K];
};
type DeepRequired936<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired936<T[K]> : T[K];
};
type FR936 = DeepReadonly936<DeepRequired936<PartialBig936>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion936 =
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

type ExtractAlpha936 = Extract<BigUnion936, "alpha" | "bravo" | "charlie">;
type ExcludeZulu936 = Exclude<BigUnion936, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA936 { width: number; height: number; depth: number }
interface ShapeB936 { color: string; opacity: number; blend: string }
interface ShapeC936 { x: number; y: number; z: number; w: number }
interface ShapeD936 { label: string; title: string; summary: string }

type Combined936 = ShapeA936 & ShapeB936 & ShapeC936 & ShapeD936;
type OptionalAll936 = { [K in keyof Combined936]?: Combined936[K] };
type RequiredAll936 = { [K in keyof Combined936]-?: Combined936[K] };
type ReadonlyAll936 = { readonly [K in keyof Combined936]: Combined936[K] };
type NullableAll936 = { [K in keyof Combined936]: Combined936[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString936<T> = T extends string ? true : false;
type IsNumber936<T> = T extends number ? true : false;
type TypeName936<T> = T extends string
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

type TypeNames936 = {
  [K in keyof BigRecord936]: TypeName936<BigRecord936[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb936 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource936 = "user" | "post" | "comment" | "tag" | "category";
type Action936 = `${Verb936}_${Resource936}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise936<T> = T extends Promise<infer U> ? UnwrapPromise936<U> : T;
type UnwrapArray936<T> = T extends (infer U)[] ? UnwrapArray936<U> : T;
type Head936<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail936<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation936<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation936<Exclude<T, K>>]
  : never;

type SmallUnion936 = "a" | "b" | "c" | "d";
type AllPerms936 = Permutation936<SmallUnion936>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig936,
  Flat936,
  FR936,
  BigUnion936,
  ExtractAlpha936,
  ExcludeZulu936,
  OptionalAll936,
  RequiredAll936,
  ReadonlyAll936,
  NullableAll936,
  TypeNames936,
  Action936,
  AllPerms936,
};
