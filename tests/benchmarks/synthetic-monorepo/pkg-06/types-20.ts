// pkg-06 / types-20  (seed 620) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord620 {
  a620: { x: number; y: string; z: boolean };
  b620: { p: string[]; q: Record<string, number> };
  c620: { nested: { deep: { deeper: { deepest: string } } } };
  d620: number;
  e620: string;
  f620: boolean;
  g620: null;
  h620: undefined;
  i620: bigint;
  j620: symbol;
}

type PartialBig620 = DeepPartial<BigRecord620>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten620<T> = T extends Array<infer U> ? Flatten620<U> : T;
type Nested620 = number[][][][][][][][][][];
type Flat620 = Flatten620<Nested620>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly620<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly620<T[K]> : T[K];
};
type DeepRequired620<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired620<T[K]> : T[K];
};
type FR620 = DeepReadonly620<DeepRequired620<PartialBig620>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion620 =
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

type ExtractAlpha620 = Extract<BigUnion620, "alpha" | "bravo" | "charlie">;
type ExcludeZulu620 = Exclude<BigUnion620, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA620 { width: number; height: number; depth: number }
interface ShapeB620 { color: string; opacity: number; blend: string }
interface ShapeC620 { x: number; y: number; z: number; w: number }
interface ShapeD620 { label: string; title: string; summary: string }

type Combined620 = ShapeA620 & ShapeB620 & ShapeC620 & ShapeD620;
type OptionalAll620 = { [K in keyof Combined620]?: Combined620[K] };
type RequiredAll620 = { [K in keyof Combined620]-?: Combined620[K] };
type ReadonlyAll620 = { readonly [K in keyof Combined620]: Combined620[K] };
type NullableAll620 = { [K in keyof Combined620]: Combined620[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString620<T> = T extends string ? true : false;
type IsNumber620<T> = T extends number ? true : false;
type TypeName620<T> = T extends string
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

type TypeNames620 = {
  [K in keyof BigRecord620]: TypeName620<BigRecord620[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb620 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource620 = "user" | "post" | "comment" | "tag" | "category";
type Action620 = `${Verb620}_${Resource620}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise620<T> = T extends Promise<infer U> ? UnwrapPromise620<U> : T;
type UnwrapArray620<T> = T extends (infer U)[] ? UnwrapArray620<U> : T;
type Head620<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail620<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation620<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation620<Exclude<T, K>>]
  : never;

type SmallUnion620 = "a" | "b" | "c" | "d";
type AllPerms620 = Permutation620<SmallUnion620>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig620,
  Flat620,
  FR620,
  BigUnion620,
  ExtractAlpha620,
  ExcludeZulu620,
  OptionalAll620,
  RequiredAll620,
  ReadonlyAll620,
  NullableAll620,
  TypeNames620,
  Action620,
  AllPerms620,
};
