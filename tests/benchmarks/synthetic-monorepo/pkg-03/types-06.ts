// pkg-03 / types-06  (seed 306) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord306 {
  a306: { x: number; y: string; z: boolean };
  b306: { p: string[]; q: Record<string, number> };
  c306: { nested: { deep: { deeper: { deepest: string } } } };
  d306: number;
  e306: string;
  f306: boolean;
  g306: null;
  h306: undefined;
  i306: bigint;
  j306: symbol;
}

type PartialBig306 = DeepPartial<BigRecord306>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten306<T> = T extends Array<infer U> ? Flatten306<U> : T;
type Nested306 = number[][][][][][][][][][];
type Flat306 = Flatten306<Nested306>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly306<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly306<T[K]> : T[K];
};
type DeepRequired306<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired306<T[K]> : T[K];
};
type FR306 = DeepReadonly306<DeepRequired306<PartialBig306>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion306 =
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

type ExtractAlpha306 = Extract<BigUnion306, "alpha" | "bravo" | "charlie">;
type ExcludeZulu306 = Exclude<BigUnion306, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA306 { width: number; height: number; depth: number }
interface ShapeB306 { color: string; opacity: number; blend: string }
interface ShapeC306 { x: number; y: number; z: number; w: number }
interface ShapeD306 { label: string; title: string; summary: string }

type Combined306 = ShapeA306 & ShapeB306 & ShapeC306 & ShapeD306;
type OptionalAll306 = { [K in keyof Combined306]?: Combined306[K] };
type RequiredAll306 = { [K in keyof Combined306]-?: Combined306[K] };
type ReadonlyAll306 = { readonly [K in keyof Combined306]: Combined306[K] };
type NullableAll306 = { [K in keyof Combined306]: Combined306[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString306<T> = T extends string ? true : false;
type IsNumber306<T> = T extends number ? true : false;
type TypeName306<T> = T extends string
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

type TypeNames306 = {
  [K in keyof BigRecord306]: TypeName306<BigRecord306[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb306 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource306 = "user" | "post" | "comment" | "tag" | "category";
type Action306 = `${Verb306}_${Resource306}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise306<T> = T extends Promise<infer U> ? UnwrapPromise306<U> : T;
type UnwrapArray306<T> = T extends (infer U)[] ? UnwrapArray306<U> : T;
type Head306<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail306<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation306<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation306<Exclude<T, K>>]
  : never;

type SmallUnion306 = "a" | "b" | "c" | "d";
type AllPerms306 = Permutation306<SmallUnion306>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig306,
  Flat306,
  FR306,
  BigUnion306,
  ExtractAlpha306,
  ExcludeZulu306,
  OptionalAll306,
  RequiredAll306,
  ReadonlyAll306,
  NullableAll306,
  TypeNames306,
  Action306,
  AllPerms306,
};
