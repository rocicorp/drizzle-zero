// pkg-05 / types-27  (seed 527) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord527 {
  a527: { x: number; y: string; z: boolean };
  b527: { p: string[]; q: Record<string, number> };
  c527: { nested: { deep: { deeper: { deepest: string } } } };
  d527: number;
  e527: string;
  f527: boolean;
  g527: null;
  h527: undefined;
  i527: bigint;
  j527: symbol;
}

type PartialBig527 = DeepPartial<BigRecord527>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten527<T> = T extends Array<infer U> ? Flatten527<U> : T;
type Nested527 = number[][][][][][][][][][];
type Flat527 = Flatten527<Nested527>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly527<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly527<T[K]> : T[K];
};
type DeepRequired527<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired527<T[K]> : T[K];
};
type FR527 = DeepReadonly527<DeepRequired527<PartialBig527>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion527 =
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

type ExtractAlpha527 = Extract<BigUnion527, "alpha" | "bravo" | "charlie">;
type ExcludeZulu527 = Exclude<BigUnion527, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA527 { width: number; height: number; depth: number }
interface ShapeB527 { color: string; opacity: number; blend: string }
interface ShapeC527 { x: number; y: number; z: number; w: number }
interface ShapeD527 { label: string; title: string; summary: string }

type Combined527 = ShapeA527 & ShapeB527 & ShapeC527 & ShapeD527;
type OptionalAll527 = { [K in keyof Combined527]?: Combined527[K] };
type RequiredAll527 = { [K in keyof Combined527]-?: Combined527[K] };
type ReadonlyAll527 = { readonly [K in keyof Combined527]: Combined527[K] };
type NullableAll527 = { [K in keyof Combined527]: Combined527[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString527<T> = T extends string ? true : false;
type IsNumber527<T> = T extends number ? true : false;
type TypeName527<T> = T extends string
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

type TypeNames527 = {
  [K in keyof BigRecord527]: TypeName527<BigRecord527[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb527 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource527 = "user" | "post" | "comment" | "tag" | "category";
type Action527 = `${Verb527}_${Resource527}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise527<T> = T extends Promise<infer U> ? UnwrapPromise527<U> : T;
type UnwrapArray527<T> = T extends (infer U)[] ? UnwrapArray527<U> : T;
type Head527<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail527<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation527<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation527<Exclude<T, K>>]
  : never;

type SmallUnion527 = "a" | "b" | "c" | "d";
type AllPerms527 = Permutation527<SmallUnion527>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig527,
  Flat527,
  FR527,
  BigUnion527,
  ExtractAlpha527,
  ExcludeZulu527,
  OptionalAll527,
  RequiredAll527,
  ReadonlyAll527,
  NullableAll527,
  TypeNames527,
  Action527,
  AllPerms527,
};
