// pkg-03 / types-24  (seed 324) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord324 {
  a324: { x: number; y: string; z: boolean };
  b324: { p: string[]; q: Record<string, number> };
  c324: { nested: { deep: { deeper: { deepest: string } } } };
  d324: number;
  e324: string;
  f324: boolean;
  g324: null;
  h324: undefined;
  i324: bigint;
  j324: symbol;
}

type PartialBig324 = DeepPartial<BigRecord324>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten324<T> = T extends Array<infer U> ? Flatten324<U> : T;
type Nested324 = number[][][][][][][][][][];
type Flat324 = Flatten324<Nested324>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly324<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly324<T[K]> : T[K];
};
type DeepRequired324<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired324<T[K]> : T[K];
};
type FR324 = DeepReadonly324<DeepRequired324<PartialBig324>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion324 =
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

type ExtractAlpha324 = Extract<BigUnion324, "alpha" | "bravo" | "charlie">;
type ExcludeZulu324 = Exclude<BigUnion324, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA324 { width: number; height: number; depth: number }
interface ShapeB324 { color: string; opacity: number; blend: string }
interface ShapeC324 { x: number; y: number; z: number; w: number }
interface ShapeD324 { label: string; title: string; summary: string }

type Combined324 = ShapeA324 & ShapeB324 & ShapeC324 & ShapeD324;
type OptionalAll324 = { [K in keyof Combined324]?: Combined324[K] };
type RequiredAll324 = { [K in keyof Combined324]-?: Combined324[K] };
type ReadonlyAll324 = { readonly [K in keyof Combined324]: Combined324[K] };
type NullableAll324 = { [K in keyof Combined324]: Combined324[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString324<T> = T extends string ? true : false;
type IsNumber324<T> = T extends number ? true : false;
type TypeName324<T> = T extends string
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

type TypeNames324 = {
  [K in keyof BigRecord324]: TypeName324<BigRecord324[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb324 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource324 = "user" | "post" | "comment" | "tag" | "category";
type Action324 = `${Verb324}_${Resource324}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise324<T> = T extends Promise<infer U> ? UnwrapPromise324<U> : T;
type UnwrapArray324<T> = T extends (infer U)[] ? UnwrapArray324<U> : T;
type Head324<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail324<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation324<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation324<Exclude<T, K>>]
  : never;

type SmallUnion324 = "a" | "b" | "c" | "d";
type AllPerms324 = Permutation324<SmallUnion324>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig324,
  Flat324,
  FR324,
  BigUnion324,
  ExtractAlpha324,
  ExcludeZulu324,
  OptionalAll324,
  RequiredAll324,
  ReadonlyAll324,
  NullableAll324,
  TypeNames324,
  Action324,
  AllPerms324,
};
