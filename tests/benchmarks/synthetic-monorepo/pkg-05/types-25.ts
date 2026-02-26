// pkg-05 / types-25  (seed 525) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord525 {
  a525: { x: number; y: string; z: boolean };
  b525: { p: string[]; q: Record<string, number> };
  c525: { nested: { deep: { deeper: { deepest: string } } } };
  d525: number;
  e525: string;
  f525: boolean;
  g525: null;
  h525: undefined;
  i525: bigint;
  j525: symbol;
}

type PartialBig525 = DeepPartial<BigRecord525>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten525<T> = T extends Array<infer U> ? Flatten525<U> : T;
type Nested525 = number[][][][][][][][][][];
type Flat525 = Flatten525<Nested525>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly525<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly525<T[K]> : T[K];
};
type DeepRequired525<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired525<T[K]> : T[K];
};
type FR525 = DeepReadonly525<DeepRequired525<PartialBig525>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion525 =
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

type ExtractAlpha525 = Extract<BigUnion525, "alpha" | "bravo" | "charlie">;
type ExcludeZulu525 = Exclude<BigUnion525, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA525 { width: number; height: number; depth: number }
interface ShapeB525 { color: string; opacity: number; blend: string }
interface ShapeC525 { x: number; y: number; z: number; w: number }
interface ShapeD525 { label: string; title: string; summary: string }

type Combined525 = ShapeA525 & ShapeB525 & ShapeC525 & ShapeD525;
type OptionalAll525 = { [K in keyof Combined525]?: Combined525[K] };
type RequiredAll525 = { [K in keyof Combined525]-?: Combined525[K] };
type ReadonlyAll525 = { readonly [K in keyof Combined525]: Combined525[K] };
type NullableAll525 = { [K in keyof Combined525]: Combined525[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString525<T> = T extends string ? true : false;
type IsNumber525<T> = T extends number ? true : false;
type TypeName525<T> = T extends string
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

type TypeNames525 = {
  [K in keyof BigRecord525]: TypeName525<BigRecord525[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb525 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource525 = "user" | "post" | "comment" | "tag" | "category";
type Action525 = `${Verb525}_${Resource525}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise525<T> = T extends Promise<infer U> ? UnwrapPromise525<U> : T;
type UnwrapArray525<T> = T extends (infer U)[] ? UnwrapArray525<U> : T;
type Head525<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail525<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation525<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation525<Exclude<T, K>>]
  : never;

type SmallUnion525 = "a" | "b" | "c" | "d";
type AllPerms525 = Permutation525<SmallUnion525>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig525,
  Flat525,
  FR525,
  BigUnion525,
  ExtractAlpha525,
  ExcludeZulu525,
  OptionalAll525,
  RequiredAll525,
  ReadonlyAll525,
  NullableAll525,
  TypeNames525,
  Action525,
  AllPerms525,
};
