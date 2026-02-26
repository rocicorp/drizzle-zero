// pkg-06 / types-38  (seed 638) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord638 {
  a638: { x: number; y: string; z: boolean };
  b638: { p: string[]; q: Record<string, number> };
  c638: { nested: { deep: { deeper: { deepest: string } } } };
  d638: number;
  e638: string;
  f638: boolean;
  g638: null;
  h638: undefined;
  i638: bigint;
  j638: symbol;
}

type PartialBig638 = DeepPartial<BigRecord638>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten638<T> = T extends Array<infer U> ? Flatten638<U> : T;
type Nested638 = number[][][][][][][][][][];
type Flat638 = Flatten638<Nested638>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly638<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly638<T[K]> : T[K];
};
type DeepRequired638<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired638<T[K]> : T[K];
};
type FR638 = DeepReadonly638<DeepRequired638<PartialBig638>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion638 =
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

type ExtractAlpha638 = Extract<BigUnion638, "alpha" | "bravo" | "charlie">;
type ExcludeZulu638 = Exclude<BigUnion638, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA638 { width: number; height: number; depth: number }
interface ShapeB638 { color: string; opacity: number; blend: string }
interface ShapeC638 { x: number; y: number; z: number; w: number }
interface ShapeD638 { label: string; title: string; summary: string }

type Combined638 = ShapeA638 & ShapeB638 & ShapeC638 & ShapeD638;
type OptionalAll638 = { [K in keyof Combined638]?: Combined638[K] };
type RequiredAll638 = { [K in keyof Combined638]-?: Combined638[K] };
type ReadonlyAll638 = { readonly [K in keyof Combined638]: Combined638[K] };
type NullableAll638 = { [K in keyof Combined638]: Combined638[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString638<T> = T extends string ? true : false;
type IsNumber638<T> = T extends number ? true : false;
type TypeName638<T> = T extends string
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

type TypeNames638 = {
  [K in keyof BigRecord638]: TypeName638<BigRecord638[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb638 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource638 = "user" | "post" | "comment" | "tag" | "category";
type Action638 = `${Verb638}_${Resource638}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise638<T> = T extends Promise<infer U> ? UnwrapPromise638<U> : T;
type UnwrapArray638<T> = T extends (infer U)[] ? UnwrapArray638<U> : T;
type Head638<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail638<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation638<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation638<Exclude<T, K>>]
  : never;

type SmallUnion638 = "a" | "b" | "c" | "d";
type AllPerms638 = Permutation638<SmallUnion638>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig638,
  Flat638,
  FR638,
  BigUnion638,
  ExtractAlpha638,
  ExcludeZulu638,
  OptionalAll638,
  RequiredAll638,
  ReadonlyAll638,
  NullableAll638,
  TypeNames638,
  Action638,
  AllPerms638,
};
