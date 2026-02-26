// pkg-05 / types-37  (seed 537) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord537 {
  a537: { x: number; y: string; z: boolean };
  b537: { p: string[]; q: Record<string, number> };
  c537: { nested: { deep: { deeper: { deepest: string } } } };
  d537: number;
  e537: string;
  f537: boolean;
  g537: null;
  h537: undefined;
  i537: bigint;
  j537: symbol;
}

type PartialBig537 = DeepPartial<BigRecord537>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten537<T> = T extends Array<infer U> ? Flatten537<U> : T;
type Nested537 = number[][][][][][][][][][];
type Flat537 = Flatten537<Nested537>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly537<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly537<T[K]> : T[K];
};
type DeepRequired537<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired537<T[K]> : T[K];
};
type FR537 = DeepReadonly537<DeepRequired537<PartialBig537>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion537 =
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

type ExtractAlpha537 = Extract<BigUnion537, "alpha" | "bravo" | "charlie">;
type ExcludeZulu537 = Exclude<BigUnion537, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA537 { width: number; height: number; depth: number }
interface ShapeB537 { color: string; opacity: number; blend: string }
interface ShapeC537 { x: number; y: number; z: number; w: number }
interface ShapeD537 { label: string; title: string; summary: string }

type Combined537 = ShapeA537 & ShapeB537 & ShapeC537 & ShapeD537;
type OptionalAll537 = { [K in keyof Combined537]?: Combined537[K] };
type RequiredAll537 = { [K in keyof Combined537]-?: Combined537[K] };
type ReadonlyAll537 = { readonly [K in keyof Combined537]: Combined537[K] };
type NullableAll537 = { [K in keyof Combined537]: Combined537[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString537<T> = T extends string ? true : false;
type IsNumber537<T> = T extends number ? true : false;
type TypeName537<T> = T extends string
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

type TypeNames537 = {
  [K in keyof BigRecord537]: TypeName537<BigRecord537[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb537 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource537 = "user" | "post" | "comment" | "tag" | "category";
type Action537 = `${Verb537}_${Resource537}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise537<T> = T extends Promise<infer U> ? UnwrapPromise537<U> : T;
type UnwrapArray537<T> = T extends (infer U)[] ? UnwrapArray537<U> : T;
type Head537<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail537<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation537<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation537<Exclude<T, K>>]
  : never;

type SmallUnion537 = "a" | "b" | "c" | "d";
type AllPerms537 = Permutation537<SmallUnion537>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig537,
  Flat537,
  FR537,
  BigUnion537,
  ExtractAlpha537,
  ExcludeZulu537,
  OptionalAll537,
  RequiredAll537,
  ReadonlyAll537,
  NullableAll537,
  TypeNames537,
  Action537,
  AllPerms537,
};
