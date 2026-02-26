// pkg-03 / types-12  (seed 312) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord312 {
  a312: { x: number; y: string; z: boolean };
  b312: { p: string[]; q: Record<string, number> };
  c312: { nested: { deep: { deeper: { deepest: string } } } };
  d312: number;
  e312: string;
  f312: boolean;
  g312: null;
  h312: undefined;
  i312: bigint;
  j312: symbol;
}

type PartialBig312 = DeepPartial<BigRecord312>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten312<T> = T extends Array<infer U> ? Flatten312<U> : T;
type Nested312 = number[][][][][][][][][][];
type Flat312 = Flatten312<Nested312>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly312<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly312<T[K]> : T[K];
};
type DeepRequired312<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired312<T[K]> : T[K];
};
type FR312 = DeepReadonly312<DeepRequired312<PartialBig312>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion312 =
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

type ExtractAlpha312 = Extract<BigUnion312, "alpha" | "bravo" | "charlie">;
type ExcludeZulu312 = Exclude<BigUnion312, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA312 { width: number; height: number; depth: number }
interface ShapeB312 { color: string; opacity: number; blend: string }
interface ShapeC312 { x: number; y: number; z: number; w: number }
interface ShapeD312 { label: string; title: string; summary: string }

type Combined312 = ShapeA312 & ShapeB312 & ShapeC312 & ShapeD312;
type OptionalAll312 = { [K in keyof Combined312]?: Combined312[K] };
type RequiredAll312 = { [K in keyof Combined312]-?: Combined312[K] };
type ReadonlyAll312 = { readonly [K in keyof Combined312]: Combined312[K] };
type NullableAll312 = { [K in keyof Combined312]: Combined312[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString312<T> = T extends string ? true : false;
type IsNumber312<T> = T extends number ? true : false;
type TypeName312<T> = T extends string
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

type TypeNames312 = {
  [K in keyof BigRecord312]: TypeName312<BigRecord312[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb312 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource312 = "user" | "post" | "comment" | "tag" | "category";
type Action312 = `${Verb312}_${Resource312}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise312<T> = T extends Promise<infer U> ? UnwrapPromise312<U> : T;
type UnwrapArray312<T> = T extends (infer U)[] ? UnwrapArray312<U> : T;
type Head312<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail312<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation312<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation312<Exclude<T, K>>]
  : never;

type SmallUnion312 = "a" | "b" | "c" | "d";
type AllPerms312 = Permutation312<SmallUnion312>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig312,
  Flat312,
  FR312,
  BigUnion312,
  ExtractAlpha312,
  ExcludeZulu312,
  OptionalAll312,
  RequiredAll312,
  ReadonlyAll312,
  NullableAll312,
  TypeNames312,
  Action312,
  AllPerms312,
};
