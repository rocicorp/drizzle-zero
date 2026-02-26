// pkg-04 / types-12  (seed 412) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord412 {
  a412: { x: number; y: string; z: boolean };
  b412: { p: string[]; q: Record<string, number> };
  c412: { nested: { deep: { deeper: { deepest: string } } } };
  d412: number;
  e412: string;
  f412: boolean;
  g412: null;
  h412: undefined;
  i412: bigint;
  j412: symbol;
}

type PartialBig412 = DeepPartial<BigRecord412>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten412<T> = T extends Array<infer U> ? Flatten412<U> : T;
type Nested412 = number[][][][][][][][][][];
type Flat412 = Flatten412<Nested412>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly412<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly412<T[K]> : T[K];
};
type DeepRequired412<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired412<T[K]> : T[K];
};
type FR412 = DeepReadonly412<DeepRequired412<PartialBig412>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion412 =
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

type ExtractAlpha412 = Extract<BigUnion412, "alpha" | "bravo" | "charlie">;
type ExcludeZulu412 = Exclude<BigUnion412, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA412 { width: number; height: number; depth: number }
interface ShapeB412 { color: string; opacity: number; blend: string }
interface ShapeC412 { x: number; y: number; z: number; w: number }
interface ShapeD412 { label: string; title: string; summary: string }

type Combined412 = ShapeA412 & ShapeB412 & ShapeC412 & ShapeD412;
type OptionalAll412 = { [K in keyof Combined412]?: Combined412[K] };
type RequiredAll412 = { [K in keyof Combined412]-?: Combined412[K] };
type ReadonlyAll412 = { readonly [K in keyof Combined412]: Combined412[K] };
type NullableAll412 = { [K in keyof Combined412]: Combined412[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString412<T> = T extends string ? true : false;
type IsNumber412<T> = T extends number ? true : false;
type TypeName412<T> = T extends string
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

type TypeNames412 = {
  [K in keyof BigRecord412]: TypeName412<BigRecord412[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb412 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource412 = "user" | "post" | "comment" | "tag" | "category";
type Action412 = `${Verb412}_${Resource412}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise412<T> = T extends Promise<infer U> ? UnwrapPromise412<U> : T;
type UnwrapArray412<T> = T extends (infer U)[] ? UnwrapArray412<U> : T;
type Head412<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail412<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation412<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation412<Exclude<T, K>>]
  : never;

type SmallUnion412 = "a" | "b" | "c" | "d";
type AllPerms412 = Permutation412<SmallUnion412>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig412,
  Flat412,
  FR412,
  BigUnion412,
  ExtractAlpha412,
  ExcludeZulu412,
  OptionalAll412,
  RequiredAll412,
  ReadonlyAll412,
  NullableAll412,
  TypeNames412,
  Action412,
  AllPerms412,
};
