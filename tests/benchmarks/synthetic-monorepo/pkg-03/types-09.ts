// pkg-03 / types-09  (seed 309) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord309 {
  a309: { x: number; y: string; z: boolean };
  b309: { p: string[]; q: Record<string, number> };
  c309: { nested: { deep: { deeper: { deepest: string } } } };
  d309: number;
  e309: string;
  f309: boolean;
  g309: null;
  h309: undefined;
  i309: bigint;
  j309: symbol;
}

type PartialBig309 = DeepPartial<BigRecord309>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten309<T> = T extends Array<infer U> ? Flatten309<U> : T;
type Nested309 = number[][][][][][][][][][];
type Flat309 = Flatten309<Nested309>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly309<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly309<T[K]> : T[K];
};
type DeepRequired309<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired309<T[K]> : T[K];
};
type FR309 = DeepReadonly309<DeepRequired309<PartialBig309>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion309 =
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

type ExtractAlpha309 = Extract<BigUnion309, "alpha" | "bravo" | "charlie">;
type ExcludeZulu309 = Exclude<BigUnion309, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA309 { width: number; height: number; depth: number }
interface ShapeB309 { color: string; opacity: number; blend: string }
interface ShapeC309 { x: number; y: number; z: number; w: number }
interface ShapeD309 { label: string; title: string; summary: string }

type Combined309 = ShapeA309 & ShapeB309 & ShapeC309 & ShapeD309;
type OptionalAll309 = { [K in keyof Combined309]?: Combined309[K] };
type RequiredAll309 = { [K in keyof Combined309]-?: Combined309[K] };
type ReadonlyAll309 = { readonly [K in keyof Combined309]: Combined309[K] };
type NullableAll309 = { [K in keyof Combined309]: Combined309[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString309<T> = T extends string ? true : false;
type IsNumber309<T> = T extends number ? true : false;
type TypeName309<T> = T extends string
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

type TypeNames309 = {
  [K in keyof BigRecord309]: TypeName309<BigRecord309[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb309 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource309 = "user" | "post" | "comment" | "tag" | "category";
type Action309 = `${Verb309}_${Resource309}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise309<T> = T extends Promise<infer U> ? UnwrapPromise309<U> : T;
type UnwrapArray309<T> = T extends (infer U)[] ? UnwrapArray309<U> : T;
type Head309<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail309<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation309<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation309<Exclude<T, K>>]
  : never;

type SmallUnion309 = "a" | "b" | "c" | "d";
type AllPerms309 = Permutation309<SmallUnion309>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig309,
  Flat309,
  FR309,
  BigUnion309,
  ExtractAlpha309,
  ExcludeZulu309,
  OptionalAll309,
  RequiredAll309,
  ReadonlyAll309,
  NullableAll309,
  TypeNames309,
  Action309,
  AllPerms309,
};
