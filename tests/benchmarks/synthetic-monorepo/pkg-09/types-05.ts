// pkg-09 / types-05  (seed 905) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord905 {
  a905: { x: number; y: string; z: boolean };
  b905: { p: string[]; q: Record<string, number> };
  c905: { nested: { deep: { deeper: { deepest: string } } } };
  d905: number;
  e905: string;
  f905: boolean;
  g905: null;
  h905: undefined;
  i905: bigint;
  j905: symbol;
}

type PartialBig905 = DeepPartial<BigRecord905>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten905<T> = T extends Array<infer U> ? Flatten905<U> : T;
type Nested905 = number[][][][][][][][][][];
type Flat905 = Flatten905<Nested905>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly905<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly905<T[K]> : T[K];
};
type DeepRequired905<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired905<T[K]> : T[K];
};
type FR905 = DeepReadonly905<DeepRequired905<PartialBig905>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion905 =
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

type ExtractAlpha905 = Extract<BigUnion905, "alpha" | "bravo" | "charlie">;
type ExcludeZulu905 = Exclude<BigUnion905, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA905 { width: number; height: number; depth: number }
interface ShapeB905 { color: string; opacity: number; blend: string }
interface ShapeC905 { x: number; y: number; z: number; w: number }
interface ShapeD905 { label: string; title: string; summary: string }

type Combined905 = ShapeA905 & ShapeB905 & ShapeC905 & ShapeD905;
type OptionalAll905 = { [K in keyof Combined905]?: Combined905[K] };
type RequiredAll905 = { [K in keyof Combined905]-?: Combined905[K] };
type ReadonlyAll905 = { readonly [K in keyof Combined905]: Combined905[K] };
type NullableAll905 = { [K in keyof Combined905]: Combined905[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString905<T> = T extends string ? true : false;
type IsNumber905<T> = T extends number ? true : false;
type TypeName905<T> = T extends string
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

type TypeNames905 = {
  [K in keyof BigRecord905]: TypeName905<BigRecord905[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb905 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource905 = "user" | "post" | "comment" | "tag" | "category";
type Action905 = `${Verb905}_${Resource905}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise905<T> = T extends Promise<infer U> ? UnwrapPromise905<U> : T;
type UnwrapArray905<T> = T extends (infer U)[] ? UnwrapArray905<U> : T;
type Head905<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail905<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation905<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation905<Exclude<T, K>>]
  : never;

type SmallUnion905 = "a" | "b" | "c" | "d";
type AllPerms905 = Permutation905<SmallUnion905>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig905,
  Flat905,
  FR905,
  BigUnion905,
  ExtractAlpha905,
  ExcludeZulu905,
  OptionalAll905,
  RequiredAll905,
  ReadonlyAll905,
  NullableAll905,
  TypeNames905,
  Action905,
  AllPerms905,
};
