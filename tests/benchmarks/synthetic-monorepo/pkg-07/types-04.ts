// pkg-07 / types-04  (seed 704) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord704 {
  a704: { x: number; y: string; z: boolean };
  b704: { p: string[]; q: Record<string, number> };
  c704: { nested: { deep: { deeper: { deepest: string } } } };
  d704: number;
  e704: string;
  f704: boolean;
  g704: null;
  h704: undefined;
  i704: bigint;
  j704: symbol;
}

type PartialBig704 = DeepPartial<BigRecord704>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten704<T> = T extends Array<infer U> ? Flatten704<U> : T;
type Nested704 = number[][][][][][][][][][];
type Flat704 = Flatten704<Nested704>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly704<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly704<T[K]> : T[K];
};
type DeepRequired704<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired704<T[K]> : T[K];
};
type FR704 = DeepReadonly704<DeepRequired704<PartialBig704>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion704 =
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

type ExtractAlpha704 = Extract<BigUnion704, "alpha" | "bravo" | "charlie">;
type ExcludeZulu704 = Exclude<BigUnion704, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA704 { width: number; height: number; depth: number }
interface ShapeB704 { color: string; opacity: number; blend: string }
interface ShapeC704 { x: number; y: number; z: number; w: number }
interface ShapeD704 { label: string; title: string; summary: string }

type Combined704 = ShapeA704 & ShapeB704 & ShapeC704 & ShapeD704;
type OptionalAll704 = { [K in keyof Combined704]?: Combined704[K] };
type RequiredAll704 = { [K in keyof Combined704]-?: Combined704[K] };
type ReadonlyAll704 = { readonly [K in keyof Combined704]: Combined704[K] };
type NullableAll704 = { [K in keyof Combined704]: Combined704[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString704<T> = T extends string ? true : false;
type IsNumber704<T> = T extends number ? true : false;
type TypeName704<T> = T extends string
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

type TypeNames704 = {
  [K in keyof BigRecord704]: TypeName704<BigRecord704[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb704 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource704 = "user" | "post" | "comment" | "tag" | "category";
type Action704 = `${Verb704}_${Resource704}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise704<T> = T extends Promise<infer U> ? UnwrapPromise704<U> : T;
type UnwrapArray704<T> = T extends (infer U)[] ? UnwrapArray704<U> : T;
type Head704<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail704<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation704<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation704<Exclude<T, K>>]
  : never;

type SmallUnion704 = "a" | "b" | "c" | "d";
type AllPerms704 = Permutation704<SmallUnion704>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig704,
  Flat704,
  FR704,
  BigUnion704,
  ExtractAlpha704,
  ExcludeZulu704,
  OptionalAll704,
  RequiredAll704,
  ReadonlyAll704,
  NullableAll704,
  TypeNames704,
  Action704,
  AllPerms704,
};
