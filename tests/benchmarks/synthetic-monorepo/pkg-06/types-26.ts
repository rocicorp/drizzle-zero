// pkg-06 / types-26  (seed 626) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord626 {
  a626: { x: number; y: string; z: boolean };
  b626: { p: string[]; q: Record<string, number> };
  c626: { nested: { deep: { deeper: { deepest: string } } } };
  d626: number;
  e626: string;
  f626: boolean;
  g626: null;
  h626: undefined;
  i626: bigint;
  j626: symbol;
}

type PartialBig626 = DeepPartial<BigRecord626>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten626<T> = T extends Array<infer U> ? Flatten626<U> : T;
type Nested626 = number[][][][][][][][][][];
type Flat626 = Flatten626<Nested626>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly626<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly626<T[K]> : T[K];
};
type DeepRequired626<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired626<T[K]> : T[K];
};
type FR626 = DeepReadonly626<DeepRequired626<PartialBig626>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion626 =
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

type ExtractAlpha626 = Extract<BigUnion626, "alpha" | "bravo" | "charlie">;
type ExcludeZulu626 = Exclude<BigUnion626, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA626 { width: number; height: number; depth: number }
interface ShapeB626 { color: string; opacity: number; blend: string }
interface ShapeC626 { x: number; y: number; z: number; w: number }
interface ShapeD626 { label: string; title: string; summary: string }

type Combined626 = ShapeA626 & ShapeB626 & ShapeC626 & ShapeD626;
type OptionalAll626 = { [K in keyof Combined626]?: Combined626[K] };
type RequiredAll626 = { [K in keyof Combined626]-?: Combined626[K] };
type ReadonlyAll626 = { readonly [K in keyof Combined626]: Combined626[K] };
type NullableAll626 = { [K in keyof Combined626]: Combined626[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString626<T> = T extends string ? true : false;
type IsNumber626<T> = T extends number ? true : false;
type TypeName626<T> = T extends string
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

type TypeNames626 = {
  [K in keyof BigRecord626]: TypeName626<BigRecord626[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb626 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource626 = "user" | "post" | "comment" | "tag" | "category";
type Action626 = `${Verb626}_${Resource626}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise626<T> = T extends Promise<infer U> ? UnwrapPromise626<U> : T;
type UnwrapArray626<T> = T extends (infer U)[] ? UnwrapArray626<U> : T;
type Head626<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail626<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation626<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation626<Exclude<T, K>>]
  : never;

type SmallUnion626 = "a" | "b" | "c" | "d";
type AllPerms626 = Permutation626<SmallUnion626>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig626,
  Flat626,
  FR626,
  BigUnion626,
  ExtractAlpha626,
  ExcludeZulu626,
  OptionalAll626,
  RequiredAll626,
  ReadonlyAll626,
  NullableAll626,
  TypeNames626,
  Action626,
  AllPerms626,
};
