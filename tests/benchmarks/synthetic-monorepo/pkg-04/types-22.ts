// pkg-04 / types-22  (seed 422) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord422 {
  a422: { x: number; y: string; z: boolean };
  b422: { p: string[]; q: Record<string, number> };
  c422: { nested: { deep: { deeper: { deepest: string } } } };
  d422: number;
  e422: string;
  f422: boolean;
  g422: null;
  h422: undefined;
  i422: bigint;
  j422: symbol;
}

type PartialBig422 = DeepPartial<BigRecord422>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten422<T> = T extends Array<infer U> ? Flatten422<U> : T;
type Nested422 = number[][][][][][][][][][];
type Flat422 = Flatten422<Nested422>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly422<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly422<T[K]> : T[K];
};
type DeepRequired422<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired422<T[K]> : T[K];
};
type FR422 = DeepReadonly422<DeepRequired422<PartialBig422>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion422 =
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

type ExtractAlpha422 = Extract<BigUnion422, "alpha" | "bravo" | "charlie">;
type ExcludeZulu422 = Exclude<BigUnion422, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA422 { width: number; height: number; depth: number }
interface ShapeB422 { color: string; opacity: number; blend: string }
interface ShapeC422 { x: number; y: number; z: number; w: number }
interface ShapeD422 { label: string; title: string; summary: string }

type Combined422 = ShapeA422 & ShapeB422 & ShapeC422 & ShapeD422;
type OptionalAll422 = { [K in keyof Combined422]?: Combined422[K] };
type RequiredAll422 = { [K in keyof Combined422]-?: Combined422[K] };
type ReadonlyAll422 = { readonly [K in keyof Combined422]: Combined422[K] };
type NullableAll422 = { [K in keyof Combined422]: Combined422[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString422<T> = T extends string ? true : false;
type IsNumber422<T> = T extends number ? true : false;
type TypeName422<T> = T extends string
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

type TypeNames422 = {
  [K in keyof BigRecord422]: TypeName422<BigRecord422[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb422 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource422 = "user" | "post" | "comment" | "tag" | "category";
type Action422 = `${Verb422}_${Resource422}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise422<T> = T extends Promise<infer U> ? UnwrapPromise422<U> : T;
type UnwrapArray422<T> = T extends (infer U)[] ? UnwrapArray422<U> : T;
type Head422<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail422<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation422<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation422<Exclude<T, K>>]
  : never;

type SmallUnion422 = "a" | "b" | "c" | "d";
type AllPerms422 = Permutation422<SmallUnion422>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig422,
  Flat422,
  FR422,
  BigUnion422,
  ExtractAlpha422,
  ExcludeZulu422,
  OptionalAll422,
  RequiredAll422,
  ReadonlyAll422,
  NullableAll422,
  TypeNames422,
  Action422,
  AllPerms422,
};
