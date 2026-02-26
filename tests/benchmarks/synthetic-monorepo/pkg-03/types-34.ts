// pkg-03 / types-34  (seed 334) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord334 {
  a334: { x: number; y: string; z: boolean };
  b334: { p: string[]; q: Record<string, number> };
  c334: { nested: { deep: { deeper: { deepest: string } } } };
  d334: number;
  e334: string;
  f334: boolean;
  g334: null;
  h334: undefined;
  i334: bigint;
  j334: symbol;
}

type PartialBig334 = DeepPartial<BigRecord334>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten334<T> = T extends Array<infer U> ? Flatten334<U> : T;
type Nested334 = number[][][][][][][][][][];
type Flat334 = Flatten334<Nested334>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly334<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly334<T[K]> : T[K];
};
type DeepRequired334<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired334<T[K]> : T[K];
};
type FR334 = DeepReadonly334<DeepRequired334<PartialBig334>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion334 =
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

type ExtractAlpha334 = Extract<BigUnion334, "alpha" | "bravo" | "charlie">;
type ExcludeZulu334 = Exclude<BigUnion334, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA334 { width: number; height: number; depth: number }
interface ShapeB334 { color: string; opacity: number; blend: string }
interface ShapeC334 { x: number; y: number; z: number; w: number }
interface ShapeD334 { label: string; title: string; summary: string }

type Combined334 = ShapeA334 & ShapeB334 & ShapeC334 & ShapeD334;
type OptionalAll334 = { [K in keyof Combined334]?: Combined334[K] };
type RequiredAll334 = { [K in keyof Combined334]-?: Combined334[K] };
type ReadonlyAll334 = { readonly [K in keyof Combined334]: Combined334[K] };
type NullableAll334 = { [K in keyof Combined334]: Combined334[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString334<T> = T extends string ? true : false;
type IsNumber334<T> = T extends number ? true : false;
type TypeName334<T> = T extends string
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

type TypeNames334 = {
  [K in keyof BigRecord334]: TypeName334<BigRecord334[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb334 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource334 = "user" | "post" | "comment" | "tag" | "category";
type Action334 = `${Verb334}_${Resource334}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise334<T> = T extends Promise<infer U> ? UnwrapPromise334<U> : T;
type UnwrapArray334<T> = T extends (infer U)[] ? UnwrapArray334<U> : T;
type Head334<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail334<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation334<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation334<Exclude<T, K>>]
  : never;

type SmallUnion334 = "a" | "b" | "c" | "d";
type AllPerms334 = Permutation334<SmallUnion334>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig334,
  Flat334,
  FR334,
  BigUnion334,
  ExtractAlpha334,
  ExcludeZulu334,
  OptionalAll334,
  RequiredAll334,
  ReadonlyAll334,
  NullableAll334,
  TypeNames334,
  Action334,
  AllPerms334,
};
