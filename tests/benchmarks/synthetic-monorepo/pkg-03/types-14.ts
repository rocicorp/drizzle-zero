// pkg-03 / types-14  (seed 314) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord314 {
  a314: { x: number; y: string; z: boolean };
  b314: { p: string[]; q: Record<string, number> };
  c314: { nested: { deep: { deeper: { deepest: string } } } };
  d314: number;
  e314: string;
  f314: boolean;
  g314: null;
  h314: undefined;
  i314: bigint;
  j314: symbol;
}

type PartialBig314 = DeepPartial<BigRecord314>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten314<T> = T extends Array<infer U> ? Flatten314<U> : T;
type Nested314 = number[][][][][][][][][][];
type Flat314 = Flatten314<Nested314>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly314<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly314<T[K]> : T[K];
};
type DeepRequired314<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired314<T[K]> : T[K];
};
type FR314 = DeepReadonly314<DeepRequired314<PartialBig314>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion314 =
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

type ExtractAlpha314 = Extract<BigUnion314, "alpha" | "bravo" | "charlie">;
type ExcludeZulu314 = Exclude<BigUnion314, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA314 { width: number; height: number; depth: number }
interface ShapeB314 { color: string; opacity: number; blend: string }
interface ShapeC314 { x: number; y: number; z: number; w: number }
interface ShapeD314 { label: string; title: string; summary: string }

type Combined314 = ShapeA314 & ShapeB314 & ShapeC314 & ShapeD314;
type OptionalAll314 = { [K in keyof Combined314]?: Combined314[K] };
type RequiredAll314 = { [K in keyof Combined314]-?: Combined314[K] };
type ReadonlyAll314 = { readonly [K in keyof Combined314]: Combined314[K] };
type NullableAll314 = { [K in keyof Combined314]: Combined314[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString314<T> = T extends string ? true : false;
type IsNumber314<T> = T extends number ? true : false;
type TypeName314<T> = T extends string
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

type TypeNames314 = {
  [K in keyof BigRecord314]: TypeName314<BigRecord314[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb314 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource314 = "user" | "post" | "comment" | "tag" | "category";
type Action314 = `${Verb314}_${Resource314}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise314<T> = T extends Promise<infer U> ? UnwrapPromise314<U> : T;
type UnwrapArray314<T> = T extends (infer U)[] ? UnwrapArray314<U> : T;
type Head314<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail314<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation314<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation314<Exclude<T, K>>]
  : never;

type SmallUnion314 = "a" | "b" | "c" | "d";
type AllPerms314 = Permutation314<SmallUnion314>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig314,
  Flat314,
  FR314,
  BigUnion314,
  ExtractAlpha314,
  ExcludeZulu314,
  OptionalAll314,
  RequiredAll314,
  ReadonlyAll314,
  NullableAll314,
  TypeNames314,
  Action314,
  AllPerms314,
};
