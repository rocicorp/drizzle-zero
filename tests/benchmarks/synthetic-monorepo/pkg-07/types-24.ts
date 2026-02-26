// pkg-07 / types-24  (seed 724) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord724 {
  a724: { x: number; y: string; z: boolean };
  b724: { p: string[]; q: Record<string, number> };
  c724: { nested: { deep: { deeper: { deepest: string } } } };
  d724: number;
  e724: string;
  f724: boolean;
  g724: null;
  h724: undefined;
  i724: bigint;
  j724: symbol;
}

type PartialBig724 = DeepPartial<BigRecord724>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten724<T> = T extends Array<infer U> ? Flatten724<U> : T;
type Nested724 = number[][][][][][][][][][];
type Flat724 = Flatten724<Nested724>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly724<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly724<T[K]> : T[K];
};
type DeepRequired724<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired724<T[K]> : T[K];
};
type FR724 = DeepReadonly724<DeepRequired724<PartialBig724>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion724 =
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

type ExtractAlpha724 = Extract<BigUnion724, "alpha" | "bravo" | "charlie">;
type ExcludeZulu724 = Exclude<BigUnion724, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA724 { width: number; height: number; depth: number }
interface ShapeB724 { color: string; opacity: number; blend: string }
interface ShapeC724 { x: number; y: number; z: number; w: number }
interface ShapeD724 { label: string; title: string; summary: string }

type Combined724 = ShapeA724 & ShapeB724 & ShapeC724 & ShapeD724;
type OptionalAll724 = { [K in keyof Combined724]?: Combined724[K] };
type RequiredAll724 = { [K in keyof Combined724]-?: Combined724[K] };
type ReadonlyAll724 = { readonly [K in keyof Combined724]: Combined724[K] };
type NullableAll724 = { [K in keyof Combined724]: Combined724[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString724<T> = T extends string ? true : false;
type IsNumber724<T> = T extends number ? true : false;
type TypeName724<T> = T extends string
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

type TypeNames724 = {
  [K in keyof BigRecord724]: TypeName724<BigRecord724[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb724 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource724 = "user" | "post" | "comment" | "tag" | "category";
type Action724 = `${Verb724}_${Resource724}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise724<T> = T extends Promise<infer U> ? UnwrapPromise724<U> : T;
type UnwrapArray724<T> = T extends (infer U)[] ? UnwrapArray724<U> : T;
type Head724<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail724<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation724<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation724<Exclude<T, K>>]
  : never;

type SmallUnion724 = "a" | "b" | "c" | "d";
type AllPerms724 = Permutation724<SmallUnion724>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig724,
  Flat724,
  FR724,
  BigUnion724,
  ExtractAlpha724,
  ExcludeZulu724,
  OptionalAll724,
  RequiredAll724,
  ReadonlyAll724,
  NullableAll724,
  TypeNames724,
  Action724,
  AllPerms724,
};
