// pkg-01 / types-20  (seed 120) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord120 {
  a120: { x: number; y: string; z: boolean };
  b120: { p: string[]; q: Record<string, number> };
  c120: { nested: { deep: { deeper: { deepest: string } } } };
  d120: number;
  e120: string;
  f120: boolean;
  g120: null;
  h120: undefined;
  i120: bigint;
  j120: symbol;
}

type PartialBig120 = DeepPartial<BigRecord120>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten120<T> = T extends Array<infer U> ? Flatten120<U> : T;
type Nested120 = number[][][][][][][][][][];
type Flat120 = Flatten120<Nested120>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly120<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly120<T[K]> : T[K];
};
type DeepRequired120<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired120<T[K]> : T[K];
};
type FR120 = DeepReadonly120<DeepRequired120<PartialBig120>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion120 =
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

type ExtractAlpha120 = Extract<BigUnion120, "alpha" | "bravo" | "charlie">;
type ExcludeZulu120 = Exclude<BigUnion120, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA120 { width: number; height: number; depth: number }
interface ShapeB120 { color: string; opacity: number; blend: string }
interface ShapeC120 { x: number; y: number; z: number; w: number }
interface ShapeD120 { label: string; title: string; summary: string }

type Combined120 = ShapeA120 & ShapeB120 & ShapeC120 & ShapeD120;
type OptionalAll120 = { [K in keyof Combined120]?: Combined120[K] };
type RequiredAll120 = { [K in keyof Combined120]-?: Combined120[K] };
type ReadonlyAll120 = { readonly [K in keyof Combined120]: Combined120[K] };
type NullableAll120 = { [K in keyof Combined120]: Combined120[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString120<T> = T extends string ? true : false;
type IsNumber120<T> = T extends number ? true : false;
type TypeName120<T> = T extends string
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

type TypeNames120 = {
  [K in keyof BigRecord120]: TypeName120<BigRecord120[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb120 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource120 = "user" | "post" | "comment" | "tag" | "category";
type Action120 = `${Verb120}_${Resource120}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise120<T> = T extends Promise<infer U> ? UnwrapPromise120<U> : T;
type UnwrapArray120<T> = T extends (infer U)[] ? UnwrapArray120<U> : T;
type Head120<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail120<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation120<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation120<Exclude<T, K>>]
  : never;

type SmallUnion120 = "a" | "b" | "c" | "d";
type AllPerms120 = Permutation120<SmallUnion120>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig120,
  Flat120,
  FR120,
  BigUnion120,
  ExtractAlpha120,
  ExcludeZulu120,
  OptionalAll120,
  RequiredAll120,
  ReadonlyAll120,
  NullableAll120,
  TypeNames120,
  Action120,
  AllPerms120,
};
