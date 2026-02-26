// pkg-01 / types-33  (seed 133) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord133 {
  a133: { x: number; y: string; z: boolean };
  b133: { p: string[]; q: Record<string, number> };
  c133: { nested: { deep: { deeper: { deepest: string } } } };
  d133: number;
  e133: string;
  f133: boolean;
  g133: null;
  h133: undefined;
  i133: bigint;
  j133: symbol;
}

type PartialBig133 = DeepPartial<BigRecord133>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten133<T> = T extends Array<infer U> ? Flatten133<U> : T;
type Nested133 = number[][][][][][][][][][];
type Flat133 = Flatten133<Nested133>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly133<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly133<T[K]> : T[K];
};
type DeepRequired133<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired133<T[K]> : T[K];
};
type FR133 = DeepReadonly133<DeepRequired133<PartialBig133>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion133 =
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

type ExtractAlpha133 = Extract<BigUnion133, "alpha" | "bravo" | "charlie">;
type ExcludeZulu133 = Exclude<BigUnion133, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA133 { width: number; height: number; depth: number }
interface ShapeB133 { color: string; opacity: number; blend: string }
interface ShapeC133 { x: number; y: number; z: number; w: number }
interface ShapeD133 { label: string; title: string; summary: string }

type Combined133 = ShapeA133 & ShapeB133 & ShapeC133 & ShapeD133;
type OptionalAll133 = { [K in keyof Combined133]?: Combined133[K] };
type RequiredAll133 = { [K in keyof Combined133]-?: Combined133[K] };
type ReadonlyAll133 = { readonly [K in keyof Combined133]: Combined133[K] };
type NullableAll133 = { [K in keyof Combined133]: Combined133[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString133<T> = T extends string ? true : false;
type IsNumber133<T> = T extends number ? true : false;
type TypeName133<T> = T extends string
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

type TypeNames133 = {
  [K in keyof BigRecord133]: TypeName133<BigRecord133[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb133 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource133 = "user" | "post" | "comment" | "tag" | "category";
type Action133 = `${Verb133}_${Resource133}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise133<T> = T extends Promise<infer U> ? UnwrapPromise133<U> : T;
type UnwrapArray133<T> = T extends (infer U)[] ? UnwrapArray133<U> : T;
type Head133<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail133<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation133<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation133<Exclude<T, K>>]
  : never;

type SmallUnion133 = "a" | "b" | "c" | "d";
type AllPerms133 = Permutation133<SmallUnion133>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig133,
  Flat133,
  FR133,
  BigUnion133,
  ExtractAlpha133,
  ExcludeZulu133,
  OptionalAll133,
  RequiredAll133,
  ReadonlyAll133,
  NullableAll133,
  TypeNames133,
  Action133,
  AllPerms133,
};
