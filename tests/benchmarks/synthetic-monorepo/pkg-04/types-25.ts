// pkg-04 / types-25  (seed 425) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord425 {
  a425: { x: number; y: string; z: boolean };
  b425: { p: string[]; q: Record<string, number> };
  c425: { nested: { deep: { deeper: { deepest: string } } } };
  d425: number;
  e425: string;
  f425: boolean;
  g425: null;
  h425: undefined;
  i425: bigint;
  j425: symbol;
}

type PartialBig425 = DeepPartial<BigRecord425>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten425<T> = T extends Array<infer U> ? Flatten425<U> : T;
type Nested425 = number[][][][][][][][][][];
type Flat425 = Flatten425<Nested425>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly425<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly425<T[K]> : T[K];
};
type DeepRequired425<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired425<T[K]> : T[K];
};
type FR425 = DeepReadonly425<DeepRequired425<PartialBig425>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion425 =
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

type ExtractAlpha425 = Extract<BigUnion425, "alpha" | "bravo" | "charlie">;
type ExcludeZulu425 = Exclude<BigUnion425, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA425 { width: number; height: number; depth: number }
interface ShapeB425 { color: string; opacity: number; blend: string }
interface ShapeC425 { x: number; y: number; z: number; w: number }
interface ShapeD425 { label: string; title: string; summary: string }

type Combined425 = ShapeA425 & ShapeB425 & ShapeC425 & ShapeD425;
type OptionalAll425 = { [K in keyof Combined425]?: Combined425[K] };
type RequiredAll425 = { [K in keyof Combined425]-?: Combined425[K] };
type ReadonlyAll425 = { readonly [K in keyof Combined425]: Combined425[K] };
type NullableAll425 = { [K in keyof Combined425]: Combined425[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString425<T> = T extends string ? true : false;
type IsNumber425<T> = T extends number ? true : false;
type TypeName425<T> = T extends string
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

type TypeNames425 = {
  [K in keyof BigRecord425]: TypeName425<BigRecord425[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb425 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource425 = "user" | "post" | "comment" | "tag" | "category";
type Action425 = `${Verb425}_${Resource425}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise425<T> = T extends Promise<infer U> ? UnwrapPromise425<U> : T;
type UnwrapArray425<T> = T extends (infer U)[] ? UnwrapArray425<U> : T;
type Head425<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail425<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation425<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation425<Exclude<T, K>>]
  : never;

type SmallUnion425 = "a" | "b" | "c" | "d";
type AllPerms425 = Permutation425<SmallUnion425>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig425,
  Flat425,
  FR425,
  BigUnion425,
  ExtractAlpha425,
  ExcludeZulu425,
  OptionalAll425,
  RequiredAll425,
  ReadonlyAll425,
  NullableAll425,
  TypeNames425,
  Action425,
  AllPerms425,
};
