// pkg-04 / types-24  (seed 424) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord424 {
  a424: { x: number; y: string; z: boolean };
  b424: { p: string[]; q: Record<string, number> };
  c424: { nested: { deep: { deeper: { deepest: string } } } };
  d424: number;
  e424: string;
  f424: boolean;
  g424: null;
  h424: undefined;
  i424: bigint;
  j424: symbol;
}

type PartialBig424 = DeepPartial<BigRecord424>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten424<T> = T extends Array<infer U> ? Flatten424<U> : T;
type Nested424 = number[][][][][][][][][][];
type Flat424 = Flatten424<Nested424>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly424<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly424<T[K]> : T[K];
};
type DeepRequired424<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired424<T[K]> : T[K];
};
type FR424 = DeepReadonly424<DeepRequired424<PartialBig424>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion424 =
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

type ExtractAlpha424 = Extract<BigUnion424, "alpha" | "bravo" | "charlie">;
type ExcludeZulu424 = Exclude<BigUnion424, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA424 { width: number; height: number; depth: number }
interface ShapeB424 { color: string; opacity: number; blend: string }
interface ShapeC424 { x: number; y: number; z: number; w: number }
interface ShapeD424 { label: string; title: string; summary: string }

type Combined424 = ShapeA424 & ShapeB424 & ShapeC424 & ShapeD424;
type OptionalAll424 = { [K in keyof Combined424]?: Combined424[K] };
type RequiredAll424 = { [K in keyof Combined424]-?: Combined424[K] };
type ReadonlyAll424 = { readonly [K in keyof Combined424]: Combined424[K] };
type NullableAll424 = { [K in keyof Combined424]: Combined424[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString424<T> = T extends string ? true : false;
type IsNumber424<T> = T extends number ? true : false;
type TypeName424<T> = T extends string
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

type TypeNames424 = {
  [K in keyof BigRecord424]: TypeName424<BigRecord424[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb424 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource424 = "user" | "post" | "comment" | "tag" | "category";
type Action424 = `${Verb424}_${Resource424}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise424<T> = T extends Promise<infer U> ? UnwrapPromise424<U> : T;
type UnwrapArray424<T> = T extends (infer U)[] ? UnwrapArray424<U> : T;
type Head424<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail424<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation424<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation424<Exclude<T, K>>]
  : never;

type SmallUnion424 = "a" | "b" | "c" | "d";
type AllPerms424 = Permutation424<SmallUnion424>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig424,
  Flat424,
  FR424,
  BigUnion424,
  ExtractAlpha424,
  ExcludeZulu424,
  OptionalAll424,
  RequiredAll424,
  ReadonlyAll424,
  NullableAll424,
  TypeNames424,
  Action424,
  AllPerms424,
};
