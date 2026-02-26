// pkg-07 / types-23  (seed 723) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord723 {
  a723: { x: number; y: string; z: boolean };
  b723: { p: string[]; q: Record<string, number> };
  c723: { nested: { deep: { deeper: { deepest: string } } } };
  d723: number;
  e723: string;
  f723: boolean;
  g723: null;
  h723: undefined;
  i723: bigint;
  j723: symbol;
}

type PartialBig723 = DeepPartial<BigRecord723>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten723<T> = T extends Array<infer U> ? Flatten723<U> : T;
type Nested723 = number[][][][][][][][][][];
type Flat723 = Flatten723<Nested723>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly723<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly723<T[K]> : T[K];
};
type DeepRequired723<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired723<T[K]> : T[K];
};
type FR723 = DeepReadonly723<DeepRequired723<PartialBig723>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion723 =
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

type ExtractAlpha723 = Extract<BigUnion723, "alpha" | "bravo" | "charlie">;
type ExcludeZulu723 = Exclude<BigUnion723, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA723 { width: number; height: number; depth: number }
interface ShapeB723 { color: string; opacity: number; blend: string }
interface ShapeC723 { x: number; y: number; z: number; w: number }
interface ShapeD723 { label: string; title: string; summary: string }

type Combined723 = ShapeA723 & ShapeB723 & ShapeC723 & ShapeD723;
type OptionalAll723 = { [K in keyof Combined723]?: Combined723[K] };
type RequiredAll723 = { [K in keyof Combined723]-?: Combined723[K] };
type ReadonlyAll723 = { readonly [K in keyof Combined723]: Combined723[K] };
type NullableAll723 = { [K in keyof Combined723]: Combined723[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString723<T> = T extends string ? true : false;
type IsNumber723<T> = T extends number ? true : false;
type TypeName723<T> = T extends string
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

type TypeNames723 = {
  [K in keyof BigRecord723]: TypeName723<BigRecord723[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb723 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource723 = "user" | "post" | "comment" | "tag" | "category";
type Action723 = `${Verb723}_${Resource723}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise723<T> = T extends Promise<infer U> ? UnwrapPromise723<U> : T;
type UnwrapArray723<T> = T extends (infer U)[] ? UnwrapArray723<U> : T;
type Head723<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail723<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation723<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation723<Exclude<T, K>>]
  : never;

type SmallUnion723 = "a" | "b" | "c" | "d";
type AllPerms723 = Permutation723<SmallUnion723>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig723,
  Flat723,
  FR723,
  BigUnion723,
  ExtractAlpha723,
  ExcludeZulu723,
  OptionalAll723,
  RequiredAll723,
  ReadonlyAll723,
  NullableAll723,
  TypeNames723,
  Action723,
  AllPerms723,
};
