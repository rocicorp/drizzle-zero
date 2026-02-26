// pkg-04 / types-15  (seed 415) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord415 {
  a415: { x: number; y: string; z: boolean };
  b415: { p: string[]; q: Record<string, number> };
  c415: { nested: { deep: { deeper: { deepest: string } } } };
  d415: number;
  e415: string;
  f415: boolean;
  g415: null;
  h415: undefined;
  i415: bigint;
  j415: symbol;
}

type PartialBig415 = DeepPartial<BigRecord415>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten415<T> = T extends Array<infer U> ? Flatten415<U> : T;
type Nested415 = number[][][][][][][][][][];
type Flat415 = Flatten415<Nested415>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly415<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly415<T[K]> : T[K];
};
type DeepRequired415<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired415<T[K]> : T[K];
};
type FR415 = DeepReadonly415<DeepRequired415<PartialBig415>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion415 =
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

type ExtractAlpha415 = Extract<BigUnion415, "alpha" | "bravo" | "charlie">;
type ExcludeZulu415 = Exclude<BigUnion415, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA415 { width: number; height: number; depth: number }
interface ShapeB415 { color: string; opacity: number; blend: string }
interface ShapeC415 { x: number; y: number; z: number; w: number }
interface ShapeD415 { label: string; title: string; summary: string }

type Combined415 = ShapeA415 & ShapeB415 & ShapeC415 & ShapeD415;
type OptionalAll415 = { [K in keyof Combined415]?: Combined415[K] };
type RequiredAll415 = { [K in keyof Combined415]-?: Combined415[K] };
type ReadonlyAll415 = { readonly [K in keyof Combined415]: Combined415[K] };
type NullableAll415 = { [K in keyof Combined415]: Combined415[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString415<T> = T extends string ? true : false;
type IsNumber415<T> = T extends number ? true : false;
type TypeName415<T> = T extends string
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

type TypeNames415 = {
  [K in keyof BigRecord415]: TypeName415<BigRecord415[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb415 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource415 = "user" | "post" | "comment" | "tag" | "category";
type Action415 = `${Verb415}_${Resource415}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise415<T> = T extends Promise<infer U> ? UnwrapPromise415<U> : T;
type UnwrapArray415<T> = T extends (infer U)[] ? UnwrapArray415<U> : T;
type Head415<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail415<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation415<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation415<Exclude<T, K>>]
  : never;

type SmallUnion415 = "a" | "b" | "c" | "d";
type AllPerms415 = Permutation415<SmallUnion415>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig415,
  Flat415,
  FR415,
  BigUnion415,
  ExtractAlpha415,
  ExcludeZulu415,
  OptionalAll415,
  RequiredAll415,
  ReadonlyAll415,
  NullableAll415,
  TypeNames415,
  Action415,
  AllPerms415,
};
