// pkg-04 / types-02  (seed 402) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord402 {
  a402: { x: number; y: string; z: boolean };
  b402: { p: string[]; q: Record<string, number> };
  c402: { nested: { deep: { deeper: { deepest: string } } } };
  d402: number;
  e402: string;
  f402: boolean;
  g402: null;
  h402: undefined;
  i402: bigint;
  j402: symbol;
}

type PartialBig402 = DeepPartial<BigRecord402>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten402<T> = T extends Array<infer U> ? Flatten402<U> : T;
type Nested402 = number[][][][][][][][][][];
type Flat402 = Flatten402<Nested402>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly402<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly402<T[K]> : T[K];
};
type DeepRequired402<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired402<T[K]> : T[K];
};
type FR402 = DeepReadonly402<DeepRequired402<PartialBig402>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion402 =
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

type ExtractAlpha402 = Extract<BigUnion402, "alpha" | "bravo" | "charlie">;
type ExcludeZulu402 = Exclude<BigUnion402, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA402 { width: number; height: number; depth: number }
interface ShapeB402 { color: string; opacity: number; blend: string }
interface ShapeC402 { x: number; y: number; z: number; w: number }
interface ShapeD402 { label: string; title: string; summary: string }

type Combined402 = ShapeA402 & ShapeB402 & ShapeC402 & ShapeD402;
type OptionalAll402 = { [K in keyof Combined402]?: Combined402[K] };
type RequiredAll402 = { [K in keyof Combined402]-?: Combined402[K] };
type ReadonlyAll402 = { readonly [K in keyof Combined402]: Combined402[K] };
type NullableAll402 = { [K in keyof Combined402]: Combined402[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString402<T> = T extends string ? true : false;
type IsNumber402<T> = T extends number ? true : false;
type TypeName402<T> = T extends string
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

type TypeNames402 = {
  [K in keyof BigRecord402]: TypeName402<BigRecord402[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb402 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource402 = "user" | "post" | "comment" | "tag" | "category";
type Action402 = `${Verb402}_${Resource402}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise402<T> = T extends Promise<infer U> ? UnwrapPromise402<U> : T;
type UnwrapArray402<T> = T extends (infer U)[] ? UnwrapArray402<U> : T;
type Head402<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail402<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation402<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation402<Exclude<T, K>>]
  : never;

type SmallUnion402 = "a" | "b" | "c" | "d";
type AllPerms402 = Permutation402<SmallUnion402>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig402,
  Flat402,
  FR402,
  BigUnion402,
  ExtractAlpha402,
  ExcludeZulu402,
  OptionalAll402,
  RequiredAll402,
  ReadonlyAll402,
  NullableAll402,
  TypeNames402,
  Action402,
  AllPerms402,
};
