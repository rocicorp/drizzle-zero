// pkg-09 / types-01  (seed 901) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord901 {
  a901: { x: number; y: string; z: boolean };
  b901: { p: string[]; q: Record<string, number> };
  c901: { nested: { deep: { deeper: { deepest: string } } } };
  d901: number;
  e901: string;
  f901: boolean;
  g901: null;
  h901: undefined;
  i901: bigint;
  j901: symbol;
}

type PartialBig901 = DeepPartial<BigRecord901>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten901<T> = T extends Array<infer U> ? Flatten901<U> : T;
type Nested901 = number[][][][][][][][][][];
type Flat901 = Flatten901<Nested901>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly901<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly901<T[K]> : T[K];
};
type DeepRequired901<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired901<T[K]> : T[K];
};
type FR901 = DeepReadonly901<DeepRequired901<PartialBig901>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion901 =
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

type ExtractAlpha901 = Extract<BigUnion901, "alpha" | "bravo" | "charlie">;
type ExcludeZulu901 = Exclude<BigUnion901, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA901 { width: number; height: number; depth: number }
interface ShapeB901 { color: string; opacity: number; blend: string }
interface ShapeC901 { x: number; y: number; z: number; w: number }
interface ShapeD901 { label: string; title: string; summary: string }

type Combined901 = ShapeA901 & ShapeB901 & ShapeC901 & ShapeD901;
type OptionalAll901 = { [K in keyof Combined901]?: Combined901[K] };
type RequiredAll901 = { [K in keyof Combined901]-?: Combined901[K] };
type ReadonlyAll901 = { readonly [K in keyof Combined901]: Combined901[K] };
type NullableAll901 = { [K in keyof Combined901]: Combined901[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString901<T> = T extends string ? true : false;
type IsNumber901<T> = T extends number ? true : false;
type TypeName901<T> = T extends string
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

type TypeNames901 = {
  [K in keyof BigRecord901]: TypeName901<BigRecord901[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb901 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource901 = "user" | "post" | "comment" | "tag" | "category";
type Action901 = `${Verb901}_${Resource901}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise901<T> = T extends Promise<infer U> ? UnwrapPromise901<U> : T;
type UnwrapArray901<T> = T extends (infer U)[] ? UnwrapArray901<U> : T;
type Head901<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail901<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation901<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation901<Exclude<T, K>>]
  : never;

type SmallUnion901 = "a" | "b" | "c" | "d";
type AllPerms901 = Permutation901<SmallUnion901>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig901,
  Flat901,
  FR901,
  BigUnion901,
  ExtractAlpha901,
  ExcludeZulu901,
  OptionalAll901,
  RequiredAll901,
  ReadonlyAll901,
  NullableAll901,
  TypeNames901,
  Action901,
  AllPerms901,
};
