// pkg-01 / types-45  (seed 145) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord145 {
  a145: { x: number; y: string; z: boolean };
  b145: { p: string[]; q: Record<string, number> };
  c145: { nested: { deep: { deeper: { deepest: string } } } };
  d145: number;
  e145: string;
  f145: boolean;
  g145: null;
  h145: undefined;
  i145: bigint;
  j145: symbol;
}

type PartialBig145 = DeepPartial<BigRecord145>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten145<T> = T extends Array<infer U> ? Flatten145<U> : T;
type Nested145 = number[][][][][][][][][][];
type Flat145 = Flatten145<Nested145>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly145<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly145<T[K]> : T[K];
};
type DeepRequired145<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired145<T[K]> : T[K];
};
type FR145 = DeepReadonly145<DeepRequired145<PartialBig145>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion145 =
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

type ExtractAlpha145 = Extract<BigUnion145, "alpha" | "bravo" | "charlie">;
type ExcludeZulu145 = Exclude<BigUnion145, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA145 { width: number; height: number; depth: number }
interface ShapeB145 { color: string; opacity: number; blend: string }
interface ShapeC145 { x: number; y: number; z: number; w: number }
interface ShapeD145 { label: string; title: string; summary: string }

type Combined145 = ShapeA145 & ShapeB145 & ShapeC145 & ShapeD145;
type OptionalAll145 = { [K in keyof Combined145]?: Combined145[K] };
type RequiredAll145 = { [K in keyof Combined145]-?: Combined145[K] };
type ReadonlyAll145 = { readonly [K in keyof Combined145]: Combined145[K] };
type NullableAll145 = { [K in keyof Combined145]: Combined145[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString145<T> = T extends string ? true : false;
type IsNumber145<T> = T extends number ? true : false;
type TypeName145<T> = T extends string
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

type TypeNames145 = {
  [K in keyof BigRecord145]: TypeName145<BigRecord145[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb145 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource145 = "user" | "post" | "comment" | "tag" | "category";
type Action145 = `${Verb145}_${Resource145}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise145<T> = T extends Promise<infer U> ? UnwrapPromise145<U> : T;
type UnwrapArray145<T> = T extends (infer U)[] ? UnwrapArray145<U> : T;
type Head145<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail145<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation145<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation145<Exclude<T, K>>]
  : never;

type SmallUnion145 = "a" | "b" | "c" | "d";
type AllPerms145 = Permutation145<SmallUnion145>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig145,
  Flat145,
  FR145,
  BigUnion145,
  ExtractAlpha145,
  ExcludeZulu145,
  OptionalAll145,
  RequiredAll145,
  ReadonlyAll145,
  NullableAll145,
  TypeNames145,
  Action145,
  AllPerms145,
};
