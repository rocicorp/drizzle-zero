// pkg-06 / types-33  (seed 633) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord633 {
  a633: { x: number; y: string; z: boolean };
  b633: { p: string[]; q: Record<string, number> };
  c633: { nested: { deep: { deeper: { deepest: string } } } };
  d633: number;
  e633: string;
  f633: boolean;
  g633: null;
  h633: undefined;
  i633: bigint;
  j633: symbol;
}

type PartialBig633 = DeepPartial<BigRecord633>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten633<T> = T extends Array<infer U> ? Flatten633<U> : T;
type Nested633 = number[][][][][][][][][][];
type Flat633 = Flatten633<Nested633>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly633<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly633<T[K]> : T[K];
};
type DeepRequired633<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired633<T[K]> : T[K];
};
type FR633 = DeepReadonly633<DeepRequired633<PartialBig633>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion633 =
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

type ExtractAlpha633 = Extract<BigUnion633, "alpha" | "bravo" | "charlie">;
type ExcludeZulu633 = Exclude<BigUnion633, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA633 { width: number; height: number; depth: number }
interface ShapeB633 { color: string; opacity: number; blend: string }
interface ShapeC633 { x: number; y: number; z: number; w: number }
interface ShapeD633 { label: string; title: string; summary: string }

type Combined633 = ShapeA633 & ShapeB633 & ShapeC633 & ShapeD633;
type OptionalAll633 = { [K in keyof Combined633]?: Combined633[K] };
type RequiredAll633 = { [K in keyof Combined633]-?: Combined633[K] };
type ReadonlyAll633 = { readonly [K in keyof Combined633]: Combined633[K] };
type NullableAll633 = { [K in keyof Combined633]: Combined633[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString633<T> = T extends string ? true : false;
type IsNumber633<T> = T extends number ? true : false;
type TypeName633<T> = T extends string
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

type TypeNames633 = {
  [K in keyof BigRecord633]: TypeName633<BigRecord633[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb633 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource633 = "user" | "post" | "comment" | "tag" | "category";
type Action633 = `${Verb633}_${Resource633}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise633<T> = T extends Promise<infer U> ? UnwrapPromise633<U> : T;
type UnwrapArray633<T> = T extends (infer U)[] ? UnwrapArray633<U> : T;
type Head633<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail633<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation633<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation633<Exclude<T, K>>]
  : never;

type SmallUnion633 = "a" | "b" | "c" | "d";
type AllPerms633 = Permutation633<SmallUnion633>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig633,
  Flat633,
  FR633,
  BigUnion633,
  ExtractAlpha633,
  ExcludeZulu633,
  OptionalAll633,
  RequiredAll633,
  ReadonlyAll633,
  NullableAll633,
  TypeNames633,
  Action633,
  AllPerms633,
};
