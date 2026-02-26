// pkg-07 / types-27  (seed 727) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord727 {
  a727: { x: number; y: string; z: boolean };
  b727: { p: string[]; q: Record<string, number> };
  c727: { nested: { deep: { deeper: { deepest: string } } } };
  d727: number;
  e727: string;
  f727: boolean;
  g727: null;
  h727: undefined;
  i727: bigint;
  j727: symbol;
}

type PartialBig727 = DeepPartial<BigRecord727>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten727<T> = T extends Array<infer U> ? Flatten727<U> : T;
type Nested727 = number[][][][][][][][][][];
type Flat727 = Flatten727<Nested727>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly727<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly727<T[K]> : T[K];
};
type DeepRequired727<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired727<T[K]> : T[K];
};
type FR727 = DeepReadonly727<DeepRequired727<PartialBig727>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion727 =
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

type ExtractAlpha727 = Extract<BigUnion727, "alpha" | "bravo" | "charlie">;
type ExcludeZulu727 = Exclude<BigUnion727, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA727 { width: number; height: number; depth: number }
interface ShapeB727 { color: string; opacity: number; blend: string }
interface ShapeC727 { x: number; y: number; z: number; w: number }
interface ShapeD727 { label: string; title: string; summary: string }

type Combined727 = ShapeA727 & ShapeB727 & ShapeC727 & ShapeD727;
type OptionalAll727 = { [K in keyof Combined727]?: Combined727[K] };
type RequiredAll727 = { [K in keyof Combined727]-?: Combined727[K] };
type ReadonlyAll727 = { readonly [K in keyof Combined727]: Combined727[K] };
type NullableAll727 = { [K in keyof Combined727]: Combined727[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString727<T> = T extends string ? true : false;
type IsNumber727<T> = T extends number ? true : false;
type TypeName727<T> = T extends string
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

type TypeNames727 = {
  [K in keyof BigRecord727]: TypeName727<BigRecord727[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb727 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource727 = "user" | "post" | "comment" | "tag" | "category";
type Action727 = `${Verb727}_${Resource727}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise727<T> = T extends Promise<infer U> ? UnwrapPromise727<U> : T;
type UnwrapArray727<T> = T extends (infer U)[] ? UnwrapArray727<U> : T;
type Head727<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail727<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation727<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation727<Exclude<T, K>>]
  : never;

type SmallUnion727 = "a" | "b" | "c" | "d";
type AllPerms727 = Permutation727<SmallUnion727>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig727,
  Flat727,
  FR727,
  BigUnion727,
  ExtractAlpha727,
  ExcludeZulu727,
  OptionalAll727,
  RequiredAll727,
  ReadonlyAll727,
  NullableAll727,
  TypeNames727,
  Action727,
  AllPerms727,
};
