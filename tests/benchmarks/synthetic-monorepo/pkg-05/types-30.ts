// pkg-05 / types-30  (seed 530) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord530 {
  a530: { x: number; y: string; z: boolean };
  b530: { p: string[]; q: Record<string, number> };
  c530: { nested: { deep: { deeper: { deepest: string } } } };
  d530: number;
  e530: string;
  f530: boolean;
  g530: null;
  h530: undefined;
  i530: bigint;
  j530: symbol;
}

type PartialBig530 = DeepPartial<BigRecord530>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten530<T> = T extends Array<infer U> ? Flatten530<U> : T;
type Nested530 = number[][][][][][][][][][];
type Flat530 = Flatten530<Nested530>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly530<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly530<T[K]> : T[K];
};
type DeepRequired530<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired530<T[K]> : T[K];
};
type FR530 = DeepReadonly530<DeepRequired530<PartialBig530>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion530 =
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

type ExtractAlpha530 = Extract<BigUnion530, "alpha" | "bravo" | "charlie">;
type ExcludeZulu530 = Exclude<BigUnion530, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA530 { width: number; height: number; depth: number }
interface ShapeB530 { color: string; opacity: number; blend: string }
interface ShapeC530 { x: number; y: number; z: number; w: number }
interface ShapeD530 { label: string; title: string; summary: string }

type Combined530 = ShapeA530 & ShapeB530 & ShapeC530 & ShapeD530;
type OptionalAll530 = { [K in keyof Combined530]?: Combined530[K] };
type RequiredAll530 = { [K in keyof Combined530]-?: Combined530[K] };
type ReadonlyAll530 = { readonly [K in keyof Combined530]: Combined530[K] };
type NullableAll530 = { [K in keyof Combined530]: Combined530[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString530<T> = T extends string ? true : false;
type IsNumber530<T> = T extends number ? true : false;
type TypeName530<T> = T extends string
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

type TypeNames530 = {
  [K in keyof BigRecord530]: TypeName530<BigRecord530[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb530 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource530 = "user" | "post" | "comment" | "tag" | "category";
type Action530 = `${Verb530}_${Resource530}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise530<T> = T extends Promise<infer U> ? UnwrapPromise530<U> : T;
type UnwrapArray530<T> = T extends (infer U)[] ? UnwrapArray530<U> : T;
type Head530<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail530<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation530<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation530<Exclude<T, K>>]
  : never;

type SmallUnion530 = "a" | "b" | "c" | "d";
type AllPerms530 = Permutation530<SmallUnion530>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig530,
  Flat530,
  FR530,
  BigUnion530,
  ExtractAlpha530,
  ExcludeZulu530,
  OptionalAll530,
  RequiredAll530,
  ReadonlyAll530,
  NullableAll530,
  TypeNames530,
  Action530,
  AllPerms530,
};
