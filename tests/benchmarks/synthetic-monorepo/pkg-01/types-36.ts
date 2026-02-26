// pkg-01 / types-36  (seed 136) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord136 {
  a136: { x: number; y: string; z: boolean };
  b136: { p: string[]; q: Record<string, number> };
  c136: { nested: { deep: { deeper: { deepest: string } } } };
  d136: number;
  e136: string;
  f136: boolean;
  g136: null;
  h136: undefined;
  i136: bigint;
  j136: symbol;
}

type PartialBig136 = DeepPartial<BigRecord136>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten136<T> = T extends Array<infer U> ? Flatten136<U> : T;
type Nested136 = number[][][][][][][][][][];
type Flat136 = Flatten136<Nested136>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly136<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly136<T[K]> : T[K];
};
type DeepRequired136<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired136<T[K]> : T[K];
};
type FR136 = DeepReadonly136<DeepRequired136<PartialBig136>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion136 =
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

type ExtractAlpha136 = Extract<BigUnion136, "alpha" | "bravo" | "charlie">;
type ExcludeZulu136 = Exclude<BigUnion136, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA136 { width: number; height: number; depth: number }
interface ShapeB136 { color: string; opacity: number; blend: string }
interface ShapeC136 { x: number; y: number; z: number; w: number }
interface ShapeD136 { label: string; title: string; summary: string }

type Combined136 = ShapeA136 & ShapeB136 & ShapeC136 & ShapeD136;
type OptionalAll136 = { [K in keyof Combined136]?: Combined136[K] };
type RequiredAll136 = { [K in keyof Combined136]-?: Combined136[K] };
type ReadonlyAll136 = { readonly [K in keyof Combined136]: Combined136[K] };
type NullableAll136 = { [K in keyof Combined136]: Combined136[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString136<T> = T extends string ? true : false;
type IsNumber136<T> = T extends number ? true : false;
type TypeName136<T> = T extends string
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

type TypeNames136 = {
  [K in keyof BigRecord136]: TypeName136<BigRecord136[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb136 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource136 = "user" | "post" | "comment" | "tag" | "category";
type Action136 = `${Verb136}_${Resource136}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise136<T> = T extends Promise<infer U> ? UnwrapPromise136<U> : T;
type UnwrapArray136<T> = T extends (infer U)[] ? UnwrapArray136<U> : T;
type Head136<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail136<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation136<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation136<Exclude<T, K>>]
  : never;

type SmallUnion136 = "a" | "b" | "c" | "d";
type AllPerms136 = Permutation136<SmallUnion136>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig136,
  Flat136,
  FR136,
  BigUnion136,
  ExtractAlpha136,
  ExcludeZulu136,
  OptionalAll136,
  RequiredAll136,
  ReadonlyAll136,
  NullableAll136,
  TypeNames136,
  Action136,
  AllPerms136,
};
