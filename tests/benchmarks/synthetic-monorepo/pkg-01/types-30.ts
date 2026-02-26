// pkg-01 / types-30  (seed 130) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord130 {
  a130: { x: number; y: string; z: boolean };
  b130: { p: string[]; q: Record<string, number> };
  c130: { nested: { deep: { deeper: { deepest: string } } } };
  d130: number;
  e130: string;
  f130: boolean;
  g130: null;
  h130: undefined;
  i130: bigint;
  j130: symbol;
}

type PartialBig130 = DeepPartial<BigRecord130>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten130<T> = T extends Array<infer U> ? Flatten130<U> : T;
type Nested130 = number[][][][][][][][][][];
type Flat130 = Flatten130<Nested130>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly130<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly130<T[K]> : T[K];
};
type DeepRequired130<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired130<T[K]> : T[K];
};
type FR130 = DeepReadonly130<DeepRequired130<PartialBig130>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion130 =
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

type ExtractAlpha130 = Extract<BigUnion130, "alpha" | "bravo" | "charlie">;
type ExcludeZulu130 = Exclude<BigUnion130, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA130 { width: number; height: number; depth: number }
interface ShapeB130 { color: string; opacity: number; blend: string }
interface ShapeC130 { x: number; y: number; z: number; w: number }
interface ShapeD130 { label: string; title: string; summary: string }

type Combined130 = ShapeA130 & ShapeB130 & ShapeC130 & ShapeD130;
type OptionalAll130 = { [K in keyof Combined130]?: Combined130[K] };
type RequiredAll130 = { [K in keyof Combined130]-?: Combined130[K] };
type ReadonlyAll130 = { readonly [K in keyof Combined130]: Combined130[K] };
type NullableAll130 = { [K in keyof Combined130]: Combined130[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString130<T> = T extends string ? true : false;
type IsNumber130<T> = T extends number ? true : false;
type TypeName130<T> = T extends string
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

type TypeNames130 = {
  [K in keyof BigRecord130]: TypeName130<BigRecord130[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb130 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource130 = "user" | "post" | "comment" | "tag" | "category";
type Action130 = `${Verb130}_${Resource130}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise130<T> = T extends Promise<infer U> ? UnwrapPromise130<U> : T;
type UnwrapArray130<T> = T extends (infer U)[] ? UnwrapArray130<U> : T;
type Head130<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail130<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation130<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation130<Exclude<T, K>>]
  : never;

type SmallUnion130 = "a" | "b" | "c" | "d";
type AllPerms130 = Permutation130<SmallUnion130>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig130,
  Flat130,
  FR130,
  BigUnion130,
  ExtractAlpha130,
  ExcludeZulu130,
  OptionalAll130,
  RequiredAll130,
  ReadonlyAll130,
  NullableAll130,
  TypeNames130,
  Action130,
  AllPerms130,
};
