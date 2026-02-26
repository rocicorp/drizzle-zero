// pkg-08 / types-01  (seed 801) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord801 {
  a801: { x: number; y: string; z: boolean };
  b801: { p: string[]; q: Record<string, number> };
  c801: { nested: { deep: { deeper: { deepest: string } } } };
  d801: number;
  e801: string;
  f801: boolean;
  g801: null;
  h801: undefined;
  i801: bigint;
  j801: symbol;
}

type PartialBig801 = DeepPartial<BigRecord801>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten801<T> = T extends Array<infer U> ? Flatten801<U> : T;
type Nested801 = number[][][][][][][][][][];
type Flat801 = Flatten801<Nested801>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly801<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly801<T[K]> : T[K];
};
type DeepRequired801<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired801<T[K]> : T[K];
};
type FR801 = DeepReadonly801<DeepRequired801<PartialBig801>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion801 =
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

type ExtractAlpha801 = Extract<BigUnion801, "alpha" | "bravo" | "charlie">;
type ExcludeZulu801 = Exclude<BigUnion801, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA801 { width: number; height: number; depth: number }
interface ShapeB801 { color: string; opacity: number; blend: string }
interface ShapeC801 { x: number; y: number; z: number; w: number }
interface ShapeD801 { label: string; title: string; summary: string }

type Combined801 = ShapeA801 & ShapeB801 & ShapeC801 & ShapeD801;
type OptionalAll801 = { [K in keyof Combined801]?: Combined801[K] };
type RequiredAll801 = { [K in keyof Combined801]-?: Combined801[K] };
type ReadonlyAll801 = { readonly [K in keyof Combined801]: Combined801[K] };
type NullableAll801 = { [K in keyof Combined801]: Combined801[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString801<T> = T extends string ? true : false;
type IsNumber801<T> = T extends number ? true : false;
type TypeName801<T> = T extends string
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

type TypeNames801 = {
  [K in keyof BigRecord801]: TypeName801<BigRecord801[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb801 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource801 = "user" | "post" | "comment" | "tag" | "category";
type Action801 = `${Verb801}_${Resource801}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise801<T> = T extends Promise<infer U> ? UnwrapPromise801<U> : T;
type UnwrapArray801<T> = T extends (infer U)[] ? UnwrapArray801<U> : T;
type Head801<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail801<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation801<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation801<Exclude<T, K>>]
  : never;

type SmallUnion801 = "a" | "b" | "c" | "d";
type AllPerms801 = Permutation801<SmallUnion801>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig801,
  Flat801,
  FR801,
  BigUnion801,
  ExtractAlpha801,
  ExcludeZulu801,
  OptionalAll801,
  RequiredAll801,
  ReadonlyAll801,
  NullableAll801,
  TypeNames801,
  Action801,
  AllPerms801,
};
