// pkg-03 / types-44  (seed 344) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord344 {
  a344: { x: number; y: string; z: boolean };
  b344: { p: string[]; q: Record<string, number> };
  c344: { nested: { deep: { deeper: { deepest: string } } } };
  d344: number;
  e344: string;
  f344: boolean;
  g344: null;
  h344: undefined;
  i344: bigint;
  j344: symbol;
}

type PartialBig344 = DeepPartial<BigRecord344>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten344<T> = T extends Array<infer U> ? Flatten344<U> : T;
type Nested344 = number[][][][][][][][][][];
type Flat344 = Flatten344<Nested344>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly344<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly344<T[K]> : T[K];
};
type DeepRequired344<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired344<T[K]> : T[K];
};
type FR344 = DeepReadonly344<DeepRequired344<PartialBig344>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion344 =
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

type ExtractAlpha344 = Extract<BigUnion344, "alpha" | "bravo" | "charlie">;
type ExcludeZulu344 = Exclude<BigUnion344, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA344 { width: number; height: number; depth: number }
interface ShapeB344 { color: string; opacity: number; blend: string }
interface ShapeC344 { x: number; y: number; z: number; w: number }
interface ShapeD344 { label: string; title: string; summary: string }

type Combined344 = ShapeA344 & ShapeB344 & ShapeC344 & ShapeD344;
type OptionalAll344 = { [K in keyof Combined344]?: Combined344[K] };
type RequiredAll344 = { [K in keyof Combined344]-?: Combined344[K] };
type ReadonlyAll344 = { readonly [K in keyof Combined344]: Combined344[K] };
type NullableAll344 = { [K in keyof Combined344]: Combined344[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString344<T> = T extends string ? true : false;
type IsNumber344<T> = T extends number ? true : false;
type TypeName344<T> = T extends string
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

type TypeNames344 = {
  [K in keyof BigRecord344]: TypeName344<BigRecord344[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb344 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource344 = "user" | "post" | "comment" | "tag" | "category";
type Action344 = `${Verb344}_${Resource344}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise344<T> = T extends Promise<infer U> ? UnwrapPromise344<U> : T;
type UnwrapArray344<T> = T extends (infer U)[] ? UnwrapArray344<U> : T;
type Head344<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail344<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation344<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation344<Exclude<T, K>>]
  : never;

type SmallUnion344 = "a" | "b" | "c" | "d";
type AllPerms344 = Permutation344<SmallUnion344>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig344,
  Flat344,
  FR344,
  BigUnion344,
  ExtractAlpha344,
  ExcludeZulu344,
  OptionalAll344,
  RequiredAll344,
  ReadonlyAll344,
  NullableAll344,
  TypeNames344,
  Action344,
  AllPerms344,
};
