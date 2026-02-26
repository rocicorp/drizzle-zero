// pkg-01 / types-28  (seed 128) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord128 {
  a128: { x: number; y: string; z: boolean };
  b128: { p: string[]; q: Record<string, number> };
  c128: { nested: { deep: { deeper: { deepest: string } } } };
  d128: number;
  e128: string;
  f128: boolean;
  g128: null;
  h128: undefined;
  i128: bigint;
  j128: symbol;
}

type PartialBig128 = DeepPartial<BigRecord128>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten128<T> = T extends Array<infer U> ? Flatten128<U> : T;
type Nested128 = number[][][][][][][][][][];
type Flat128 = Flatten128<Nested128>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly128<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly128<T[K]> : T[K];
};
type DeepRequired128<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired128<T[K]> : T[K];
};
type FR128 = DeepReadonly128<DeepRequired128<PartialBig128>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion128 =
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

type ExtractAlpha128 = Extract<BigUnion128, "alpha" | "bravo" | "charlie">;
type ExcludeZulu128 = Exclude<BigUnion128, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA128 { width: number; height: number; depth: number }
interface ShapeB128 { color: string; opacity: number; blend: string }
interface ShapeC128 { x: number; y: number; z: number; w: number }
interface ShapeD128 { label: string; title: string; summary: string }

type Combined128 = ShapeA128 & ShapeB128 & ShapeC128 & ShapeD128;
type OptionalAll128 = { [K in keyof Combined128]?: Combined128[K] };
type RequiredAll128 = { [K in keyof Combined128]-?: Combined128[K] };
type ReadonlyAll128 = { readonly [K in keyof Combined128]: Combined128[K] };
type NullableAll128 = { [K in keyof Combined128]: Combined128[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString128<T> = T extends string ? true : false;
type IsNumber128<T> = T extends number ? true : false;
type TypeName128<T> = T extends string
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

type TypeNames128 = {
  [K in keyof BigRecord128]: TypeName128<BigRecord128[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb128 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource128 = "user" | "post" | "comment" | "tag" | "category";
type Action128 = `${Verb128}_${Resource128}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise128<T> = T extends Promise<infer U> ? UnwrapPromise128<U> : T;
type UnwrapArray128<T> = T extends (infer U)[] ? UnwrapArray128<U> : T;
type Head128<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail128<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation128<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation128<Exclude<T, K>>]
  : never;

type SmallUnion128 = "a" | "b" | "c" | "d";
type AllPerms128 = Permutation128<SmallUnion128>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig128,
  Flat128,
  FR128,
  BigUnion128,
  ExtractAlpha128,
  ExcludeZulu128,
  OptionalAll128,
  RequiredAll128,
  ReadonlyAll128,
  NullableAll128,
  TypeNames128,
  Action128,
  AllPerms128,
};
