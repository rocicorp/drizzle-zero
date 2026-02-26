// pkg-04 / types-29  (seed 429) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord429 {
  a429: { x: number; y: string; z: boolean };
  b429: { p: string[]; q: Record<string, number> };
  c429: { nested: { deep: { deeper: { deepest: string } } } };
  d429: number;
  e429: string;
  f429: boolean;
  g429: null;
  h429: undefined;
  i429: bigint;
  j429: symbol;
}

type PartialBig429 = DeepPartial<BigRecord429>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten429<T> = T extends Array<infer U> ? Flatten429<U> : T;
type Nested429 = number[][][][][][][][][][];
type Flat429 = Flatten429<Nested429>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly429<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly429<T[K]> : T[K];
};
type DeepRequired429<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired429<T[K]> : T[K];
};
type FR429 = DeepReadonly429<DeepRequired429<PartialBig429>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion429 =
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

type ExtractAlpha429 = Extract<BigUnion429, "alpha" | "bravo" | "charlie">;
type ExcludeZulu429 = Exclude<BigUnion429, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA429 { width: number; height: number; depth: number }
interface ShapeB429 { color: string; opacity: number; blend: string }
interface ShapeC429 { x: number; y: number; z: number; w: number }
interface ShapeD429 { label: string; title: string; summary: string }

type Combined429 = ShapeA429 & ShapeB429 & ShapeC429 & ShapeD429;
type OptionalAll429 = { [K in keyof Combined429]?: Combined429[K] };
type RequiredAll429 = { [K in keyof Combined429]-?: Combined429[K] };
type ReadonlyAll429 = { readonly [K in keyof Combined429]: Combined429[K] };
type NullableAll429 = { [K in keyof Combined429]: Combined429[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString429<T> = T extends string ? true : false;
type IsNumber429<T> = T extends number ? true : false;
type TypeName429<T> = T extends string
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

type TypeNames429 = {
  [K in keyof BigRecord429]: TypeName429<BigRecord429[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb429 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource429 = "user" | "post" | "comment" | "tag" | "category";
type Action429 = `${Verb429}_${Resource429}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise429<T> = T extends Promise<infer U> ? UnwrapPromise429<U> : T;
type UnwrapArray429<T> = T extends (infer U)[] ? UnwrapArray429<U> : T;
type Head429<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail429<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation429<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation429<Exclude<T, K>>]
  : never;

type SmallUnion429 = "a" | "b" | "c" | "d";
type AllPerms429 = Permutation429<SmallUnion429>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig429,
  Flat429,
  FR429,
  BigUnion429,
  ExtractAlpha429,
  ExcludeZulu429,
  OptionalAll429,
  RequiredAll429,
  ReadonlyAll429,
  NullableAll429,
  TypeNames429,
  Action429,
  AllPerms429,
};
