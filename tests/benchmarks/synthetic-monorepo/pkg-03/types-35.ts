// pkg-03 / types-35  (seed 335) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord335 {
  a335: { x: number; y: string; z: boolean };
  b335: { p: string[]; q: Record<string, number> };
  c335: { nested: { deep: { deeper: { deepest: string } } } };
  d335: number;
  e335: string;
  f335: boolean;
  g335: null;
  h335: undefined;
  i335: bigint;
  j335: symbol;
}

type PartialBig335 = DeepPartial<BigRecord335>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten335<T> = T extends Array<infer U> ? Flatten335<U> : T;
type Nested335 = number[][][][][][][][][][];
type Flat335 = Flatten335<Nested335>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly335<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly335<T[K]> : T[K];
};
type DeepRequired335<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired335<T[K]> : T[K];
};
type FR335 = DeepReadonly335<DeepRequired335<PartialBig335>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion335 =
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

type ExtractAlpha335 = Extract<BigUnion335, "alpha" | "bravo" | "charlie">;
type ExcludeZulu335 = Exclude<BigUnion335, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA335 { width: number; height: number; depth: number }
interface ShapeB335 { color: string; opacity: number; blend: string }
interface ShapeC335 { x: number; y: number; z: number; w: number }
interface ShapeD335 { label: string; title: string; summary: string }

type Combined335 = ShapeA335 & ShapeB335 & ShapeC335 & ShapeD335;
type OptionalAll335 = { [K in keyof Combined335]?: Combined335[K] };
type RequiredAll335 = { [K in keyof Combined335]-?: Combined335[K] };
type ReadonlyAll335 = { readonly [K in keyof Combined335]: Combined335[K] };
type NullableAll335 = { [K in keyof Combined335]: Combined335[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString335<T> = T extends string ? true : false;
type IsNumber335<T> = T extends number ? true : false;
type TypeName335<T> = T extends string
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

type TypeNames335 = {
  [K in keyof BigRecord335]: TypeName335<BigRecord335[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb335 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource335 = "user" | "post" | "comment" | "tag" | "category";
type Action335 = `${Verb335}_${Resource335}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise335<T> = T extends Promise<infer U> ? UnwrapPromise335<U> : T;
type UnwrapArray335<T> = T extends (infer U)[] ? UnwrapArray335<U> : T;
type Head335<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail335<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation335<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation335<Exclude<T, K>>]
  : never;

type SmallUnion335 = "a" | "b" | "c" | "d";
type AllPerms335 = Permutation335<SmallUnion335>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig335,
  Flat335,
  FR335,
  BigUnion335,
  ExtractAlpha335,
  ExcludeZulu335,
  OptionalAll335,
  RequiredAll335,
  ReadonlyAll335,
  NullableAll335,
  TypeNames335,
  Action335,
  AllPerms335,
};
