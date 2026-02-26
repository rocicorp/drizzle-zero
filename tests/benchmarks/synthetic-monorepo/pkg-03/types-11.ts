// pkg-03 / types-11  (seed 311) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord311 {
  a311: { x: number; y: string; z: boolean };
  b311: { p: string[]; q: Record<string, number> };
  c311: { nested: { deep: { deeper: { deepest: string } } } };
  d311: number;
  e311: string;
  f311: boolean;
  g311: null;
  h311: undefined;
  i311: bigint;
  j311: symbol;
}

type PartialBig311 = DeepPartial<BigRecord311>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten311<T> = T extends Array<infer U> ? Flatten311<U> : T;
type Nested311 = number[][][][][][][][][][];
type Flat311 = Flatten311<Nested311>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly311<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly311<T[K]> : T[K];
};
type DeepRequired311<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired311<T[K]> : T[K];
};
type FR311 = DeepReadonly311<DeepRequired311<PartialBig311>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion311 =
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

type ExtractAlpha311 = Extract<BigUnion311, "alpha" | "bravo" | "charlie">;
type ExcludeZulu311 = Exclude<BigUnion311, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA311 { width: number; height: number; depth: number }
interface ShapeB311 { color: string; opacity: number; blend: string }
interface ShapeC311 { x: number; y: number; z: number; w: number }
interface ShapeD311 { label: string; title: string; summary: string }

type Combined311 = ShapeA311 & ShapeB311 & ShapeC311 & ShapeD311;
type OptionalAll311 = { [K in keyof Combined311]?: Combined311[K] };
type RequiredAll311 = { [K in keyof Combined311]-?: Combined311[K] };
type ReadonlyAll311 = { readonly [K in keyof Combined311]: Combined311[K] };
type NullableAll311 = { [K in keyof Combined311]: Combined311[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString311<T> = T extends string ? true : false;
type IsNumber311<T> = T extends number ? true : false;
type TypeName311<T> = T extends string
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

type TypeNames311 = {
  [K in keyof BigRecord311]: TypeName311<BigRecord311[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb311 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource311 = "user" | "post" | "comment" | "tag" | "category";
type Action311 = `${Verb311}_${Resource311}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise311<T> = T extends Promise<infer U> ? UnwrapPromise311<U> : T;
type UnwrapArray311<T> = T extends (infer U)[] ? UnwrapArray311<U> : T;
type Head311<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail311<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation311<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation311<Exclude<T, K>>]
  : never;

type SmallUnion311 = "a" | "b" | "c" | "d";
type AllPerms311 = Permutation311<SmallUnion311>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig311,
  Flat311,
  FR311,
  BigUnion311,
  ExtractAlpha311,
  ExcludeZulu311,
  OptionalAll311,
  RequiredAll311,
  ReadonlyAll311,
  NullableAll311,
  TypeNames311,
  Action311,
  AllPerms311,
};
