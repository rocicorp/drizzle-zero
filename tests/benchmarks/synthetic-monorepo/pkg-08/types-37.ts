// pkg-08 / types-37  (seed 837) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord837 {
  a837: { x: number; y: string; z: boolean };
  b837: { p: string[]; q: Record<string, number> };
  c837: { nested: { deep: { deeper: { deepest: string } } } };
  d837: number;
  e837: string;
  f837: boolean;
  g837: null;
  h837: undefined;
  i837: bigint;
  j837: symbol;
}

type PartialBig837 = DeepPartial<BigRecord837>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten837<T> = T extends Array<infer U> ? Flatten837<U> : T;
type Nested837 = number[][][][][][][][][][];
type Flat837 = Flatten837<Nested837>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly837<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly837<T[K]> : T[K];
};
type DeepRequired837<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired837<T[K]> : T[K];
};
type FR837 = DeepReadonly837<DeepRequired837<PartialBig837>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion837 =
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

type ExtractAlpha837 = Extract<BigUnion837, "alpha" | "bravo" | "charlie">;
type ExcludeZulu837 = Exclude<BigUnion837, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA837 { width: number; height: number; depth: number }
interface ShapeB837 { color: string; opacity: number; blend: string }
interface ShapeC837 { x: number; y: number; z: number; w: number }
interface ShapeD837 { label: string; title: string; summary: string }

type Combined837 = ShapeA837 & ShapeB837 & ShapeC837 & ShapeD837;
type OptionalAll837 = { [K in keyof Combined837]?: Combined837[K] };
type RequiredAll837 = { [K in keyof Combined837]-?: Combined837[K] };
type ReadonlyAll837 = { readonly [K in keyof Combined837]: Combined837[K] };
type NullableAll837 = { [K in keyof Combined837]: Combined837[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString837<T> = T extends string ? true : false;
type IsNumber837<T> = T extends number ? true : false;
type TypeName837<T> = T extends string
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

type TypeNames837 = {
  [K in keyof BigRecord837]: TypeName837<BigRecord837[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb837 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource837 = "user" | "post" | "comment" | "tag" | "category";
type Action837 = `${Verb837}_${Resource837}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise837<T> = T extends Promise<infer U> ? UnwrapPromise837<U> : T;
type UnwrapArray837<T> = T extends (infer U)[] ? UnwrapArray837<U> : T;
type Head837<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail837<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation837<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation837<Exclude<T, K>>]
  : never;

type SmallUnion837 = "a" | "b" | "c" | "d";
type AllPerms837 = Permutation837<SmallUnion837>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig837,
  Flat837,
  FR837,
  BigUnion837,
  ExtractAlpha837,
  ExcludeZulu837,
  OptionalAll837,
  RequiredAll837,
  ReadonlyAll837,
  NullableAll837,
  TypeNames837,
  Action837,
  AllPerms837,
};
