// pkg-03 / types-01  (seed 301) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord301 {
  a301: { x: number; y: string; z: boolean };
  b301: { p: string[]; q: Record<string, number> };
  c301: { nested: { deep: { deeper: { deepest: string } } } };
  d301: number;
  e301: string;
  f301: boolean;
  g301: null;
  h301: undefined;
  i301: bigint;
  j301: symbol;
}

type PartialBig301 = DeepPartial<BigRecord301>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten301<T> = T extends Array<infer U> ? Flatten301<U> : T;
type Nested301 = number[][][][][][][][][][];
type Flat301 = Flatten301<Nested301>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly301<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly301<T[K]> : T[K];
};
type DeepRequired301<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired301<T[K]> : T[K];
};
type FR301 = DeepReadonly301<DeepRequired301<PartialBig301>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion301 =
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

type ExtractAlpha301 = Extract<BigUnion301, "alpha" | "bravo" | "charlie">;
type ExcludeZulu301 = Exclude<BigUnion301, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA301 { width: number; height: number; depth: number }
interface ShapeB301 { color: string; opacity: number; blend: string }
interface ShapeC301 { x: number; y: number; z: number; w: number }
interface ShapeD301 { label: string; title: string; summary: string }

type Combined301 = ShapeA301 & ShapeB301 & ShapeC301 & ShapeD301;
type OptionalAll301 = { [K in keyof Combined301]?: Combined301[K] };
type RequiredAll301 = { [K in keyof Combined301]-?: Combined301[K] };
type ReadonlyAll301 = { readonly [K in keyof Combined301]: Combined301[K] };
type NullableAll301 = { [K in keyof Combined301]: Combined301[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString301<T> = T extends string ? true : false;
type IsNumber301<T> = T extends number ? true : false;
type TypeName301<T> = T extends string
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

type TypeNames301 = {
  [K in keyof BigRecord301]: TypeName301<BigRecord301[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb301 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource301 = "user" | "post" | "comment" | "tag" | "category";
type Action301 = `${Verb301}_${Resource301}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise301<T> = T extends Promise<infer U> ? UnwrapPromise301<U> : T;
type UnwrapArray301<T> = T extends (infer U)[] ? UnwrapArray301<U> : T;
type Head301<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail301<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation301<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation301<Exclude<T, K>>]
  : never;

type SmallUnion301 = "a" | "b" | "c" | "d";
type AllPerms301 = Permutation301<SmallUnion301>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig301,
  Flat301,
  FR301,
  BigUnion301,
  ExtractAlpha301,
  ExcludeZulu301,
  OptionalAll301,
  RequiredAll301,
  ReadonlyAll301,
  NullableAll301,
  TypeNames301,
  Action301,
  AllPerms301,
};
