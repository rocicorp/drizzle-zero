// pkg-04 / types-38  (seed 438) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord438 {
  a438: { x: number; y: string; z: boolean };
  b438: { p: string[]; q: Record<string, number> };
  c438: { nested: { deep: { deeper: { deepest: string } } } };
  d438: number;
  e438: string;
  f438: boolean;
  g438: null;
  h438: undefined;
  i438: bigint;
  j438: symbol;
}

type PartialBig438 = DeepPartial<BigRecord438>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten438<T> = T extends Array<infer U> ? Flatten438<U> : T;
type Nested438 = number[][][][][][][][][][];
type Flat438 = Flatten438<Nested438>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly438<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly438<T[K]> : T[K];
};
type DeepRequired438<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired438<T[K]> : T[K];
};
type FR438 = DeepReadonly438<DeepRequired438<PartialBig438>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion438 =
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

type ExtractAlpha438 = Extract<BigUnion438, "alpha" | "bravo" | "charlie">;
type ExcludeZulu438 = Exclude<BigUnion438, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA438 { width: number; height: number; depth: number }
interface ShapeB438 { color: string; opacity: number; blend: string }
interface ShapeC438 { x: number; y: number; z: number; w: number }
interface ShapeD438 { label: string; title: string; summary: string }

type Combined438 = ShapeA438 & ShapeB438 & ShapeC438 & ShapeD438;
type OptionalAll438 = { [K in keyof Combined438]?: Combined438[K] };
type RequiredAll438 = { [K in keyof Combined438]-?: Combined438[K] };
type ReadonlyAll438 = { readonly [K in keyof Combined438]: Combined438[K] };
type NullableAll438 = { [K in keyof Combined438]: Combined438[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString438<T> = T extends string ? true : false;
type IsNumber438<T> = T extends number ? true : false;
type TypeName438<T> = T extends string
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

type TypeNames438 = {
  [K in keyof BigRecord438]: TypeName438<BigRecord438[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb438 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource438 = "user" | "post" | "comment" | "tag" | "category";
type Action438 = `${Verb438}_${Resource438}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise438<T> = T extends Promise<infer U> ? UnwrapPromise438<U> : T;
type UnwrapArray438<T> = T extends (infer U)[] ? UnwrapArray438<U> : T;
type Head438<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail438<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation438<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation438<Exclude<T, K>>]
  : never;

type SmallUnion438 = "a" | "b" | "c" | "d";
type AllPerms438 = Permutation438<SmallUnion438>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig438,
  Flat438,
  FR438,
  BigUnion438,
  ExtractAlpha438,
  ExcludeZulu438,
  OptionalAll438,
  RequiredAll438,
  ReadonlyAll438,
  NullableAll438,
  TypeNames438,
  Action438,
  AllPerms438,
};
