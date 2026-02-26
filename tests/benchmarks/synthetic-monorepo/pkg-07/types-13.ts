// pkg-07 / types-13  (seed 713) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord713 {
  a713: { x: number; y: string; z: boolean };
  b713: { p: string[]; q: Record<string, number> };
  c713: { nested: { deep: { deeper: { deepest: string } } } };
  d713: number;
  e713: string;
  f713: boolean;
  g713: null;
  h713: undefined;
  i713: bigint;
  j713: symbol;
}

type PartialBig713 = DeepPartial<BigRecord713>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten713<T> = T extends Array<infer U> ? Flatten713<U> : T;
type Nested713 = number[][][][][][][][][][];
type Flat713 = Flatten713<Nested713>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly713<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly713<T[K]> : T[K];
};
type DeepRequired713<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired713<T[K]> : T[K];
};
type FR713 = DeepReadonly713<DeepRequired713<PartialBig713>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion713 =
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

type ExtractAlpha713 = Extract<BigUnion713, "alpha" | "bravo" | "charlie">;
type ExcludeZulu713 = Exclude<BigUnion713, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA713 { width: number; height: number; depth: number }
interface ShapeB713 { color: string; opacity: number; blend: string }
interface ShapeC713 { x: number; y: number; z: number; w: number }
interface ShapeD713 { label: string; title: string; summary: string }

type Combined713 = ShapeA713 & ShapeB713 & ShapeC713 & ShapeD713;
type OptionalAll713 = { [K in keyof Combined713]?: Combined713[K] };
type RequiredAll713 = { [K in keyof Combined713]-?: Combined713[K] };
type ReadonlyAll713 = { readonly [K in keyof Combined713]: Combined713[K] };
type NullableAll713 = { [K in keyof Combined713]: Combined713[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString713<T> = T extends string ? true : false;
type IsNumber713<T> = T extends number ? true : false;
type TypeName713<T> = T extends string
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

type TypeNames713 = {
  [K in keyof BigRecord713]: TypeName713<BigRecord713[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb713 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource713 = "user" | "post" | "comment" | "tag" | "category";
type Action713 = `${Verb713}_${Resource713}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise713<T> = T extends Promise<infer U> ? UnwrapPromise713<U> : T;
type UnwrapArray713<T> = T extends (infer U)[] ? UnwrapArray713<U> : T;
type Head713<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail713<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation713<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation713<Exclude<T, K>>]
  : never;

type SmallUnion713 = "a" | "b" | "c" | "d";
type AllPerms713 = Permutation713<SmallUnion713>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig713,
  Flat713,
  FR713,
  BigUnion713,
  ExtractAlpha713,
  ExcludeZulu713,
  OptionalAll713,
  RequiredAll713,
  ReadonlyAll713,
  NullableAll713,
  TypeNames713,
  Action713,
  AllPerms713,
};
