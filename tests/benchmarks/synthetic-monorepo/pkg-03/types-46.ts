// pkg-03 / types-46  (seed 346) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord346 {
  a346: { x: number; y: string; z: boolean };
  b346: { p: string[]; q: Record<string, number> };
  c346: { nested: { deep: { deeper: { deepest: string } } } };
  d346: number;
  e346: string;
  f346: boolean;
  g346: null;
  h346: undefined;
  i346: bigint;
  j346: symbol;
}

type PartialBig346 = DeepPartial<BigRecord346>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten346<T> = T extends Array<infer U> ? Flatten346<U> : T;
type Nested346 = number[][][][][][][][][][];
type Flat346 = Flatten346<Nested346>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly346<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly346<T[K]> : T[K];
};
type DeepRequired346<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired346<T[K]> : T[K];
};
type FR346 = DeepReadonly346<DeepRequired346<PartialBig346>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion346 =
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

type ExtractAlpha346 = Extract<BigUnion346, "alpha" | "bravo" | "charlie">;
type ExcludeZulu346 = Exclude<BigUnion346, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA346 { width: number; height: number; depth: number }
interface ShapeB346 { color: string; opacity: number; blend: string }
interface ShapeC346 { x: number; y: number; z: number; w: number }
interface ShapeD346 { label: string; title: string; summary: string }

type Combined346 = ShapeA346 & ShapeB346 & ShapeC346 & ShapeD346;
type OptionalAll346 = { [K in keyof Combined346]?: Combined346[K] };
type RequiredAll346 = { [K in keyof Combined346]-?: Combined346[K] };
type ReadonlyAll346 = { readonly [K in keyof Combined346]: Combined346[K] };
type NullableAll346 = { [K in keyof Combined346]: Combined346[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString346<T> = T extends string ? true : false;
type IsNumber346<T> = T extends number ? true : false;
type TypeName346<T> = T extends string
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

type TypeNames346 = {
  [K in keyof BigRecord346]: TypeName346<BigRecord346[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb346 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource346 = "user" | "post" | "comment" | "tag" | "category";
type Action346 = `${Verb346}_${Resource346}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise346<T> = T extends Promise<infer U> ? UnwrapPromise346<U> : T;
type UnwrapArray346<T> = T extends (infer U)[] ? UnwrapArray346<U> : T;
type Head346<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail346<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation346<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation346<Exclude<T, K>>]
  : never;

type SmallUnion346 = "a" | "b" | "c" | "d";
type AllPerms346 = Permutation346<SmallUnion346>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig346,
  Flat346,
  FR346,
  BigUnion346,
  ExtractAlpha346,
  ExcludeZulu346,
  OptionalAll346,
  RequiredAll346,
  ReadonlyAll346,
  NullableAll346,
  TypeNames346,
  Action346,
  AllPerms346,
};
