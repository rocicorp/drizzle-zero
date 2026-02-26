// pkg-09 / types-30  (seed 930) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord930 {
  a930: { x: number; y: string; z: boolean };
  b930: { p: string[]; q: Record<string, number> };
  c930: { nested: { deep: { deeper: { deepest: string } } } };
  d930: number;
  e930: string;
  f930: boolean;
  g930: null;
  h930: undefined;
  i930: bigint;
  j930: symbol;
}

type PartialBig930 = DeepPartial<BigRecord930>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten930<T> = T extends Array<infer U> ? Flatten930<U> : T;
type Nested930 = number[][][][][][][][][][];
type Flat930 = Flatten930<Nested930>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly930<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly930<T[K]> : T[K];
};
type DeepRequired930<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired930<T[K]> : T[K];
};
type FR930 = DeepReadonly930<DeepRequired930<PartialBig930>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion930 =
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

type ExtractAlpha930 = Extract<BigUnion930, "alpha" | "bravo" | "charlie">;
type ExcludeZulu930 = Exclude<BigUnion930, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA930 { width: number; height: number; depth: number }
interface ShapeB930 { color: string; opacity: number; blend: string }
interface ShapeC930 { x: number; y: number; z: number; w: number }
interface ShapeD930 { label: string; title: string; summary: string }

type Combined930 = ShapeA930 & ShapeB930 & ShapeC930 & ShapeD930;
type OptionalAll930 = { [K in keyof Combined930]?: Combined930[K] };
type RequiredAll930 = { [K in keyof Combined930]-?: Combined930[K] };
type ReadonlyAll930 = { readonly [K in keyof Combined930]: Combined930[K] };
type NullableAll930 = { [K in keyof Combined930]: Combined930[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString930<T> = T extends string ? true : false;
type IsNumber930<T> = T extends number ? true : false;
type TypeName930<T> = T extends string
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

type TypeNames930 = {
  [K in keyof BigRecord930]: TypeName930<BigRecord930[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb930 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource930 = "user" | "post" | "comment" | "tag" | "category";
type Action930 = `${Verb930}_${Resource930}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise930<T> = T extends Promise<infer U> ? UnwrapPromise930<U> : T;
type UnwrapArray930<T> = T extends (infer U)[] ? UnwrapArray930<U> : T;
type Head930<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail930<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation930<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation930<Exclude<T, K>>]
  : never;

type SmallUnion930 = "a" | "b" | "c" | "d";
type AllPerms930 = Permutation930<SmallUnion930>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig930,
  Flat930,
  FR930,
  BigUnion930,
  ExtractAlpha930,
  ExcludeZulu930,
  OptionalAll930,
  RequiredAll930,
  ReadonlyAll930,
  NullableAll930,
  TypeNames930,
  Action930,
  AllPerms930,
};
