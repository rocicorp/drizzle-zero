// pkg-09 / types-08  (seed 908) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord908 {
  a908: { x: number; y: string; z: boolean };
  b908: { p: string[]; q: Record<string, number> };
  c908: { nested: { deep: { deeper: { deepest: string } } } };
  d908: number;
  e908: string;
  f908: boolean;
  g908: null;
  h908: undefined;
  i908: bigint;
  j908: symbol;
}

type PartialBig908 = DeepPartial<BigRecord908>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten908<T> = T extends Array<infer U> ? Flatten908<U> : T;
type Nested908 = number[][][][][][][][][][];
type Flat908 = Flatten908<Nested908>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly908<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly908<T[K]> : T[K];
};
type DeepRequired908<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired908<T[K]> : T[K];
};
type FR908 = DeepReadonly908<DeepRequired908<PartialBig908>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion908 =
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

type ExtractAlpha908 = Extract<BigUnion908, "alpha" | "bravo" | "charlie">;
type ExcludeZulu908 = Exclude<BigUnion908, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA908 { width: number; height: number; depth: number }
interface ShapeB908 { color: string; opacity: number; blend: string }
interface ShapeC908 { x: number; y: number; z: number; w: number }
interface ShapeD908 { label: string; title: string; summary: string }

type Combined908 = ShapeA908 & ShapeB908 & ShapeC908 & ShapeD908;
type OptionalAll908 = { [K in keyof Combined908]?: Combined908[K] };
type RequiredAll908 = { [K in keyof Combined908]-?: Combined908[K] };
type ReadonlyAll908 = { readonly [K in keyof Combined908]: Combined908[K] };
type NullableAll908 = { [K in keyof Combined908]: Combined908[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString908<T> = T extends string ? true : false;
type IsNumber908<T> = T extends number ? true : false;
type TypeName908<T> = T extends string
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

type TypeNames908 = {
  [K in keyof BigRecord908]: TypeName908<BigRecord908[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb908 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource908 = "user" | "post" | "comment" | "tag" | "category";
type Action908 = `${Verb908}_${Resource908}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise908<T> = T extends Promise<infer U> ? UnwrapPromise908<U> : T;
type UnwrapArray908<T> = T extends (infer U)[] ? UnwrapArray908<U> : T;
type Head908<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail908<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation908<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation908<Exclude<T, K>>]
  : never;

type SmallUnion908 = "a" | "b" | "c" | "d";
type AllPerms908 = Permutation908<SmallUnion908>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig908,
  Flat908,
  FR908,
  BigUnion908,
  ExtractAlpha908,
  ExcludeZulu908,
  OptionalAll908,
  RequiredAll908,
  ReadonlyAll908,
  NullableAll908,
  TypeNames908,
  Action908,
  AllPerms908,
};
