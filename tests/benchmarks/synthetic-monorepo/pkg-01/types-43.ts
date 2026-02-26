// pkg-01 / types-43  (seed 143) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord143 {
  a143: { x: number; y: string; z: boolean };
  b143: { p: string[]; q: Record<string, number> };
  c143: { nested: { deep: { deeper: { deepest: string } } } };
  d143: number;
  e143: string;
  f143: boolean;
  g143: null;
  h143: undefined;
  i143: bigint;
  j143: symbol;
}

type PartialBig143 = DeepPartial<BigRecord143>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten143<T> = T extends Array<infer U> ? Flatten143<U> : T;
type Nested143 = number[][][][][][][][][][];
type Flat143 = Flatten143<Nested143>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly143<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly143<T[K]> : T[K];
};
type DeepRequired143<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired143<T[K]> : T[K];
};
type FR143 = DeepReadonly143<DeepRequired143<PartialBig143>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion143 =
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

type ExtractAlpha143 = Extract<BigUnion143, "alpha" | "bravo" | "charlie">;
type ExcludeZulu143 = Exclude<BigUnion143, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA143 { width: number; height: number; depth: number }
interface ShapeB143 { color: string; opacity: number; blend: string }
interface ShapeC143 { x: number; y: number; z: number; w: number }
interface ShapeD143 { label: string; title: string; summary: string }

type Combined143 = ShapeA143 & ShapeB143 & ShapeC143 & ShapeD143;
type OptionalAll143 = { [K in keyof Combined143]?: Combined143[K] };
type RequiredAll143 = { [K in keyof Combined143]-?: Combined143[K] };
type ReadonlyAll143 = { readonly [K in keyof Combined143]: Combined143[K] };
type NullableAll143 = { [K in keyof Combined143]: Combined143[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString143<T> = T extends string ? true : false;
type IsNumber143<T> = T extends number ? true : false;
type TypeName143<T> = T extends string
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

type TypeNames143 = {
  [K in keyof BigRecord143]: TypeName143<BigRecord143[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb143 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource143 = "user" | "post" | "comment" | "tag" | "category";
type Action143 = `${Verb143}_${Resource143}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise143<T> = T extends Promise<infer U> ? UnwrapPromise143<U> : T;
type UnwrapArray143<T> = T extends (infer U)[] ? UnwrapArray143<U> : T;
type Head143<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail143<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation143<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation143<Exclude<T, K>>]
  : never;

type SmallUnion143 = "a" | "b" | "c" | "d";
type AllPerms143 = Permutation143<SmallUnion143>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig143,
  Flat143,
  FR143,
  BigUnion143,
  ExtractAlpha143,
  ExcludeZulu143,
  OptionalAll143,
  RequiredAll143,
  ReadonlyAll143,
  NullableAll143,
  TypeNames143,
  Action143,
  AllPerms143,
};
