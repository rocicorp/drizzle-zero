// pkg-02 / types-38  (seed 238) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord238 {
  a238: { x: number; y: string; z: boolean };
  b238: { p: string[]; q: Record<string, number> };
  c238: { nested: { deep: { deeper: { deepest: string } } } };
  d238: number;
  e238: string;
  f238: boolean;
  g238: null;
  h238: undefined;
  i238: bigint;
  j238: symbol;
}

type PartialBig238 = DeepPartial<BigRecord238>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten238<T> = T extends Array<infer U> ? Flatten238<U> : T;
type Nested238 = number[][][][][][][][][][];
type Flat238 = Flatten238<Nested238>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly238<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly238<T[K]> : T[K];
};
type DeepRequired238<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired238<T[K]> : T[K];
};
type FR238 = DeepReadonly238<DeepRequired238<PartialBig238>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion238 =
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

type ExtractAlpha238 = Extract<BigUnion238, "alpha" | "bravo" | "charlie">;
type ExcludeZulu238 = Exclude<BigUnion238, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA238 { width: number; height: number; depth: number }
interface ShapeB238 { color: string; opacity: number; blend: string }
interface ShapeC238 { x: number; y: number; z: number; w: number }
interface ShapeD238 { label: string; title: string; summary: string }

type Combined238 = ShapeA238 & ShapeB238 & ShapeC238 & ShapeD238;
type OptionalAll238 = { [K in keyof Combined238]?: Combined238[K] };
type RequiredAll238 = { [K in keyof Combined238]-?: Combined238[K] };
type ReadonlyAll238 = { readonly [K in keyof Combined238]: Combined238[K] };
type NullableAll238 = { [K in keyof Combined238]: Combined238[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString238<T> = T extends string ? true : false;
type IsNumber238<T> = T extends number ? true : false;
type TypeName238<T> = T extends string
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

type TypeNames238 = {
  [K in keyof BigRecord238]: TypeName238<BigRecord238[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb238 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource238 = "user" | "post" | "comment" | "tag" | "category";
type Action238 = `${Verb238}_${Resource238}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise238<T> = T extends Promise<infer U> ? UnwrapPromise238<U> : T;
type UnwrapArray238<T> = T extends (infer U)[] ? UnwrapArray238<U> : T;
type Head238<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail238<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation238<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation238<Exclude<T, K>>]
  : never;

type SmallUnion238 = "a" | "b" | "c" | "d";
type AllPerms238 = Permutation238<SmallUnion238>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig238,
  Flat238,
  FR238,
  BigUnion238,
  ExtractAlpha238,
  ExcludeZulu238,
  OptionalAll238,
  RequiredAll238,
  ReadonlyAll238,
  NullableAll238,
  TypeNames238,
  Action238,
  AllPerms238,
};
