// pkg-02 / types-36  (seed 236) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord236 {
  a236: { x: number; y: string; z: boolean };
  b236: { p: string[]; q: Record<string, number> };
  c236: { nested: { deep: { deeper: { deepest: string } } } };
  d236: number;
  e236: string;
  f236: boolean;
  g236: null;
  h236: undefined;
  i236: bigint;
  j236: symbol;
}

type PartialBig236 = DeepPartial<BigRecord236>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten236<T> = T extends Array<infer U> ? Flatten236<U> : T;
type Nested236 = number[][][][][][][][][][];
type Flat236 = Flatten236<Nested236>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly236<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly236<T[K]> : T[K];
};
type DeepRequired236<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired236<T[K]> : T[K];
};
type FR236 = DeepReadonly236<DeepRequired236<PartialBig236>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion236 =
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

type ExtractAlpha236 = Extract<BigUnion236, "alpha" | "bravo" | "charlie">;
type ExcludeZulu236 = Exclude<BigUnion236, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA236 { width: number; height: number; depth: number }
interface ShapeB236 { color: string; opacity: number; blend: string }
interface ShapeC236 { x: number; y: number; z: number; w: number }
interface ShapeD236 { label: string; title: string; summary: string }

type Combined236 = ShapeA236 & ShapeB236 & ShapeC236 & ShapeD236;
type OptionalAll236 = { [K in keyof Combined236]?: Combined236[K] };
type RequiredAll236 = { [K in keyof Combined236]-?: Combined236[K] };
type ReadonlyAll236 = { readonly [K in keyof Combined236]: Combined236[K] };
type NullableAll236 = { [K in keyof Combined236]: Combined236[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString236<T> = T extends string ? true : false;
type IsNumber236<T> = T extends number ? true : false;
type TypeName236<T> = T extends string
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

type TypeNames236 = {
  [K in keyof BigRecord236]: TypeName236<BigRecord236[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb236 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource236 = "user" | "post" | "comment" | "tag" | "category";
type Action236 = `${Verb236}_${Resource236}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise236<T> = T extends Promise<infer U> ? UnwrapPromise236<U> : T;
type UnwrapArray236<T> = T extends (infer U)[] ? UnwrapArray236<U> : T;
type Head236<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail236<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation236<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation236<Exclude<T, K>>]
  : never;

type SmallUnion236 = "a" | "b" | "c" | "d";
type AllPerms236 = Permutation236<SmallUnion236>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig236,
  Flat236,
  FR236,
  BigUnion236,
  ExtractAlpha236,
  ExcludeZulu236,
  OptionalAll236,
  RequiredAll236,
  ReadonlyAll236,
  NullableAll236,
  TypeNames236,
  Action236,
  AllPerms236,
};
