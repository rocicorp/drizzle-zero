// pkg-01 / types-09  (seed 109) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord109 {
  a109: { x: number; y: string; z: boolean };
  b109: { p: string[]; q: Record<string, number> };
  c109: { nested: { deep: { deeper: { deepest: string } } } };
  d109: number;
  e109: string;
  f109: boolean;
  g109: null;
  h109: undefined;
  i109: bigint;
  j109: symbol;
}

type PartialBig109 = DeepPartial<BigRecord109>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten109<T> = T extends Array<infer U> ? Flatten109<U> : T;
type Nested109 = number[][][][][][][][][][];
type Flat109 = Flatten109<Nested109>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly109<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly109<T[K]> : T[K];
};
type DeepRequired109<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired109<T[K]> : T[K];
};
type FR109 = DeepReadonly109<DeepRequired109<PartialBig109>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion109 =
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

type ExtractAlpha109 = Extract<BigUnion109, "alpha" | "bravo" | "charlie">;
type ExcludeZulu109 = Exclude<BigUnion109, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA109 { width: number; height: number; depth: number }
interface ShapeB109 { color: string; opacity: number; blend: string }
interface ShapeC109 { x: number; y: number; z: number; w: number }
interface ShapeD109 { label: string; title: string; summary: string }

type Combined109 = ShapeA109 & ShapeB109 & ShapeC109 & ShapeD109;
type OptionalAll109 = { [K in keyof Combined109]?: Combined109[K] };
type RequiredAll109 = { [K in keyof Combined109]-?: Combined109[K] };
type ReadonlyAll109 = { readonly [K in keyof Combined109]: Combined109[K] };
type NullableAll109 = { [K in keyof Combined109]: Combined109[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString109<T> = T extends string ? true : false;
type IsNumber109<T> = T extends number ? true : false;
type TypeName109<T> = T extends string
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

type TypeNames109 = {
  [K in keyof BigRecord109]: TypeName109<BigRecord109[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb109 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource109 = "user" | "post" | "comment" | "tag" | "category";
type Action109 = `${Verb109}_${Resource109}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise109<T> = T extends Promise<infer U> ? UnwrapPromise109<U> : T;
type UnwrapArray109<T> = T extends (infer U)[] ? UnwrapArray109<U> : T;
type Head109<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail109<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation109<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation109<Exclude<T, K>>]
  : never;

type SmallUnion109 = "a" | "b" | "c" | "d";
type AllPerms109 = Permutation109<SmallUnion109>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig109,
  Flat109,
  FR109,
  BigUnion109,
  ExtractAlpha109,
  ExcludeZulu109,
  OptionalAll109,
  RequiredAll109,
  ReadonlyAll109,
  NullableAll109,
  TypeNames109,
  Action109,
  AllPerms109,
};
