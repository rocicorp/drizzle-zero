// pkg-02 / types-30  (seed 230) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord230 {
  a230: { x: number; y: string; z: boolean };
  b230: { p: string[]; q: Record<string, number> };
  c230: { nested: { deep: { deeper: { deepest: string } } } };
  d230: number;
  e230: string;
  f230: boolean;
  g230: null;
  h230: undefined;
  i230: bigint;
  j230: symbol;
}

type PartialBig230 = DeepPartial<BigRecord230>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten230<T> = T extends Array<infer U> ? Flatten230<U> : T;
type Nested230 = number[][][][][][][][][][];
type Flat230 = Flatten230<Nested230>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly230<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly230<T[K]> : T[K];
};
type DeepRequired230<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired230<T[K]> : T[K];
};
type FR230 = DeepReadonly230<DeepRequired230<PartialBig230>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion230 =
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

type ExtractAlpha230 = Extract<BigUnion230, "alpha" | "bravo" | "charlie">;
type ExcludeZulu230 = Exclude<BigUnion230, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA230 { width: number; height: number; depth: number }
interface ShapeB230 { color: string; opacity: number; blend: string }
interface ShapeC230 { x: number; y: number; z: number; w: number }
interface ShapeD230 { label: string; title: string; summary: string }

type Combined230 = ShapeA230 & ShapeB230 & ShapeC230 & ShapeD230;
type OptionalAll230 = { [K in keyof Combined230]?: Combined230[K] };
type RequiredAll230 = { [K in keyof Combined230]-?: Combined230[K] };
type ReadonlyAll230 = { readonly [K in keyof Combined230]: Combined230[K] };
type NullableAll230 = { [K in keyof Combined230]: Combined230[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString230<T> = T extends string ? true : false;
type IsNumber230<T> = T extends number ? true : false;
type TypeName230<T> = T extends string
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

type TypeNames230 = {
  [K in keyof BigRecord230]: TypeName230<BigRecord230[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb230 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource230 = "user" | "post" | "comment" | "tag" | "category";
type Action230 = `${Verb230}_${Resource230}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise230<T> = T extends Promise<infer U> ? UnwrapPromise230<U> : T;
type UnwrapArray230<T> = T extends (infer U)[] ? UnwrapArray230<U> : T;
type Head230<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail230<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation230<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation230<Exclude<T, K>>]
  : never;

type SmallUnion230 = "a" | "b" | "c" | "d";
type AllPerms230 = Permutation230<SmallUnion230>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig230,
  Flat230,
  FR230,
  BigUnion230,
  ExtractAlpha230,
  ExcludeZulu230,
  OptionalAll230,
  RequiredAll230,
  ReadonlyAll230,
  NullableAll230,
  TypeNames230,
  Action230,
  AllPerms230,
};
