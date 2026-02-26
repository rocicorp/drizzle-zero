// pkg-05 / types-09  (seed 509) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord509 {
  a509: { x: number; y: string; z: boolean };
  b509: { p: string[]; q: Record<string, number> };
  c509: { nested: { deep: { deeper: { deepest: string } } } };
  d509: number;
  e509: string;
  f509: boolean;
  g509: null;
  h509: undefined;
  i509: bigint;
  j509: symbol;
}

type PartialBig509 = DeepPartial<BigRecord509>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten509<T> = T extends Array<infer U> ? Flatten509<U> : T;
type Nested509 = number[][][][][][][][][][];
type Flat509 = Flatten509<Nested509>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly509<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly509<T[K]> : T[K];
};
type DeepRequired509<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired509<T[K]> : T[K];
};
type FR509 = DeepReadonly509<DeepRequired509<PartialBig509>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion509 =
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

type ExtractAlpha509 = Extract<BigUnion509, "alpha" | "bravo" | "charlie">;
type ExcludeZulu509 = Exclude<BigUnion509, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA509 { width: number; height: number; depth: number }
interface ShapeB509 { color: string; opacity: number; blend: string }
interface ShapeC509 { x: number; y: number; z: number; w: number }
interface ShapeD509 { label: string; title: string; summary: string }

type Combined509 = ShapeA509 & ShapeB509 & ShapeC509 & ShapeD509;
type OptionalAll509 = { [K in keyof Combined509]?: Combined509[K] };
type RequiredAll509 = { [K in keyof Combined509]-?: Combined509[K] };
type ReadonlyAll509 = { readonly [K in keyof Combined509]: Combined509[K] };
type NullableAll509 = { [K in keyof Combined509]: Combined509[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString509<T> = T extends string ? true : false;
type IsNumber509<T> = T extends number ? true : false;
type TypeName509<T> = T extends string
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

type TypeNames509 = {
  [K in keyof BigRecord509]: TypeName509<BigRecord509[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb509 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource509 = "user" | "post" | "comment" | "tag" | "category";
type Action509 = `${Verb509}_${Resource509}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise509<T> = T extends Promise<infer U> ? UnwrapPromise509<U> : T;
type UnwrapArray509<T> = T extends (infer U)[] ? UnwrapArray509<U> : T;
type Head509<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail509<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation509<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation509<Exclude<T, K>>]
  : never;

type SmallUnion509 = "a" | "b" | "c" | "d";
type AllPerms509 = Permutation509<SmallUnion509>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig509,
  Flat509,
  FR509,
  BigUnion509,
  ExtractAlpha509,
  ExcludeZulu509,
  OptionalAll509,
  RequiredAll509,
  ReadonlyAll509,
  NullableAll509,
  TypeNames509,
  Action509,
  AllPerms509,
};
