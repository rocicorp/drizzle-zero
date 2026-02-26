// pkg-08 / types-23  (seed 823) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord823 {
  a823: { x: number; y: string; z: boolean };
  b823: { p: string[]; q: Record<string, number> };
  c823: { nested: { deep: { deeper: { deepest: string } } } };
  d823: number;
  e823: string;
  f823: boolean;
  g823: null;
  h823: undefined;
  i823: bigint;
  j823: symbol;
}

type PartialBig823 = DeepPartial<BigRecord823>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten823<T> = T extends Array<infer U> ? Flatten823<U> : T;
type Nested823 = number[][][][][][][][][][];
type Flat823 = Flatten823<Nested823>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly823<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly823<T[K]> : T[K];
};
type DeepRequired823<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired823<T[K]> : T[K];
};
type FR823 = DeepReadonly823<DeepRequired823<PartialBig823>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion823 =
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

type ExtractAlpha823 = Extract<BigUnion823, "alpha" | "bravo" | "charlie">;
type ExcludeZulu823 = Exclude<BigUnion823, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA823 { width: number; height: number; depth: number }
interface ShapeB823 { color: string; opacity: number; blend: string }
interface ShapeC823 { x: number; y: number; z: number; w: number }
interface ShapeD823 { label: string; title: string; summary: string }

type Combined823 = ShapeA823 & ShapeB823 & ShapeC823 & ShapeD823;
type OptionalAll823 = { [K in keyof Combined823]?: Combined823[K] };
type RequiredAll823 = { [K in keyof Combined823]-?: Combined823[K] };
type ReadonlyAll823 = { readonly [K in keyof Combined823]: Combined823[K] };
type NullableAll823 = { [K in keyof Combined823]: Combined823[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString823<T> = T extends string ? true : false;
type IsNumber823<T> = T extends number ? true : false;
type TypeName823<T> = T extends string
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

type TypeNames823 = {
  [K in keyof BigRecord823]: TypeName823<BigRecord823[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb823 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource823 = "user" | "post" | "comment" | "tag" | "category";
type Action823 = `${Verb823}_${Resource823}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise823<T> = T extends Promise<infer U> ? UnwrapPromise823<U> : T;
type UnwrapArray823<T> = T extends (infer U)[] ? UnwrapArray823<U> : T;
type Head823<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail823<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation823<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation823<Exclude<T, K>>]
  : never;

type SmallUnion823 = "a" | "b" | "c" | "d";
type AllPerms823 = Permutation823<SmallUnion823>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig823,
  Flat823,
  FR823,
  BigUnion823,
  ExtractAlpha823,
  ExcludeZulu823,
  OptionalAll823,
  RequiredAll823,
  ReadonlyAll823,
  NullableAll823,
  TypeNames823,
  Action823,
  AllPerms823,
};
