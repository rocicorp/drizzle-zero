// pkg-06 / types-30  (seed 630) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord630 {
  a630: { x: number; y: string; z: boolean };
  b630: { p: string[]; q: Record<string, number> };
  c630: { nested: { deep: { deeper: { deepest: string } } } };
  d630: number;
  e630: string;
  f630: boolean;
  g630: null;
  h630: undefined;
  i630: bigint;
  j630: symbol;
}

type PartialBig630 = DeepPartial<BigRecord630>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten630<T> = T extends Array<infer U> ? Flatten630<U> : T;
type Nested630 = number[][][][][][][][][][];
type Flat630 = Flatten630<Nested630>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly630<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly630<T[K]> : T[K];
};
type DeepRequired630<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired630<T[K]> : T[K];
};
type FR630 = DeepReadonly630<DeepRequired630<PartialBig630>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion630 =
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

type ExtractAlpha630 = Extract<BigUnion630, "alpha" | "bravo" | "charlie">;
type ExcludeZulu630 = Exclude<BigUnion630, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA630 { width: number; height: number; depth: number }
interface ShapeB630 { color: string; opacity: number; blend: string }
interface ShapeC630 { x: number; y: number; z: number; w: number }
interface ShapeD630 { label: string; title: string; summary: string }

type Combined630 = ShapeA630 & ShapeB630 & ShapeC630 & ShapeD630;
type OptionalAll630 = { [K in keyof Combined630]?: Combined630[K] };
type RequiredAll630 = { [K in keyof Combined630]-?: Combined630[K] };
type ReadonlyAll630 = { readonly [K in keyof Combined630]: Combined630[K] };
type NullableAll630 = { [K in keyof Combined630]: Combined630[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString630<T> = T extends string ? true : false;
type IsNumber630<T> = T extends number ? true : false;
type TypeName630<T> = T extends string
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

type TypeNames630 = {
  [K in keyof BigRecord630]: TypeName630<BigRecord630[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb630 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource630 = "user" | "post" | "comment" | "tag" | "category";
type Action630 = `${Verb630}_${Resource630}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise630<T> = T extends Promise<infer U> ? UnwrapPromise630<U> : T;
type UnwrapArray630<T> = T extends (infer U)[] ? UnwrapArray630<U> : T;
type Head630<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail630<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation630<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation630<Exclude<T, K>>]
  : never;

type SmallUnion630 = "a" | "b" | "c" | "d";
type AllPerms630 = Permutation630<SmallUnion630>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig630,
  Flat630,
  FR630,
  BigUnion630,
  ExtractAlpha630,
  ExcludeZulu630,
  OptionalAll630,
  RequiredAll630,
  ReadonlyAll630,
  NullableAll630,
  TypeNames630,
  Action630,
  AllPerms630,
};
