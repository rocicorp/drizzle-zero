// pkg-05 / types-28  (seed 528) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord528 {
  a528: { x: number; y: string; z: boolean };
  b528: { p: string[]; q: Record<string, number> };
  c528: { nested: { deep: { deeper: { deepest: string } } } };
  d528: number;
  e528: string;
  f528: boolean;
  g528: null;
  h528: undefined;
  i528: bigint;
  j528: symbol;
}

type PartialBig528 = DeepPartial<BigRecord528>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten528<T> = T extends Array<infer U> ? Flatten528<U> : T;
type Nested528 = number[][][][][][][][][][];
type Flat528 = Flatten528<Nested528>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly528<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly528<T[K]> : T[K];
};
type DeepRequired528<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired528<T[K]> : T[K];
};
type FR528 = DeepReadonly528<DeepRequired528<PartialBig528>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion528 =
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

type ExtractAlpha528 = Extract<BigUnion528, "alpha" | "bravo" | "charlie">;
type ExcludeZulu528 = Exclude<BigUnion528, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA528 { width: number; height: number; depth: number }
interface ShapeB528 { color: string; opacity: number; blend: string }
interface ShapeC528 { x: number; y: number; z: number; w: number }
interface ShapeD528 { label: string; title: string; summary: string }

type Combined528 = ShapeA528 & ShapeB528 & ShapeC528 & ShapeD528;
type OptionalAll528 = { [K in keyof Combined528]?: Combined528[K] };
type RequiredAll528 = { [K in keyof Combined528]-?: Combined528[K] };
type ReadonlyAll528 = { readonly [K in keyof Combined528]: Combined528[K] };
type NullableAll528 = { [K in keyof Combined528]: Combined528[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString528<T> = T extends string ? true : false;
type IsNumber528<T> = T extends number ? true : false;
type TypeName528<T> = T extends string
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

type TypeNames528 = {
  [K in keyof BigRecord528]: TypeName528<BigRecord528[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb528 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource528 = "user" | "post" | "comment" | "tag" | "category";
type Action528 = `${Verb528}_${Resource528}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise528<T> = T extends Promise<infer U> ? UnwrapPromise528<U> : T;
type UnwrapArray528<T> = T extends (infer U)[] ? UnwrapArray528<U> : T;
type Head528<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail528<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation528<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation528<Exclude<T, K>>]
  : never;

type SmallUnion528 = "a" | "b" | "c" | "d";
type AllPerms528 = Permutation528<SmallUnion528>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig528,
  Flat528,
  FR528,
  BigUnion528,
  ExtractAlpha528,
  ExcludeZulu528,
  OptionalAll528,
  RequiredAll528,
  ReadonlyAll528,
  NullableAll528,
  TypeNames528,
  Action528,
  AllPerms528,
};
