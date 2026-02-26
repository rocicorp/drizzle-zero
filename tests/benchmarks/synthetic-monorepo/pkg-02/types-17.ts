// pkg-02 / types-17  (seed 217) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord217 {
  a217: { x: number; y: string; z: boolean };
  b217: { p: string[]; q: Record<string, number> };
  c217: { nested: { deep: { deeper: { deepest: string } } } };
  d217: number;
  e217: string;
  f217: boolean;
  g217: null;
  h217: undefined;
  i217: bigint;
  j217: symbol;
}

type PartialBig217 = DeepPartial<BigRecord217>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten217<T> = T extends Array<infer U> ? Flatten217<U> : T;
type Nested217 = number[][][][][][][][][][];
type Flat217 = Flatten217<Nested217>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly217<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly217<T[K]> : T[K];
};
type DeepRequired217<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired217<T[K]> : T[K];
};
type FR217 = DeepReadonly217<DeepRequired217<PartialBig217>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion217 =
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

type ExtractAlpha217 = Extract<BigUnion217, "alpha" | "bravo" | "charlie">;
type ExcludeZulu217 = Exclude<BigUnion217, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA217 { width: number; height: number; depth: number }
interface ShapeB217 { color: string; opacity: number; blend: string }
interface ShapeC217 { x: number; y: number; z: number; w: number }
interface ShapeD217 { label: string; title: string; summary: string }

type Combined217 = ShapeA217 & ShapeB217 & ShapeC217 & ShapeD217;
type OptionalAll217 = { [K in keyof Combined217]?: Combined217[K] };
type RequiredAll217 = { [K in keyof Combined217]-?: Combined217[K] };
type ReadonlyAll217 = { readonly [K in keyof Combined217]: Combined217[K] };
type NullableAll217 = { [K in keyof Combined217]: Combined217[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString217<T> = T extends string ? true : false;
type IsNumber217<T> = T extends number ? true : false;
type TypeName217<T> = T extends string
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

type TypeNames217 = {
  [K in keyof BigRecord217]: TypeName217<BigRecord217[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb217 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource217 = "user" | "post" | "comment" | "tag" | "category";
type Action217 = `${Verb217}_${Resource217}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise217<T> = T extends Promise<infer U> ? UnwrapPromise217<U> : T;
type UnwrapArray217<T> = T extends (infer U)[] ? UnwrapArray217<U> : T;
type Head217<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail217<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation217<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation217<Exclude<T, K>>]
  : never;

type SmallUnion217 = "a" | "b" | "c" | "d";
type AllPerms217 = Permutation217<SmallUnion217>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig217,
  Flat217,
  FR217,
  BigUnion217,
  ExtractAlpha217,
  ExcludeZulu217,
  OptionalAll217,
  RequiredAll217,
  ReadonlyAll217,
  NullableAll217,
  TypeNames217,
  Action217,
  AllPerms217,
};
