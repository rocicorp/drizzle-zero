// pkg-01 / types-17  (seed 117) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord117 {
  a117: { x: number; y: string; z: boolean };
  b117: { p: string[]; q: Record<string, number> };
  c117: { nested: { deep: { deeper: { deepest: string } } } };
  d117: number;
  e117: string;
  f117: boolean;
  g117: null;
  h117: undefined;
  i117: bigint;
  j117: symbol;
}

type PartialBig117 = DeepPartial<BigRecord117>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten117<T> = T extends Array<infer U> ? Flatten117<U> : T;
type Nested117 = number[][][][][][][][][][];
type Flat117 = Flatten117<Nested117>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly117<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly117<T[K]> : T[K];
};
type DeepRequired117<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired117<T[K]> : T[K];
};
type FR117 = DeepReadonly117<DeepRequired117<PartialBig117>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion117 =
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

type ExtractAlpha117 = Extract<BigUnion117, "alpha" | "bravo" | "charlie">;
type ExcludeZulu117 = Exclude<BigUnion117, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA117 { width: number; height: number; depth: number }
interface ShapeB117 { color: string; opacity: number; blend: string }
interface ShapeC117 { x: number; y: number; z: number; w: number }
interface ShapeD117 { label: string; title: string; summary: string }

type Combined117 = ShapeA117 & ShapeB117 & ShapeC117 & ShapeD117;
type OptionalAll117 = { [K in keyof Combined117]?: Combined117[K] };
type RequiredAll117 = { [K in keyof Combined117]-?: Combined117[K] };
type ReadonlyAll117 = { readonly [K in keyof Combined117]: Combined117[K] };
type NullableAll117 = { [K in keyof Combined117]: Combined117[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString117<T> = T extends string ? true : false;
type IsNumber117<T> = T extends number ? true : false;
type TypeName117<T> = T extends string
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

type TypeNames117 = {
  [K in keyof BigRecord117]: TypeName117<BigRecord117[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb117 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource117 = "user" | "post" | "comment" | "tag" | "category";
type Action117 = `${Verb117}_${Resource117}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise117<T> = T extends Promise<infer U> ? UnwrapPromise117<U> : T;
type UnwrapArray117<T> = T extends (infer U)[] ? UnwrapArray117<U> : T;
type Head117<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail117<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation117<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation117<Exclude<T, K>>]
  : never;

type SmallUnion117 = "a" | "b" | "c" | "d";
type AllPerms117 = Permutation117<SmallUnion117>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig117,
  Flat117,
  FR117,
  BigUnion117,
  ExtractAlpha117,
  ExcludeZulu117,
  OptionalAll117,
  RequiredAll117,
  ReadonlyAll117,
  NullableAll117,
  TypeNames117,
  Action117,
  AllPerms117,
};
