// pkg-06 / types-29  (seed 629) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord629 {
  a629: { x: number; y: string; z: boolean };
  b629: { p: string[]; q: Record<string, number> };
  c629: { nested: { deep: { deeper: { deepest: string } } } };
  d629: number;
  e629: string;
  f629: boolean;
  g629: null;
  h629: undefined;
  i629: bigint;
  j629: symbol;
}

type PartialBig629 = DeepPartial<BigRecord629>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten629<T> = T extends Array<infer U> ? Flatten629<U> : T;
type Nested629 = number[][][][][][][][][][];
type Flat629 = Flatten629<Nested629>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly629<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly629<T[K]> : T[K];
};
type DeepRequired629<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired629<T[K]> : T[K];
};
type FR629 = DeepReadonly629<DeepRequired629<PartialBig629>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion629 =
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

type ExtractAlpha629 = Extract<BigUnion629, "alpha" | "bravo" | "charlie">;
type ExcludeZulu629 = Exclude<BigUnion629, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA629 { width: number; height: number; depth: number }
interface ShapeB629 { color: string; opacity: number; blend: string }
interface ShapeC629 { x: number; y: number; z: number; w: number }
interface ShapeD629 { label: string; title: string; summary: string }

type Combined629 = ShapeA629 & ShapeB629 & ShapeC629 & ShapeD629;
type OptionalAll629 = { [K in keyof Combined629]?: Combined629[K] };
type RequiredAll629 = { [K in keyof Combined629]-?: Combined629[K] };
type ReadonlyAll629 = { readonly [K in keyof Combined629]: Combined629[K] };
type NullableAll629 = { [K in keyof Combined629]: Combined629[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString629<T> = T extends string ? true : false;
type IsNumber629<T> = T extends number ? true : false;
type TypeName629<T> = T extends string
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

type TypeNames629 = {
  [K in keyof BigRecord629]: TypeName629<BigRecord629[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb629 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource629 = "user" | "post" | "comment" | "tag" | "category";
type Action629 = `${Verb629}_${Resource629}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise629<T> = T extends Promise<infer U> ? UnwrapPromise629<U> : T;
type UnwrapArray629<T> = T extends (infer U)[] ? UnwrapArray629<U> : T;
type Head629<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail629<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation629<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation629<Exclude<T, K>>]
  : never;

type SmallUnion629 = "a" | "b" | "c" | "d";
type AllPerms629 = Permutation629<SmallUnion629>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig629,
  Flat629,
  FR629,
  BigUnion629,
  ExtractAlpha629,
  ExcludeZulu629,
  OptionalAll629,
  RequiredAll629,
  ReadonlyAll629,
  NullableAll629,
  TypeNames629,
  Action629,
  AllPerms629,
};
