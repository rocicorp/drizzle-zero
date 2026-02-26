// pkg-07 / types-16  (seed 716) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord716 {
  a716: { x: number; y: string; z: boolean };
  b716: { p: string[]; q: Record<string, number> };
  c716: { nested: { deep: { deeper: { deepest: string } } } };
  d716: number;
  e716: string;
  f716: boolean;
  g716: null;
  h716: undefined;
  i716: bigint;
  j716: symbol;
}

type PartialBig716 = DeepPartial<BigRecord716>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten716<T> = T extends Array<infer U> ? Flatten716<U> : T;
type Nested716 = number[][][][][][][][][][];
type Flat716 = Flatten716<Nested716>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly716<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly716<T[K]> : T[K];
};
type DeepRequired716<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired716<T[K]> : T[K];
};
type FR716 = DeepReadonly716<DeepRequired716<PartialBig716>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion716 =
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

type ExtractAlpha716 = Extract<BigUnion716, "alpha" | "bravo" | "charlie">;
type ExcludeZulu716 = Exclude<BigUnion716, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA716 { width: number; height: number; depth: number }
interface ShapeB716 { color: string; opacity: number; blend: string }
interface ShapeC716 { x: number; y: number; z: number; w: number }
interface ShapeD716 { label: string; title: string; summary: string }

type Combined716 = ShapeA716 & ShapeB716 & ShapeC716 & ShapeD716;
type OptionalAll716 = { [K in keyof Combined716]?: Combined716[K] };
type RequiredAll716 = { [K in keyof Combined716]-?: Combined716[K] };
type ReadonlyAll716 = { readonly [K in keyof Combined716]: Combined716[K] };
type NullableAll716 = { [K in keyof Combined716]: Combined716[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString716<T> = T extends string ? true : false;
type IsNumber716<T> = T extends number ? true : false;
type TypeName716<T> = T extends string
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

type TypeNames716 = {
  [K in keyof BigRecord716]: TypeName716<BigRecord716[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb716 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource716 = "user" | "post" | "comment" | "tag" | "category";
type Action716 = `${Verb716}_${Resource716}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise716<T> = T extends Promise<infer U> ? UnwrapPromise716<U> : T;
type UnwrapArray716<T> = T extends (infer U)[] ? UnwrapArray716<U> : T;
type Head716<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail716<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation716<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation716<Exclude<T, K>>]
  : never;

type SmallUnion716 = "a" | "b" | "c" | "d";
type AllPerms716 = Permutation716<SmallUnion716>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig716,
  Flat716,
  FR716,
  BigUnion716,
  ExtractAlpha716,
  ExcludeZulu716,
  OptionalAll716,
  RequiredAll716,
  ReadonlyAll716,
  NullableAll716,
  TypeNames716,
  Action716,
  AllPerms716,
};
