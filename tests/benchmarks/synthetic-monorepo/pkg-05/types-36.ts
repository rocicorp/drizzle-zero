// pkg-05 / types-36  (seed 536) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord536 {
  a536: { x: number; y: string; z: boolean };
  b536: { p: string[]; q: Record<string, number> };
  c536: { nested: { deep: { deeper: { deepest: string } } } };
  d536: number;
  e536: string;
  f536: boolean;
  g536: null;
  h536: undefined;
  i536: bigint;
  j536: symbol;
}

type PartialBig536 = DeepPartial<BigRecord536>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten536<T> = T extends Array<infer U> ? Flatten536<U> : T;
type Nested536 = number[][][][][][][][][][];
type Flat536 = Flatten536<Nested536>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly536<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly536<T[K]> : T[K];
};
type DeepRequired536<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired536<T[K]> : T[K];
};
type FR536 = DeepReadonly536<DeepRequired536<PartialBig536>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion536 =
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

type ExtractAlpha536 = Extract<BigUnion536, "alpha" | "bravo" | "charlie">;
type ExcludeZulu536 = Exclude<BigUnion536, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA536 { width: number; height: number; depth: number }
interface ShapeB536 { color: string; opacity: number; blend: string }
interface ShapeC536 { x: number; y: number; z: number; w: number }
interface ShapeD536 { label: string; title: string; summary: string }

type Combined536 = ShapeA536 & ShapeB536 & ShapeC536 & ShapeD536;
type OptionalAll536 = { [K in keyof Combined536]?: Combined536[K] };
type RequiredAll536 = { [K in keyof Combined536]-?: Combined536[K] };
type ReadonlyAll536 = { readonly [K in keyof Combined536]: Combined536[K] };
type NullableAll536 = { [K in keyof Combined536]: Combined536[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString536<T> = T extends string ? true : false;
type IsNumber536<T> = T extends number ? true : false;
type TypeName536<T> = T extends string
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

type TypeNames536 = {
  [K in keyof BigRecord536]: TypeName536<BigRecord536[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb536 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource536 = "user" | "post" | "comment" | "tag" | "category";
type Action536 = `${Verb536}_${Resource536}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise536<T> = T extends Promise<infer U> ? UnwrapPromise536<U> : T;
type UnwrapArray536<T> = T extends (infer U)[] ? UnwrapArray536<U> : T;
type Head536<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail536<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation536<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation536<Exclude<T, K>>]
  : never;

type SmallUnion536 = "a" | "b" | "c" | "d";
type AllPerms536 = Permutation536<SmallUnion536>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig536,
  Flat536,
  FR536,
  BigUnion536,
  ExtractAlpha536,
  ExcludeZulu536,
  OptionalAll536,
  RequiredAll536,
  ReadonlyAll536,
  NullableAll536,
  TypeNames536,
  Action536,
  AllPerms536,
};
