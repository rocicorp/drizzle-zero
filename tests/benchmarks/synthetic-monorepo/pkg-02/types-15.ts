// pkg-02 / types-15  (seed 215) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord215 {
  a215: { x: number; y: string; z: boolean };
  b215: { p: string[]; q: Record<string, number> };
  c215: { nested: { deep: { deeper: { deepest: string } } } };
  d215: number;
  e215: string;
  f215: boolean;
  g215: null;
  h215: undefined;
  i215: bigint;
  j215: symbol;
}

type PartialBig215 = DeepPartial<BigRecord215>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten215<T> = T extends Array<infer U> ? Flatten215<U> : T;
type Nested215 = number[][][][][][][][][][];
type Flat215 = Flatten215<Nested215>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly215<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly215<T[K]> : T[K];
};
type DeepRequired215<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired215<T[K]> : T[K];
};
type FR215 = DeepReadonly215<DeepRequired215<PartialBig215>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion215 =
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

type ExtractAlpha215 = Extract<BigUnion215, "alpha" | "bravo" | "charlie">;
type ExcludeZulu215 = Exclude<BigUnion215, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA215 { width: number; height: number; depth: number }
interface ShapeB215 { color: string; opacity: number; blend: string }
interface ShapeC215 { x: number; y: number; z: number; w: number }
interface ShapeD215 { label: string; title: string; summary: string }

type Combined215 = ShapeA215 & ShapeB215 & ShapeC215 & ShapeD215;
type OptionalAll215 = { [K in keyof Combined215]?: Combined215[K] };
type RequiredAll215 = { [K in keyof Combined215]-?: Combined215[K] };
type ReadonlyAll215 = { readonly [K in keyof Combined215]: Combined215[K] };
type NullableAll215 = { [K in keyof Combined215]: Combined215[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString215<T> = T extends string ? true : false;
type IsNumber215<T> = T extends number ? true : false;
type TypeName215<T> = T extends string
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

type TypeNames215 = {
  [K in keyof BigRecord215]: TypeName215<BigRecord215[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb215 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource215 = "user" | "post" | "comment" | "tag" | "category";
type Action215 = `${Verb215}_${Resource215}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise215<T> = T extends Promise<infer U> ? UnwrapPromise215<U> : T;
type UnwrapArray215<T> = T extends (infer U)[] ? UnwrapArray215<U> : T;
type Head215<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail215<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation215<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation215<Exclude<T, K>>]
  : never;

type SmallUnion215 = "a" | "b" | "c" | "d";
type AllPerms215 = Permutation215<SmallUnion215>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig215,
  Flat215,
  FR215,
  BigUnion215,
  ExtractAlpha215,
  ExcludeZulu215,
  OptionalAll215,
  RequiredAll215,
  ReadonlyAll215,
  NullableAll215,
  TypeNames215,
  Action215,
  AllPerms215,
};
