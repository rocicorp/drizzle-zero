// pkg-02 / types-16  (seed 216) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord216 {
  a216: { x: number; y: string; z: boolean };
  b216: { p: string[]; q: Record<string, number> };
  c216: { nested: { deep: { deeper: { deepest: string } } } };
  d216: number;
  e216: string;
  f216: boolean;
  g216: null;
  h216: undefined;
  i216: bigint;
  j216: symbol;
}

type PartialBig216 = DeepPartial<BigRecord216>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten216<T> = T extends Array<infer U> ? Flatten216<U> : T;
type Nested216 = number[][][][][][][][][][];
type Flat216 = Flatten216<Nested216>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly216<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly216<T[K]> : T[K];
};
type DeepRequired216<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired216<T[K]> : T[K];
};
type FR216 = DeepReadonly216<DeepRequired216<PartialBig216>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion216 =
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

type ExtractAlpha216 = Extract<BigUnion216, "alpha" | "bravo" | "charlie">;
type ExcludeZulu216 = Exclude<BigUnion216, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA216 { width: number; height: number; depth: number }
interface ShapeB216 { color: string; opacity: number; blend: string }
interface ShapeC216 { x: number; y: number; z: number; w: number }
interface ShapeD216 { label: string; title: string; summary: string }

type Combined216 = ShapeA216 & ShapeB216 & ShapeC216 & ShapeD216;
type OptionalAll216 = { [K in keyof Combined216]?: Combined216[K] };
type RequiredAll216 = { [K in keyof Combined216]-?: Combined216[K] };
type ReadonlyAll216 = { readonly [K in keyof Combined216]: Combined216[K] };
type NullableAll216 = { [K in keyof Combined216]: Combined216[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString216<T> = T extends string ? true : false;
type IsNumber216<T> = T extends number ? true : false;
type TypeName216<T> = T extends string
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

type TypeNames216 = {
  [K in keyof BigRecord216]: TypeName216<BigRecord216[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb216 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource216 = "user" | "post" | "comment" | "tag" | "category";
type Action216 = `${Verb216}_${Resource216}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise216<T> = T extends Promise<infer U> ? UnwrapPromise216<U> : T;
type UnwrapArray216<T> = T extends (infer U)[] ? UnwrapArray216<U> : T;
type Head216<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail216<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation216<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation216<Exclude<T, K>>]
  : never;

type SmallUnion216 = "a" | "b" | "c" | "d";
type AllPerms216 = Permutation216<SmallUnion216>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig216,
  Flat216,
  FR216,
  BigUnion216,
  ExtractAlpha216,
  ExcludeZulu216,
  OptionalAll216,
  RequiredAll216,
  ReadonlyAll216,
  NullableAll216,
  TypeNames216,
  Action216,
  AllPerms216,
};
