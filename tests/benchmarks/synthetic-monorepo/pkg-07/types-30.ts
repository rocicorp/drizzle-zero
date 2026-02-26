// pkg-07 / types-30  (seed 730) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord730 {
  a730: { x: number; y: string; z: boolean };
  b730: { p: string[]; q: Record<string, number> };
  c730: { nested: { deep: { deeper: { deepest: string } } } };
  d730: number;
  e730: string;
  f730: boolean;
  g730: null;
  h730: undefined;
  i730: bigint;
  j730: symbol;
}

type PartialBig730 = DeepPartial<BigRecord730>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten730<T> = T extends Array<infer U> ? Flatten730<U> : T;
type Nested730 = number[][][][][][][][][][];
type Flat730 = Flatten730<Nested730>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly730<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly730<T[K]> : T[K];
};
type DeepRequired730<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired730<T[K]> : T[K];
};
type FR730 = DeepReadonly730<DeepRequired730<PartialBig730>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion730 =
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

type ExtractAlpha730 = Extract<BigUnion730, "alpha" | "bravo" | "charlie">;
type ExcludeZulu730 = Exclude<BigUnion730, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA730 { width: number; height: number; depth: number }
interface ShapeB730 { color: string; opacity: number; blend: string }
interface ShapeC730 { x: number; y: number; z: number; w: number }
interface ShapeD730 { label: string; title: string; summary: string }

type Combined730 = ShapeA730 & ShapeB730 & ShapeC730 & ShapeD730;
type OptionalAll730 = { [K in keyof Combined730]?: Combined730[K] };
type RequiredAll730 = { [K in keyof Combined730]-?: Combined730[K] };
type ReadonlyAll730 = { readonly [K in keyof Combined730]: Combined730[K] };
type NullableAll730 = { [K in keyof Combined730]: Combined730[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString730<T> = T extends string ? true : false;
type IsNumber730<T> = T extends number ? true : false;
type TypeName730<T> = T extends string
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

type TypeNames730 = {
  [K in keyof BigRecord730]: TypeName730<BigRecord730[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb730 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource730 = "user" | "post" | "comment" | "tag" | "category";
type Action730 = `${Verb730}_${Resource730}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise730<T> = T extends Promise<infer U> ? UnwrapPromise730<U> : T;
type UnwrapArray730<T> = T extends (infer U)[] ? UnwrapArray730<U> : T;
type Head730<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail730<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation730<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation730<Exclude<T, K>>]
  : never;

type SmallUnion730 = "a" | "b" | "c" | "d";
type AllPerms730 = Permutation730<SmallUnion730>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig730,
  Flat730,
  FR730,
  BigUnion730,
  ExtractAlpha730,
  ExcludeZulu730,
  OptionalAll730,
  RequiredAll730,
  ReadonlyAll730,
  NullableAll730,
  TypeNames730,
  Action730,
  AllPerms730,
};
