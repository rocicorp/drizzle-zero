// pkg-04 / types-05  (seed 405) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord405 {
  a405: { x: number; y: string; z: boolean };
  b405: { p: string[]; q: Record<string, number> };
  c405: { nested: { deep: { deeper: { deepest: string } } } };
  d405: number;
  e405: string;
  f405: boolean;
  g405: null;
  h405: undefined;
  i405: bigint;
  j405: symbol;
}

type PartialBig405 = DeepPartial<BigRecord405>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten405<T> = T extends Array<infer U> ? Flatten405<U> : T;
type Nested405 = number[][][][][][][][][][];
type Flat405 = Flatten405<Nested405>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly405<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly405<T[K]> : T[K];
};
type DeepRequired405<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired405<T[K]> : T[K];
};
type FR405 = DeepReadonly405<DeepRequired405<PartialBig405>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion405 =
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

type ExtractAlpha405 = Extract<BigUnion405, "alpha" | "bravo" | "charlie">;
type ExcludeZulu405 = Exclude<BigUnion405, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA405 { width: number; height: number; depth: number }
interface ShapeB405 { color: string; opacity: number; blend: string }
interface ShapeC405 { x: number; y: number; z: number; w: number }
interface ShapeD405 { label: string; title: string; summary: string }

type Combined405 = ShapeA405 & ShapeB405 & ShapeC405 & ShapeD405;
type OptionalAll405 = { [K in keyof Combined405]?: Combined405[K] };
type RequiredAll405 = { [K in keyof Combined405]-?: Combined405[K] };
type ReadonlyAll405 = { readonly [K in keyof Combined405]: Combined405[K] };
type NullableAll405 = { [K in keyof Combined405]: Combined405[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString405<T> = T extends string ? true : false;
type IsNumber405<T> = T extends number ? true : false;
type TypeName405<T> = T extends string
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

type TypeNames405 = {
  [K in keyof BigRecord405]: TypeName405<BigRecord405[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb405 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource405 = "user" | "post" | "comment" | "tag" | "category";
type Action405 = `${Verb405}_${Resource405}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise405<T> = T extends Promise<infer U> ? UnwrapPromise405<U> : T;
type UnwrapArray405<T> = T extends (infer U)[] ? UnwrapArray405<U> : T;
type Head405<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail405<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation405<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation405<Exclude<T, K>>]
  : never;

type SmallUnion405 = "a" | "b" | "c" | "d";
type AllPerms405 = Permutation405<SmallUnion405>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig405,
  Flat405,
  FR405,
  BigUnion405,
  ExtractAlpha405,
  ExcludeZulu405,
  OptionalAll405,
  RequiredAll405,
  ReadonlyAll405,
  NullableAll405,
  TypeNames405,
  Action405,
  AllPerms405,
};
