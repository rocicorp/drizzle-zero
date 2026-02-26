// pkg-03 / types-15  (seed 315) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord315 {
  a315: { x: number; y: string; z: boolean };
  b315: { p: string[]; q: Record<string, number> };
  c315: { nested: { deep: { deeper: { deepest: string } } } };
  d315: number;
  e315: string;
  f315: boolean;
  g315: null;
  h315: undefined;
  i315: bigint;
  j315: symbol;
}

type PartialBig315 = DeepPartial<BigRecord315>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten315<T> = T extends Array<infer U> ? Flatten315<U> : T;
type Nested315 = number[][][][][][][][][][];
type Flat315 = Flatten315<Nested315>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly315<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly315<T[K]> : T[K];
};
type DeepRequired315<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired315<T[K]> : T[K];
};
type FR315 = DeepReadonly315<DeepRequired315<PartialBig315>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion315 =
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

type ExtractAlpha315 = Extract<BigUnion315, "alpha" | "bravo" | "charlie">;
type ExcludeZulu315 = Exclude<BigUnion315, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA315 { width: number; height: number; depth: number }
interface ShapeB315 { color: string; opacity: number; blend: string }
interface ShapeC315 { x: number; y: number; z: number; w: number }
interface ShapeD315 { label: string; title: string; summary: string }

type Combined315 = ShapeA315 & ShapeB315 & ShapeC315 & ShapeD315;
type OptionalAll315 = { [K in keyof Combined315]?: Combined315[K] };
type RequiredAll315 = { [K in keyof Combined315]-?: Combined315[K] };
type ReadonlyAll315 = { readonly [K in keyof Combined315]: Combined315[K] };
type NullableAll315 = { [K in keyof Combined315]: Combined315[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString315<T> = T extends string ? true : false;
type IsNumber315<T> = T extends number ? true : false;
type TypeName315<T> = T extends string
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

type TypeNames315 = {
  [K in keyof BigRecord315]: TypeName315<BigRecord315[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb315 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource315 = "user" | "post" | "comment" | "tag" | "category";
type Action315 = `${Verb315}_${Resource315}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise315<T> = T extends Promise<infer U> ? UnwrapPromise315<U> : T;
type UnwrapArray315<T> = T extends (infer U)[] ? UnwrapArray315<U> : T;
type Head315<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail315<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation315<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation315<Exclude<T, K>>]
  : never;

type SmallUnion315 = "a" | "b" | "c" | "d";
type AllPerms315 = Permutation315<SmallUnion315>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig315,
  Flat315,
  FR315,
  BigUnion315,
  ExtractAlpha315,
  ExcludeZulu315,
  OptionalAll315,
  RequiredAll315,
  ReadonlyAll315,
  NullableAll315,
  TypeNames315,
  Action315,
  AllPerms315,
};
