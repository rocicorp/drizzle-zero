// pkg-08 / types-06  (seed 806) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord806 {
  a806: { x: number; y: string; z: boolean };
  b806: { p: string[]; q: Record<string, number> };
  c806: { nested: { deep: { deeper: { deepest: string } } } };
  d806: number;
  e806: string;
  f806: boolean;
  g806: null;
  h806: undefined;
  i806: bigint;
  j806: symbol;
}

type PartialBig806 = DeepPartial<BigRecord806>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten806<T> = T extends Array<infer U> ? Flatten806<U> : T;
type Nested806 = number[][][][][][][][][][];
type Flat806 = Flatten806<Nested806>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly806<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly806<T[K]> : T[K];
};
type DeepRequired806<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired806<T[K]> : T[K];
};
type FR806 = DeepReadonly806<DeepRequired806<PartialBig806>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion806 =
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

type ExtractAlpha806 = Extract<BigUnion806, "alpha" | "bravo" | "charlie">;
type ExcludeZulu806 = Exclude<BigUnion806, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA806 { width: number; height: number; depth: number }
interface ShapeB806 { color: string; opacity: number; blend: string }
interface ShapeC806 { x: number; y: number; z: number; w: number }
interface ShapeD806 { label: string; title: string; summary: string }

type Combined806 = ShapeA806 & ShapeB806 & ShapeC806 & ShapeD806;
type OptionalAll806 = { [K in keyof Combined806]?: Combined806[K] };
type RequiredAll806 = { [K in keyof Combined806]-?: Combined806[K] };
type ReadonlyAll806 = { readonly [K in keyof Combined806]: Combined806[K] };
type NullableAll806 = { [K in keyof Combined806]: Combined806[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString806<T> = T extends string ? true : false;
type IsNumber806<T> = T extends number ? true : false;
type TypeName806<T> = T extends string
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

type TypeNames806 = {
  [K in keyof BigRecord806]: TypeName806<BigRecord806[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb806 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource806 = "user" | "post" | "comment" | "tag" | "category";
type Action806 = `${Verb806}_${Resource806}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise806<T> = T extends Promise<infer U> ? UnwrapPromise806<U> : T;
type UnwrapArray806<T> = T extends (infer U)[] ? UnwrapArray806<U> : T;
type Head806<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail806<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation806<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation806<Exclude<T, K>>]
  : never;

type SmallUnion806 = "a" | "b" | "c" | "d";
type AllPerms806 = Permutation806<SmallUnion806>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig806,
  Flat806,
  FR806,
  BigUnion806,
  ExtractAlpha806,
  ExcludeZulu806,
  OptionalAll806,
  RequiredAll806,
  ReadonlyAll806,
  NullableAll806,
  TypeNames806,
  Action806,
  AllPerms806,
};
