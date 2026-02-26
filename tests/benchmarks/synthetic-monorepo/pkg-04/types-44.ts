// pkg-04 / types-44  (seed 444) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord444 {
  a444: { x: number; y: string; z: boolean };
  b444: { p: string[]; q: Record<string, number> };
  c444: { nested: { deep: { deeper: { deepest: string } } } };
  d444: number;
  e444: string;
  f444: boolean;
  g444: null;
  h444: undefined;
  i444: bigint;
  j444: symbol;
}

type PartialBig444 = DeepPartial<BigRecord444>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten444<T> = T extends Array<infer U> ? Flatten444<U> : T;
type Nested444 = number[][][][][][][][][][];
type Flat444 = Flatten444<Nested444>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly444<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly444<T[K]> : T[K];
};
type DeepRequired444<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired444<T[K]> : T[K];
};
type FR444 = DeepReadonly444<DeepRequired444<PartialBig444>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion444 =
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

type ExtractAlpha444 = Extract<BigUnion444, "alpha" | "bravo" | "charlie">;
type ExcludeZulu444 = Exclude<BigUnion444, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA444 { width: number; height: number; depth: number }
interface ShapeB444 { color: string; opacity: number; blend: string }
interface ShapeC444 { x: number; y: number; z: number; w: number }
interface ShapeD444 { label: string; title: string; summary: string }

type Combined444 = ShapeA444 & ShapeB444 & ShapeC444 & ShapeD444;
type OptionalAll444 = { [K in keyof Combined444]?: Combined444[K] };
type RequiredAll444 = { [K in keyof Combined444]-?: Combined444[K] };
type ReadonlyAll444 = { readonly [K in keyof Combined444]: Combined444[K] };
type NullableAll444 = { [K in keyof Combined444]: Combined444[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString444<T> = T extends string ? true : false;
type IsNumber444<T> = T extends number ? true : false;
type TypeName444<T> = T extends string
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

type TypeNames444 = {
  [K in keyof BigRecord444]: TypeName444<BigRecord444[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb444 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource444 = "user" | "post" | "comment" | "tag" | "category";
type Action444 = `${Verb444}_${Resource444}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise444<T> = T extends Promise<infer U> ? UnwrapPromise444<U> : T;
type UnwrapArray444<T> = T extends (infer U)[] ? UnwrapArray444<U> : T;
type Head444<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail444<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation444<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation444<Exclude<T, K>>]
  : never;

type SmallUnion444 = "a" | "b" | "c" | "d";
type AllPerms444 = Permutation444<SmallUnion444>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig444,
  Flat444,
  FR444,
  BigUnion444,
  ExtractAlpha444,
  ExcludeZulu444,
  OptionalAll444,
  RequiredAll444,
  ReadonlyAll444,
  NullableAll444,
  TypeNames444,
  Action444,
  AllPerms444,
};
