// pkg-02 / types-31  (seed 231) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord231 {
  a231: { x: number; y: string; z: boolean };
  b231: { p: string[]; q: Record<string, number> };
  c231: { nested: { deep: { deeper: { deepest: string } } } };
  d231: number;
  e231: string;
  f231: boolean;
  g231: null;
  h231: undefined;
  i231: bigint;
  j231: symbol;
}

type PartialBig231 = DeepPartial<BigRecord231>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten231<T> = T extends Array<infer U> ? Flatten231<U> : T;
type Nested231 = number[][][][][][][][][][];
type Flat231 = Flatten231<Nested231>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly231<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly231<T[K]> : T[K];
};
type DeepRequired231<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired231<T[K]> : T[K];
};
type FR231 = DeepReadonly231<DeepRequired231<PartialBig231>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion231 =
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

type ExtractAlpha231 = Extract<BigUnion231, "alpha" | "bravo" | "charlie">;
type ExcludeZulu231 = Exclude<BigUnion231, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA231 { width: number; height: number; depth: number }
interface ShapeB231 { color: string; opacity: number; blend: string }
interface ShapeC231 { x: number; y: number; z: number; w: number }
interface ShapeD231 { label: string; title: string; summary: string }

type Combined231 = ShapeA231 & ShapeB231 & ShapeC231 & ShapeD231;
type OptionalAll231 = { [K in keyof Combined231]?: Combined231[K] };
type RequiredAll231 = { [K in keyof Combined231]-?: Combined231[K] };
type ReadonlyAll231 = { readonly [K in keyof Combined231]: Combined231[K] };
type NullableAll231 = { [K in keyof Combined231]: Combined231[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString231<T> = T extends string ? true : false;
type IsNumber231<T> = T extends number ? true : false;
type TypeName231<T> = T extends string
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

type TypeNames231 = {
  [K in keyof BigRecord231]: TypeName231<BigRecord231[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb231 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource231 = "user" | "post" | "comment" | "tag" | "category";
type Action231 = `${Verb231}_${Resource231}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise231<T> = T extends Promise<infer U> ? UnwrapPromise231<U> : T;
type UnwrapArray231<T> = T extends (infer U)[] ? UnwrapArray231<U> : T;
type Head231<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail231<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation231<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation231<Exclude<T, K>>]
  : never;

type SmallUnion231 = "a" | "b" | "c" | "d";
type AllPerms231 = Permutation231<SmallUnion231>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig231,
  Flat231,
  FR231,
  BigUnion231,
  ExtractAlpha231,
  ExcludeZulu231,
  OptionalAll231,
  RequiredAll231,
  ReadonlyAll231,
  NullableAll231,
  TypeNames231,
  Action231,
  AllPerms231,
};
