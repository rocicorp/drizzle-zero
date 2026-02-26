// pkg-07 / types-20  (seed 720) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord720 {
  a720: { x: number; y: string; z: boolean };
  b720: { p: string[]; q: Record<string, number> };
  c720: { nested: { deep: { deeper: { deepest: string } } } };
  d720: number;
  e720: string;
  f720: boolean;
  g720: null;
  h720: undefined;
  i720: bigint;
  j720: symbol;
}

type PartialBig720 = DeepPartial<BigRecord720>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten720<T> = T extends Array<infer U> ? Flatten720<U> : T;
type Nested720 = number[][][][][][][][][][];
type Flat720 = Flatten720<Nested720>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly720<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly720<T[K]> : T[K];
};
type DeepRequired720<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired720<T[K]> : T[K];
};
type FR720 = DeepReadonly720<DeepRequired720<PartialBig720>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion720 =
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

type ExtractAlpha720 = Extract<BigUnion720, "alpha" | "bravo" | "charlie">;
type ExcludeZulu720 = Exclude<BigUnion720, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA720 { width: number; height: number; depth: number }
interface ShapeB720 { color: string; opacity: number; blend: string }
interface ShapeC720 { x: number; y: number; z: number; w: number }
interface ShapeD720 { label: string; title: string; summary: string }

type Combined720 = ShapeA720 & ShapeB720 & ShapeC720 & ShapeD720;
type OptionalAll720 = { [K in keyof Combined720]?: Combined720[K] };
type RequiredAll720 = { [K in keyof Combined720]-?: Combined720[K] };
type ReadonlyAll720 = { readonly [K in keyof Combined720]: Combined720[K] };
type NullableAll720 = { [K in keyof Combined720]: Combined720[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString720<T> = T extends string ? true : false;
type IsNumber720<T> = T extends number ? true : false;
type TypeName720<T> = T extends string
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

type TypeNames720 = {
  [K in keyof BigRecord720]: TypeName720<BigRecord720[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb720 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource720 = "user" | "post" | "comment" | "tag" | "category";
type Action720 = `${Verb720}_${Resource720}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise720<T> = T extends Promise<infer U> ? UnwrapPromise720<U> : T;
type UnwrapArray720<T> = T extends (infer U)[] ? UnwrapArray720<U> : T;
type Head720<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail720<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation720<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation720<Exclude<T, K>>]
  : never;

type SmallUnion720 = "a" | "b" | "c" | "d";
type AllPerms720 = Permutation720<SmallUnion720>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig720,
  Flat720,
  FR720,
  BigUnion720,
  ExtractAlpha720,
  ExcludeZulu720,
  OptionalAll720,
  RequiredAll720,
  ReadonlyAll720,
  NullableAll720,
  TypeNames720,
  Action720,
  AllPerms720,
};
