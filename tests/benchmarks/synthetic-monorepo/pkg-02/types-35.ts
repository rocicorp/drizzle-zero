// pkg-02 / types-35  (seed 235) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord235 {
  a235: { x: number; y: string; z: boolean };
  b235: { p: string[]; q: Record<string, number> };
  c235: { nested: { deep: { deeper: { deepest: string } } } };
  d235: number;
  e235: string;
  f235: boolean;
  g235: null;
  h235: undefined;
  i235: bigint;
  j235: symbol;
}

type PartialBig235 = DeepPartial<BigRecord235>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten235<T> = T extends Array<infer U> ? Flatten235<U> : T;
type Nested235 = number[][][][][][][][][][];
type Flat235 = Flatten235<Nested235>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly235<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly235<T[K]> : T[K];
};
type DeepRequired235<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired235<T[K]> : T[K];
};
type FR235 = DeepReadonly235<DeepRequired235<PartialBig235>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion235 =
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

type ExtractAlpha235 = Extract<BigUnion235, "alpha" | "bravo" | "charlie">;
type ExcludeZulu235 = Exclude<BigUnion235, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA235 { width: number; height: number; depth: number }
interface ShapeB235 { color: string; opacity: number; blend: string }
interface ShapeC235 { x: number; y: number; z: number; w: number }
interface ShapeD235 { label: string; title: string; summary: string }

type Combined235 = ShapeA235 & ShapeB235 & ShapeC235 & ShapeD235;
type OptionalAll235 = { [K in keyof Combined235]?: Combined235[K] };
type RequiredAll235 = { [K in keyof Combined235]-?: Combined235[K] };
type ReadonlyAll235 = { readonly [K in keyof Combined235]: Combined235[K] };
type NullableAll235 = { [K in keyof Combined235]: Combined235[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString235<T> = T extends string ? true : false;
type IsNumber235<T> = T extends number ? true : false;
type TypeName235<T> = T extends string
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

type TypeNames235 = {
  [K in keyof BigRecord235]: TypeName235<BigRecord235[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb235 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource235 = "user" | "post" | "comment" | "tag" | "category";
type Action235 = `${Verb235}_${Resource235}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise235<T> = T extends Promise<infer U> ? UnwrapPromise235<U> : T;
type UnwrapArray235<T> = T extends (infer U)[] ? UnwrapArray235<U> : T;
type Head235<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail235<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation235<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation235<Exclude<T, K>>]
  : never;

type SmallUnion235 = "a" | "b" | "c" | "d";
type AllPerms235 = Permutation235<SmallUnion235>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig235,
  Flat235,
  FR235,
  BigUnion235,
  ExtractAlpha235,
  ExcludeZulu235,
  OptionalAll235,
  RequiredAll235,
  ReadonlyAll235,
  NullableAll235,
  TypeNames235,
  Action235,
  AllPerms235,
};
