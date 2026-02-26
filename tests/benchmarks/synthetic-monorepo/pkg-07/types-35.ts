// pkg-07 / types-35  (seed 735) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord735 {
  a735: { x: number; y: string; z: boolean };
  b735: { p: string[]; q: Record<string, number> };
  c735: { nested: { deep: { deeper: { deepest: string } } } };
  d735: number;
  e735: string;
  f735: boolean;
  g735: null;
  h735: undefined;
  i735: bigint;
  j735: symbol;
}

type PartialBig735 = DeepPartial<BigRecord735>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten735<T> = T extends Array<infer U> ? Flatten735<U> : T;
type Nested735 = number[][][][][][][][][][];
type Flat735 = Flatten735<Nested735>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly735<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly735<T[K]> : T[K];
};
type DeepRequired735<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired735<T[K]> : T[K];
};
type FR735 = DeepReadonly735<DeepRequired735<PartialBig735>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion735 =
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

type ExtractAlpha735 = Extract<BigUnion735, "alpha" | "bravo" | "charlie">;
type ExcludeZulu735 = Exclude<BigUnion735, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA735 { width: number; height: number; depth: number }
interface ShapeB735 { color: string; opacity: number; blend: string }
interface ShapeC735 { x: number; y: number; z: number; w: number }
interface ShapeD735 { label: string; title: string; summary: string }

type Combined735 = ShapeA735 & ShapeB735 & ShapeC735 & ShapeD735;
type OptionalAll735 = { [K in keyof Combined735]?: Combined735[K] };
type RequiredAll735 = { [K in keyof Combined735]-?: Combined735[K] };
type ReadonlyAll735 = { readonly [K in keyof Combined735]: Combined735[K] };
type NullableAll735 = { [K in keyof Combined735]: Combined735[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString735<T> = T extends string ? true : false;
type IsNumber735<T> = T extends number ? true : false;
type TypeName735<T> = T extends string
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

type TypeNames735 = {
  [K in keyof BigRecord735]: TypeName735<BigRecord735[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb735 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource735 = "user" | "post" | "comment" | "tag" | "category";
type Action735 = `${Verb735}_${Resource735}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise735<T> = T extends Promise<infer U> ? UnwrapPromise735<U> : T;
type UnwrapArray735<T> = T extends (infer U)[] ? UnwrapArray735<U> : T;
type Head735<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail735<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation735<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation735<Exclude<T, K>>]
  : never;

type SmallUnion735 = "a" | "b" | "c" | "d";
type AllPerms735 = Permutation735<SmallUnion735>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig735,
  Flat735,
  FR735,
  BigUnion735,
  ExtractAlpha735,
  ExcludeZulu735,
  OptionalAll735,
  RequiredAll735,
  ReadonlyAll735,
  NullableAll735,
  TypeNames735,
  Action735,
  AllPerms735,
};
