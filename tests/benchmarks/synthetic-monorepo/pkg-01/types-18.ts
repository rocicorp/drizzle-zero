// pkg-01 / types-18  (seed 118) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord118 {
  a118: { x: number; y: string; z: boolean };
  b118: { p: string[]; q: Record<string, number> };
  c118: { nested: { deep: { deeper: { deepest: string } } } };
  d118: number;
  e118: string;
  f118: boolean;
  g118: null;
  h118: undefined;
  i118: bigint;
  j118: symbol;
}

type PartialBig118 = DeepPartial<BigRecord118>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten118<T> = T extends Array<infer U> ? Flatten118<U> : T;
type Nested118 = number[][][][][][][][][][];
type Flat118 = Flatten118<Nested118>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly118<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly118<T[K]> : T[K];
};
type DeepRequired118<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired118<T[K]> : T[K];
};
type FR118 = DeepReadonly118<DeepRequired118<PartialBig118>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion118 =
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

type ExtractAlpha118 = Extract<BigUnion118, "alpha" | "bravo" | "charlie">;
type ExcludeZulu118 = Exclude<BigUnion118, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA118 { width: number; height: number; depth: number }
interface ShapeB118 { color: string; opacity: number; blend: string }
interface ShapeC118 { x: number; y: number; z: number; w: number }
interface ShapeD118 { label: string; title: string; summary: string }

type Combined118 = ShapeA118 & ShapeB118 & ShapeC118 & ShapeD118;
type OptionalAll118 = { [K in keyof Combined118]?: Combined118[K] };
type RequiredAll118 = { [K in keyof Combined118]-?: Combined118[K] };
type ReadonlyAll118 = { readonly [K in keyof Combined118]: Combined118[K] };
type NullableAll118 = { [K in keyof Combined118]: Combined118[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString118<T> = T extends string ? true : false;
type IsNumber118<T> = T extends number ? true : false;
type TypeName118<T> = T extends string
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

type TypeNames118 = {
  [K in keyof BigRecord118]: TypeName118<BigRecord118[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb118 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource118 = "user" | "post" | "comment" | "tag" | "category";
type Action118 = `${Verb118}_${Resource118}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise118<T> = T extends Promise<infer U> ? UnwrapPromise118<U> : T;
type UnwrapArray118<T> = T extends (infer U)[] ? UnwrapArray118<U> : T;
type Head118<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail118<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation118<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation118<Exclude<T, K>>]
  : never;

type SmallUnion118 = "a" | "b" | "c" | "d";
type AllPerms118 = Permutation118<SmallUnion118>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig118,
  Flat118,
  FR118,
  BigUnion118,
  ExtractAlpha118,
  ExcludeZulu118,
  OptionalAll118,
  RequiredAll118,
  ReadonlyAll118,
  NullableAll118,
  TypeNames118,
  Action118,
  AllPerms118,
};
