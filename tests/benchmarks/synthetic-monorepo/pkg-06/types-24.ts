// pkg-06 / types-24  (seed 624) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord624 {
  a624: { x: number; y: string; z: boolean };
  b624: { p: string[]; q: Record<string, number> };
  c624: { nested: { deep: { deeper: { deepest: string } } } };
  d624: number;
  e624: string;
  f624: boolean;
  g624: null;
  h624: undefined;
  i624: bigint;
  j624: symbol;
}

type PartialBig624 = DeepPartial<BigRecord624>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten624<T> = T extends Array<infer U> ? Flatten624<U> : T;
type Nested624 = number[][][][][][][][][][];
type Flat624 = Flatten624<Nested624>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly624<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly624<T[K]> : T[K];
};
type DeepRequired624<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired624<T[K]> : T[K];
};
type FR624 = DeepReadonly624<DeepRequired624<PartialBig624>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion624 =
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

type ExtractAlpha624 = Extract<BigUnion624, "alpha" | "bravo" | "charlie">;
type ExcludeZulu624 = Exclude<BigUnion624, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA624 { width: number; height: number; depth: number }
interface ShapeB624 { color: string; opacity: number; blend: string }
interface ShapeC624 { x: number; y: number; z: number; w: number }
interface ShapeD624 { label: string; title: string; summary: string }

type Combined624 = ShapeA624 & ShapeB624 & ShapeC624 & ShapeD624;
type OptionalAll624 = { [K in keyof Combined624]?: Combined624[K] };
type RequiredAll624 = { [K in keyof Combined624]-?: Combined624[K] };
type ReadonlyAll624 = { readonly [K in keyof Combined624]: Combined624[K] };
type NullableAll624 = { [K in keyof Combined624]: Combined624[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString624<T> = T extends string ? true : false;
type IsNumber624<T> = T extends number ? true : false;
type TypeName624<T> = T extends string
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

type TypeNames624 = {
  [K in keyof BigRecord624]: TypeName624<BigRecord624[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb624 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource624 = "user" | "post" | "comment" | "tag" | "category";
type Action624 = `${Verb624}_${Resource624}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise624<T> = T extends Promise<infer U> ? UnwrapPromise624<U> : T;
type UnwrapArray624<T> = T extends (infer U)[] ? UnwrapArray624<U> : T;
type Head624<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail624<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation624<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation624<Exclude<T, K>>]
  : never;

type SmallUnion624 = "a" | "b" | "c" | "d";
type AllPerms624 = Permutation624<SmallUnion624>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig624,
  Flat624,
  FR624,
  BigUnion624,
  ExtractAlpha624,
  ExcludeZulu624,
  OptionalAll624,
  RequiredAll624,
  ReadonlyAll624,
  NullableAll624,
  TypeNames624,
  Action624,
  AllPerms624,
};
