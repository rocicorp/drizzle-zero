// pkg-07 / types-18  (seed 718) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord718 {
  a718: { x: number; y: string; z: boolean };
  b718: { p: string[]; q: Record<string, number> };
  c718: { nested: { deep: { deeper: { deepest: string } } } };
  d718: number;
  e718: string;
  f718: boolean;
  g718: null;
  h718: undefined;
  i718: bigint;
  j718: symbol;
}

type PartialBig718 = DeepPartial<BigRecord718>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten718<T> = T extends Array<infer U> ? Flatten718<U> : T;
type Nested718 = number[][][][][][][][][][];
type Flat718 = Flatten718<Nested718>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly718<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly718<T[K]> : T[K];
};
type DeepRequired718<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired718<T[K]> : T[K];
};
type FR718 = DeepReadonly718<DeepRequired718<PartialBig718>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion718 =
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

type ExtractAlpha718 = Extract<BigUnion718, "alpha" | "bravo" | "charlie">;
type ExcludeZulu718 = Exclude<BigUnion718, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA718 { width: number; height: number; depth: number }
interface ShapeB718 { color: string; opacity: number; blend: string }
interface ShapeC718 { x: number; y: number; z: number; w: number }
interface ShapeD718 { label: string; title: string; summary: string }

type Combined718 = ShapeA718 & ShapeB718 & ShapeC718 & ShapeD718;
type OptionalAll718 = { [K in keyof Combined718]?: Combined718[K] };
type RequiredAll718 = { [K in keyof Combined718]-?: Combined718[K] };
type ReadonlyAll718 = { readonly [K in keyof Combined718]: Combined718[K] };
type NullableAll718 = { [K in keyof Combined718]: Combined718[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString718<T> = T extends string ? true : false;
type IsNumber718<T> = T extends number ? true : false;
type TypeName718<T> = T extends string
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

type TypeNames718 = {
  [K in keyof BigRecord718]: TypeName718<BigRecord718[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb718 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource718 = "user" | "post" | "comment" | "tag" | "category";
type Action718 = `${Verb718}_${Resource718}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise718<T> = T extends Promise<infer U> ? UnwrapPromise718<U> : T;
type UnwrapArray718<T> = T extends (infer U)[] ? UnwrapArray718<U> : T;
type Head718<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail718<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation718<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation718<Exclude<T, K>>]
  : never;

type SmallUnion718 = "a" | "b" | "c" | "d";
type AllPerms718 = Permutation718<SmallUnion718>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig718,
  Flat718,
  FR718,
  BigUnion718,
  ExtractAlpha718,
  ExcludeZulu718,
  OptionalAll718,
  RequiredAll718,
  ReadonlyAll718,
  NullableAll718,
  TypeNames718,
  Action718,
  AllPerms718,
};
