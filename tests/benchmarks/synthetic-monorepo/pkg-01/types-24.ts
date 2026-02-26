// pkg-01 / types-24  (seed 124) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord124 {
  a124: { x: number; y: string; z: boolean };
  b124: { p: string[]; q: Record<string, number> };
  c124: { nested: { deep: { deeper: { deepest: string } } } };
  d124: number;
  e124: string;
  f124: boolean;
  g124: null;
  h124: undefined;
  i124: bigint;
  j124: symbol;
}

type PartialBig124 = DeepPartial<BigRecord124>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten124<T> = T extends Array<infer U> ? Flatten124<U> : T;
type Nested124 = number[][][][][][][][][][];
type Flat124 = Flatten124<Nested124>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly124<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly124<T[K]> : T[K];
};
type DeepRequired124<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired124<T[K]> : T[K];
};
type FR124 = DeepReadonly124<DeepRequired124<PartialBig124>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion124 =
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

type ExtractAlpha124 = Extract<BigUnion124, "alpha" | "bravo" | "charlie">;
type ExcludeZulu124 = Exclude<BigUnion124, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA124 { width: number; height: number; depth: number }
interface ShapeB124 { color: string; opacity: number; blend: string }
interface ShapeC124 { x: number; y: number; z: number; w: number }
interface ShapeD124 { label: string; title: string; summary: string }

type Combined124 = ShapeA124 & ShapeB124 & ShapeC124 & ShapeD124;
type OptionalAll124 = { [K in keyof Combined124]?: Combined124[K] };
type RequiredAll124 = { [K in keyof Combined124]-?: Combined124[K] };
type ReadonlyAll124 = { readonly [K in keyof Combined124]: Combined124[K] };
type NullableAll124 = { [K in keyof Combined124]: Combined124[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString124<T> = T extends string ? true : false;
type IsNumber124<T> = T extends number ? true : false;
type TypeName124<T> = T extends string
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

type TypeNames124 = {
  [K in keyof BigRecord124]: TypeName124<BigRecord124[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb124 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource124 = "user" | "post" | "comment" | "tag" | "category";
type Action124 = `${Verb124}_${Resource124}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise124<T> = T extends Promise<infer U> ? UnwrapPromise124<U> : T;
type UnwrapArray124<T> = T extends (infer U)[] ? UnwrapArray124<U> : T;
type Head124<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail124<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation124<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation124<Exclude<T, K>>]
  : never;

type SmallUnion124 = "a" | "b" | "c" | "d";
type AllPerms124 = Permutation124<SmallUnion124>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig124,
  Flat124,
  FR124,
  BigUnion124,
  ExtractAlpha124,
  ExcludeZulu124,
  OptionalAll124,
  RequiredAll124,
  ReadonlyAll124,
  NullableAll124,
  TypeNames124,
  Action124,
  AllPerms124,
};
