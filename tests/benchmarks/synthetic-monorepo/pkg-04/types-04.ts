// pkg-04 / types-04  (seed 404) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord404 {
  a404: { x: number; y: string; z: boolean };
  b404: { p: string[]; q: Record<string, number> };
  c404: { nested: { deep: { deeper: { deepest: string } } } };
  d404: number;
  e404: string;
  f404: boolean;
  g404: null;
  h404: undefined;
  i404: bigint;
  j404: symbol;
}

type PartialBig404 = DeepPartial<BigRecord404>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten404<T> = T extends Array<infer U> ? Flatten404<U> : T;
type Nested404 = number[][][][][][][][][][];
type Flat404 = Flatten404<Nested404>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly404<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly404<T[K]> : T[K];
};
type DeepRequired404<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired404<T[K]> : T[K];
};
type FR404 = DeepReadonly404<DeepRequired404<PartialBig404>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion404 =
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

type ExtractAlpha404 = Extract<BigUnion404, "alpha" | "bravo" | "charlie">;
type ExcludeZulu404 = Exclude<BigUnion404, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA404 { width: number; height: number; depth: number }
interface ShapeB404 { color: string; opacity: number; blend: string }
interface ShapeC404 { x: number; y: number; z: number; w: number }
interface ShapeD404 { label: string; title: string; summary: string }

type Combined404 = ShapeA404 & ShapeB404 & ShapeC404 & ShapeD404;
type OptionalAll404 = { [K in keyof Combined404]?: Combined404[K] };
type RequiredAll404 = { [K in keyof Combined404]-?: Combined404[K] };
type ReadonlyAll404 = { readonly [K in keyof Combined404]: Combined404[K] };
type NullableAll404 = { [K in keyof Combined404]: Combined404[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString404<T> = T extends string ? true : false;
type IsNumber404<T> = T extends number ? true : false;
type TypeName404<T> = T extends string
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

type TypeNames404 = {
  [K in keyof BigRecord404]: TypeName404<BigRecord404[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb404 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource404 = "user" | "post" | "comment" | "tag" | "category";
type Action404 = `${Verb404}_${Resource404}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise404<T> = T extends Promise<infer U> ? UnwrapPromise404<U> : T;
type UnwrapArray404<T> = T extends (infer U)[] ? UnwrapArray404<U> : T;
type Head404<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail404<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation404<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation404<Exclude<T, K>>]
  : never;

type SmallUnion404 = "a" | "b" | "c" | "d";
type AllPerms404 = Permutation404<SmallUnion404>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig404,
  Flat404,
  FR404,
  BigUnion404,
  ExtractAlpha404,
  ExcludeZulu404,
  OptionalAll404,
  RequiredAll404,
  ReadonlyAll404,
  NullableAll404,
  TypeNames404,
  Action404,
  AllPerms404,
};
