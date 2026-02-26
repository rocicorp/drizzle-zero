// pkg-02 / types-26  (seed 226) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord226 {
  a226: { x: number; y: string; z: boolean };
  b226: { p: string[]; q: Record<string, number> };
  c226: { nested: { deep: { deeper: { deepest: string } } } };
  d226: number;
  e226: string;
  f226: boolean;
  g226: null;
  h226: undefined;
  i226: bigint;
  j226: symbol;
}

type PartialBig226 = DeepPartial<BigRecord226>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten226<T> = T extends Array<infer U> ? Flatten226<U> : T;
type Nested226 = number[][][][][][][][][][];
type Flat226 = Flatten226<Nested226>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly226<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly226<T[K]> : T[K];
};
type DeepRequired226<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired226<T[K]> : T[K];
};
type FR226 = DeepReadonly226<DeepRequired226<PartialBig226>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion226 =
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

type ExtractAlpha226 = Extract<BigUnion226, "alpha" | "bravo" | "charlie">;
type ExcludeZulu226 = Exclude<BigUnion226, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA226 { width: number; height: number; depth: number }
interface ShapeB226 { color: string; opacity: number; blend: string }
interface ShapeC226 { x: number; y: number; z: number; w: number }
interface ShapeD226 { label: string; title: string; summary: string }

type Combined226 = ShapeA226 & ShapeB226 & ShapeC226 & ShapeD226;
type OptionalAll226 = { [K in keyof Combined226]?: Combined226[K] };
type RequiredAll226 = { [K in keyof Combined226]-?: Combined226[K] };
type ReadonlyAll226 = { readonly [K in keyof Combined226]: Combined226[K] };
type NullableAll226 = { [K in keyof Combined226]: Combined226[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString226<T> = T extends string ? true : false;
type IsNumber226<T> = T extends number ? true : false;
type TypeName226<T> = T extends string
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

type TypeNames226 = {
  [K in keyof BigRecord226]: TypeName226<BigRecord226[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb226 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource226 = "user" | "post" | "comment" | "tag" | "category";
type Action226 = `${Verb226}_${Resource226}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise226<T> = T extends Promise<infer U> ? UnwrapPromise226<U> : T;
type UnwrapArray226<T> = T extends (infer U)[] ? UnwrapArray226<U> : T;
type Head226<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail226<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation226<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation226<Exclude<T, K>>]
  : never;

type SmallUnion226 = "a" | "b" | "c" | "d";
type AllPerms226 = Permutation226<SmallUnion226>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig226,
  Flat226,
  FR226,
  BigUnion226,
  ExtractAlpha226,
  ExcludeZulu226,
  OptionalAll226,
  RequiredAll226,
  ReadonlyAll226,
  NullableAll226,
  TypeNames226,
  Action226,
  AllPerms226,
};
