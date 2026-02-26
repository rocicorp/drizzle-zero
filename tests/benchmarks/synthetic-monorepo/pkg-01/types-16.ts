// pkg-01 / types-16  (seed 116) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord116 {
  a116: { x: number; y: string; z: boolean };
  b116: { p: string[]; q: Record<string, number> };
  c116: { nested: { deep: { deeper: { deepest: string } } } };
  d116: number;
  e116: string;
  f116: boolean;
  g116: null;
  h116: undefined;
  i116: bigint;
  j116: symbol;
}

type PartialBig116 = DeepPartial<BigRecord116>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten116<T> = T extends Array<infer U> ? Flatten116<U> : T;
type Nested116 = number[][][][][][][][][][];
type Flat116 = Flatten116<Nested116>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly116<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly116<T[K]> : T[K];
};
type DeepRequired116<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired116<T[K]> : T[K];
};
type FR116 = DeepReadonly116<DeepRequired116<PartialBig116>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion116 =
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

type ExtractAlpha116 = Extract<BigUnion116, "alpha" | "bravo" | "charlie">;
type ExcludeZulu116 = Exclude<BigUnion116, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA116 { width: number; height: number; depth: number }
interface ShapeB116 { color: string; opacity: number; blend: string }
interface ShapeC116 { x: number; y: number; z: number; w: number }
interface ShapeD116 { label: string; title: string; summary: string }

type Combined116 = ShapeA116 & ShapeB116 & ShapeC116 & ShapeD116;
type OptionalAll116 = { [K in keyof Combined116]?: Combined116[K] };
type RequiredAll116 = { [K in keyof Combined116]-?: Combined116[K] };
type ReadonlyAll116 = { readonly [K in keyof Combined116]: Combined116[K] };
type NullableAll116 = { [K in keyof Combined116]: Combined116[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString116<T> = T extends string ? true : false;
type IsNumber116<T> = T extends number ? true : false;
type TypeName116<T> = T extends string
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

type TypeNames116 = {
  [K in keyof BigRecord116]: TypeName116<BigRecord116[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb116 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource116 = "user" | "post" | "comment" | "tag" | "category";
type Action116 = `${Verb116}_${Resource116}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise116<T> = T extends Promise<infer U> ? UnwrapPromise116<U> : T;
type UnwrapArray116<T> = T extends (infer U)[] ? UnwrapArray116<U> : T;
type Head116<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail116<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation116<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation116<Exclude<T, K>>]
  : never;

type SmallUnion116 = "a" | "b" | "c" | "d";
type AllPerms116 = Permutation116<SmallUnion116>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig116,
  Flat116,
  FR116,
  BigUnion116,
  ExtractAlpha116,
  ExcludeZulu116,
  OptionalAll116,
  RequiredAll116,
  ReadonlyAll116,
  NullableAll116,
  TypeNames116,
  Action116,
  AllPerms116,
};
