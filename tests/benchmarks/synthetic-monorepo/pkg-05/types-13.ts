// pkg-05 / types-13  (seed 513) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord513 {
  a513: { x: number; y: string; z: boolean };
  b513: { p: string[]; q: Record<string, number> };
  c513: { nested: { deep: { deeper: { deepest: string } } } };
  d513: number;
  e513: string;
  f513: boolean;
  g513: null;
  h513: undefined;
  i513: bigint;
  j513: symbol;
}

type PartialBig513 = DeepPartial<BigRecord513>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten513<T> = T extends Array<infer U> ? Flatten513<U> : T;
type Nested513 = number[][][][][][][][][][];
type Flat513 = Flatten513<Nested513>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly513<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly513<T[K]> : T[K];
};
type DeepRequired513<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired513<T[K]> : T[K];
};
type FR513 = DeepReadonly513<DeepRequired513<PartialBig513>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion513 =
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

type ExtractAlpha513 = Extract<BigUnion513, "alpha" | "bravo" | "charlie">;
type ExcludeZulu513 = Exclude<BigUnion513, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA513 { width: number; height: number; depth: number }
interface ShapeB513 { color: string; opacity: number; blend: string }
interface ShapeC513 { x: number; y: number; z: number; w: number }
interface ShapeD513 { label: string; title: string; summary: string }

type Combined513 = ShapeA513 & ShapeB513 & ShapeC513 & ShapeD513;
type OptionalAll513 = { [K in keyof Combined513]?: Combined513[K] };
type RequiredAll513 = { [K in keyof Combined513]-?: Combined513[K] };
type ReadonlyAll513 = { readonly [K in keyof Combined513]: Combined513[K] };
type NullableAll513 = { [K in keyof Combined513]: Combined513[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString513<T> = T extends string ? true : false;
type IsNumber513<T> = T extends number ? true : false;
type TypeName513<T> = T extends string
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

type TypeNames513 = {
  [K in keyof BigRecord513]: TypeName513<BigRecord513[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb513 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource513 = "user" | "post" | "comment" | "tag" | "category";
type Action513 = `${Verb513}_${Resource513}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise513<T> = T extends Promise<infer U> ? UnwrapPromise513<U> : T;
type UnwrapArray513<T> = T extends (infer U)[] ? UnwrapArray513<U> : T;
type Head513<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail513<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation513<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation513<Exclude<T, K>>]
  : never;

type SmallUnion513 = "a" | "b" | "c" | "d";
type AllPerms513 = Permutation513<SmallUnion513>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig513,
  Flat513,
  FR513,
  BigUnion513,
  ExtractAlpha513,
  ExcludeZulu513,
  OptionalAll513,
  RequiredAll513,
  ReadonlyAll513,
  NullableAll513,
  TypeNames513,
  Action513,
  AllPerms513,
};
