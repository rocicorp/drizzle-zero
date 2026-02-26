// pkg-03 / types-25  (seed 325) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord325 {
  a325: { x: number; y: string; z: boolean };
  b325: { p: string[]; q: Record<string, number> };
  c325: { nested: { deep: { deeper: { deepest: string } } } };
  d325: number;
  e325: string;
  f325: boolean;
  g325: null;
  h325: undefined;
  i325: bigint;
  j325: symbol;
}

type PartialBig325 = DeepPartial<BigRecord325>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten325<T> = T extends Array<infer U> ? Flatten325<U> : T;
type Nested325 = number[][][][][][][][][][];
type Flat325 = Flatten325<Nested325>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly325<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly325<T[K]> : T[K];
};
type DeepRequired325<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired325<T[K]> : T[K];
};
type FR325 = DeepReadonly325<DeepRequired325<PartialBig325>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion325 =
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

type ExtractAlpha325 = Extract<BigUnion325, "alpha" | "bravo" | "charlie">;
type ExcludeZulu325 = Exclude<BigUnion325, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA325 { width: number; height: number; depth: number }
interface ShapeB325 { color: string; opacity: number; blend: string }
interface ShapeC325 { x: number; y: number; z: number; w: number }
interface ShapeD325 { label: string; title: string; summary: string }

type Combined325 = ShapeA325 & ShapeB325 & ShapeC325 & ShapeD325;
type OptionalAll325 = { [K in keyof Combined325]?: Combined325[K] };
type RequiredAll325 = { [K in keyof Combined325]-?: Combined325[K] };
type ReadonlyAll325 = { readonly [K in keyof Combined325]: Combined325[K] };
type NullableAll325 = { [K in keyof Combined325]: Combined325[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString325<T> = T extends string ? true : false;
type IsNumber325<T> = T extends number ? true : false;
type TypeName325<T> = T extends string
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

type TypeNames325 = {
  [K in keyof BigRecord325]: TypeName325<BigRecord325[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb325 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource325 = "user" | "post" | "comment" | "tag" | "category";
type Action325 = `${Verb325}_${Resource325}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise325<T> = T extends Promise<infer U> ? UnwrapPromise325<U> : T;
type UnwrapArray325<T> = T extends (infer U)[] ? UnwrapArray325<U> : T;
type Head325<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail325<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation325<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation325<Exclude<T, K>>]
  : never;

type SmallUnion325 = "a" | "b" | "c" | "d";
type AllPerms325 = Permutation325<SmallUnion325>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig325,
  Flat325,
  FR325,
  BigUnion325,
  ExtractAlpha325,
  ExcludeZulu325,
  OptionalAll325,
  RequiredAll325,
  ReadonlyAll325,
  NullableAll325,
  TypeNames325,
  Action325,
  AllPerms325,
};
