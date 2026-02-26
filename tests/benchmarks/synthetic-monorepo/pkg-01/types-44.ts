// pkg-01 / types-44  (seed 144) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord144 {
  a144: { x: number; y: string; z: boolean };
  b144: { p: string[]; q: Record<string, number> };
  c144: { nested: { deep: { deeper: { deepest: string } } } };
  d144: number;
  e144: string;
  f144: boolean;
  g144: null;
  h144: undefined;
  i144: bigint;
  j144: symbol;
}

type PartialBig144 = DeepPartial<BigRecord144>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten144<T> = T extends Array<infer U> ? Flatten144<U> : T;
type Nested144 = number[][][][][][][][][][];
type Flat144 = Flatten144<Nested144>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly144<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly144<T[K]> : T[K];
};
type DeepRequired144<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired144<T[K]> : T[K];
};
type FR144 = DeepReadonly144<DeepRequired144<PartialBig144>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion144 =
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

type ExtractAlpha144 = Extract<BigUnion144, "alpha" | "bravo" | "charlie">;
type ExcludeZulu144 = Exclude<BigUnion144, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA144 { width: number; height: number; depth: number }
interface ShapeB144 { color: string; opacity: number; blend: string }
interface ShapeC144 { x: number; y: number; z: number; w: number }
interface ShapeD144 { label: string; title: string; summary: string }

type Combined144 = ShapeA144 & ShapeB144 & ShapeC144 & ShapeD144;
type OptionalAll144 = { [K in keyof Combined144]?: Combined144[K] };
type RequiredAll144 = { [K in keyof Combined144]-?: Combined144[K] };
type ReadonlyAll144 = { readonly [K in keyof Combined144]: Combined144[K] };
type NullableAll144 = { [K in keyof Combined144]: Combined144[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString144<T> = T extends string ? true : false;
type IsNumber144<T> = T extends number ? true : false;
type TypeName144<T> = T extends string
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

type TypeNames144 = {
  [K in keyof BigRecord144]: TypeName144<BigRecord144[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb144 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource144 = "user" | "post" | "comment" | "tag" | "category";
type Action144 = `${Verb144}_${Resource144}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise144<T> = T extends Promise<infer U> ? UnwrapPromise144<U> : T;
type UnwrapArray144<T> = T extends (infer U)[] ? UnwrapArray144<U> : T;
type Head144<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail144<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation144<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation144<Exclude<T, K>>]
  : never;

type SmallUnion144 = "a" | "b" | "c" | "d";
type AllPerms144 = Permutation144<SmallUnion144>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig144,
  Flat144,
  FR144,
  BigUnion144,
  ExtractAlpha144,
  ExcludeZulu144,
  OptionalAll144,
  RequiredAll144,
  ReadonlyAll144,
  NullableAll144,
  TypeNames144,
  Action144,
  AllPerms144,
};
