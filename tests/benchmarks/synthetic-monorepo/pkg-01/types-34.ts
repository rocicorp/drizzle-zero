// pkg-01 / types-34  (seed 134) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord134 {
  a134: { x: number; y: string; z: boolean };
  b134: { p: string[]; q: Record<string, number> };
  c134: { nested: { deep: { deeper: { deepest: string } } } };
  d134: number;
  e134: string;
  f134: boolean;
  g134: null;
  h134: undefined;
  i134: bigint;
  j134: symbol;
}

type PartialBig134 = DeepPartial<BigRecord134>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten134<T> = T extends Array<infer U> ? Flatten134<U> : T;
type Nested134 = number[][][][][][][][][][];
type Flat134 = Flatten134<Nested134>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly134<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly134<T[K]> : T[K];
};
type DeepRequired134<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired134<T[K]> : T[K];
};
type FR134 = DeepReadonly134<DeepRequired134<PartialBig134>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion134 =
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

type ExtractAlpha134 = Extract<BigUnion134, "alpha" | "bravo" | "charlie">;
type ExcludeZulu134 = Exclude<BigUnion134, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA134 { width: number; height: number; depth: number }
interface ShapeB134 { color: string; opacity: number; blend: string }
interface ShapeC134 { x: number; y: number; z: number; w: number }
interface ShapeD134 { label: string; title: string; summary: string }

type Combined134 = ShapeA134 & ShapeB134 & ShapeC134 & ShapeD134;
type OptionalAll134 = { [K in keyof Combined134]?: Combined134[K] };
type RequiredAll134 = { [K in keyof Combined134]-?: Combined134[K] };
type ReadonlyAll134 = { readonly [K in keyof Combined134]: Combined134[K] };
type NullableAll134 = { [K in keyof Combined134]: Combined134[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString134<T> = T extends string ? true : false;
type IsNumber134<T> = T extends number ? true : false;
type TypeName134<T> = T extends string
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

type TypeNames134 = {
  [K in keyof BigRecord134]: TypeName134<BigRecord134[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb134 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource134 = "user" | "post" | "comment" | "tag" | "category";
type Action134 = `${Verb134}_${Resource134}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise134<T> = T extends Promise<infer U> ? UnwrapPromise134<U> : T;
type UnwrapArray134<T> = T extends (infer U)[] ? UnwrapArray134<U> : T;
type Head134<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail134<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation134<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation134<Exclude<T, K>>]
  : never;

type SmallUnion134 = "a" | "b" | "c" | "d";
type AllPerms134 = Permutation134<SmallUnion134>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig134,
  Flat134,
  FR134,
  BigUnion134,
  ExtractAlpha134,
  ExcludeZulu134,
  OptionalAll134,
  RequiredAll134,
  ReadonlyAll134,
  NullableAll134,
  TypeNames134,
  Action134,
  AllPerms134,
};
