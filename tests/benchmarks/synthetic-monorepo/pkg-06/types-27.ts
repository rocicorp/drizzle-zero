// pkg-06 / types-27  (seed 627) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord627 {
  a627: { x: number; y: string; z: boolean };
  b627: { p: string[]; q: Record<string, number> };
  c627: { nested: { deep: { deeper: { deepest: string } } } };
  d627: number;
  e627: string;
  f627: boolean;
  g627: null;
  h627: undefined;
  i627: bigint;
  j627: symbol;
}

type PartialBig627 = DeepPartial<BigRecord627>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten627<T> = T extends Array<infer U> ? Flatten627<U> : T;
type Nested627 = number[][][][][][][][][][];
type Flat627 = Flatten627<Nested627>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly627<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly627<T[K]> : T[K];
};
type DeepRequired627<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired627<T[K]> : T[K];
};
type FR627 = DeepReadonly627<DeepRequired627<PartialBig627>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion627 =
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

type ExtractAlpha627 = Extract<BigUnion627, "alpha" | "bravo" | "charlie">;
type ExcludeZulu627 = Exclude<BigUnion627, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA627 { width: number; height: number; depth: number }
interface ShapeB627 { color: string; opacity: number; blend: string }
interface ShapeC627 { x: number; y: number; z: number; w: number }
interface ShapeD627 { label: string; title: string; summary: string }

type Combined627 = ShapeA627 & ShapeB627 & ShapeC627 & ShapeD627;
type OptionalAll627 = { [K in keyof Combined627]?: Combined627[K] };
type RequiredAll627 = { [K in keyof Combined627]-?: Combined627[K] };
type ReadonlyAll627 = { readonly [K in keyof Combined627]: Combined627[K] };
type NullableAll627 = { [K in keyof Combined627]: Combined627[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString627<T> = T extends string ? true : false;
type IsNumber627<T> = T extends number ? true : false;
type TypeName627<T> = T extends string
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

type TypeNames627 = {
  [K in keyof BigRecord627]: TypeName627<BigRecord627[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb627 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource627 = "user" | "post" | "comment" | "tag" | "category";
type Action627 = `${Verb627}_${Resource627}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise627<T> = T extends Promise<infer U> ? UnwrapPromise627<U> : T;
type UnwrapArray627<T> = T extends (infer U)[] ? UnwrapArray627<U> : T;
type Head627<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail627<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation627<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation627<Exclude<T, K>>]
  : never;

type SmallUnion627 = "a" | "b" | "c" | "d";
type AllPerms627 = Permutation627<SmallUnion627>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig627,
  Flat627,
  FR627,
  BigUnion627,
  ExtractAlpha627,
  ExcludeZulu627,
  OptionalAll627,
  RequiredAll627,
  ReadonlyAll627,
  NullableAll627,
  TypeNames627,
  Action627,
  AllPerms627,
};
