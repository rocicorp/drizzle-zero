// pkg-07 / types-17  (seed 717) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord717 {
  a717: { x: number; y: string; z: boolean };
  b717: { p: string[]; q: Record<string, number> };
  c717: { nested: { deep: { deeper: { deepest: string } } } };
  d717: number;
  e717: string;
  f717: boolean;
  g717: null;
  h717: undefined;
  i717: bigint;
  j717: symbol;
}

type PartialBig717 = DeepPartial<BigRecord717>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten717<T> = T extends Array<infer U> ? Flatten717<U> : T;
type Nested717 = number[][][][][][][][][][];
type Flat717 = Flatten717<Nested717>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly717<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly717<T[K]> : T[K];
};
type DeepRequired717<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired717<T[K]> : T[K];
};
type FR717 = DeepReadonly717<DeepRequired717<PartialBig717>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion717 =
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

type ExtractAlpha717 = Extract<BigUnion717, "alpha" | "bravo" | "charlie">;
type ExcludeZulu717 = Exclude<BigUnion717, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA717 { width: number; height: number; depth: number }
interface ShapeB717 { color: string; opacity: number; blend: string }
interface ShapeC717 { x: number; y: number; z: number; w: number }
interface ShapeD717 { label: string; title: string; summary: string }

type Combined717 = ShapeA717 & ShapeB717 & ShapeC717 & ShapeD717;
type OptionalAll717 = { [K in keyof Combined717]?: Combined717[K] };
type RequiredAll717 = { [K in keyof Combined717]-?: Combined717[K] };
type ReadonlyAll717 = { readonly [K in keyof Combined717]: Combined717[K] };
type NullableAll717 = { [K in keyof Combined717]: Combined717[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString717<T> = T extends string ? true : false;
type IsNumber717<T> = T extends number ? true : false;
type TypeName717<T> = T extends string
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

type TypeNames717 = {
  [K in keyof BigRecord717]: TypeName717<BigRecord717[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb717 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource717 = "user" | "post" | "comment" | "tag" | "category";
type Action717 = `${Verb717}_${Resource717}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise717<T> = T extends Promise<infer U> ? UnwrapPromise717<U> : T;
type UnwrapArray717<T> = T extends (infer U)[] ? UnwrapArray717<U> : T;
type Head717<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail717<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation717<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation717<Exclude<T, K>>]
  : never;

type SmallUnion717 = "a" | "b" | "c" | "d";
type AllPerms717 = Permutation717<SmallUnion717>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig717,
  Flat717,
  FR717,
  BigUnion717,
  ExtractAlpha717,
  ExcludeZulu717,
  OptionalAll717,
  RequiredAll717,
  ReadonlyAll717,
  NullableAll717,
  TypeNames717,
  Action717,
  AllPerms717,
};
