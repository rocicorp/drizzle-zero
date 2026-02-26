// pkg-05 / types-06  (seed 506) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord506 {
  a506: { x: number; y: string; z: boolean };
  b506: { p: string[]; q: Record<string, number> };
  c506: { nested: { deep: { deeper: { deepest: string } } } };
  d506: number;
  e506: string;
  f506: boolean;
  g506: null;
  h506: undefined;
  i506: bigint;
  j506: symbol;
}

type PartialBig506 = DeepPartial<BigRecord506>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten506<T> = T extends Array<infer U> ? Flatten506<U> : T;
type Nested506 = number[][][][][][][][][][];
type Flat506 = Flatten506<Nested506>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly506<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly506<T[K]> : T[K];
};
type DeepRequired506<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired506<T[K]> : T[K];
};
type FR506 = DeepReadonly506<DeepRequired506<PartialBig506>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion506 =
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

type ExtractAlpha506 = Extract<BigUnion506, "alpha" | "bravo" | "charlie">;
type ExcludeZulu506 = Exclude<BigUnion506, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA506 { width: number; height: number; depth: number }
interface ShapeB506 { color: string; opacity: number; blend: string }
interface ShapeC506 { x: number; y: number; z: number; w: number }
interface ShapeD506 { label: string; title: string; summary: string }

type Combined506 = ShapeA506 & ShapeB506 & ShapeC506 & ShapeD506;
type OptionalAll506 = { [K in keyof Combined506]?: Combined506[K] };
type RequiredAll506 = { [K in keyof Combined506]-?: Combined506[K] };
type ReadonlyAll506 = { readonly [K in keyof Combined506]: Combined506[K] };
type NullableAll506 = { [K in keyof Combined506]: Combined506[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString506<T> = T extends string ? true : false;
type IsNumber506<T> = T extends number ? true : false;
type TypeName506<T> = T extends string
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

type TypeNames506 = {
  [K in keyof BigRecord506]: TypeName506<BigRecord506[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb506 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource506 = "user" | "post" | "comment" | "tag" | "category";
type Action506 = `${Verb506}_${Resource506}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise506<T> = T extends Promise<infer U> ? UnwrapPromise506<U> : T;
type UnwrapArray506<T> = T extends (infer U)[] ? UnwrapArray506<U> : T;
type Head506<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail506<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation506<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation506<Exclude<T, K>>]
  : never;

type SmallUnion506 = "a" | "b" | "c" | "d";
type AllPerms506 = Permutation506<SmallUnion506>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig506,
  Flat506,
  FR506,
  BigUnion506,
  ExtractAlpha506,
  ExcludeZulu506,
  OptionalAll506,
  RequiredAll506,
  ReadonlyAll506,
  NullableAll506,
  TypeNames506,
  Action506,
  AllPerms506,
};
