// pkg-04 / types-23  (seed 423) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord423 {
  a423: { x: number; y: string; z: boolean };
  b423: { p: string[]; q: Record<string, number> };
  c423: { nested: { deep: { deeper: { deepest: string } } } };
  d423: number;
  e423: string;
  f423: boolean;
  g423: null;
  h423: undefined;
  i423: bigint;
  j423: symbol;
}

type PartialBig423 = DeepPartial<BigRecord423>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten423<T> = T extends Array<infer U> ? Flatten423<U> : T;
type Nested423 = number[][][][][][][][][][];
type Flat423 = Flatten423<Nested423>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly423<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly423<T[K]> : T[K];
};
type DeepRequired423<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired423<T[K]> : T[K];
};
type FR423 = DeepReadonly423<DeepRequired423<PartialBig423>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion423 =
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

type ExtractAlpha423 = Extract<BigUnion423, "alpha" | "bravo" | "charlie">;
type ExcludeZulu423 = Exclude<BigUnion423, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA423 { width: number; height: number; depth: number }
interface ShapeB423 { color: string; opacity: number; blend: string }
interface ShapeC423 { x: number; y: number; z: number; w: number }
interface ShapeD423 { label: string; title: string; summary: string }

type Combined423 = ShapeA423 & ShapeB423 & ShapeC423 & ShapeD423;
type OptionalAll423 = { [K in keyof Combined423]?: Combined423[K] };
type RequiredAll423 = { [K in keyof Combined423]-?: Combined423[K] };
type ReadonlyAll423 = { readonly [K in keyof Combined423]: Combined423[K] };
type NullableAll423 = { [K in keyof Combined423]: Combined423[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString423<T> = T extends string ? true : false;
type IsNumber423<T> = T extends number ? true : false;
type TypeName423<T> = T extends string
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

type TypeNames423 = {
  [K in keyof BigRecord423]: TypeName423<BigRecord423[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb423 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource423 = "user" | "post" | "comment" | "tag" | "category";
type Action423 = `${Verb423}_${Resource423}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise423<T> = T extends Promise<infer U> ? UnwrapPromise423<U> : T;
type UnwrapArray423<T> = T extends (infer U)[] ? UnwrapArray423<U> : T;
type Head423<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail423<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation423<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation423<Exclude<T, K>>]
  : never;

type SmallUnion423 = "a" | "b" | "c" | "d";
type AllPerms423 = Permutation423<SmallUnion423>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig423,
  Flat423,
  FR423,
  BigUnion423,
  ExtractAlpha423,
  ExcludeZulu423,
  OptionalAll423,
  RequiredAll423,
  ReadonlyAll423,
  NullableAll423,
  TypeNames423,
  Action423,
  AllPerms423,
};
