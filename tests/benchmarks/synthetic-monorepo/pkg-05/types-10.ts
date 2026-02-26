// pkg-05 / types-10  (seed 510) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord510 {
  a510: { x: number; y: string; z: boolean };
  b510: { p: string[]; q: Record<string, number> };
  c510: { nested: { deep: { deeper: { deepest: string } } } };
  d510: number;
  e510: string;
  f510: boolean;
  g510: null;
  h510: undefined;
  i510: bigint;
  j510: symbol;
}

type PartialBig510 = DeepPartial<BigRecord510>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten510<T> = T extends Array<infer U> ? Flatten510<U> : T;
type Nested510 = number[][][][][][][][][][];
type Flat510 = Flatten510<Nested510>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly510<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly510<T[K]> : T[K];
};
type DeepRequired510<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired510<T[K]> : T[K];
};
type FR510 = DeepReadonly510<DeepRequired510<PartialBig510>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion510 =
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

type ExtractAlpha510 = Extract<BigUnion510, "alpha" | "bravo" | "charlie">;
type ExcludeZulu510 = Exclude<BigUnion510, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA510 { width: number; height: number; depth: number }
interface ShapeB510 { color: string; opacity: number; blend: string }
interface ShapeC510 { x: number; y: number; z: number; w: number }
interface ShapeD510 { label: string; title: string; summary: string }

type Combined510 = ShapeA510 & ShapeB510 & ShapeC510 & ShapeD510;
type OptionalAll510 = { [K in keyof Combined510]?: Combined510[K] };
type RequiredAll510 = { [K in keyof Combined510]-?: Combined510[K] };
type ReadonlyAll510 = { readonly [K in keyof Combined510]: Combined510[K] };
type NullableAll510 = { [K in keyof Combined510]: Combined510[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString510<T> = T extends string ? true : false;
type IsNumber510<T> = T extends number ? true : false;
type TypeName510<T> = T extends string
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

type TypeNames510 = {
  [K in keyof BigRecord510]: TypeName510<BigRecord510[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb510 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource510 = "user" | "post" | "comment" | "tag" | "category";
type Action510 = `${Verb510}_${Resource510}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise510<T> = T extends Promise<infer U> ? UnwrapPromise510<U> : T;
type UnwrapArray510<T> = T extends (infer U)[] ? UnwrapArray510<U> : T;
type Head510<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail510<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation510<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation510<Exclude<T, K>>]
  : never;

type SmallUnion510 = "a" | "b" | "c" | "d";
type AllPerms510 = Permutation510<SmallUnion510>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig510,
  Flat510,
  FR510,
  BigUnion510,
  ExtractAlpha510,
  ExcludeZulu510,
  OptionalAll510,
  RequiredAll510,
  ReadonlyAll510,
  NullableAll510,
  TypeNames510,
  Action510,
  AllPerms510,
};
