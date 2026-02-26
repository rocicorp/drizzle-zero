// pkg-08 / types-26  (seed 826) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord826 {
  a826: { x: number; y: string; z: boolean };
  b826: { p: string[]; q: Record<string, number> };
  c826: { nested: { deep: { deeper: { deepest: string } } } };
  d826: number;
  e826: string;
  f826: boolean;
  g826: null;
  h826: undefined;
  i826: bigint;
  j826: symbol;
}

type PartialBig826 = DeepPartial<BigRecord826>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten826<T> = T extends Array<infer U> ? Flatten826<U> : T;
type Nested826 = number[][][][][][][][][][];
type Flat826 = Flatten826<Nested826>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly826<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly826<T[K]> : T[K];
};
type DeepRequired826<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired826<T[K]> : T[K];
};
type FR826 = DeepReadonly826<DeepRequired826<PartialBig826>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion826 =
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

type ExtractAlpha826 = Extract<BigUnion826, "alpha" | "bravo" | "charlie">;
type ExcludeZulu826 = Exclude<BigUnion826, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA826 { width: number; height: number; depth: number }
interface ShapeB826 { color: string; opacity: number; blend: string }
interface ShapeC826 { x: number; y: number; z: number; w: number }
interface ShapeD826 { label: string; title: string; summary: string }

type Combined826 = ShapeA826 & ShapeB826 & ShapeC826 & ShapeD826;
type OptionalAll826 = { [K in keyof Combined826]?: Combined826[K] };
type RequiredAll826 = { [K in keyof Combined826]-?: Combined826[K] };
type ReadonlyAll826 = { readonly [K in keyof Combined826]: Combined826[K] };
type NullableAll826 = { [K in keyof Combined826]: Combined826[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString826<T> = T extends string ? true : false;
type IsNumber826<T> = T extends number ? true : false;
type TypeName826<T> = T extends string
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

type TypeNames826 = {
  [K in keyof BigRecord826]: TypeName826<BigRecord826[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb826 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource826 = "user" | "post" | "comment" | "tag" | "category";
type Action826 = `${Verb826}_${Resource826}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise826<T> = T extends Promise<infer U> ? UnwrapPromise826<U> : T;
type UnwrapArray826<T> = T extends (infer U)[] ? UnwrapArray826<U> : T;
type Head826<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail826<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation826<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation826<Exclude<T, K>>]
  : never;

type SmallUnion826 = "a" | "b" | "c" | "d";
type AllPerms826 = Permutation826<SmallUnion826>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig826,
  Flat826,
  FR826,
  BigUnion826,
  ExtractAlpha826,
  ExcludeZulu826,
  OptionalAll826,
  RequiredAll826,
  ReadonlyAll826,
  NullableAll826,
  TypeNames826,
  Action826,
  AllPerms826,
};
