// pkg-03 / types-20  (seed 320) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord320 {
  a320: { x: number; y: string; z: boolean };
  b320: { p: string[]; q: Record<string, number> };
  c320: { nested: { deep: { deeper: { deepest: string } } } };
  d320: number;
  e320: string;
  f320: boolean;
  g320: null;
  h320: undefined;
  i320: bigint;
  j320: symbol;
}

type PartialBig320 = DeepPartial<BigRecord320>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten320<T> = T extends Array<infer U> ? Flatten320<U> : T;
type Nested320 = number[][][][][][][][][][];
type Flat320 = Flatten320<Nested320>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly320<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly320<T[K]> : T[K];
};
type DeepRequired320<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired320<T[K]> : T[K];
};
type FR320 = DeepReadonly320<DeepRequired320<PartialBig320>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion320 =
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

type ExtractAlpha320 = Extract<BigUnion320, "alpha" | "bravo" | "charlie">;
type ExcludeZulu320 = Exclude<BigUnion320, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA320 { width: number; height: number; depth: number }
interface ShapeB320 { color: string; opacity: number; blend: string }
interface ShapeC320 { x: number; y: number; z: number; w: number }
interface ShapeD320 { label: string; title: string; summary: string }

type Combined320 = ShapeA320 & ShapeB320 & ShapeC320 & ShapeD320;
type OptionalAll320 = { [K in keyof Combined320]?: Combined320[K] };
type RequiredAll320 = { [K in keyof Combined320]-?: Combined320[K] };
type ReadonlyAll320 = { readonly [K in keyof Combined320]: Combined320[K] };
type NullableAll320 = { [K in keyof Combined320]: Combined320[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString320<T> = T extends string ? true : false;
type IsNumber320<T> = T extends number ? true : false;
type TypeName320<T> = T extends string
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

type TypeNames320 = {
  [K in keyof BigRecord320]: TypeName320<BigRecord320[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb320 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource320 = "user" | "post" | "comment" | "tag" | "category";
type Action320 = `${Verb320}_${Resource320}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise320<T> = T extends Promise<infer U> ? UnwrapPromise320<U> : T;
type UnwrapArray320<T> = T extends (infer U)[] ? UnwrapArray320<U> : T;
type Head320<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail320<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation320<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation320<Exclude<T, K>>]
  : never;

type SmallUnion320 = "a" | "b" | "c" | "d";
type AllPerms320 = Permutation320<SmallUnion320>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig320,
  Flat320,
  FR320,
  BigUnion320,
  ExtractAlpha320,
  ExcludeZulu320,
  OptionalAll320,
  RequiredAll320,
  ReadonlyAll320,
  NullableAll320,
  TypeNames320,
  Action320,
  AllPerms320,
};
