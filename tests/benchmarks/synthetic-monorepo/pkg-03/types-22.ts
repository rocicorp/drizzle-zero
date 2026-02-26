// pkg-03 / types-22  (seed 322) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord322 {
  a322: { x: number; y: string; z: boolean };
  b322: { p: string[]; q: Record<string, number> };
  c322: { nested: { deep: { deeper: { deepest: string } } } };
  d322: number;
  e322: string;
  f322: boolean;
  g322: null;
  h322: undefined;
  i322: bigint;
  j322: symbol;
}

type PartialBig322 = DeepPartial<BigRecord322>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten322<T> = T extends Array<infer U> ? Flatten322<U> : T;
type Nested322 = number[][][][][][][][][][];
type Flat322 = Flatten322<Nested322>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly322<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly322<T[K]> : T[K];
};
type DeepRequired322<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired322<T[K]> : T[K];
};
type FR322 = DeepReadonly322<DeepRequired322<PartialBig322>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion322 =
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

type ExtractAlpha322 = Extract<BigUnion322, "alpha" | "bravo" | "charlie">;
type ExcludeZulu322 = Exclude<BigUnion322, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA322 { width: number; height: number; depth: number }
interface ShapeB322 { color: string; opacity: number; blend: string }
interface ShapeC322 { x: number; y: number; z: number; w: number }
interface ShapeD322 { label: string; title: string; summary: string }

type Combined322 = ShapeA322 & ShapeB322 & ShapeC322 & ShapeD322;
type OptionalAll322 = { [K in keyof Combined322]?: Combined322[K] };
type RequiredAll322 = { [K in keyof Combined322]-?: Combined322[K] };
type ReadonlyAll322 = { readonly [K in keyof Combined322]: Combined322[K] };
type NullableAll322 = { [K in keyof Combined322]: Combined322[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString322<T> = T extends string ? true : false;
type IsNumber322<T> = T extends number ? true : false;
type TypeName322<T> = T extends string
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

type TypeNames322 = {
  [K in keyof BigRecord322]: TypeName322<BigRecord322[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb322 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource322 = "user" | "post" | "comment" | "tag" | "category";
type Action322 = `${Verb322}_${Resource322}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise322<T> = T extends Promise<infer U> ? UnwrapPromise322<U> : T;
type UnwrapArray322<T> = T extends (infer U)[] ? UnwrapArray322<U> : T;
type Head322<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail322<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation322<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation322<Exclude<T, K>>]
  : never;

type SmallUnion322 = "a" | "b" | "c" | "d";
type AllPerms322 = Permutation322<SmallUnion322>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig322,
  Flat322,
  FR322,
  BigUnion322,
  ExtractAlpha322,
  ExcludeZulu322,
  OptionalAll322,
  RequiredAll322,
  ReadonlyAll322,
  NullableAll322,
  TypeNames322,
  Action322,
  AllPerms322,
};
