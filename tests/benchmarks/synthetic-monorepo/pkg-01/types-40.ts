// pkg-01 / types-40  (seed 140) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord140 {
  a140: { x: number; y: string; z: boolean };
  b140: { p: string[]; q: Record<string, number> };
  c140: { nested: { deep: { deeper: { deepest: string } } } };
  d140: number;
  e140: string;
  f140: boolean;
  g140: null;
  h140: undefined;
  i140: bigint;
  j140: symbol;
}

type PartialBig140 = DeepPartial<BigRecord140>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten140<T> = T extends Array<infer U> ? Flatten140<U> : T;
type Nested140 = number[][][][][][][][][][];
type Flat140 = Flatten140<Nested140>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly140<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly140<T[K]> : T[K];
};
type DeepRequired140<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired140<T[K]> : T[K];
};
type FR140 = DeepReadonly140<DeepRequired140<PartialBig140>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion140 =
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

type ExtractAlpha140 = Extract<BigUnion140, "alpha" | "bravo" | "charlie">;
type ExcludeZulu140 = Exclude<BigUnion140, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA140 { width: number; height: number; depth: number }
interface ShapeB140 { color: string; opacity: number; blend: string }
interface ShapeC140 { x: number; y: number; z: number; w: number }
interface ShapeD140 { label: string; title: string; summary: string }

type Combined140 = ShapeA140 & ShapeB140 & ShapeC140 & ShapeD140;
type OptionalAll140 = { [K in keyof Combined140]?: Combined140[K] };
type RequiredAll140 = { [K in keyof Combined140]-?: Combined140[K] };
type ReadonlyAll140 = { readonly [K in keyof Combined140]: Combined140[K] };
type NullableAll140 = { [K in keyof Combined140]: Combined140[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString140<T> = T extends string ? true : false;
type IsNumber140<T> = T extends number ? true : false;
type TypeName140<T> = T extends string
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

type TypeNames140 = {
  [K in keyof BigRecord140]: TypeName140<BigRecord140[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb140 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource140 = "user" | "post" | "comment" | "tag" | "category";
type Action140 = `${Verb140}_${Resource140}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise140<T> = T extends Promise<infer U> ? UnwrapPromise140<U> : T;
type UnwrapArray140<T> = T extends (infer U)[] ? UnwrapArray140<U> : T;
type Head140<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail140<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation140<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation140<Exclude<T, K>>]
  : never;

type SmallUnion140 = "a" | "b" | "c" | "d";
type AllPerms140 = Permutation140<SmallUnion140>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig140,
  Flat140,
  FR140,
  BigUnion140,
  ExtractAlpha140,
  ExcludeZulu140,
  OptionalAll140,
  RequiredAll140,
  ReadonlyAll140,
  NullableAll140,
  TypeNames140,
  Action140,
  AllPerms140,
};
