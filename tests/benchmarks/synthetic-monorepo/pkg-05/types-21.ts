// pkg-05 / types-21  (seed 521) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord521 {
  a521: { x: number; y: string; z: boolean };
  b521: { p: string[]; q: Record<string, number> };
  c521: { nested: { deep: { deeper: { deepest: string } } } };
  d521: number;
  e521: string;
  f521: boolean;
  g521: null;
  h521: undefined;
  i521: bigint;
  j521: symbol;
}

type PartialBig521 = DeepPartial<BigRecord521>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten521<T> = T extends Array<infer U> ? Flatten521<U> : T;
type Nested521 = number[][][][][][][][][][];
type Flat521 = Flatten521<Nested521>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly521<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly521<T[K]> : T[K];
};
type DeepRequired521<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired521<T[K]> : T[K];
};
type FR521 = DeepReadonly521<DeepRequired521<PartialBig521>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion521 =
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

type ExtractAlpha521 = Extract<BigUnion521, "alpha" | "bravo" | "charlie">;
type ExcludeZulu521 = Exclude<BigUnion521, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA521 { width: number; height: number; depth: number }
interface ShapeB521 { color: string; opacity: number; blend: string }
interface ShapeC521 { x: number; y: number; z: number; w: number }
interface ShapeD521 { label: string; title: string; summary: string }

type Combined521 = ShapeA521 & ShapeB521 & ShapeC521 & ShapeD521;
type OptionalAll521 = { [K in keyof Combined521]?: Combined521[K] };
type RequiredAll521 = { [K in keyof Combined521]-?: Combined521[K] };
type ReadonlyAll521 = { readonly [K in keyof Combined521]: Combined521[K] };
type NullableAll521 = { [K in keyof Combined521]: Combined521[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString521<T> = T extends string ? true : false;
type IsNumber521<T> = T extends number ? true : false;
type TypeName521<T> = T extends string
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

type TypeNames521 = {
  [K in keyof BigRecord521]: TypeName521<BigRecord521[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb521 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource521 = "user" | "post" | "comment" | "tag" | "category";
type Action521 = `${Verb521}_${Resource521}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise521<T> = T extends Promise<infer U> ? UnwrapPromise521<U> : T;
type UnwrapArray521<T> = T extends (infer U)[] ? UnwrapArray521<U> : T;
type Head521<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail521<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation521<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation521<Exclude<T, K>>]
  : never;

type SmallUnion521 = "a" | "b" | "c" | "d";
type AllPerms521 = Permutation521<SmallUnion521>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig521,
  Flat521,
  FR521,
  BigUnion521,
  ExtractAlpha521,
  ExcludeZulu521,
  OptionalAll521,
  RequiredAll521,
  ReadonlyAll521,
  NullableAll521,
  TypeNames521,
  Action521,
  AllPerms521,
};
