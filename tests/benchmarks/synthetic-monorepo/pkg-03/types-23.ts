// pkg-03 / types-23  (seed 323) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord323 {
  a323: { x: number; y: string; z: boolean };
  b323: { p: string[]; q: Record<string, number> };
  c323: { nested: { deep: { deeper: { deepest: string } } } };
  d323: number;
  e323: string;
  f323: boolean;
  g323: null;
  h323: undefined;
  i323: bigint;
  j323: symbol;
}

type PartialBig323 = DeepPartial<BigRecord323>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten323<T> = T extends Array<infer U> ? Flatten323<U> : T;
type Nested323 = number[][][][][][][][][][];
type Flat323 = Flatten323<Nested323>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly323<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly323<T[K]> : T[K];
};
type DeepRequired323<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired323<T[K]> : T[K];
};
type FR323 = DeepReadonly323<DeepRequired323<PartialBig323>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion323 =
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

type ExtractAlpha323 = Extract<BigUnion323, "alpha" | "bravo" | "charlie">;
type ExcludeZulu323 = Exclude<BigUnion323, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA323 { width: number; height: number; depth: number }
interface ShapeB323 { color: string; opacity: number; blend: string }
interface ShapeC323 { x: number; y: number; z: number; w: number }
interface ShapeD323 { label: string; title: string; summary: string }

type Combined323 = ShapeA323 & ShapeB323 & ShapeC323 & ShapeD323;
type OptionalAll323 = { [K in keyof Combined323]?: Combined323[K] };
type RequiredAll323 = { [K in keyof Combined323]-?: Combined323[K] };
type ReadonlyAll323 = { readonly [K in keyof Combined323]: Combined323[K] };
type NullableAll323 = { [K in keyof Combined323]: Combined323[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString323<T> = T extends string ? true : false;
type IsNumber323<T> = T extends number ? true : false;
type TypeName323<T> = T extends string
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

type TypeNames323 = {
  [K in keyof BigRecord323]: TypeName323<BigRecord323[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb323 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource323 = "user" | "post" | "comment" | "tag" | "category";
type Action323 = `${Verb323}_${Resource323}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise323<T> = T extends Promise<infer U> ? UnwrapPromise323<U> : T;
type UnwrapArray323<T> = T extends (infer U)[] ? UnwrapArray323<U> : T;
type Head323<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail323<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation323<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation323<Exclude<T, K>>]
  : never;

type SmallUnion323 = "a" | "b" | "c" | "d";
type AllPerms323 = Permutation323<SmallUnion323>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig323,
  Flat323,
  FR323,
  BigUnion323,
  ExtractAlpha323,
  ExcludeZulu323,
  OptionalAll323,
  RequiredAll323,
  ReadonlyAll323,
  NullableAll323,
  TypeNames323,
  Action323,
  AllPerms323,
};
