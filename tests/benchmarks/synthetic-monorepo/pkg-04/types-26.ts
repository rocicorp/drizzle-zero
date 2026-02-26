// pkg-04 / types-26  (seed 426) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord426 {
  a426: { x: number; y: string; z: boolean };
  b426: { p: string[]; q: Record<string, number> };
  c426: { nested: { deep: { deeper: { deepest: string } } } };
  d426: number;
  e426: string;
  f426: boolean;
  g426: null;
  h426: undefined;
  i426: bigint;
  j426: symbol;
}

type PartialBig426 = DeepPartial<BigRecord426>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten426<T> = T extends Array<infer U> ? Flatten426<U> : T;
type Nested426 = number[][][][][][][][][][];
type Flat426 = Flatten426<Nested426>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly426<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly426<T[K]> : T[K];
};
type DeepRequired426<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired426<T[K]> : T[K];
};
type FR426 = DeepReadonly426<DeepRequired426<PartialBig426>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion426 =
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

type ExtractAlpha426 = Extract<BigUnion426, "alpha" | "bravo" | "charlie">;
type ExcludeZulu426 = Exclude<BigUnion426, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA426 { width: number; height: number; depth: number }
interface ShapeB426 { color: string; opacity: number; blend: string }
interface ShapeC426 { x: number; y: number; z: number; w: number }
interface ShapeD426 { label: string; title: string; summary: string }

type Combined426 = ShapeA426 & ShapeB426 & ShapeC426 & ShapeD426;
type OptionalAll426 = { [K in keyof Combined426]?: Combined426[K] };
type RequiredAll426 = { [K in keyof Combined426]-?: Combined426[K] };
type ReadonlyAll426 = { readonly [K in keyof Combined426]: Combined426[K] };
type NullableAll426 = { [K in keyof Combined426]: Combined426[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString426<T> = T extends string ? true : false;
type IsNumber426<T> = T extends number ? true : false;
type TypeName426<T> = T extends string
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

type TypeNames426 = {
  [K in keyof BigRecord426]: TypeName426<BigRecord426[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb426 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource426 = "user" | "post" | "comment" | "tag" | "category";
type Action426 = `${Verb426}_${Resource426}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise426<T> = T extends Promise<infer U> ? UnwrapPromise426<U> : T;
type UnwrapArray426<T> = T extends (infer U)[] ? UnwrapArray426<U> : T;
type Head426<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail426<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation426<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation426<Exclude<T, K>>]
  : never;

type SmallUnion426 = "a" | "b" | "c" | "d";
type AllPerms426 = Permutation426<SmallUnion426>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig426,
  Flat426,
  FR426,
  BigUnion426,
  ExtractAlpha426,
  ExcludeZulu426,
  OptionalAll426,
  RequiredAll426,
  ReadonlyAll426,
  NullableAll426,
  TypeNames426,
  Action426,
  AllPerms426,
};
