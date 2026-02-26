// pkg-06 / types-15  (seed 615) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord615 {
  a615: { x: number; y: string; z: boolean };
  b615: { p: string[]; q: Record<string, number> };
  c615: { nested: { deep: { deeper: { deepest: string } } } };
  d615: number;
  e615: string;
  f615: boolean;
  g615: null;
  h615: undefined;
  i615: bigint;
  j615: symbol;
}

type PartialBig615 = DeepPartial<BigRecord615>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten615<T> = T extends Array<infer U> ? Flatten615<U> : T;
type Nested615 = number[][][][][][][][][][];
type Flat615 = Flatten615<Nested615>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly615<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly615<T[K]> : T[K];
};
type DeepRequired615<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired615<T[K]> : T[K];
};
type FR615 = DeepReadonly615<DeepRequired615<PartialBig615>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion615 =
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

type ExtractAlpha615 = Extract<BigUnion615, "alpha" | "bravo" | "charlie">;
type ExcludeZulu615 = Exclude<BigUnion615, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA615 { width: number; height: number; depth: number }
interface ShapeB615 { color: string; opacity: number; blend: string }
interface ShapeC615 { x: number; y: number; z: number; w: number }
interface ShapeD615 { label: string; title: string; summary: string }

type Combined615 = ShapeA615 & ShapeB615 & ShapeC615 & ShapeD615;
type OptionalAll615 = { [K in keyof Combined615]?: Combined615[K] };
type RequiredAll615 = { [K in keyof Combined615]-?: Combined615[K] };
type ReadonlyAll615 = { readonly [K in keyof Combined615]: Combined615[K] };
type NullableAll615 = { [K in keyof Combined615]: Combined615[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString615<T> = T extends string ? true : false;
type IsNumber615<T> = T extends number ? true : false;
type TypeName615<T> = T extends string
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

type TypeNames615 = {
  [K in keyof BigRecord615]: TypeName615<BigRecord615[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb615 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource615 = "user" | "post" | "comment" | "tag" | "category";
type Action615 = `${Verb615}_${Resource615}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise615<T> = T extends Promise<infer U> ? UnwrapPromise615<U> : T;
type UnwrapArray615<T> = T extends (infer U)[] ? UnwrapArray615<U> : T;
type Head615<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail615<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation615<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation615<Exclude<T, K>>]
  : never;

type SmallUnion615 = "a" | "b" | "c" | "d";
type AllPerms615 = Permutation615<SmallUnion615>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig615,
  Flat615,
  FR615,
  BigUnion615,
  ExtractAlpha615,
  ExcludeZulu615,
  OptionalAll615,
  RequiredAll615,
  ReadonlyAll615,
  NullableAll615,
  TypeNames615,
  Action615,
  AllPerms615,
};
