// pkg-08 / types-18  (seed 818) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord818 {
  a818: { x: number; y: string; z: boolean };
  b818: { p: string[]; q: Record<string, number> };
  c818: { nested: { deep: { deeper: { deepest: string } } } };
  d818: number;
  e818: string;
  f818: boolean;
  g818: null;
  h818: undefined;
  i818: bigint;
  j818: symbol;
}

type PartialBig818 = DeepPartial<BigRecord818>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten818<T> = T extends Array<infer U> ? Flatten818<U> : T;
type Nested818 = number[][][][][][][][][][];
type Flat818 = Flatten818<Nested818>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly818<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly818<T[K]> : T[K];
};
type DeepRequired818<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired818<T[K]> : T[K];
};
type FR818 = DeepReadonly818<DeepRequired818<PartialBig818>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion818 =
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

type ExtractAlpha818 = Extract<BigUnion818, "alpha" | "bravo" | "charlie">;
type ExcludeZulu818 = Exclude<BigUnion818, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA818 { width: number; height: number; depth: number }
interface ShapeB818 { color: string; opacity: number; blend: string }
interface ShapeC818 { x: number; y: number; z: number; w: number }
interface ShapeD818 { label: string; title: string; summary: string }

type Combined818 = ShapeA818 & ShapeB818 & ShapeC818 & ShapeD818;
type OptionalAll818 = { [K in keyof Combined818]?: Combined818[K] };
type RequiredAll818 = { [K in keyof Combined818]-?: Combined818[K] };
type ReadonlyAll818 = { readonly [K in keyof Combined818]: Combined818[K] };
type NullableAll818 = { [K in keyof Combined818]: Combined818[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString818<T> = T extends string ? true : false;
type IsNumber818<T> = T extends number ? true : false;
type TypeName818<T> = T extends string
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

type TypeNames818 = {
  [K in keyof BigRecord818]: TypeName818<BigRecord818[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb818 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource818 = "user" | "post" | "comment" | "tag" | "category";
type Action818 = `${Verb818}_${Resource818}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise818<T> = T extends Promise<infer U> ? UnwrapPromise818<U> : T;
type UnwrapArray818<T> = T extends (infer U)[] ? UnwrapArray818<U> : T;
type Head818<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail818<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation818<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation818<Exclude<T, K>>]
  : never;

type SmallUnion818 = "a" | "b" | "c" | "d";
type AllPerms818 = Permutation818<SmallUnion818>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig818,
  Flat818,
  FR818,
  BigUnion818,
  ExtractAlpha818,
  ExcludeZulu818,
  OptionalAll818,
  RequiredAll818,
  ReadonlyAll818,
  NullableAll818,
  TypeNames818,
  Action818,
  AllPerms818,
};
