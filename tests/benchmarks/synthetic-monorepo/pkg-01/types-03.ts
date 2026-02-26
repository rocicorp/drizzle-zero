// pkg-01 / types-03  (seed 103) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord103 {
  a103: { x: number; y: string; z: boolean };
  b103: { p: string[]; q: Record<string, number> };
  c103: { nested: { deep: { deeper: { deepest: string } } } };
  d103: number;
  e103: string;
  f103: boolean;
  g103: null;
  h103: undefined;
  i103: bigint;
  j103: symbol;
}

type PartialBig103 = DeepPartial<BigRecord103>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten103<T> = T extends Array<infer U> ? Flatten103<U> : T;
type Nested103 = number[][][][][][][][][][];
type Flat103 = Flatten103<Nested103>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly103<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly103<T[K]> : T[K];
};
type DeepRequired103<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired103<T[K]> : T[K];
};
type FR103 = DeepReadonly103<DeepRequired103<PartialBig103>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion103 =
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

type ExtractAlpha103 = Extract<BigUnion103, "alpha" | "bravo" | "charlie">;
type ExcludeZulu103 = Exclude<BigUnion103, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA103 { width: number; height: number; depth: number }
interface ShapeB103 { color: string; opacity: number; blend: string }
interface ShapeC103 { x: number; y: number; z: number; w: number }
interface ShapeD103 { label: string; title: string; summary: string }

type Combined103 = ShapeA103 & ShapeB103 & ShapeC103 & ShapeD103;
type OptionalAll103 = { [K in keyof Combined103]?: Combined103[K] };
type RequiredAll103 = { [K in keyof Combined103]-?: Combined103[K] };
type ReadonlyAll103 = { readonly [K in keyof Combined103]: Combined103[K] };
type NullableAll103 = { [K in keyof Combined103]: Combined103[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString103<T> = T extends string ? true : false;
type IsNumber103<T> = T extends number ? true : false;
type TypeName103<T> = T extends string
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

type TypeNames103 = {
  [K in keyof BigRecord103]: TypeName103<BigRecord103[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb103 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource103 = "user" | "post" | "comment" | "tag" | "category";
type Action103 = `${Verb103}_${Resource103}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise103<T> = T extends Promise<infer U> ? UnwrapPromise103<U> : T;
type UnwrapArray103<T> = T extends (infer U)[] ? UnwrapArray103<U> : T;
type Head103<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail103<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation103<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation103<Exclude<T, K>>]
  : never;

type SmallUnion103 = "a" | "b" | "c" | "d";
type AllPerms103 = Permutation103<SmallUnion103>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig103,
  Flat103,
  FR103,
  BigUnion103,
  ExtractAlpha103,
  ExcludeZulu103,
  OptionalAll103,
  RequiredAll103,
  ReadonlyAll103,
  NullableAll103,
  TypeNames103,
  Action103,
  AllPerms103,
};
