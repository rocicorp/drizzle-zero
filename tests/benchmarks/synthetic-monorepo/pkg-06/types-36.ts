// pkg-06 / types-36  (seed 636) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord636 {
  a636: { x: number; y: string; z: boolean };
  b636: { p: string[]; q: Record<string, number> };
  c636: { nested: { deep: { deeper: { deepest: string } } } };
  d636: number;
  e636: string;
  f636: boolean;
  g636: null;
  h636: undefined;
  i636: bigint;
  j636: symbol;
}

type PartialBig636 = DeepPartial<BigRecord636>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten636<T> = T extends Array<infer U> ? Flatten636<U> : T;
type Nested636 = number[][][][][][][][][][];
type Flat636 = Flatten636<Nested636>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly636<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly636<T[K]> : T[K];
};
type DeepRequired636<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired636<T[K]> : T[K];
};
type FR636 = DeepReadonly636<DeepRequired636<PartialBig636>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion636 =
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

type ExtractAlpha636 = Extract<BigUnion636, "alpha" | "bravo" | "charlie">;
type ExcludeZulu636 = Exclude<BigUnion636, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA636 { width: number; height: number; depth: number }
interface ShapeB636 { color: string; opacity: number; blend: string }
interface ShapeC636 { x: number; y: number; z: number; w: number }
interface ShapeD636 { label: string; title: string; summary: string }

type Combined636 = ShapeA636 & ShapeB636 & ShapeC636 & ShapeD636;
type OptionalAll636 = { [K in keyof Combined636]?: Combined636[K] };
type RequiredAll636 = { [K in keyof Combined636]-?: Combined636[K] };
type ReadonlyAll636 = { readonly [K in keyof Combined636]: Combined636[K] };
type NullableAll636 = { [K in keyof Combined636]: Combined636[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString636<T> = T extends string ? true : false;
type IsNumber636<T> = T extends number ? true : false;
type TypeName636<T> = T extends string
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

type TypeNames636 = {
  [K in keyof BigRecord636]: TypeName636<BigRecord636[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb636 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource636 = "user" | "post" | "comment" | "tag" | "category";
type Action636 = `${Verb636}_${Resource636}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise636<T> = T extends Promise<infer U> ? UnwrapPromise636<U> : T;
type UnwrapArray636<T> = T extends (infer U)[] ? UnwrapArray636<U> : T;
type Head636<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail636<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation636<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation636<Exclude<T, K>>]
  : never;

type SmallUnion636 = "a" | "b" | "c" | "d";
type AllPerms636 = Permutation636<SmallUnion636>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig636,
  Flat636,
  FR636,
  BigUnion636,
  ExtractAlpha636,
  ExcludeZulu636,
  OptionalAll636,
  RequiredAll636,
  ReadonlyAll636,
  NullableAll636,
  TypeNames636,
  Action636,
  AllPerms636,
};
