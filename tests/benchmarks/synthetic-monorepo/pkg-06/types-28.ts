// pkg-06 / types-28  (seed 628) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord628 {
  a628: { x: number; y: string; z: boolean };
  b628: { p: string[]; q: Record<string, number> };
  c628: { nested: { deep: { deeper: { deepest: string } } } };
  d628: number;
  e628: string;
  f628: boolean;
  g628: null;
  h628: undefined;
  i628: bigint;
  j628: symbol;
}

type PartialBig628 = DeepPartial<BigRecord628>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten628<T> = T extends Array<infer U> ? Flatten628<U> : T;
type Nested628 = number[][][][][][][][][][];
type Flat628 = Flatten628<Nested628>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly628<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly628<T[K]> : T[K];
};
type DeepRequired628<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired628<T[K]> : T[K];
};
type FR628 = DeepReadonly628<DeepRequired628<PartialBig628>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion628 =
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

type ExtractAlpha628 = Extract<BigUnion628, "alpha" | "bravo" | "charlie">;
type ExcludeZulu628 = Exclude<BigUnion628, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA628 { width: number; height: number; depth: number }
interface ShapeB628 { color: string; opacity: number; blend: string }
interface ShapeC628 { x: number; y: number; z: number; w: number }
interface ShapeD628 { label: string; title: string; summary: string }

type Combined628 = ShapeA628 & ShapeB628 & ShapeC628 & ShapeD628;
type OptionalAll628 = { [K in keyof Combined628]?: Combined628[K] };
type RequiredAll628 = { [K in keyof Combined628]-?: Combined628[K] };
type ReadonlyAll628 = { readonly [K in keyof Combined628]: Combined628[K] };
type NullableAll628 = { [K in keyof Combined628]: Combined628[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString628<T> = T extends string ? true : false;
type IsNumber628<T> = T extends number ? true : false;
type TypeName628<T> = T extends string
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

type TypeNames628 = {
  [K in keyof BigRecord628]: TypeName628<BigRecord628[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb628 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource628 = "user" | "post" | "comment" | "tag" | "category";
type Action628 = `${Verb628}_${Resource628}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise628<T> = T extends Promise<infer U> ? UnwrapPromise628<U> : T;
type UnwrapArray628<T> = T extends (infer U)[] ? UnwrapArray628<U> : T;
type Head628<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail628<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation628<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation628<Exclude<T, K>>]
  : never;

type SmallUnion628 = "a" | "b" | "c" | "d";
type AllPerms628 = Permutation628<SmallUnion628>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig628,
  Flat628,
  FR628,
  BigUnion628,
  ExtractAlpha628,
  ExcludeZulu628,
  OptionalAll628,
  RequiredAll628,
  ReadonlyAll628,
  NullableAll628,
  TypeNames628,
  Action628,
  AllPerms628,
};
