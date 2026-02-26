// pkg-05 / types-29  (seed 529) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord529 {
  a529: { x: number; y: string; z: boolean };
  b529: { p: string[]; q: Record<string, number> };
  c529: { nested: { deep: { deeper: { deepest: string } } } };
  d529: number;
  e529: string;
  f529: boolean;
  g529: null;
  h529: undefined;
  i529: bigint;
  j529: symbol;
}

type PartialBig529 = DeepPartial<BigRecord529>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten529<T> = T extends Array<infer U> ? Flatten529<U> : T;
type Nested529 = number[][][][][][][][][][];
type Flat529 = Flatten529<Nested529>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly529<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly529<T[K]> : T[K];
};
type DeepRequired529<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired529<T[K]> : T[K];
};
type FR529 = DeepReadonly529<DeepRequired529<PartialBig529>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion529 =
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

type ExtractAlpha529 = Extract<BigUnion529, "alpha" | "bravo" | "charlie">;
type ExcludeZulu529 = Exclude<BigUnion529, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA529 { width: number; height: number; depth: number }
interface ShapeB529 { color: string; opacity: number; blend: string }
interface ShapeC529 { x: number; y: number; z: number; w: number }
interface ShapeD529 { label: string; title: string; summary: string }

type Combined529 = ShapeA529 & ShapeB529 & ShapeC529 & ShapeD529;
type OptionalAll529 = { [K in keyof Combined529]?: Combined529[K] };
type RequiredAll529 = { [K in keyof Combined529]-?: Combined529[K] };
type ReadonlyAll529 = { readonly [K in keyof Combined529]: Combined529[K] };
type NullableAll529 = { [K in keyof Combined529]: Combined529[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString529<T> = T extends string ? true : false;
type IsNumber529<T> = T extends number ? true : false;
type TypeName529<T> = T extends string
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

type TypeNames529 = {
  [K in keyof BigRecord529]: TypeName529<BigRecord529[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb529 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource529 = "user" | "post" | "comment" | "tag" | "category";
type Action529 = `${Verb529}_${Resource529}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise529<T> = T extends Promise<infer U> ? UnwrapPromise529<U> : T;
type UnwrapArray529<T> = T extends (infer U)[] ? UnwrapArray529<U> : T;
type Head529<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail529<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation529<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation529<Exclude<T, K>>]
  : never;

type SmallUnion529 = "a" | "b" | "c" | "d";
type AllPerms529 = Permutation529<SmallUnion529>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig529,
  Flat529,
  FR529,
  BigUnion529,
  ExtractAlpha529,
  ExcludeZulu529,
  OptionalAll529,
  RequiredAll529,
  ReadonlyAll529,
  NullableAll529,
  TypeNames529,
  Action529,
  AllPerms529,
};
