// pkg-05 / types-26  (seed 526) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord526 {
  a526: { x: number; y: string; z: boolean };
  b526: { p: string[]; q: Record<string, number> };
  c526: { nested: { deep: { deeper: { deepest: string } } } };
  d526: number;
  e526: string;
  f526: boolean;
  g526: null;
  h526: undefined;
  i526: bigint;
  j526: symbol;
}

type PartialBig526 = DeepPartial<BigRecord526>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten526<T> = T extends Array<infer U> ? Flatten526<U> : T;
type Nested526 = number[][][][][][][][][][];
type Flat526 = Flatten526<Nested526>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly526<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly526<T[K]> : T[K];
};
type DeepRequired526<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired526<T[K]> : T[K];
};
type FR526 = DeepReadonly526<DeepRequired526<PartialBig526>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion526 =
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

type ExtractAlpha526 = Extract<BigUnion526, "alpha" | "bravo" | "charlie">;
type ExcludeZulu526 = Exclude<BigUnion526, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA526 { width: number; height: number; depth: number }
interface ShapeB526 { color: string; opacity: number; blend: string }
interface ShapeC526 { x: number; y: number; z: number; w: number }
interface ShapeD526 { label: string; title: string; summary: string }

type Combined526 = ShapeA526 & ShapeB526 & ShapeC526 & ShapeD526;
type OptionalAll526 = { [K in keyof Combined526]?: Combined526[K] };
type RequiredAll526 = { [K in keyof Combined526]-?: Combined526[K] };
type ReadonlyAll526 = { readonly [K in keyof Combined526]: Combined526[K] };
type NullableAll526 = { [K in keyof Combined526]: Combined526[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString526<T> = T extends string ? true : false;
type IsNumber526<T> = T extends number ? true : false;
type TypeName526<T> = T extends string
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

type TypeNames526 = {
  [K in keyof BigRecord526]: TypeName526<BigRecord526[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb526 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource526 = "user" | "post" | "comment" | "tag" | "category";
type Action526 = `${Verb526}_${Resource526}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise526<T> = T extends Promise<infer U> ? UnwrapPromise526<U> : T;
type UnwrapArray526<T> = T extends (infer U)[] ? UnwrapArray526<U> : T;
type Head526<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail526<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation526<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation526<Exclude<T, K>>]
  : never;

type SmallUnion526 = "a" | "b" | "c" | "d";
type AllPerms526 = Permutation526<SmallUnion526>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig526,
  Flat526,
  FR526,
  BigUnion526,
  ExtractAlpha526,
  ExcludeZulu526,
  OptionalAll526,
  RequiredAll526,
  ReadonlyAll526,
  NullableAll526,
  TypeNames526,
  Action526,
  AllPerms526,
};
