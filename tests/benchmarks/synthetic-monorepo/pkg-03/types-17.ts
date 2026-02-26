// pkg-03 / types-17  (seed 317) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord317 {
  a317: { x: number; y: string; z: boolean };
  b317: { p: string[]; q: Record<string, number> };
  c317: { nested: { deep: { deeper: { deepest: string } } } };
  d317: number;
  e317: string;
  f317: boolean;
  g317: null;
  h317: undefined;
  i317: bigint;
  j317: symbol;
}

type PartialBig317 = DeepPartial<BigRecord317>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten317<T> = T extends Array<infer U> ? Flatten317<U> : T;
type Nested317 = number[][][][][][][][][][];
type Flat317 = Flatten317<Nested317>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly317<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly317<T[K]> : T[K];
};
type DeepRequired317<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired317<T[K]> : T[K];
};
type FR317 = DeepReadonly317<DeepRequired317<PartialBig317>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion317 =
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

type ExtractAlpha317 = Extract<BigUnion317, "alpha" | "bravo" | "charlie">;
type ExcludeZulu317 = Exclude<BigUnion317, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA317 { width: number; height: number; depth: number }
interface ShapeB317 { color: string; opacity: number; blend: string }
interface ShapeC317 { x: number; y: number; z: number; w: number }
interface ShapeD317 { label: string; title: string; summary: string }

type Combined317 = ShapeA317 & ShapeB317 & ShapeC317 & ShapeD317;
type OptionalAll317 = { [K in keyof Combined317]?: Combined317[K] };
type RequiredAll317 = { [K in keyof Combined317]-?: Combined317[K] };
type ReadonlyAll317 = { readonly [K in keyof Combined317]: Combined317[K] };
type NullableAll317 = { [K in keyof Combined317]: Combined317[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString317<T> = T extends string ? true : false;
type IsNumber317<T> = T extends number ? true : false;
type TypeName317<T> = T extends string
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

type TypeNames317 = {
  [K in keyof BigRecord317]: TypeName317<BigRecord317[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb317 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource317 = "user" | "post" | "comment" | "tag" | "category";
type Action317 = `${Verb317}_${Resource317}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise317<T> = T extends Promise<infer U> ? UnwrapPromise317<U> : T;
type UnwrapArray317<T> = T extends (infer U)[] ? UnwrapArray317<U> : T;
type Head317<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail317<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation317<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation317<Exclude<T, K>>]
  : never;

type SmallUnion317 = "a" | "b" | "c" | "d";
type AllPerms317 = Permutation317<SmallUnion317>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig317,
  Flat317,
  FR317,
  BigUnion317,
  ExtractAlpha317,
  ExcludeZulu317,
  OptionalAll317,
  RequiredAll317,
  ReadonlyAll317,
  NullableAll317,
  TypeNames317,
  Action317,
  AllPerms317,
};
