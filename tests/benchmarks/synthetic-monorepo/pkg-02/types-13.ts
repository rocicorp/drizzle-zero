// pkg-02 / types-13  (seed 213) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord213 {
  a213: { x: number; y: string; z: boolean };
  b213: { p: string[]; q: Record<string, number> };
  c213: { nested: { deep: { deeper: { deepest: string } } } };
  d213: number;
  e213: string;
  f213: boolean;
  g213: null;
  h213: undefined;
  i213: bigint;
  j213: symbol;
}

type PartialBig213 = DeepPartial<BigRecord213>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten213<T> = T extends Array<infer U> ? Flatten213<U> : T;
type Nested213 = number[][][][][][][][][][];
type Flat213 = Flatten213<Nested213>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly213<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly213<T[K]> : T[K];
};
type DeepRequired213<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired213<T[K]> : T[K];
};
type FR213 = DeepReadonly213<DeepRequired213<PartialBig213>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion213 =
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

type ExtractAlpha213 = Extract<BigUnion213, "alpha" | "bravo" | "charlie">;
type ExcludeZulu213 = Exclude<BigUnion213, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA213 { width: number; height: number; depth: number }
interface ShapeB213 { color: string; opacity: number; blend: string }
interface ShapeC213 { x: number; y: number; z: number; w: number }
interface ShapeD213 { label: string; title: string; summary: string }

type Combined213 = ShapeA213 & ShapeB213 & ShapeC213 & ShapeD213;
type OptionalAll213 = { [K in keyof Combined213]?: Combined213[K] };
type RequiredAll213 = { [K in keyof Combined213]-?: Combined213[K] };
type ReadonlyAll213 = { readonly [K in keyof Combined213]: Combined213[K] };
type NullableAll213 = { [K in keyof Combined213]: Combined213[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString213<T> = T extends string ? true : false;
type IsNumber213<T> = T extends number ? true : false;
type TypeName213<T> = T extends string
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

type TypeNames213 = {
  [K in keyof BigRecord213]: TypeName213<BigRecord213[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb213 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource213 = "user" | "post" | "comment" | "tag" | "category";
type Action213 = `${Verb213}_${Resource213}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise213<T> = T extends Promise<infer U> ? UnwrapPromise213<U> : T;
type UnwrapArray213<T> = T extends (infer U)[] ? UnwrapArray213<U> : T;
type Head213<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail213<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation213<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation213<Exclude<T, K>>]
  : never;

type SmallUnion213 = "a" | "b" | "c" | "d";
type AllPerms213 = Permutation213<SmallUnion213>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig213,
  Flat213,
  FR213,
  BigUnion213,
  ExtractAlpha213,
  ExcludeZulu213,
  OptionalAll213,
  RequiredAll213,
  ReadonlyAll213,
  NullableAll213,
  TypeNames213,
  Action213,
  AllPerms213,
};
