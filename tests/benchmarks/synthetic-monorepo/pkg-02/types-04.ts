// pkg-02 / types-04  (seed 204) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord204 {
  a204: { x: number; y: string; z: boolean };
  b204: { p: string[]; q: Record<string, number> };
  c204: { nested: { deep: { deeper: { deepest: string } } } };
  d204: number;
  e204: string;
  f204: boolean;
  g204: null;
  h204: undefined;
  i204: bigint;
  j204: symbol;
}

type PartialBig204 = DeepPartial<BigRecord204>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten204<T> = T extends Array<infer U> ? Flatten204<U> : T;
type Nested204 = number[][][][][][][][][][];
type Flat204 = Flatten204<Nested204>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly204<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly204<T[K]> : T[K];
};
type DeepRequired204<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired204<T[K]> : T[K];
};
type FR204 = DeepReadonly204<DeepRequired204<PartialBig204>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion204 =
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

type ExtractAlpha204 = Extract<BigUnion204, "alpha" | "bravo" | "charlie">;
type ExcludeZulu204 = Exclude<BigUnion204, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA204 { width: number; height: number; depth: number }
interface ShapeB204 { color: string; opacity: number; blend: string }
interface ShapeC204 { x: number; y: number; z: number; w: number }
interface ShapeD204 { label: string; title: string; summary: string }

type Combined204 = ShapeA204 & ShapeB204 & ShapeC204 & ShapeD204;
type OptionalAll204 = { [K in keyof Combined204]?: Combined204[K] };
type RequiredAll204 = { [K in keyof Combined204]-?: Combined204[K] };
type ReadonlyAll204 = { readonly [K in keyof Combined204]: Combined204[K] };
type NullableAll204 = { [K in keyof Combined204]: Combined204[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString204<T> = T extends string ? true : false;
type IsNumber204<T> = T extends number ? true : false;
type TypeName204<T> = T extends string
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

type TypeNames204 = {
  [K in keyof BigRecord204]: TypeName204<BigRecord204[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb204 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource204 = "user" | "post" | "comment" | "tag" | "category";
type Action204 = `${Verb204}_${Resource204}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise204<T> = T extends Promise<infer U> ? UnwrapPromise204<U> : T;
type UnwrapArray204<T> = T extends (infer U)[] ? UnwrapArray204<U> : T;
type Head204<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail204<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation204<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation204<Exclude<T, K>>]
  : never;

type SmallUnion204 = "a" | "b" | "c" | "d";
type AllPerms204 = Permutation204<SmallUnion204>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig204,
  Flat204,
  FR204,
  BigUnion204,
  ExtractAlpha204,
  ExcludeZulu204,
  OptionalAll204,
  RequiredAll204,
  ReadonlyAll204,
  NullableAll204,
  TypeNames204,
  Action204,
  AllPerms204,
};
