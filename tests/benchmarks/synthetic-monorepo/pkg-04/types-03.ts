// pkg-04 / types-03  (seed 403) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord403 {
  a403: { x: number; y: string; z: boolean };
  b403: { p: string[]; q: Record<string, number> };
  c403: { nested: { deep: { deeper: { deepest: string } } } };
  d403: number;
  e403: string;
  f403: boolean;
  g403: null;
  h403: undefined;
  i403: bigint;
  j403: symbol;
}

type PartialBig403 = DeepPartial<BigRecord403>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten403<T> = T extends Array<infer U> ? Flatten403<U> : T;
type Nested403 = number[][][][][][][][][][];
type Flat403 = Flatten403<Nested403>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly403<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly403<T[K]> : T[K];
};
type DeepRequired403<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired403<T[K]> : T[K];
};
type FR403 = DeepReadonly403<DeepRequired403<PartialBig403>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion403 =
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

type ExtractAlpha403 = Extract<BigUnion403, "alpha" | "bravo" | "charlie">;
type ExcludeZulu403 = Exclude<BigUnion403, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA403 { width: number; height: number; depth: number }
interface ShapeB403 { color: string; opacity: number; blend: string }
interface ShapeC403 { x: number; y: number; z: number; w: number }
interface ShapeD403 { label: string; title: string; summary: string }

type Combined403 = ShapeA403 & ShapeB403 & ShapeC403 & ShapeD403;
type OptionalAll403 = { [K in keyof Combined403]?: Combined403[K] };
type RequiredAll403 = { [K in keyof Combined403]-?: Combined403[K] };
type ReadonlyAll403 = { readonly [K in keyof Combined403]: Combined403[K] };
type NullableAll403 = { [K in keyof Combined403]: Combined403[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString403<T> = T extends string ? true : false;
type IsNumber403<T> = T extends number ? true : false;
type TypeName403<T> = T extends string
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

type TypeNames403 = {
  [K in keyof BigRecord403]: TypeName403<BigRecord403[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb403 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource403 = "user" | "post" | "comment" | "tag" | "category";
type Action403 = `${Verb403}_${Resource403}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise403<T> = T extends Promise<infer U> ? UnwrapPromise403<U> : T;
type UnwrapArray403<T> = T extends (infer U)[] ? UnwrapArray403<U> : T;
type Head403<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail403<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation403<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation403<Exclude<T, K>>]
  : never;

type SmallUnion403 = "a" | "b" | "c" | "d";
type AllPerms403 = Permutation403<SmallUnion403>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig403,
  Flat403,
  FR403,
  BigUnion403,
  ExtractAlpha403,
  ExcludeZulu403,
  OptionalAll403,
  RequiredAll403,
  ReadonlyAll403,
  NullableAll403,
  TypeNames403,
  Action403,
  AllPerms403,
};
