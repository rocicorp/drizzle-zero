// pkg-05 / types-24  (seed 524) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord524 {
  a524: { x: number; y: string; z: boolean };
  b524: { p: string[]; q: Record<string, number> };
  c524: { nested: { deep: { deeper: { deepest: string } } } };
  d524: number;
  e524: string;
  f524: boolean;
  g524: null;
  h524: undefined;
  i524: bigint;
  j524: symbol;
}

type PartialBig524 = DeepPartial<BigRecord524>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten524<T> = T extends Array<infer U> ? Flatten524<U> : T;
type Nested524 = number[][][][][][][][][][];
type Flat524 = Flatten524<Nested524>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly524<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly524<T[K]> : T[K];
};
type DeepRequired524<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired524<T[K]> : T[K];
};
type FR524 = DeepReadonly524<DeepRequired524<PartialBig524>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion524 =
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

type ExtractAlpha524 = Extract<BigUnion524, "alpha" | "bravo" | "charlie">;
type ExcludeZulu524 = Exclude<BigUnion524, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA524 { width: number; height: number; depth: number }
interface ShapeB524 { color: string; opacity: number; blend: string }
interface ShapeC524 { x: number; y: number; z: number; w: number }
interface ShapeD524 { label: string; title: string; summary: string }

type Combined524 = ShapeA524 & ShapeB524 & ShapeC524 & ShapeD524;
type OptionalAll524 = { [K in keyof Combined524]?: Combined524[K] };
type RequiredAll524 = { [K in keyof Combined524]-?: Combined524[K] };
type ReadonlyAll524 = { readonly [K in keyof Combined524]: Combined524[K] };
type NullableAll524 = { [K in keyof Combined524]: Combined524[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString524<T> = T extends string ? true : false;
type IsNumber524<T> = T extends number ? true : false;
type TypeName524<T> = T extends string
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

type TypeNames524 = {
  [K in keyof BigRecord524]: TypeName524<BigRecord524[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb524 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource524 = "user" | "post" | "comment" | "tag" | "category";
type Action524 = `${Verb524}_${Resource524}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise524<T> = T extends Promise<infer U> ? UnwrapPromise524<U> : T;
type UnwrapArray524<T> = T extends (infer U)[] ? UnwrapArray524<U> : T;
type Head524<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail524<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation524<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation524<Exclude<T, K>>]
  : never;

type SmallUnion524 = "a" | "b" | "c" | "d";
type AllPerms524 = Permutation524<SmallUnion524>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig524,
  Flat524,
  FR524,
  BigUnion524,
  ExtractAlpha524,
  ExcludeZulu524,
  OptionalAll524,
  RequiredAll524,
  ReadonlyAll524,
  NullableAll524,
  TypeNames524,
  Action524,
  AllPerms524,
};
