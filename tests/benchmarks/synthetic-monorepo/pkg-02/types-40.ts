// pkg-02 / types-40  (seed 240) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord240 {
  a240: { x: number; y: string; z: boolean };
  b240: { p: string[]; q: Record<string, number> };
  c240: { nested: { deep: { deeper: { deepest: string } } } };
  d240: number;
  e240: string;
  f240: boolean;
  g240: null;
  h240: undefined;
  i240: bigint;
  j240: symbol;
}

type PartialBig240 = DeepPartial<BigRecord240>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten240<T> = T extends Array<infer U> ? Flatten240<U> : T;
type Nested240 = number[][][][][][][][][][];
type Flat240 = Flatten240<Nested240>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly240<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly240<T[K]> : T[K];
};
type DeepRequired240<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired240<T[K]> : T[K];
};
type FR240 = DeepReadonly240<DeepRequired240<PartialBig240>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion240 =
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

type ExtractAlpha240 = Extract<BigUnion240, "alpha" | "bravo" | "charlie">;
type ExcludeZulu240 = Exclude<BigUnion240, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA240 { width: number; height: number; depth: number }
interface ShapeB240 { color: string; opacity: number; blend: string }
interface ShapeC240 { x: number; y: number; z: number; w: number }
interface ShapeD240 { label: string; title: string; summary: string }

type Combined240 = ShapeA240 & ShapeB240 & ShapeC240 & ShapeD240;
type OptionalAll240 = { [K in keyof Combined240]?: Combined240[K] };
type RequiredAll240 = { [K in keyof Combined240]-?: Combined240[K] };
type ReadonlyAll240 = { readonly [K in keyof Combined240]: Combined240[K] };
type NullableAll240 = { [K in keyof Combined240]: Combined240[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString240<T> = T extends string ? true : false;
type IsNumber240<T> = T extends number ? true : false;
type TypeName240<T> = T extends string
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

type TypeNames240 = {
  [K in keyof BigRecord240]: TypeName240<BigRecord240[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb240 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource240 = "user" | "post" | "comment" | "tag" | "category";
type Action240 = `${Verb240}_${Resource240}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise240<T> = T extends Promise<infer U> ? UnwrapPromise240<U> : T;
type UnwrapArray240<T> = T extends (infer U)[] ? UnwrapArray240<U> : T;
type Head240<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail240<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation240<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation240<Exclude<T, K>>]
  : never;

type SmallUnion240 = "a" | "b" | "c" | "d";
type AllPerms240 = Permutation240<SmallUnion240>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig240,
  Flat240,
  FR240,
  BigUnion240,
  ExtractAlpha240,
  ExcludeZulu240,
  OptionalAll240,
  RequiredAll240,
  ReadonlyAll240,
  NullableAll240,
  TypeNames240,
  Action240,
  AllPerms240,
};
