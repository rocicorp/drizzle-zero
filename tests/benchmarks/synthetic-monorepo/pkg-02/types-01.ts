// pkg-02 / types-01  (seed 201) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord201 {
  a201: { x: number; y: string; z: boolean };
  b201: { p: string[]; q: Record<string, number> };
  c201: { nested: { deep: { deeper: { deepest: string } } } };
  d201: number;
  e201: string;
  f201: boolean;
  g201: null;
  h201: undefined;
  i201: bigint;
  j201: symbol;
}

type PartialBig201 = DeepPartial<BigRecord201>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten201<T> = T extends Array<infer U> ? Flatten201<U> : T;
type Nested201 = number[][][][][][][][][][];
type Flat201 = Flatten201<Nested201>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly201<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly201<T[K]> : T[K];
};
type DeepRequired201<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired201<T[K]> : T[K];
};
type FR201 = DeepReadonly201<DeepRequired201<PartialBig201>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion201 =
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

type ExtractAlpha201 = Extract<BigUnion201, "alpha" | "bravo" | "charlie">;
type ExcludeZulu201 = Exclude<BigUnion201, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA201 { width: number; height: number; depth: number }
interface ShapeB201 { color: string; opacity: number; blend: string }
interface ShapeC201 { x: number; y: number; z: number; w: number }
interface ShapeD201 { label: string; title: string; summary: string }

type Combined201 = ShapeA201 & ShapeB201 & ShapeC201 & ShapeD201;
type OptionalAll201 = { [K in keyof Combined201]?: Combined201[K] };
type RequiredAll201 = { [K in keyof Combined201]-?: Combined201[K] };
type ReadonlyAll201 = { readonly [K in keyof Combined201]: Combined201[K] };
type NullableAll201 = { [K in keyof Combined201]: Combined201[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString201<T> = T extends string ? true : false;
type IsNumber201<T> = T extends number ? true : false;
type TypeName201<T> = T extends string
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

type TypeNames201 = {
  [K in keyof BigRecord201]: TypeName201<BigRecord201[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb201 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource201 = "user" | "post" | "comment" | "tag" | "category";
type Action201 = `${Verb201}_${Resource201}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise201<T> = T extends Promise<infer U> ? UnwrapPromise201<U> : T;
type UnwrapArray201<T> = T extends (infer U)[] ? UnwrapArray201<U> : T;
type Head201<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail201<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation201<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation201<Exclude<T, K>>]
  : never;

type SmallUnion201 = "a" | "b" | "c" | "d";
type AllPerms201 = Permutation201<SmallUnion201>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig201,
  Flat201,
  FR201,
  BigUnion201,
  ExtractAlpha201,
  ExcludeZulu201,
  OptionalAll201,
  RequiredAll201,
  ReadonlyAll201,
  NullableAll201,
  TypeNames201,
  Action201,
  AllPerms201,
};
