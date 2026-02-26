// pkg-06 / types-06  (seed 606) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord606 {
  a606: { x: number; y: string; z: boolean };
  b606: { p: string[]; q: Record<string, number> };
  c606: { nested: { deep: { deeper: { deepest: string } } } };
  d606: number;
  e606: string;
  f606: boolean;
  g606: null;
  h606: undefined;
  i606: bigint;
  j606: symbol;
}

type PartialBig606 = DeepPartial<BigRecord606>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten606<T> = T extends Array<infer U> ? Flatten606<U> : T;
type Nested606 = number[][][][][][][][][][];
type Flat606 = Flatten606<Nested606>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly606<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly606<T[K]> : T[K];
};
type DeepRequired606<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired606<T[K]> : T[K];
};
type FR606 = DeepReadonly606<DeepRequired606<PartialBig606>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion606 =
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

type ExtractAlpha606 = Extract<BigUnion606, "alpha" | "bravo" | "charlie">;
type ExcludeZulu606 = Exclude<BigUnion606, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA606 { width: number; height: number; depth: number }
interface ShapeB606 { color: string; opacity: number; blend: string }
interface ShapeC606 { x: number; y: number; z: number; w: number }
interface ShapeD606 { label: string; title: string; summary: string }

type Combined606 = ShapeA606 & ShapeB606 & ShapeC606 & ShapeD606;
type OptionalAll606 = { [K in keyof Combined606]?: Combined606[K] };
type RequiredAll606 = { [K in keyof Combined606]-?: Combined606[K] };
type ReadonlyAll606 = { readonly [K in keyof Combined606]: Combined606[K] };
type NullableAll606 = { [K in keyof Combined606]: Combined606[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString606<T> = T extends string ? true : false;
type IsNumber606<T> = T extends number ? true : false;
type TypeName606<T> = T extends string
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

type TypeNames606 = {
  [K in keyof BigRecord606]: TypeName606<BigRecord606[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb606 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource606 = "user" | "post" | "comment" | "tag" | "category";
type Action606 = `${Verb606}_${Resource606}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise606<T> = T extends Promise<infer U> ? UnwrapPromise606<U> : T;
type UnwrapArray606<T> = T extends (infer U)[] ? UnwrapArray606<U> : T;
type Head606<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail606<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation606<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation606<Exclude<T, K>>]
  : never;

type SmallUnion606 = "a" | "b" | "c" | "d";
type AllPerms606 = Permutation606<SmallUnion606>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig606,
  Flat606,
  FR606,
  BigUnion606,
  ExtractAlpha606,
  ExcludeZulu606,
  OptionalAll606,
  RequiredAll606,
  ReadonlyAll606,
  NullableAll606,
  TypeNames606,
  Action606,
  AllPerms606,
};
