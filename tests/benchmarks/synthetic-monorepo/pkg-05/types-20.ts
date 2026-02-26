// pkg-05 / types-20  (seed 520) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord520 {
  a520: { x: number; y: string; z: boolean };
  b520: { p: string[]; q: Record<string, number> };
  c520: { nested: { deep: { deeper: { deepest: string } } } };
  d520: number;
  e520: string;
  f520: boolean;
  g520: null;
  h520: undefined;
  i520: bigint;
  j520: symbol;
}

type PartialBig520 = DeepPartial<BigRecord520>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten520<T> = T extends Array<infer U> ? Flatten520<U> : T;
type Nested520 = number[][][][][][][][][][];
type Flat520 = Flatten520<Nested520>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly520<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly520<T[K]> : T[K];
};
type DeepRequired520<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired520<T[K]> : T[K];
};
type FR520 = DeepReadonly520<DeepRequired520<PartialBig520>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion520 =
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

type ExtractAlpha520 = Extract<BigUnion520, "alpha" | "bravo" | "charlie">;
type ExcludeZulu520 = Exclude<BigUnion520, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA520 { width: number; height: number; depth: number }
interface ShapeB520 { color: string; opacity: number; blend: string }
interface ShapeC520 { x: number; y: number; z: number; w: number }
interface ShapeD520 { label: string; title: string; summary: string }

type Combined520 = ShapeA520 & ShapeB520 & ShapeC520 & ShapeD520;
type OptionalAll520 = { [K in keyof Combined520]?: Combined520[K] };
type RequiredAll520 = { [K in keyof Combined520]-?: Combined520[K] };
type ReadonlyAll520 = { readonly [K in keyof Combined520]: Combined520[K] };
type NullableAll520 = { [K in keyof Combined520]: Combined520[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString520<T> = T extends string ? true : false;
type IsNumber520<T> = T extends number ? true : false;
type TypeName520<T> = T extends string
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

type TypeNames520 = {
  [K in keyof BigRecord520]: TypeName520<BigRecord520[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb520 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource520 = "user" | "post" | "comment" | "tag" | "category";
type Action520 = `${Verb520}_${Resource520}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise520<T> = T extends Promise<infer U> ? UnwrapPromise520<U> : T;
type UnwrapArray520<T> = T extends (infer U)[] ? UnwrapArray520<U> : T;
type Head520<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail520<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation520<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation520<Exclude<T, K>>]
  : never;

type SmallUnion520 = "a" | "b" | "c" | "d";
type AllPerms520 = Permutation520<SmallUnion520>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig520,
  Flat520,
  FR520,
  BigUnion520,
  ExtractAlpha520,
  ExcludeZulu520,
  OptionalAll520,
  RequiredAll520,
  ReadonlyAll520,
  NullableAll520,
  TypeNames520,
  Action520,
  AllPerms520,
};
