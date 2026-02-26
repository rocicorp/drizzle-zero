// pkg-02 / types-25  (seed 225) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord225 {
  a225: { x: number; y: string; z: boolean };
  b225: { p: string[]; q: Record<string, number> };
  c225: { nested: { deep: { deeper: { deepest: string } } } };
  d225: number;
  e225: string;
  f225: boolean;
  g225: null;
  h225: undefined;
  i225: bigint;
  j225: symbol;
}

type PartialBig225 = DeepPartial<BigRecord225>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten225<T> = T extends Array<infer U> ? Flatten225<U> : T;
type Nested225 = number[][][][][][][][][][];
type Flat225 = Flatten225<Nested225>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly225<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly225<T[K]> : T[K];
};
type DeepRequired225<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired225<T[K]> : T[K];
};
type FR225 = DeepReadonly225<DeepRequired225<PartialBig225>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion225 =
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

type ExtractAlpha225 = Extract<BigUnion225, "alpha" | "bravo" | "charlie">;
type ExcludeZulu225 = Exclude<BigUnion225, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA225 { width: number; height: number; depth: number }
interface ShapeB225 { color: string; opacity: number; blend: string }
interface ShapeC225 { x: number; y: number; z: number; w: number }
interface ShapeD225 { label: string; title: string; summary: string }

type Combined225 = ShapeA225 & ShapeB225 & ShapeC225 & ShapeD225;
type OptionalAll225 = { [K in keyof Combined225]?: Combined225[K] };
type RequiredAll225 = { [K in keyof Combined225]-?: Combined225[K] };
type ReadonlyAll225 = { readonly [K in keyof Combined225]: Combined225[K] };
type NullableAll225 = { [K in keyof Combined225]: Combined225[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString225<T> = T extends string ? true : false;
type IsNumber225<T> = T extends number ? true : false;
type TypeName225<T> = T extends string
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

type TypeNames225 = {
  [K in keyof BigRecord225]: TypeName225<BigRecord225[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb225 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource225 = "user" | "post" | "comment" | "tag" | "category";
type Action225 = `${Verb225}_${Resource225}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise225<T> = T extends Promise<infer U> ? UnwrapPromise225<U> : T;
type UnwrapArray225<T> = T extends (infer U)[] ? UnwrapArray225<U> : T;
type Head225<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail225<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation225<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation225<Exclude<T, K>>]
  : never;

type SmallUnion225 = "a" | "b" | "c" | "d";
type AllPerms225 = Permutation225<SmallUnion225>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig225,
  Flat225,
  FR225,
  BigUnion225,
  ExtractAlpha225,
  ExcludeZulu225,
  OptionalAll225,
  RequiredAll225,
  ReadonlyAll225,
  NullableAll225,
  TypeNames225,
  Action225,
  AllPerms225,
};
