// pkg-01 / types-29  (seed 129) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord129 {
  a129: { x: number; y: string; z: boolean };
  b129: { p: string[]; q: Record<string, number> };
  c129: { nested: { deep: { deeper: { deepest: string } } } };
  d129: number;
  e129: string;
  f129: boolean;
  g129: null;
  h129: undefined;
  i129: bigint;
  j129: symbol;
}

type PartialBig129 = DeepPartial<BigRecord129>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten129<T> = T extends Array<infer U> ? Flatten129<U> : T;
type Nested129 = number[][][][][][][][][][];
type Flat129 = Flatten129<Nested129>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly129<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly129<T[K]> : T[K];
};
type DeepRequired129<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired129<T[K]> : T[K];
};
type FR129 = DeepReadonly129<DeepRequired129<PartialBig129>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion129 =
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

type ExtractAlpha129 = Extract<BigUnion129, "alpha" | "bravo" | "charlie">;
type ExcludeZulu129 = Exclude<BigUnion129, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA129 { width: number; height: number; depth: number }
interface ShapeB129 { color: string; opacity: number; blend: string }
interface ShapeC129 { x: number; y: number; z: number; w: number }
interface ShapeD129 { label: string; title: string; summary: string }

type Combined129 = ShapeA129 & ShapeB129 & ShapeC129 & ShapeD129;
type OptionalAll129 = { [K in keyof Combined129]?: Combined129[K] };
type RequiredAll129 = { [K in keyof Combined129]-?: Combined129[K] };
type ReadonlyAll129 = { readonly [K in keyof Combined129]: Combined129[K] };
type NullableAll129 = { [K in keyof Combined129]: Combined129[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString129<T> = T extends string ? true : false;
type IsNumber129<T> = T extends number ? true : false;
type TypeName129<T> = T extends string
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

type TypeNames129 = {
  [K in keyof BigRecord129]: TypeName129<BigRecord129[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb129 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource129 = "user" | "post" | "comment" | "tag" | "category";
type Action129 = `${Verb129}_${Resource129}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise129<T> = T extends Promise<infer U> ? UnwrapPromise129<U> : T;
type UnwrapArray129<T> = T extends (infer U)[] ? UnwrapArray129<U> : T;
type Head129<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail129<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation129<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation129<Exclude<T, K>>]
  : never;

type SmallUnion129 = "a" | "b" | "c" | "d";
type AllPerms129 = Permutation129<SmallUnion129>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig129,
  Flat129,
  FR129,
  BigUnion129,
  ExtractAlpha129,
  ExcludeZulu129,
  OptionalAll129,
  RequiredAll129,
  ReadonlyAll129,
  NullableAll129,
  TypeNames129,
  Action129,
  AllPerms129,
};
