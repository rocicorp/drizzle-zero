// pkg-05 / types-12  (seed 512) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord512 {
  a512: { x: number; y: string; z: boolean };
  b512: { p: string[]; q: Record<string, number> };
  c512: { nested: { deep: { deeper: { deepest: string } } } };
  d512: number;
  e512: string;
  f512: boolean;
  g512: null;
  h512: undefined;
  i512: bigint;
  j512: symbol;
}

type PartialBig512 = DeepPartial<BigRecord512>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten512<T> = T extends Array<infer U> ? Flatten512<U> : T;
type Nested512 = number[][][][][][][][][][];
type Flat512 = Flatten512<Nested512>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly512<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly512<T[K]> : T[K];
};
type DeepRequired512<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired512<T[K]> : T[K];
};
type FR512 = DeepReadonly512<DeepRequired512<PartialBig512>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion512 =
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

type ExtractAlpha512 = Extract<BigUnion512, "alpha" | "bravo" | "charlie">;
type ExcludeZulu512 = Exclude<BigUnion512, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA512 { width: number; height: number; depth: number }
interface ShapeB512 { color: string; opacity: number; blend: string }
interface ShapeC512 { x: number; y: number; z: number; w: number }
interface ShapeD512 { label: string; title: string; summary: string }

type Combined512 = ShapeA512 & ShapeB512 & ShapeC512 & ShapeD512;
type OptionalAll512 = { [K in keyof Combined512]?: Combined512[K] };
type RequiredAll512 = { [K in keyof Combined512]-?: Combined512[K] };
type ReadonlyAll512 = { readonly [K in keyof Combined512]: Combined512[K] };
type NullableAll512 = { [K in keyof Combined512]: Combined512[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString512<T> = T extends string ? true : false;
type IsNumber512<T> = T extends number ? true : false;
type TypeName512<T> = T extends string
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

type TypeNames512 = {
  [K in keyof BigRecord512]: TypeName512<BigRecord512[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb512 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource512 = "user" | "post" | "comment" | "tag" | "category";
type Action512 = `${Verb512}_${Resource512}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise512<T> = T extends Promise<infer U> ? UnwrapPromise512<U> : T;
type UnwrapArray512<T> = T extends (infer U)[] ? UnwrapArray512<U> : T;
type Head512<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail512<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation512<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation512<Exclude<T, K>>]
  : never;

type SmallUnion512 = "a" | "b" | "c" | "d";
type AllPerms512 = Permutation512<SmallUnion512>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig512,
  Flat512,
  FR512,
  BigUnion512,
  ExtractAlpha512,
  ExcludeZulu512,
  OptionalAll512,
  RequiredAll512,
  ReadonlyAll512,
  NullableAll512,
  TypeNames512,
  Action512,
  AllPerms512,
};
