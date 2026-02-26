// pkg-07 / types-02  (seed 702) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord702 {
  a702: { x: number; y: string; z: boolean };
  b702: { p: string[]; q: Record<string, number> };
  c702: { nested: { deep: { deeper: { deepest: string } } } };
  d702: number;
  e702: string;
  f702: boolean;
  g702: null;
  h702: undefined;
  i702: bigint;
  j702: symbol;
}

type PartialBig702 = DeepPartial<BigRecord702>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten702<T> = T extends Array<infer U> ? Flatten702<U> : T;
type Nested702 = number[][][][][][][][][][];
type Flat702 = Flatten702<Nested702>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly702<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly702<T[K]> : T[K];
};
type DeepRequired702<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired702<T[K]> : T[K];
};
type FR702 = DeepReadonly702<DeepRequired702<PartialBig702>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion702 =
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

type ExtractAlpha702 = Extract<BigUnion702, "alpha" | "bravo" | "charlie">;
type ExcludeZulu702 = Exclude<BigUnion702, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA702 { width: number; height: number; depth: number }
interface ShapeB702 { color: string; opacity: number; blend: string }
interface ShapeC702 { x: number; y: number; z: number; w: number }
interface ShapeD702 { label: string; title: string; summary: string }

type Combined702 = ShapeA702 & ShapeB702 & ShapeC702 & ShapeD702;
type OptionalAll702 = { [K in keyof Combined702]?: Combined702[K] };
type RequiredAll702 = { [K in keyof Combined702]-?: Combined702[K] };
type ReadonlyAll702 = { readonly [K in keyof Combined702]: Combined702[K] };
type NullableAll702 = { [K in keyof Combined702]: Combined702[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString702<T> = T extends string ? true : false;
type IsNumber702<T> = T extends number ? true : false;
type TypeName702<T> = T extends string
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

type TypeNames702 = {
  [K in keyof BigRecord702]: TypeName702<BigRecord702[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb702 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource702 = "user" | "post" | "comment" | "tag" | "category";
type Action702 = `${Verb702}_${Resource702}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise702<T> = T extends Promise<infer U> ? UnwrapPromise702<U> : T;
type UnwrapArray702<T> = T extends (infer U)[] ? UnwrapArray702<U> : T;
type Head702<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail702<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation702<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation702<Exclude<T, K>>]
  : never;

type SmallUnion702 = "a" | "b" | "c" | "d";
type AllPerms702 = Permutation702<SmallUnion702>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig702,
  Flat702,
  FR702,
  BigUnion702,
  ExtractAlpha702,
  ExcludeZulu702,
  OptionalAll702,
  RequiredAll702,
  ReadonlyAll702,
  NullableAll702,
  TypeNames702,
  Action702,
  AllPerms702,
};
