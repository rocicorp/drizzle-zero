// pkg-09 / types-24  (seed 924) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord924 {
  a924: { x: number; y: string; z: boolean };
  b924: { p: string[]; q: Record<string, number> };
  c924: { nested: { deep: { deeper: { deepest: string } } } };
  d924: number;
  e924: string;
  f924: boolean;
  g924: null;
  h924: undefined;
  i924: bigint;
  j924: symbol;
}

type PartialBig924 = DeepPartial<BigRecord924>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten924<T> = T extends Array<infer U> ? Flatten924<U> : T;
type Nested924 = number[][][][][][][][][][];
type Flat924 = Flatten924<Nested924>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly924<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly924<T[K]> : T[K];
};
type DeepRequired924<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired924<T[K]> : T[K];
};
type FR924 = DeepReadonly924<DeepRequired924<PartialBig924>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion924 =
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

type ExtractAlpha924 = Extract<BigUnion924, "alpha" | "bravo" | "charlie">;
type ExcludeZulu924 = Exclude<BigUnion924, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA924 { width: number; height: number; depth: number }
interface ShapeB924 { color: string; opacity: number; blend: string }
interface ShapeC924 { x: number; y: number; z: number; w: number }
interface ShapeD924 { label: string; title: string; summary: string }

type Combined924 = ShapeA924 & ShapeB924 & ShapeC924 & ShapeD924;
type OptionalAll924 = { [K in keyof Combined924]?: Combined924[K] };
type RequiredAll924 = { [K in keyof Combined924]-?: Combined924[K] };
type ReadonlyAll924 = { readonly [K in keyof Combined924]: Combined924[K] };
type NullableAll924 = { [K in keyof Combined924]: Combined924[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString924<T> = T extends string ? true : false;
type IsNumber924<T> = T extends number ? true : false;
type TypeName924<T> = T extends string
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

type TypeNames924 = {
  [K in keyof BigRecord924]: TypeName924<BigRecord924[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb924 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource924 = "user" | "post" | "comment" | "tag" | "category";
type Action924 = `${Verb924}_${Resource924}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise924<T> = T extends Promise<infer U> ? UnwrapPromise924<U> : T;
type UnwrapArray924<T> = T extends (infer U)[] ? UnwrapArray924<U> : T;
type Head924<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail924<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation924<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation924<Exclude<T, K>>]
  : never;

type SmallUnion924 = "a" | "b" | "c" | "d";
type AllPerms924 = Permutation924<SmallUnion924>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig924,
  Flat924,
  FR924,
  BigUnion924,
  ExtractAlpha924,
  ExcludeZulu924,
  OptionalAll924,
  RequiredAll924,
  ReadonlyAll924,
  NullableAll924,
  TypeNames924,
  Action924,
  AllPerms924,
};
