// pkg-09 / types-06  (seed 906) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord906 {
  a906: { x: number; y: string; z: boolean };
  b906: { p: string[]; q: Record<string, number> };
  c906: { nested: { deep: { deeper: { deepest: string } } } };
  d906: number;
  e906: string;
  f906: boolean;
  g906: null;
  h906: undefined;
  i906: bigint;
  j906: symbol;
}

type PartialBig906 = DeepPartial<BigRecord906>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten906<T> = T extends Array<infer U> ? Flatten906<U> : T;
type Nested906 = number[][][][][][][][][][];
type Flat906 = Flatten906<Nested906>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly906<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly906<T[K]> : T[K];
};
type DeepRequired906<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired906<T[K]> : T[K];
};
type FR906 = DeepReadonly906<DeepRequired906<PartialBig906>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion906 =
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

type ExtractAlpha906 = Extract<BigUnion906, "alpha" | "bravo" | "charlie">;
type ExcludeZulu906 = Exclude<BigUnion906, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA906 { width: number; height: number; depth: number }
interface ShapeB906 { color: string; opacity: number; blend: string }
interface ShapeC906 { x: number; y: number; z: number; w: number }
interface ShapeD906 { label: string; title: string; summary: string }

type Combined906 = ShapeA906 & ShapeB906 & ShapeC906 & ShapeD906;
type OptionalAll906 = { [K in keyof Combined906]?: Combined906[K] };
type RequiredAll906 = { [K in keyof Combined906]-?: Combined906[K] };
type ReadonlyAll906 = { readonly [K in keyof Combined906]: Combined906[K] };
type NullableAll906 = { [K in keyof Combined906]: Combined906[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString906<T> = T extends string ? true : false;
type IsNumber906<T> = T extends number ? true : false;
type TypeName906<T> = T extends string
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

type TypeNames906 = {
  [K in keyof BigRecord906]: TypeName906<BigRecord906[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb906 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource906 = "user" | "post" | "comment" | "tag" | "category";
type Action906 = `${Verb906}_${Resource906}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise906<T> = T extends Promise<infer U> ? UnwrapPromise906<U> : T;
type UnwrapArray906<T> = T extends (infer U)[] ? UnwrapArray906<U> : T;
type Head906<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail906<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation906<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation906<Exclude<T, K>>]
  : never;

type SmallUnion906 = "a" | "b" | "c" | "d";
type AllPerms906 = Permutation906<SmallUnion906>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig906,
  Flat906,
  FR906,
  BigUnion906,
  ExtractAlpha906,
  ExcludeZulu906,
  OptionalAll906,
  RequiredAll906,
  ReadonlyAll906,
  NullableAll906,
  TypeNames906,
  Action906,
  AllPerms906,
};
