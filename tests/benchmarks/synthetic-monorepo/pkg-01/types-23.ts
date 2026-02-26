// pkg-01 / types-23  (seed 123) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord123 {
  a123: { x: number; y: string; z: boolean };
  b123: { p: string[]; q: Record<string, number> };
  c123: { nested: { deep: { deeper: { deepest: string } } } };
  d123: number;
  e123: string;
  f123: boolean;
  g123: null;
  h123: undefined;
  i123: bigint;
  j123: symbol;
}

type PartialBig123 = DeepPartial<BigRecord123>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten123<T> = T extends Array<infer U> ? Flatten123<U> : T;
type Nested123 = number[][][][][][][][][][];
type Flat123 = Flatten123<Nested123>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly123<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly123<T[K]> : T[K];
};
type DeepRequired123<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired123<T[K]> : T[K];
};
type FR123 = DeepReadonly123<DeepRequired123<PartialBig123>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion123 =
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

type ExtractAlpha123 = Extract<BigUnion123, "alpha" | "bravo" | "charlie">;
type ExcludeZulu123 = Exclude<BigUnion123, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA123 { width: number; height: number; depth: number }
interface ShapeB123 { color: string; opacity: number; blend: string }
interface ShapeC123 { x: number; y: number; z: number; w: number }
interface ShapeD123 { label: string; title: string; summary: string }

type Combined123 = ShapeA123 & ShapeB123 & ShapeC123 & ShapeD123;
type OptionalAll123 = { [K in keyof Combined123]?: Combined123[K] };
type RequiredAll123 = { [K in keyof Combined123]-?: Combined123[K] };
type ReadonlyAll123 = { readonly [K in keyof Combined123]: Combined123[K] };
type NullableAll123 = { [K in keyof Combined123]: Combined123[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString123<T> = T extends string ? true : false;
type IsNumber123<T> = T extends number ? true : false;
type TypeName123<T> = T extends string
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

type TypeNames123 = {
  [K in keyof BigRecord123]: TypeName123<BigRecord123[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb123 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource123 = "user" | "post" | "comment" | "tag" | "category";
type Action123 = `${Verb123}_${Resource123}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise123<T> = T extends Promise<infer U> ? UnwrapPromise123<U> : T;
type UnwrapArray123<T> = T extends (infer U)[] ? UnwrapArray123<U> : T;
type Head123<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail123<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation123<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation123<Exclude<T, K>>]
  : never;

type SmallUnion123 = "a" | "b" | "c" | "d";
type AllPerms123 = Permutation123<SmallUnion123>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig123,
  Flat123,
  FR123,
  BigUnion123,
  ExtractAlpha123,
  ExcludeZulu123,
  OptionalAll123,
  RequiredAll123,
  ReadonlyAll123,
  NullableAll123,
  TypeNames123,
  Action123,
  AllPerms123,
};
