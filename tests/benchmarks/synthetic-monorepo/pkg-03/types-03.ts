// pkg-03 / types-03  (seed 303) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord303 {
  a303: { x: number; y: string; z: boolean };
  b303: { p: string[]; q: Record<string, number> };
  c303: { nested: { deep: { deeper: { deepest: string } } } };
  d303: number;
  e303: string;
  f303: boolean;
  g303: null;
  h303: undefined;
  i303: bigint;
  j303: symbol;
}

type PartialBig303 = DeepPartial<BigRecord303>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten303<T> = T extends Array<infer U> ? Flatten303<U> : T;
type Nested303 = number[][][][][][][][][][];
type Flat303 = Flatten303<Nested303>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly303<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly303<T[K]> : T[K];
};
type DeepRequired303<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired303<T[K]> : T[K];
};
type FR303 = DeepReadonly303<DeepRequired303<PartialBig303>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion303 =
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

type ExtractAlpha303 = Extract<BigUnion303, "alpha" | "bravo" | "charlie">;
type ExcludeZulu303 = Exclude<BigUnion303, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA303 { width: number; height: number; depth: number }
interface ShapeB303 { color: string; opacity: number; blend: string }
interface ShapeC303 { x: number; y: number; z: number; w: number }
interface ShapeD303 { label: string; title: string; summary: string }

type Combined303 = ShapeA303 & ShapeB303 & ShapeC303 & ShapeD303;
type OptionalAll303 = { [K in keyof Combined303]?: Combined303[K] };
type RequiredAll303 = { [K in keyof Combined303]-?: Combined303[K] };
type ReadonlyAll303 = { readonly [K in keyof Combined303]: Combined303[K] };
type NullableAll303 = { [K in keyof Combined303]: Combined303[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString303<T> = T extends string ? true : false;
type IsNumber303<T> = T extends number ? true : false;
type TypeName303<T> = T extends string
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

type TypeNames303 = {
  [K in keyof BigRecord303]: TypeName303<BigRecord303[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb303 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource303 = "user" | "post" | "comment" | "tag" | "category";
type Action303 = `${Verb303}_${Resource303}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise303<T> = T extends Promise<infer U> ? UnwrapPromise303<U> : T;
type UnwrapArray303<T> = T extends (infer U)[] ? UnwrapArray303<U> : T;
type Head303<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail303<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation303<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation303<Exclude<T, K>>]
  : never;

type SmallUnion303 = "a" | "b" | "c" | "d";
type AllPerms303 = Permutation303<SmallUnion303>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig303,
  Flat303,
  FR303,
  BigUnion303,
  ExtractAlpha303,
  ExcludeZulu303,
  OptionalAll303,
  RequiredAll303,
  ReadonlyAll303,
  NullableAll303,
  TypeNames303,
  Action303,
  AllPerms303,
};
