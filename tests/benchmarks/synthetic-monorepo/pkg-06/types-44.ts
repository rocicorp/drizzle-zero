// pkg-06 / types-44  (seed 644) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord644 {
  a644: { x: number; y: string; z: boolean };
  b644: { p: string[]; q: Record<string, number> };
  c644: { nested: { deep: { deeper: { deepest: string } } } };
  d644: number;
  e644: string;
  f644: boolean;
  g644: null;
  h644: undefined;
  i644: bigint;
  j644: symbol;
}

type PartialBig644 = DeepPartial<BigRecord644>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten644<T> = T extends Array<infer U> ? Flatten644<U> : T;
type Nested644 = number[][][][][][][][][][];
type Flat644 = Flatten644<Nested644>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly644<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly644<T[K]> : T[K];
};
type DeepRequired644<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired644<T[K]> : T[K];
};
type FR644 = DeepReadonly644<DeepRequired644<PartialBig644>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion644 =
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

type ExtractAlpha644 = Extract<BigUnion644, "alpha" | "bravo" | "charlie">;
type ExcludeZulu644 = Exclude<BigUnion644, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA644 { width: number; height: number; depth: number }
interface ShapeB644 { color: string; opacity: number; blend: string }
interface ShapeC644 { x: number; y: number; z: number; w: number }
interface ShapeD644 { label: string; title: string; summary: string }

type Combined644 = ShapeA644 & ShapeB644 & ShapeC644 & ShapeD644;
type OptionalAll644 = { [K in keyof Combined644]?: Combined644[K] };
type RequiredAll644 = { [K in keyof Combined644]-?: Combined644[K] };
type ReadonlyAll644 = { readonly [K in keyof Combined644]: Combined644[K] };
type NullableAll644 = { [K in keyof Combined644]: Combined644[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString644<T> = T extends string ? true : false;
type IsNumber644<T> = T extends number ? true : false;
type TypeName644<T> = T extends string
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

type TypeNames644 = {
  [K in keyof BigRecord644]: TypeName644<BigRecord644[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb644 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource644 = "user" | "post" | "comment" | "tag" | "category";
type Action644 = `${Verb644}_${Resource644}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise644<T> = T extends Promise<infer U> ? UnwrapPromise644<U> : T;
type UnwrapArray644<T> = T extends (infer U)[] ? UnwrapArray644<U> : T;
type Head644<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail644<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation644<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation644<Exclude<T, K>>]
  : never;

type SmallUnion644 = "a" | "b" | "c" | "d";
type AllPerms644 = Permutation644<SmallUnion644>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig644,
  Flat644,
  FR644,
  BigUnion644,
  ExtractAlpha644,
  ExcludeZulu644,
  OptionalAll644,
  RequiredAll644,
  ReadonlyAll644,
  NullableAll644,
  TypeNames644,
  Action644,
  AllPerms644,
};
