// pkg-01 / types-41  (seed 141) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord141 {
  a141: { x: number; y: string; z: boolean };
  b141: { p: string[]; q: Record<string, number> };
  c141: { nested: { deep: { deeper: { deepest: string } } } };
  d141: number;
  e141: string;
  f141: boolean;
  g141: null;
  h141: undefined;
  i141: bigint;
  j141: symbol;
}

type PartialBig141 = DeepPartial<BigRecord141>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten141<T> = T extends Array<infer U> ? Flatten141<U> : T;
type Nested141 = number[][][][][][][][][][];
type Flat141 = Flatten141<Nested141>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly141<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly141<T[K]> : T[K];
};
type DeepRequired141<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired141<T[K]> : T[K];
};
type FR141 = DeepReadonly141<DeepRequired141<PartialBig141>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion141 =
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

type ExtractAlpha141 = Extract<BigUnion141, "alpha" | "bravo" | "charlie">;
type ExcludeZulu141 = Exclude<BigUnion141, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA141 { width: number; height: number; depth: number }
interface ShapeB141 { color: string; opacity: number; blend: string }
interface ShapeC141 { x: number; y: number; z: number; w: number }
interface ShapeD141 { label: string; title: string; summary: string }

type Combined141 = ShapeA141 & ShapeB141 & ShapeC141 & ShapeD141;
type OptionalAll141 = { [K in keyof Combined141]?: Combined141[K] };
type RequiredAll141 = { [K in keyof Combined141]-?: Combined141[K] };
type ReadonlyAll141 = { readonly [K in keyof Combined141]: Combined141[K] };
type NullableAll141 = { [K in keyof Combined141]: Combined141[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString141<T> = T extends string ? true : false;
type IsNumber141<T> = T extends number ? true : false;
type TypeName141<T> = T extends string
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

type TypeNames141 = {
  [K in keyof BigRecord141]: TypeName141<BigRecord141[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb141 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource141 = "user" | "post" | "comment" | "tag" | "category";
type Action141 = `${Verb141}_${Resource141}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise141<T> = T extends Promise<infer U> ? UnwrapPromise141<U> : T;
type UnwrapArray141<T> = T extends (infer U)[] ? UnwrapArray141<U> : T;
type Head141<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail141<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation141<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation141<Exclude<T, K>>]
  : never;

type SmallUnion141 = "a" | "b" | "c" | "d";
type AllPerms141 = Permutation141<SmallUnion141>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig141,
  Flat141,
  FR141,
  BigUnion141,
  ExtractAlpha141,
  ExcludeZulu141,
  OptionalAll141,
  RequiredAll141,
  ReadonlyAll141,
  NullableAll141,
  TypeNames141,
  Action141,
  AllPerms141,
};
