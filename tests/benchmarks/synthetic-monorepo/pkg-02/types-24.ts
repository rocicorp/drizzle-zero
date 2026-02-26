// pkg-02 / types-24  (seed 224) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord224 {
  a224: { x: number; y: string; z: boolean };
  b224: { p: string[]; q: Record<string, number> };
  c224: { nested: { deep: { deeper: { deepest: string } } } };
  d224: number;
  e224: string;
  f224: boolean;
  g224: null;
  h224: undefined;
  i224: bigint;
  j224: symbol;
}

type PartialBig224 = DeepPartial<BigRecord224>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten224<T> = T extends Array<infer U> ? Flatten224<U> : T;
type Nested224 = number[][][][][][][][][][];
type Flat224 = Flatten224<Nested224>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly224<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly224<T[K]> : T[K];
};
type DeepRequired224<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired224<T[K]> : T[K];
};
type FR224 = DeepReadonly224<DeepRequired224<PartialBig224>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion224 =
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

type ExtractAlpha224 = Extract<BigUnion224, "alpha" | "bravo" | "charlie">;
type ExcludeZulu224 = Exclude<BigUnion224, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA224 { width: number; height: number; depth: number }
interface ShapeB224 { color: string; opacity: number; blend: string }
interface ShapeC224 { x: number; y: number; z: number; w: number }
interface ShapeD224 { label: string; title: string; summary: string }

type Combined224 = ShapeA224 & ShapeB224 & ShapeC224 & ShapeD224;
type OptionalAll224 = { [K in keyof Combined224]?: Combined224[K] };
type RequiredAll224 = { [K in keyof Combined224]-?: Combined224[K] };
type ReadonlyAll224 = { readonly [K in keyof Combined224]: Combined224[K] };
type NullableAll224 = { [K in keyof Combined224]: Combined224[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString224<T> = T extends string ? true : false;
type IsNumber224<T> = T extends number ? true : false;
type TypeName224<T> = T extends string
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

type TypeNames224 = {
  [K in keyof BigRecord224]: TypeName224<BigRecord224[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb224 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource224 = "user" | "post" | "comment" | "tag" | "category";
type Action224 = `${Verb224}_${Resource224}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise224<T> = T extends Promise<infer U> ? UnwrapPromise224<U> : T;
type UnwrapArray224<T> = T extends (infer U)[] ? UnwrapArray224<U> : T;
type Head224<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail224<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation224<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation224<Exclude<T, K>>]
  : never;

type SmallUnion224 = "a" | "b" | "c" | "d";
type AllPerms224 = Permutation224<SmallUnion224>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig224,
  Flat224,
  FR224,
  BigUnion224,
  ExtractAlpha224,
  ExcludeZulu224,
  OptionalAll224,
  RequiredAll224,
  ReadonlyAll224,
  NullableAll224,
  TypeNames224,
  Action224,
  AllPerms224,
};
