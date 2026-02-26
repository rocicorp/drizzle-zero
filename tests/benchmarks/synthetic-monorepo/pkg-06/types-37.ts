// pkg-06 / types-37  (seed 637) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord637 {
  a637: { x: number; y: string; z: boolean };
  b637: { p: string[]; q: Record<string, number> };
  c637: { nested: { deep: { deeper: { deepest: string } } } };
  d637: number;
  e637: string;
  f637: boolean;
  g637: null;
  h637: undefined;
  i637: bigint;
  j637: symbol;
}

type PartialBig637 = DeepPartial<BigRecord637>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten637<T> = T extends Array<infer U> ? Flatten637<U> : T;
type Nested637 = number[][][][][][][][][][];
type Flat637 = Flatten637<Nested637>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly637<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly637<T[K]> : T[K];
};
type DeepRequired637<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired637<T[K]> : T[K];
};
type FR637 = DeepReadonly637<DeepRequired637<PartialBig637>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion637 =
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

type ExtractAlpha637 = Extract<BigUnion637, "alpha" | "bravo" | "charlie">;
type ExcludeZulu637 = Exclude<BigUnion637, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA637 { width: number; height: number; depth: number }
interface ShapeB637 { color: string; opacity: number; blend: string }
interface ShapeC637 { x: number; y: number; z: number; w: number }
interface ShapeD637 { label: string; title: string; summary: string }

type Combined637 = ShapeA637 & ShapeB637 & ShapeC637 & ShapeD637;
type OptionalAll637 = { [K in keyof Combined637]?: Combined637[K] };
type RequiredAll637 = { [K in keyof Combined637]-?: Combined637[K] };
type ReadonlyAll637 = { readonly [K in keyof Combined637]: Combined637[K] };
type NullableAll637 = { [K in keyof Combined637]: Combined637[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString637<T> = T extends string ? true : false;
type IsNumber637<T> = T extends number ? true : false;
type TypeName637<T> = T extends string
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

type TypeNames637 = {
  [K in keyof BigRecord637]: TypeName637<BigRecord637[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb637 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource637 = "user" | "post" | "comment" | "tag" | "category";
type Action637 = `${Verb637}_${Resource637}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise637<T> = T extends Promise<infer U> ? UnwrapPromise637<U> : T;
type UnwrapArray637<T> = T extends (infer U)[] ? UnwrapArray637<U> : T;
type Head637<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail637<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation637<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation637<Exclude<T, K>>]
  : never;

type SmallUnion637 = "a" | "b" | "c" | "d";
type AllPerms637 = Permutation637<SmallUnion637>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig637,
  Flat637,
  FR637,
  BigUnion637,
  ExtractAlpha637,
  ExcludeZulu637,
  OptionalAll637,
  RequiredAll637,
  ReadonlyAll637,
  NullableAll637,
  TypeNames637,
  Action637,
  AllPerms637,
};
