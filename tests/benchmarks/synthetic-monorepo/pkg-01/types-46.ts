// pkg-01 / types-46  (seed 146) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord146 {
  a146: { x: number; y: string; z: boolean };
  b146: { p: string[]; q: Record<string, number> };
  c146: { nested: { deep: { deeper: { deepest: string } } } };
  d146: number;
  e146: string;
  f146: boolean;
  g146: null;
  h146: undefined;
  i146: bigint;
  j146: symbol;
}

type PartialBig146 = DeepPartial<BigRecord146>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten146<T> = T extends Array<infer U> ? Flatten146<U> : T;
type Nested146 = number[][][][][][][][][][];
type Flat146 = Flatten146<Nested146>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly146<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly146<T[K]> : T[K];
};
type DeepRequired146<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired146<T[K]> : T[K];
};
type FR146 = DeepReadonly146<DeepRequired146<PartialBig146>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion146 =
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

type ExtractAlpha146 = Extract<BigUnion146, "alpha" | "bravo" | "charlie">;
type ExcludeZulu146 = Exclude<BigUnion146, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA146 { width: number; height: number; depth: number }
interface ShapeB146 { color: string; opacity: number; blend: string }
interface ShapeC146 { x: number; y: number; z: number; w: number }
interface ShapeD146 { label: string; title: string; summary: string }

type Combined146 = ShapeA146 & ShapeB146 & ShapeC146 & ShapeD146;
type OptionalAll146 = { [K in keyof Combined146]?: Combined146[K] };
type RequiredAll146 = { [K in keyof Combined146]-?: Combined146[K] };
type ReadonlyAll146 = { readonly [K in keyof Combined146]: Combined146[K] };
type NullableAll146 = { [K in keyof Combined146]: Combined146[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString146<T> = T extends string ? true : false;
type IsNumber146<T> = T extends number ? true : false;
type TypeName146<T> = T extends string
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

type TypeNames146 = {
  [K in keyof BigRecord146]: TypeName146<BigRecord146[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb146 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource146 = "user" | "post" | "comment" | "tag" | "category";
type Action146 = `${Verb146}_${Resource146}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise146<T> = T extends Promise<infer U> ? UnwrapPromise146<U> : T;
type UnwrapArray146<T> = T extends (infer U)[] ? UnwrapArray146<U> : T;
type Head146<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail146<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation146<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation146<Exclude<T, K>>]
  : never;

type SmallUnion146 = "a" | "b" | "c" | "d";
type AllPerms146 = Permutation146<SmallUnion146>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig146,
  Flat146,
  FR146,
  BigUnion146,
  ExtractAlpha146,
  ExcludeZulu146,
  OptionalAll146,
  RequiredAll146,
  ReadonlyAll146,
  NullableAll146,
  TypeNames146,
  Action146,
  AllPerms146,
};
