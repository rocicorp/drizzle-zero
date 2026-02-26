// pkg-09 / types-26  (seed 926) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord926 {
  a926: { x: number; y: string; z: boolean };
  b926: { p: string[]; q: Record<string, number> };
  c926: { nested: { deep: { deeper: { deepest: string } } } };
  d926: number;
  e926: string;
  f926: boolean;
  g926: null;
  h926: undefined;
  i926: bigint;
  j926: symbol;
}

type PartialBig926 = DeepPartial<BigRecord926>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten926<T> = T extends Array<infer U> ? Flatten926<U> : T;
type Nested926 = number[][][][][][][][][][];
type Flat926 = Flatten926<Nested926>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly926<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly926<T[K]> : T[K];
};
type DeepRequired926<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired926<T[K]> : T[K];
};
type FR926 = DeepReadonly926<DeepRequired926<PartialBig926>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion926 =
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

type ExtractAlpha926 = Extract<BigUnion926, "alpha" | "bravo" | "charlie">;
type ExcludeZulu926 = Exclude<BigUnion926, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA926 { width: number; height: number; depth: number }
interface ShapeB926 { color: string; opacity: number; blend: string }
interface ShapeC926 { x: number; y: number; z: number; w: number }
interface ShapeD926 { label: string; title: string; summary: string }

type Combined926 = ShapeA926 & ShapeB926 & ShapeC926 & ShapeD926;
type OptionalAll926 = { [K in keyof Combined926]?: Combined926[K] };
type RequiredAll926 = { [K in keyof Combined926]-?: Combined926[K] };
type ReadonlyAll926 = { readonly [K in keyof Combined926]: Combined926[K] };
type NullableAll926 = { [K in keyof Combined926]: Combined926[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString926<T> = T extends string ? true : false;
type IsNumber926<T> = T extends number ? true : false;
type TypeName926<T> = T extends string
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

type TypeNames926 = {
  [K in keyof BigRecord926]: TypeName926<BigRecord926[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb926 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource926 = "user" | "post" | "comment" | "tag" | "category";
type Action926 = `${Verb926}_${Resource926}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise926<T> = T extends Promise<infer U> ? UnwrapPromise926<U> : T;
type UnwrapArray926<T> = T extends (infer U)[] ? UnwrapArray926<U> : T;
type Head926<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail926<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation926<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation926<Exclude<T, K>>]
  : never;

type SmallUnion926 = "a" | "b" | "c" | "d";
type AllPerms926 = Permutation926<SmallUnion926>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig926,
  Flat926,
  FR926,
  BigUnion926,
  ExtractAlpha926,
  ExcludeZulu926,
  OptionalAll926,
  RequiredAll926,
  ReadonlyAll926,
  NullableAll926,
  TypeNames926,
  Action926,
  AllPerms926,
};
