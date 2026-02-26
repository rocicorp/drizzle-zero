// pkg-01 / types-07  (seed 107) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord107 {
  a107: { x: number; y: string; z: boolean };
  b107: { p: string[]; q: Record<string, number> };
  c107: { nested: { deep: { deeper: { deepest: string } } } };
  d107: number;
  e107: string;
  f107: boolean;
  g107: null;
  h107: undefined;
  i107: bigint;
  j107: symbol;
}

type PartialBig107 = DeepPartial<BigRecord107>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten107<T> = T extends Array<infer U> ? Flatten107<U> : T;
type Nested107 = number[][][][][][][][][][];
type Flat107 = Flatten107<Nested107>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly107<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly107<T[K]> : T[K];
};
type DeepRequired107<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired107<T[K]> : T[K];
};
type FR107 = DeepReadonly107<DeepRequired107<PartialBig107>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion107 =
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

type ExtractAlpha107 = Extract<BigUnion107, "alpha" | "bravo" | "charlie">;
type ExcludeZulu107 = Exclude<BigUnion107, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA107 { width: number; height: number; depth: number }
interface ShapeB107 { color: string; opacity: number; blend: string }
interface ShapeC107 { x: number; y: number; z: number; w: number }
interface ShapeD107 { label: string; title: string; summary: string }

type Combined107 = ShapeA107 & ShapeB107 & ShapeC107 & ShapeD107;
type OptionalAll107 = { [K in keyof Combined107]?: Combined107[K] };
type RequiredAll107 = { [K in keyof Combined107]-?: Combined107[K] };
type ReadonlyAll107 = { readonly [K in keyof Combined107]: Combined107[K] };
type NullableAll107 = { [K in keyof Combined107]: Combined107[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString107<T> = T extends string ? true : false;
type IsNumber107<T> = T extends number ? true : false;
type TypeName107<T> = T extends string
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

type TypeNames107 = {
  [K in keyof BigRecord107]: TypeName107<BigRecord107[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb107 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource107 = "user" | "post" | "comment" | "tag" | "category";
type Action107 = `${Verb107}_${Resource107}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise107<T> = T extends Promise<infer U> ? UnwrapPromise107<U> : T;
type UnwrapArray107<T> = T extends (infer U)[] ? UnwrapArray107<U> : T;
type Head107<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail107<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation107<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation107<Exclude<T, K>>]
  : never;

type SmallUnion107 = "a" | "b" | "c" | "d";
type AllPerms107 = Permutation107<SmallUnion107>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig107,
  Flat107,
  FR107,
  BigUnion107,
  ExtractAlpha107,
  ExcludeZulu107,
  OptionalAll107,
  RequiredAll107,
  ReadonlyAll107,
  NullableAll107,
  TypeNames107,
  Action107,
  AllPerms107,
};
