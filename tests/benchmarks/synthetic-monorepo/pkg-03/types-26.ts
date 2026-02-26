// pkg-03 / types-26  (seed 326) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord326 {
  a326: { x: number; y: string; z: boolean };
  b326: { p: string[]; q: Record<string, number> };
  c326: { nested: { deep: { deeper: { deepest: string } } } };
  d326: number;
  e326: string;
  f326: boolean;
  g326: null;
  h326: undefined;
  i326: bigint;
  j326: symbol;
}

type PartialBig326 = DeepPartial<BigRecord326>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten326<T> = T extends Array<infer U> ? Flatten326<U> : T;
type Nested326 = number[][][][][][][][][][];
type Flat326 = Flatten326<Nested326>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly326<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly326<T[K]> : T[K];
};
type DeepRequired326<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired326<T[K]> : T[K];
};
type FR326 = DeepReadonly326<DeepRequired326<PartialBig326>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion326 =
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

type ExtractAlpha326 = Extract<BigUnion326, "alpha" | "bravo" | "charlie">;
type ExcludeZulu326 = Exclude<BigUnion326, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA326 { width: number; height: number; depth: number }
interface ShapeB326 { color: string; opacity: number; blend: string }
interface ShapeC326 { x: number; y: number; z: number; w: number }
interface ShapeD326 { label: string; title: string; summary: string }

type Combined326 = ShapeA326 & ShapeB326 & ShapeC326 & ShapeD326;
type OptionalAll326 = { [K in keyof Combined326]?: Combined326[K] };
type RequiredAll326 = { [K in keyof Combined326]-?: Combined326[K] };
type ReadonlyAll326 = { readonly [K in keyof Combined326]: Combined326[K] };
type NullableAll326 = { [K in keyof Combined326]: Combined326[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString326<T> = T extends string ? true : false;
type IsNumber326<T> = T extends number ? true : false;
type TypeName326<T> = T extends string
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

type TypeNames326 = {
  [K in keyof BigRecord326]: TypeName326<BigRecord326[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb326 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource326 = "user" | "post" | "comment" | "tag" | "category";
type Action326 = `${Verb326}_${Resource326}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise326<T> = T extends Promise<infer U> ? UnwrapPromise326<U> : T;
type UnwrapArray326<T> = T extends (infer U)[] ? UnwrapArray326<U> : T;
type Head326<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail326<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation326<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation326<Exclude<T, K>>]
  : never;

type SmallUnion326 = "a" | "b" | "c" | "d";
type AllPerms326 = Permutation326<SmallUnion326>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig326,
  Flat326,
  FR326,
  BigUnion326,
  ExtractAlpha326,
  ExcludeZulu326,
  OptionalAll326,
  RequiredAll326,
  ReadonlyAll326,
  NullableAll326,
  TypeNames326,
  Action326,
  AllPerms326,
};
