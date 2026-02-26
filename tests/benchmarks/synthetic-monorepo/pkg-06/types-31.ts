// pkg-06 / types-31  (seed 631) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord631 {
  a631: { x: number; y: string; z: boolean };
  b631: { p: string[]; q: Record<string, number> };
  c631: { nested: { deep: { deeper: { deepest: string } } } };
  d631: number;
  e631: string;
  f631: boolean;
  g631: null;
  h631: undefined;
  i631: bigint;
  j631: symbol;
}

type PartialBig631 = DeepPartial<BigRecord631>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten631<T> = T extends Array<infer U> ? Flatten631<U> : T;
type Nested631 = number[][][][][][][][][][];
type Flat631 = Flatten631<Nested631>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly631<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly631<T[K]> : T[K];
};
type DeepRequired631<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired631<T[K]> : T[K];
};
type FR631 = DeepReadonly631<DeepRequired631<PartialBig631>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion631 =
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

type ExtractAlpha631 = Extract<BigUnion631, "alpha" | "bravo" | "charlie">;
type ExcludeZulu631 = Exclude<BigUnion631, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA631 { width: number; height: number; depth: number }
interface ShapeB631 { color: string; opacity: number; blend: string }
interface ShapeC631 { x: number; y: number; z: number; w: number }
interface ShapeD631 { label: string; title: string; summary: string }

type Combined631 = ShapeA631 & ShapeB631 & ShapeC631 & ShapeD631;
type OptionalAll631 = { [K in keyof Combined631]?: Combined631[K] };
type RequiredAll631 = { [K in keyof Combined631]-?: Combined631[K] };
type ReadonlyAll631 = { readonly [K in keyof Combined631]: Combined631[K] };
type NullableAll631 = { [K in keyof Combined631]: Combined631[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString631<T> = T extends string ? true : false;
type IsNumber631<T> = T extends number ? true : false;
type TypeName631<T> = T extends string
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

type TypeNames631 = {
  [K in keyof BigRecord631]: TypeName631<BigRecord631[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb631 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource631 = "user" | "post" | "comment" | "tag" | "category";
type Action631 = `${Verb631}_${Resource631}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise631<T> = T extends Promise<infer U> ? UnwrapPromise631<U> : T;
type UnwrapArray631<T> = T extends (infer U)[] ? UnwrapArray631<U> : T;
type Head631<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail631<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation631<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation631<Exclude<T, K>>]
  : never;

type SmallUnion631 = "a" | "b" | "c" | "d";
type AllPerms631 = Permutation631<SmallUnion631>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig631,
  Flat631,
  FR631,
  BigUnion631,
  ExtractAlpha631,
  ExcludeZulu631,
  OptionalAll631,
  RequiredAll631,
  ReadonlyAll631,
  NullableAll631,
  TypeNames631,
  Action631,
  AllPerms631,
};
