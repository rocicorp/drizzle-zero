// pkg-01 / types-04  (seed 104) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord104 {
  a104: { x: number; y: string; z: boolean };
  b104: { p: string[]; q: Record<string, number> };
  c104: { nested: { deep: { deeper: { deepest: string } } } };
  d104: number;
  e104: string;
  f104: boolean;
  g104: null;
  h104: undefined;
  i104: bigint;
  j104: symbol;
}

type PartialBig104 = DeepPartial<BigRecord104>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten104<T> = T extends Array<infer U> ? Flatten104<U> : T;
type Nested104 = number[][][][][][][][][][];
type Flat104 = Flatten104<Nested104>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly104<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly104<T[K]> : T[K];
};
type DeepRequired104<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired104<T[K]> : T[K];
};
type FR104 = DeepReadonly104<DeepRequired104<PartialBig104>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion104 =
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

type ExtractAlpha104 = Extract<BigUnion104, "alpha" | "bravo" | "charlie">;
type ExcludeZulu104 = Exclude<BigUnion104, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA104 { width: number; height: number; depth: number }
interface ShapeB104 { color: string; opacity: number; blend: string }
interface ShapeC104 { x: number; y: number; z: number; w: number }
interface ShapeD104 { label: string; title: string; summary: string }

type Combined104 = ShapeA104 & ShapeB104 & ShapeC104 & ShapeD104;
type OptionalAll104 = { [K in keyof Combined104]?: Combined104[K] };
type RequiredAll104 = { [K in keyof Combined104]-?: Combined104[K] };
type ReadonlyAll104 = { readonly [K in keyof Combined104]: Combined104[K] };
type NullableAll104 = { [K in keyof Combined104]: Combined104[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString104<T> = T extends string ? true : false;
type IsNumber104<T> = T extends number ? true : false;
type TypeName104<T> = T extends string
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

type TypeNames104 = {
  [K in keyof BigRecord104]: TypeName104<BigRecord104[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb104 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource104 = "user" | "post" | "comment" | "tag" | "category";
type Action104 = `${Verb104}_${Resource104}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise104<T> = T extends Promise<infer U> ? UnwrapPromise104<U> : T;
type UnwrapArray104<T> = T extends (infer U)[] ? UnwrapArray104<U> : T;
type Head104<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail104<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation104<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation104<Exclude<T, K>>]
  : never;

type SmallUnion104 = "a" | "b" | "c" | "d";
type AllPerms104 = Permutation104<SmallUnion104>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig104,
  Flat104,
  FR104,
  BigUnion104,
  ExtractAlpha104,
  ExcludeZulu104,
  OptionalAll104,
  RequiredAll104,
  ReadonlyAll104,
  NullableAll104,
  TypeNames104,
  Action104,
  AllPerms104,
};
