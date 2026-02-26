// pkg-02 / types-03  (seed 203) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord203 {
  a203: { x: number; y: string; z: boolean };
  b203: { p: string[]; q: Record<string, number> };
  c203: { nested: { deep: { deeper: { deepest: string } } } };
  d203: number;
  e203: string;
  f203: boolean;
  g203: null;
  h203: undefined;
  i203: bigint;
  j203: symbol;
}

type PartialBig203 = DeepPartial<BigRecord203>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten203<T> = T extends Array<infer U> ? Flatten203<U> : T;
type Nested203 = number[][][][][][][][][][];
type Flat203 = Flatten203<Nested203>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly203<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly203<T[K]> : T[K];
};
type DeepRequired203<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired203<T[K]> : T[K];
};
type FR203 = DeepReadonly203<DeepRequired203<PartialBig203>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion203 =
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

type ExtractAlpha203 = Extract<BigUnion203, "alpha" | "bravo" | "charlie">;
type ExcludeZulu203 = Exclude<BigUnion203, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA203 { width: number; height: number; depth: number }
interface ShapeB203 { color: string; opacity: number; blend: string }
interface ShapeC203 { x: number; y: number; z: number; w: number }
interface ShapeD203 { label: string; title: string; summary: string }

type Combined203 = ShapeA203 & ShapeB203 & ShapeC203 & ShapeD203;
type OptionalAll203 = { [K in keyof Combined203]?: Combined203[K] };
type RequiredAll203 = { [K in keyof Combined203]-?: Combined203[K] };
type ReadonlyAll203 = { readonly [K in keyof Combined203]: Combined203[K] };
type NullableAll203 = { [K in keyof Combined203]: Combined203[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString203<T> = T extends string ? true : false;
type IsNumber203<T> = T extends number ? true : false;
type TypeName203<T> = T extends string
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

type TypeNames203 = {
  [K in keyof BigRecord203]: TypeName203<BigRecord203[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb203 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource203 = "user" | "post" | "comment" | "tag" | "category";
type Action203 = `${Verb203}_${Resource203}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise203<T> = T extends Promise<infer U> ? UnwrapPromise203<U> : T;
type UnwrapArray203<T> = T extends (infer U)[] ? UnwrapArray203<U> : T;
type Head203<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail203<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation203<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation203<Exclude<T, K>>]
  : never;

type SmallUnion203 = "a" | "b" | "c" | "d";
type AllPerms203 = Permutation203<SmallUnion203>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig203,
  Flat203,
  FR203,
  BigUnion203,
  ExtractAlpha203,
  ExcludeZulu203,
  OptionalAll203,
  RequiredAll203,
  ReadonlyAll203,
  NullableAll203,
  TypeNames203,
  Action203,
  AllPerms203,
};
