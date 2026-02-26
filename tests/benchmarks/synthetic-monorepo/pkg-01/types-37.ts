// pkg-01 / types-37  (seed 137) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord137 {
  a137: { x: number; y: string; z: boolean };
  b137: { p: string[]; q: Record<string, number> };
  c137: { nested: { deep: { deeper: { deepest: string } } } };
  d137: number;
  e137: string;
  f137: boolean;
  g137: null;
  h137: undefined;
  i137: bigint;
  j137: symbol;
}

type PartialBig137 = DeepPartial<BigRecord137>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten137<T> = T extends Array<infer U> ? Flatten137<U> : T;
type Nested137 = number[][][][][][][][][][];
type Flat137 = Flatten137<Nested137>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly137<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly137<T[K]> : T[K];
};
type DeepRequired137<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired137<T[K]> : T[K];
};
type FR137 = DeepReadonly137<DeepRequired137<PartialBig137>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion137 =
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

type ExtractAlpha137 = Extract<BigUnion137, "alpha" | "bravo" | "charlie">;
type ExcludeZulu137 = Exclude<BigUnion137, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA137 { width: number; height: number; depth: number }
interface ShapeB137 { color: string; opacity: number; blend: string }
interface ShapeC137 { x: number; y: number; z: number; w: number }
interface ShapeD137 { label: string; title: string; summary: string }

type Combined137 = ShapeA137 & ShapeB137 & ShapeC137 & ShapeD137;
type OptionalAll137 = { [K in keyof Combined137]?: Combined137[K] };
type RequiredAll137 = { [K in keyof Combined137]-?: Combined137[K] };
type ReadonlyAll137 = { readonly [K in keyof Combined137]: Combined137[K] };
type NullableAll137 = { [K in keyof Combined137]: Combined137[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString137<T> = T extends string ? true : false;
type IsNumber137<T> = T extends number ? true : false;
type TypeName137<T> = T extends string
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

type TypeNames137 = {
  [K in keyof BigRecord137]: TypeName137<BigRecord137[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb137 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource137 = "user" | "post" | "comment" | "tag" | "category";
type Action137 = `${Verb137}_${Resource137}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise137<T> = T extends Promise<infer U> ? UnwrapPromise137<U> : T;
type UnwrapArray137<T> = T extends (infer U)[] ? UnwrapArray137<U> : T;
type Head137<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail137<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation137<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation137<Exclude<T, K>>]
  : never;

type SmallUnion137 = "a" | "b" | "c" | "d";
type AllPerms137 = Permutation137<SmallUnion137>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig137,
  Flat137,
  FR137,
  BigUnion137,
  ExtractAlpha137,
  ExcludeZulu137,
  OptionalAll137,
  RequiredAll137,
  ReadonlyAll137,
  NullableAll137,
  TypeNames137,
  Action137,
  AllPerms137,
};
