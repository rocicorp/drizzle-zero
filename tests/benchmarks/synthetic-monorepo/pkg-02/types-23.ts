// pkg-02 / types-23  (seed 223) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord223 {
  a223: { x: number; y: string; z: boolean };
  b223: { p: string[]; q: Record<string, number> };
  c223: { nested: { deep: { deeper: { deepest: string } } } };
  d223: number;
  e223: string;
  f223: boolean;
  g223: null;
  h223: undefined;
  i223: bigint;
  j223: symbol;
}

type PartialBig223 = DeepPartial<BigRecord223>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten223<T> = T extends Array<infer U> ? Flatten223<U> : T;
type Nested223 = number[][][][][][][][][][];
type Flat223 = Flatten223<Nested223>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly223<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly223<T[K]> : T[K];
};
type DeepRequired223<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired223<T[K]> : T[K];
};
type FR223 = DeepReadonly223<DeepRequired223<PartialBig223>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion223 =
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

type ExtractAlpha223 = Extract<BigUnion223, "alpha" | "bravo" | "charlie">;
type ExcludeZulu223 = Exclude<BigUnion223, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA223 { width: number; height: number; depth: number }
interface ShapeB223 { color: string; opacity: number; blend: string }
interface ShapeC223 { x: number; y: number; z: number; w: number }
interface ShapeD223 { label: string; title: string; summary: string }

type Combined223 = ShapeA223 & ShapeB223 & ShapeC223 & ShapeD223;
type OptionalAll223 = { [K in keyof Combined223]?: Combined223[K] };
type RequiredAll223 = { [K in keyof Combined223]-?: Combined223[K] };
type ReadonlyAll223 = { readonly [K in keyof Combined223]: Combined223[K] };
type NullableAll223 = { [K in keyof Combined223]: Combined223[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString223<T> = T extends string ? true : false;
type IsNumber223<T> = T extends number ? true : false;
type TypeName223<T> = T extends string
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

type TypeNames223 = {
  [K in keyof BigRecord223]: TypeName223<BigRecord223[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb223 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource223 = "user" | "post" | "comment" | "tag" | "category";
type Action223 = `${Verb223}_${Resource223}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise223<T> = T extends Promise<infer U> ? UnwrapPromise223<U> : T;
type UnwrapArray223<T> = T extends (infer U)[] ? UnwrapArray223<U> : T;
type Head223<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail223<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation223<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation223<Exclude<T, K>>]
  : never;

type SmallUnion223 = "a" | "b" | "c" | "d";
type AllPerms223 = Permutation223<SmallUnion223>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig223,
  Flat223,
  FR223,
  BigUnion223,
  ExtractAlpha223,
  ExcludeZulu223,
  OptionalAll223,
  RequiredAll223,
  ReadonlyAll223,
  NullableAll223,
  TypeNames223,
  Action223,
  AllPerms223,
};
