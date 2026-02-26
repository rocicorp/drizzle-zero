// pkg-06 / types-21  (seed 621) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord621 {
  a621: { x: number; y: string; z: boolean };
  b621: { p: string[]; q: Record<string, number> };
  c621: { nested: { deep: { deeper: { deepest: string } } } };
  d621: number;
  e621: string;
  f621: boolean;
  g621: null;
  h621: undefined;
  i621: bigint;
  j621: symbol;
}

type PartialBig621 = DeepPartial<BigRecord621>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten621<T> = T extends Array<infer U> ? Flatten621<U> : T;
type Nested621 = number[][][][][][][][][][];
type Flat621 = Flatten621<Nested621>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly621<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly621<T[K]> : T[K];
};
type DeepRequired621<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired621<T[K]> : T[K];
};
type FR621 = DeepReadonly621<DeepRequired621<PartialBig621>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion621 =
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

type ExtractAlpha621 = Extract<BigUnion621, "alpha" | "bravo" | "charlie">;
type ExcludeZulu621 = Exclude<BigUnion621, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA621 { width: number; height: number; depth: number }
interface ShapeB621 { color: string; opacity: number; blend: string }
interface ShapeC621 { x: number; y: number; z: number; w: number }
interface ShapeD621 { label: string; title: string; summary: string }

type Combined621 = ShapeA621 & ShapeB621 & ShapeC621 & ShapeD621;
type OptionalAll621 = { [K in keyof Combined621]?: Combined621[K] };
type RequiredAll621 = { [K in keyof Combined621]-?: Combined621[K] };
type ReadonlyAll621 = { readonly [K in keyof Combined621]: Combined621[K] };
type NullableAll621 = { [K in keyof Combined621]: Combined621[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString621<T> = T extends string ? true : false;
type IsNumber621<T> = T extends number ? true : false;
type TypeName621<T> = T extends string
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

type TypeNames621 = {
  [K in keyof BigRecord621]: TypeName621<BigRecord621[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb621 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource621 = "user" | "post" | "comment" | "tag" | "category";
type Action621 = `${Verb621}_${Resource621}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise621<T> = T extends Promise<infer U> ? UnwrapPromise621<U> : T;
type UnwrapArray621<T> = T extends (infer U)[] ? UnwrapArray621<U> : T;
type Head621<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail621<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation621<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation621<Exclude<T, K>>]
  : never;

type SmallUnion621 = "a" | "b" | "c" | "d";
type AllPerms621 = Permutation621<SmallUnion621>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig621,
  Flat621,
  FR621,
  BigUnion621,
  ExtractAlpha621,
  ExcludeZulu621,
  OptionalAll621,
  RequiredAll621,
  ReadonlyAll621,
  NullableAll621,
  TypeNames621,
  Action621,
  AllPerms621,
};
