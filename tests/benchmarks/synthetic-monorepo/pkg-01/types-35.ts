// pkg-01 / types-35  (seed 135) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord135 {
  a135: { x: number; y: string; z: boolean };
  b135: { p: string[]; q: Record<string, number> };
  c135: { nested: { deep: { deeper: { deepest: string } } } };
  d135: number;
  e135: string;
  f135: boolean;
  g135: null;
  h135: undefined;
  i135: bigint;
  j135: symbol;
}

type PartialBig135 = DeepPartial<BigRecord135>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten135<T> = T extends Array<infer U> ? Flatten135<U> : T;
type Nested135 = number[][][][][][][][][][];
type Flat135 = Flatten135<Nested135>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly135<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly135<T[K]> : T[K];
};
type DeepRequired135<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired135<T[K]> : T[K];
};
type FR135 = DeepReadonly135<DeepRequired135<PartialBig135>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion135 =
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

type ExtractAlpha135 = Extract<BigUnion135, "alpha" | "bravo" | "charlie">;
type ExcludeZulu135 = Exclude<BigUnion135, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA135 { width: number; height: number; depth: number }
interface ShapeB135 { color: string; opacity: number; blend: string }
interface ShapeC135 { x: number; y: number; z: number; w: number }
interface ShapeD135 { label: string; title: string; summary: string }

type Combined135 = ShapeA135 & ShapeB135 & ShapeC135 & ShapeD135;
type OptionalAll135 = { [K in keyof Combined135]?: Combined135[K] };
type RequiredAll135 = { [K in keyof Combined135]-?: Combined135[K] };
type ReadonlyAll135 = { readonly [K in keyof Combined135]: Combined135[K] };
type NullableAll135 = { [K in keyof Combined135]: Combined135[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString135<T> = T extends string ? true : false;
type IsNumber135<T> = T extends number ? true : false;
type TypeName135<T> = T extends string
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

type TypeNames135 = {
  [K in keyof BigRecord135]: TypeName135<BigRecord135[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb135 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource135 = "user" | "post" | "comment" | "tag" | "category";
type Action135 = `${Verb135}_${Resource135}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise135<T> = T extends Promise<infer U> ? UnwrapPromise135<U> : T;
type UnwrapArray135<T> = T extends (infer U)[] ? UnwrapArray135<U> : T;
type Head135<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail135<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation135<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation135<Exclude<T, K>>]
  : never;

type SmallUnion135 = "a" | "b" | "c" | "d";
type AllPerms135 = Permutation135<SmallUnion135>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig135,
  Flat135,
  FR135,
  BigUnion135,
  ExtractAlpha135,
  ExcludeZulu135,
  OptionalAll135,
  RequiredAll135,
  ReadonlyAll135,
  NullableAll135,
  TypeNames135,
  Action135,
  AllPerms135,
};
