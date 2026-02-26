// pkg-06 / types-35  (seed 635) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord635 {
  a635: { x: number; y: string; z: boolean };
  b635: { p: string[]; q: Record<string, number> };
  c635: { nested: { deep: { deeper: { deepest: string } } } };
  d635: number;
  e635: string;
  f635: boolean;
  g635: null;
  h635: undefined;
  i635: bigint;
  j635: symbol;
}

type PartialBig635 = DeepPartial<BigRecord635>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten635<T> = T extends Array<infer U> ? Flatten635<U> : T;
type Nested635 = number[][][][][][][][][][];
type Flat635 = Flatten635<Nested635>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly635<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly635<T[K]> : T[K];
};
type DeepRequired635<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired635<T[K]> : T[K];
};
type FR635 = DeepReadonly635<DeepRequired635<PartialBig635>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion635 =
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

type ExtractAlpha635 = Extract<BigUnion635, "alpha" | "bravo" | "charlie">;
type ExcludeZulu635 = Exclude<BigUnion635, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA635 { width: number; height: number; depth: number }
interface ShapeB635 { color: string; opacity: number; blend: string }
interface ShapeC635 { x: number; y: number; z: number; w: number }
interface ShapeD635 { label: string; title: string; summary: string }

type Combined635 = ShapeA635 & ShapeB635 & ShapeC635 & ShapeD635;
type OptionalAll635 = { [K in keyof Combined635]?: Combined635[K] };
type RequiredAll635 = { [K in keyof Combined635]-?: Combined635[K] };
type ReadonlyAll635 = { readonly [K in keyof Combined635]: Combined635[K] };
type NullableAll635 = { [K in keyof Combined635]: Combined635[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString635<T> = T extends string ? true : false;
type IsNumber635<T> = T extends number ? true : false;
type TypeName635<T> = T extends string
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

type TypeNames635 = {
  [K in keyof BigRecord635]: TypeName635<BigRecord635[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb635 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource635 = "user" | "post" | "comment" | "tag" | "category";
type Action635 = `${Verb635}_${Resource635}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise635<T> = T extends Promise<infer U> ? UnwrapPromise635<U> : T;
type UnwrapArray635<T> = T extends (infer U)[] ? UnwrapArray635<U> : T;
type Head635<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail635<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation635<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation635<Exclude<T, K>>]
  : never;

type SmallUnion635 = "a" | "b" | "c" | "d";
type AllPerms635 = Permutation635<SmallUnion635>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig635,
  Flat635,
  FR635,
  BigUnion635,
  ExtractAlpha635,
  ExcludeZulu635,
  OptionalAll635,
  RequiredAll635,
  ReadonlyAll635,
  NullableAll635,
  TypeNames635,
  Action635,
  AllPerms635,
};
