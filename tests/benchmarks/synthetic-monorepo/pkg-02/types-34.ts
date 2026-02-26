// pkg-02 / types-34  (seed 234) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord234 {
  a234: { x: number; y: string; z: boolean };
  b234: { p: string[]; q: Record<string, number> };
  c234: { nested: { deep: { deeper: { deepest: string } } } };
  d234: number;
  e234: string;
  f234: boolean;
  g234: null;
  h234: undefined;
  i234: bigint;
  j234: symbol;
}

type PartialBig234 = DeepPartial<BigRecord234>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten234<T> = T extends Array<infer U> ? Flatten234<U> : T;
type Nested234 = number[][][][][][][][][][];
type Flat234 = Flatten234<Nested234>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly234<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly234<T[K]> : T[K];
};
type DeepRequired234<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired234<T[K]> : T[K];
};
type FR234 = DeepReadonly234<DeepRequired234<PartialBig234>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion234 =
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

type ExtractAlpha234 = Extract<BigUnion234, "alpha" | "bravo" | "charlie">;
type ExcludeZulu234 = Exclude<BigUnion234, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA234 { width: number; height: number; depth: number }
interface ShapeB234 { color: string; opacity: number; blend: string }
interface ShapeC234 { x: number; y: number; z: number; w: number }
interface ShapeD234 { label: string; title: string; summary: string }

type Combined234 = ShapeA234 & ShapeB234 & ShapeC234 & ShapeD234;
type OptionalAll234 = { [K in keyof Combined234]?: Combined234[K] };
type RequiredAll234 = { [K in keyof Combined234]-?: Combined234[K] };
type ReadonlyAll234 = { readonly [K in keyof Combined234]: Combined234[K] };
type NullableAll234 = { [K in keyof Combined234]: Combined234[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString234<T> = T extends string ? true : false;
type IsNumber234<T> = T extends number ? true : false;
type TypeName234<T> = T extends string
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

type TypeNames234 = {
  [K in keyof BigRecord234]: TypeName234<BigRecord234[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb234 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource234 = "user" | "post" | "comment" | "tag" | "category";
type Action234 = `${Verb234}_${Resource234}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise234<T> = T extends Promise<infer U> ? UnwrapPromise234<U> : T;
type UnwrapArray234<T> = T extends (infer U)[] ? UnwrapArray234<U> : T;
type Head234<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail234<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation234<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation234<Exclude<T, K>>]
  : never;

type SmallUnion234 = "a" | "b" | "c" | "d";
type AllPerms234 = Permutation234<SmallUnion234>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig234,
  Flat234,
  FR234,
  BigUnion234,
  ExtractAlpha234,
  ExcludeZulu234,
  OptionalAll234,
  RequiredAll234,
  ReadonlyAll234,
  NullableAll234,
  TypeNames234,
  Action234,
  AllPerms234,
};
