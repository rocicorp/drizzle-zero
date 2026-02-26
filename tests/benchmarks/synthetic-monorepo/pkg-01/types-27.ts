// pkg-01 / types-27  (seed 127) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord127 {
  a127: { x: number; y: string; z: boolean };
  b127: { p: string[]; q: Record<string, number> };
  c127: { nested: { deep: { deeper: { deepest: string } } } };
  d127: number;
  e127: string;
  f127: boolean;
  g127: null;
  h127: undefined;
  i127: bigint;
  j127: symbol;
}

type PartialBig127 = DeepPartial<BigRecord127>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten127<T> = T extends Array<infer U> ? Flatten127<U> : T;
type Nested127 = number[][][][][][][][][][];
type Flat127 = Flatten127<Nested127>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly127<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly127<T[K]> : T[K];
};
type DeepRequired127<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired127<T[K]> : T[K];
};
type FR127 = DeepReadonly127<DeepRequired127<PartialBig127>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion127 =
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

type ExtractAlpha127 = Extract<BigUnion127, "alpha" | "bravo" | "charlie">;
type ExcludeZulu127 = Exclude<BigUnion127, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA127 { width: number; height: number; depth: number }
interface ShapeB127 { color: string; opacity: number; blend: string }
interface ShapeC127 { x: number; y: number; z: number; w: number }
interface ShapeD127 { label: string; title: string; summary: string }

type Combined127 = ShapeA127 & ShapeB127 & ShapeC127 & ShapeD127;
type OptionalAll127 = { [K in keyof Combined127]?: Combined127[K] };
type RequiredAll127 = { [K in keyof Combined127]-?: Combined127[K] };
type ReadonlyAll127 = { readonly [K in keyof Combined127]: Combined127[K] };
type NullableAll127 = { [K in keyof Combined127]: Combined127[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString127<T> = T extends string ? true : false;
type IsNumber127<T> = T extends number ? true : false;
type TypeName127<T> = T extends string
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

type TypeNames127 = {
  [K in keyof BigRecord127]: TypeName127<BigRecord127[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb127 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource127 = "user" | "post" | "comment" | "tag" | "category";
type Action127 = `${Verb127}_${Resource127}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise127<T> = T extends Promise<infer U> ? UnwrapPromise127<U> : T;
type UnwrapArray127<T> = T extends (infer U)[] ? UnwrapArray127<U> : T;
type Head127<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail127<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation127<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation127<Exclude<T, K>>]
  : never;

type SmallUnion127 = "a" | "b" | "c" | "d";
type AllPerms127 = Permutation127<SmallUnion127>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig127,
  Flat127,
  FR127,
  BigUnion127,
  ExtractAlpha127,
  ExcludeZulu127,
  OptionalAll127,
  RequiredAll127,
  ReadonlyAll127,
  NullableAll127,
  TypeNames127,
  Action127,
  AllPerms127,
};
