// pkg-01 / types-25  (seed 125) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord125 {
  a125: { x: number; y: string; z: boolean };
  b125: { p: string[]; q: Record<string, number> };
  c125: { nested: { deep: { deeper: { deepest: string } } } };
  d125: number;
  e125: string;
  f125: boolean;
  g125: null;
  h125: undefined;
  i125: bigint;
  j125: symbol;
}

type PartialBig125 = DeepPartial<BigRecord125>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten125<T> = T extends Array<infer U> ? Flatten125<U> : T;
type Nested125 = number[][][][][][][][][][];
type Flat125 = Flatten125<Nested125>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly125<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly125<T[K]> : T[K];
};
type DeepRequired125<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired125<T[K]> : T[K];
};
type FR125 = DeepReadonly125<DeepRequired125<PartialBig125>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion125 =
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

type ExtractAlpha125 = Extract<BigUnion125, "alpha" | "bravo" | "charlie">;
type ExcludeZulu125 = Exclude<BigUnion125, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA125 { width: number; height: number; depth: number }
interface ShapeB125 { color: string; opacity: number; blend: string }
interface ShapeC125 { x: number; y: number; z: number; w: number }
interface ShapeD125 { label: string; title: string; summary: string }

type Combined125 = ShapeA125 & ShapeB125 & ShapeC125 & ShapeD125;
type OptionalAll125 = { [K in keyof Combined125]?: Combined125[K] };
type RequiredAll125 = { [K in keyof Combined125]-?: Combined125[K] };
type ReadonlyAll125 = { readonly [K in keyof Combined125]: Combined125[K] };
type NullableAll125 = { [K in keyof Combined125]: Combined125[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString125<T> = T extends string ? true : false;
type IsNumber125<T> = T extends number ? true : false;
type TypeName125<T> = T extends string
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

type TypeNames125 = {
  [K in keyof BigRecord125]: TypeName125<BigRecord125[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb125 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource125 = "user" | "post" | "comment" | "tag" | "category";
type Action125 = `${Verb125}_${Resource125}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise125<T> = T extends Promise<infer U> ? UnwrapPromise125<U> : T;
type UnwrapArray125<T> = T extends (infer U)[] ? UnwrapArray125<U> : T;
type Head125<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail125<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation125<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation125<Exclude<T, K>>]
  : never;

type SmallUnion125 = "a" | "b" | "c" | "d";
type AllPerms125 = Permutation125<SmallUnion125>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig125,
  Flat125,
  FR125,
  BigUnion125,
  ExtractAlpha125,
  ExcludeZulu125,
  OptionalAll125,
  RequiredAll125,
  ReadonlyAll125,
  NullableAll125,
  TypeNames125,
  Action125,
  AllPerms125,
};
