// pkg-04 / types-27  (seed 427) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord427 {
  a427: { x: number; y: string; z: boolean };
  b427: { p: string[]; q: Record<string, number> };
  c427: { nested: { deep: { deeper: { deepest: string } } } };
  d427: number;
  e427: string;
  f427: boolean;
  g427: null;
  h427: undefined;
  i427: bigint;
  j427: symbol;
}

type PartialBig427 = DeepPartial<BigRecord427>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten427<T> = T extends Array<infer U> ? Flatten427<U> : T;
type Nested427 = number[][][][][][][][][][];
type Flat427 = Flatten427<Nested427>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly427<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly427<T[K]> : T[K];
};
type DeepRequired427<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired427<T[K]> : T[K];
};
type FR427 = DeepReadonly427<DeepRequired427<PartialBig427>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion427 =
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

type ExtractAlpha427 = Extract<BigUnion427, "alpha" | "bravo" | "charlie">;
type ExcludeZulu427 = Exclude<BigUnion427, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA427 { width: number; height: number; depth: number }
interface ShapeB427 { color: string; opacity: number; blend: string }
interface ShapeC427 { x: number; y: number; z: number; w: number }
interface ShapeD427 { label: string; title: string; summary: string }

type Combined427 = ShapeA427 & ShapeB427 & ShapeC427 & ShapeD427;
type OptionalAll427 = { [K in keyof Combined427]?: Combined427[K] };
type RequiredAll427 = { [K in keyof Combined427]-?: Combined427[K] };
type ReadonlyAll427 = { readonly [K in keyof Combined427]: Combined427[K] };
type NullableAll427 = { [K in keyof Combined427]: Combined427[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString427<T> = T extends string ? true : false;
type IsNumber427<T> = T extends number ? true : false;
type TypeName427<T> = T extends string
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

type TypeNames427 = {
  [K in keyof BigRecord427]: TypeName427<BigRecord427[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb427 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource427 = "user" | "post" | "comment" | "tag" | "category";
type Action427 = `${Verb427}_${Resource427}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise427<T> = T extends Promise<infer U> ? UnwrapPromise427<U> : T;
type UnwrapArray427<T> = T extends (infer U)[] ? UnwrapArray427<U> : T;
type Head427<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail427<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation427<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation427<Exclude<T, K>>]
  : never;

type SmallUnion427 = "a" | "b" | "c" | "d";
type AllPerms427 = Permutation427<SmallUnion427>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig427,
  Flat427,
  FR427,
  BigUnion427,
  ExtractAlpha427,
  ExcludeZulu427,
  OptionalAll427,
  RequiredAll427,
  ReadonlyAll427,
  NullableAll427,
  TypeNames427,
  Action427,
  AllPerms427,
};
