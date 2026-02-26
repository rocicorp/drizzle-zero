// pkg-03 / types-07  (seed 307) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord307 {
  a307: { x: number; y: string; z: boolean };
  b307: { p: string[]; q: Record<string, number> };
  c307: { nested: { deep: { deeper: { deepest: string } } } };
  d307: number;
  e307: string;
  f307: boolean;
  g307: null;
  h307: undefined;
  i307: bigint;
  j307: symbol;
}

type PartialBig307 = DeepPartial<BigRecord307>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten307<T> = T extends Array<infer U> ? Flatten307<U> : T;
type Nested307 = number[][][][][][][][][][];
type Flat307 = Flatten307<Nested307>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly307<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly307<T[K]> : T[K];
};
type DeepRequired307<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired307<T[K]> : T[K];
};
type FR307 = DeepReadonly307<DeepRequired307<PartialBig307>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion307 =
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

type ExtractAlpha307 = Extract<BigUnion307, "alpha" | "bravo" | "charlie">;
type ExcludeZulu307 = Exclude<BigUnion307, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA307 { width: number; height: number; depth: number }
interface ShapeB307 { color: string; opacity: number; blend: string }
interface ShapeC307 { x: number; y: number; z: number; w: number }
interface ShapeD307 { label: string; title: string; summary: string }

type Combined307 = ShapeA307 & ShapeB307 & ShapeC307 & ShapeD307;
type OptionalAll307 = { [K in keyof Combined307]?: Combined307[K] };
type RequiredAll307 = { [K in keyof Combined307]-?: Combined307[K] };
type ReadonlyAll307 = { readonly [K in keyof Combined307]: Combined307[K] };
type NullableAll307 = { [K in keyof Combined307]: Combined307[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString307<T> = T extends string ? true : false;
type IsNumber307<T> = T extends number ? true : false;
type TypeName307<T> = T extends string
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

type TypeNames307 = {
  [K in keyof BigRecord307]: TypeName307<BigRecord307[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb307 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource307 = "user" | "post" | "comment" | "tag" | "category";
type Action307 = `${Verb307}_${Resource307}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise307<T> = T extends Promise<infer U> ? UnwrapPromise307<U> : T;
type UnwrapArray307<T> = T extends (infer U)[] ? UnwrapArray307<U> : T;
type Head307<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail307<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation307<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation307<Exclude<T, K>>]
  : never;

type SmallUnion307 = "a" | "b" | "c" | "d";
type AllPerms307 = Permutation307<SmallUnion307>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig307,
  Flat307,
  FR307,
  BigUnion307,
  ExtractAlpha307,
  ExcludeZulu307,
  OptionalAll307,
  RequiredAll307,
  ReadonlyAll307,
  NullableAll307,
  TypeNames307,
  Action307,
  AllPerms307,
};
