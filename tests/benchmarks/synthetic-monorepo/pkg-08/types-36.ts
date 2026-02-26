// pkg-08 / types-36  (seed 836) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord836 {
  a836: { x: number; y: string; z: boolean };
  b836: { p: string[]; q: Record<string, number> };
  c836: { nested: { deep: { deeper: { deepest: string } } } };
  d836: number;
  e836: string;
  f836: boolean;
  g836: null;
  h836: undefined;
  i836: bigint;
  j836: symbol;
}

type PartialBig836 = DeepPartial<BigRecord836>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten836<T> = T extends Array<infer U> ? Flatten836<U> : T;
type Nested836 = number[][][][][][][][][][];
type Flat836 = Flatten836<Nested836>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly836<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly836<T[K]> : T[K];
};
type DeepRequired836<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired836<T[K]> : T[K];
};
type FR836 = DeepReadonly836<DeepRequired836<PartialBig836>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion836 =
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

type ExtractAlpha836 = Extract<BigUnion836, "alpha" | "bravo" | "charlie">;
type ExcludeZulu836 = Exclude<BigUnion836, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA836 { width: number; height: number; depth: number }
interface ShapeB836 { color: string; opacity: number; blend: string }
interface ShapeC836 { x: number; y: number; z: number; w: number }
interface ShapeD836 { label: string; title: string; summary: string }

type Combined836 = ShapeA836 & ShapeB836 & ShapeC836 & ShapeD836;
type OptionalAll836 = { [K in keyof Combined836]?: Combined836[K] };
type RequiredAll836 = { [K in keyof Combined836]-?: Combined836[K] };
type ReadonlyAll836 = { readonly [K in keyof Combined836]: Combined836[K] };
type NullableAll836 = { [K in keyof Combined836]: Combined836[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString836<T> = T extends string ? true : false;
type IsNumber836<T> = T extends number ? true : false;
type TypeName836<T> = T extends string
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

type TypeNames836 = {
  [K in keyof BigRecord836]: TypeName836<BigRecord836[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb836 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource836 = "user" | "post" | "comment" | "tag" | "category";
type Action836 = `${Verb836}_${Resource836}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise836<T> = T extends Promise<infer U> ? UnwrapPromise836<U> : T;
type UnwrapArray836<T> = T extends (infer U)[] ? UnwrapArray836<U> : T;
type Head836<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail836<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation836<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation836<Exclude<T, K>>]
  : never;

type SmallUnion836 = "a" | "b" | "c" | "d";
type AllPerms836 = Permutation836<SmallUnion836>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig836,
  Flat836,
  FR836,
  BigUnion836,
  ExtractAlpha836,
  ExcludeZulu836,
  OptionalAll836,
  RequiredAll836,
  ReadonlyAll836,
  NullableAll836,
  TypeNames836,
  Action836,
  AllPerms836,
};
