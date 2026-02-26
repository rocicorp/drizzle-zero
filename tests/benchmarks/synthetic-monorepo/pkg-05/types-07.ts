// pkg-05 / types-07  (seed 507) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord507 {
  a507: { x: number; y: string; z: boolean };
  b507: { p: string[]; q: Record<string, number> };
  c507: { nested: { deep: { deeper: { deepest: string } } } };
  d507: number;
  e507: string;
  f507: boolean;
  g507: null;
  h507: undefined;
  i507: bigint;
  j507: symbol;
}

type PartialBig507 = DeepPartial<BigRecord507>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten507<T> = T extends Array<infer U> ? Flatten507<U> : T;
type Nested507 = number[][][][][][][][][][];
type Flat507 = Flatten507<Nested507>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly507<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly507<T[K]> : T[K];
};
type DeepRequired507<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired507<T[K]> : T[K];
};
type FR507 = DeepReadonly507<DeepRequired507<PartialBig507>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion507 =
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

type ExtractAlpha507 = Extract<BigUnion507, "alpha" | "bravo" | "charlie">;
type ExcludeZulu507 = Exclude<BigUnion507, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA507 { width: number; height: number; depth: number }
interface ShapeB507 { color: string; opacity: number; blend: string }
interface ShapeC507 { x: number; y: number; z: number; w: number }
interface ShapeD507 { label: string; title: string; summary: string }

type Combined507 = ShapeA507 & ShapeB507 & ShapeC507 & ShapeD507;
type OptionalAll507 = { [K in keyof Combined507]?: Combined507[K] };
type RequiredAll507 = { [K in keyof Combined507]-?: Combined507[K] };
type ReadonlyAll507 = { readonly [K in keyof Combined507]: Combined507[K] };
type NullableAll507 = { [K in keyof Combined507]: Combined507[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString507<T> = T extends string ? true : false;
type IsNumber507<T> = T extends number ? true : false;
type TypeName507<T> = T extends string
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

type TypeNames507 = {
  [K in keyof BigRecord507]: TypeName507<BigRecord507[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb507 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource507 = "user" | "post" | "comment" | "tag" | "category";
type Action507 = `${Verb507}_${Resource507}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise507<T> = T extends Promise<infer U> ? UnwrapPromise507<U> : T;
type UnwrapArray507<T> = T extends (infer U)[] ? UnwrapArray507<U> : T;
type Head507<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail507<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation507<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation507<Exclude<T, K>>]
  : never;

type SmallUnion507 = "a" | "b" | "c" | "d";
type AllPerms507 = Permutation507<SmallUnion507>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig507,
  Flat507,
  FR507,
  BigUnion507,
  ExtractAlpha507,
  ExcludeZulu507,
  OptionalAll507,
  RequiredAll507,
  ReadonlyAll507,
  NullableAll507,
  TypeNames507,
  Action507,
  AllPerms507,
};
