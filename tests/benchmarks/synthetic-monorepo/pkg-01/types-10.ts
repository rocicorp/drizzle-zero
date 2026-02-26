// pkg-01 / types-10  (seed 110) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord110 {
  a110: { x: number; y: string; z: boolean };
  b110: { p: string[]; q: Record<string, number> };
  c110: { nested: { deep: { deeper: { deepest: string } } } };
  d110: number;
  e110: string;
  f110: boolean;
  g110: null;
  h110: undefined;
  i110: bigint;
  j110: symbol;
}

type PartialBig110 = DeepPartial<BigRecord110>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten110<T> = T extends Array<infer U> ? Flatten110<U> : T;
type Nested110 = number[][][][][][][][][][];
type Flat110 = Flatten110<Nested110>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly110<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly110<T[K]> : T[K];
};
type DeepRequired110<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired110<T[K]> : T[K];
};
type FR110 = DeepReadonly110<DeepRequired110<PartialBig110>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion110 =
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

type ExtractAlpha110 = Extract<BigUnion110, "alpha" | "bravo" | "charlie">;
type ExcludeZulu110 = Exclude<BigUnion110, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA110 { width: number; height: number; depth: number }
interface ShapeB110 { color: string; opacity: number; blend: string }
interface ShapeC110 { x: number; y: number; z: number; w: number }
interface ShapeD110 { label: string; title: string; summary: string }

type Combined110 = ShapeA110 & ShapeB110 & ShapeC110 & ShapeD110;
type OptionalAll110 = { [K in keyof Combined110]?: Combined110[K] };
type RequiredAll110 = { [K in keyof Combined110]-?: Combined110[K] };
type ReadonlyAll110 = { readonly [K in keyof Combined110]: Combined110[K] };
type NullableAll110 = { [K in keyof Combined110]: Combined110[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString110<T> = T extends string ? true : false;
type IsNumber110<T> = T extends number ? true : false;
type TypeName110<T> = T extends string
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

type TypeNames110 = {
  [K in keyof BigRecord110]: TypeName110<BigRecord110[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb110 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource110 = "user" | "post" | "comment" | "tag" | "category";
type Action110 = `${Verb110}_${Resource110}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise110<T> = T extends Promise<infer U> ? UnwrapPromise110<U> : T;
type UnwrapArray110<T> = T extends (infer U)[] ? UnwrapArray110<U> : T;
type Head110<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail110<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation110<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation110<Exclude<T, K>>]
  : never;

type SmallUnion110 = "a" | "b" | "c" | "d";
type AllPerms110 = Permutation110<SmallUnion110>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig110,
  Flat110,
  FR110,
  BigUnion110,
  ExtractAlpha110,
  ExcludeZulu110,
  OptionalAll110,
  RequiredAll110,
  ReadonlyAll110,
  NullableAll110,
  TypeNames110,
  Action110,
  AllPerms110,
};
