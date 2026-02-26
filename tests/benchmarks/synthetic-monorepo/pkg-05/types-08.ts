// pkg-05 / types-08  (seed 508) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord508 {
  a508: { x: number; y: string; z: boolean };
  b508: { p: string[]; q: Record<string, number> };
  c508: { nested: { deep: { deeper: { deepest: string } } } };
  d508: number;
  e508: string;
  f508: boolean;
  g508: null;
  h508: undefined;
  i508: bigint;
  j508: symbol;
}

type PartialBig508 = DeepPartial<BigRecord508>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten508<T> = T extends Array<infer U> ? Flatten508<U> : T;
type Nested508 = number[][][][][][][][][][];
type Flat508 = Flatten508<Nested508>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly508<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly508<T[K]> : T[K];
};
type DeepRequired508<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired508<T[K]> : T[K];
};
type FR508 = DeepReadonly508<DeepRequired508<PartialBig508>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion508 =
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

type ExtractAlpha508 = Extract<BigUnion508, "alpha" | "bravo" | "charlie">;
type ExcludeZulu508 = Exclude<BigUnion508, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA508 { width: number; height: number; depth: number }
interface ShapeB508 { color: string; opacity: number; blend: string }
interface ShapeC508 { x: number; y: number; z: number; w: number }
interface ShapeD508 { label: string; title: string; summary: string }

type Combined508 = ShapeA508 & ShapeB508 & ShapeC508 & ShapeD508;
type OptionalAll508 = { [K in keyof Combined508]?: Combined508[K] };
type RequiredAll508 = { [K in keyof Combined508]-?: Combined508[K] };
type ReadonlyAll508 = { readonly [K in keyof Combined508]: Combined508[K] };
type NullableAll508 = { [K in keyof Combined508]: Combined508[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString508<T> = T extends string ? true : false;
type IsNumber508<T> = T extends number ? true : false;
type TypeName508<T> = T extends string
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

type TypeNames508 = {
  [K in keyof BigRecord508]: TypeName508<BigRecord508[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb508 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource508 = "user" | "post" | "comment" | "tag" | "category";
type Action508 = `${Verb508}_${Resource508}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise508<T> = T extends Promise<infer U> ? UnwrapPromise508<U> : T;
type UnwrapArray508<T> = T extends (infer U)[] ? UnwrapArray508<U> : T;
type Head508<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail508<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation508<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation508<Exclude<T, K>>]
  : never;

type SmallUnion508 = "a" | "b" | "c" | "d";
type AllPerms508 = Permutation508<SmallUnion508>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig508,
  Flat508,
  FR508,
  BigUnion508,
  ExtractAlpha508,
  ExcludeZulu508,
  OptionalAll508,
  RequiredAll508,
  ReadonlyAll508,
  NullableAll508,
  TypeNames508,
  Action508,
  AllPerms508,
};
