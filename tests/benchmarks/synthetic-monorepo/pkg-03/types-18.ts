// pkg-03 / types-18  (seed 318) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord318 {
  a318: { x: number; y: string; z: boolean };
  b318: { p: string[]; q: Record<string, number> };
  c318: { nested: { deep: { deeper: { deepest: string } } } };
  d318: number;
  e318: string;
  f318: boolean;
  g318: null;
  h318: undefined;
  i318: bigint;
  j318: symbol;
}

type PartialBig318 = DeepPartial<BigRecord318>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten318<T> = T extends Array<infer U> ? Flatten318<U> : T;
type Nested318 = number[][][][][][][][][][];
type Flat318 = Flatten318<Nested318>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly318<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly318<T[K]> : T[K];
};
type DeepRequired318<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired318<T[K]> : T[K];
};
type FR318 = DeepReadonly318<DeepRequired318<PartialBig318>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion318 =
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

type ExtractAlpha318 = Extract<BigUnion318, "alpha" | "bravo" | "charlie">;
type ExcludeZulu318 = Exclude<BigUnion318, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA318 { width: number; height: number; depth: number }
interface ShapeB318 { color: string; opacity: number; blend: string }
interface ShapeC318 { x: number; y: number; z: number; w: number }
interface ShapeD318 { label: string; title: string; summary: string }

type Combined318 = ShapeA318 & ShapeB318 & ShapeC318 & ShapeD318;
type OptionalAll318 = { [K in keyof Combined318]?: Combined318[K] };
type RequiredAll318 = { [K in keyof Combined318]-?: Combined318[K] };
type ReadonlyAll318 = { readonly [K in keyof Combined318]: Combined318[K] };
type NullableAll318 = { [K in keyof Combined318]: Combined318[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString318<T> = T extends string ? true : false;
type IsNumber318<T> = T extends number ? true : false;
type TypeName318<T> = T extends string
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

type TypeNames318 = {
  [K in keyof BigRecord318]: TypeName318<BigRecord318[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb318 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource318 = "user" | "post" | "comment" | "tag" | "category";
type Action318 = `${Verb318}_${Resource318}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise318<T> = T extends Promise<infer U> ? UnwrapPromise318<U> : T;
type UnwrapArray318<T> = T extends (infer U)[] ? UnwrapArray318<U> : T;
type Head318<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail318<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation318<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation318<Exclude<T, K>>]
  : never;

type SmallUnion318 = "a" | "b" | "c" | "d";
type AllPerms318 = Permutation318<SmallUnion318>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig318,
  Flat318,
  FR318,
  BigUnion318,
  ExtractAlpha318,
  ExcludeZulu318,
  OptionalAll318,
  RequiredAll318,
  ReadonlyAll318,
  NullableAll318,
  TypeNames318,
  Action318,
  AllPerms318,
};
