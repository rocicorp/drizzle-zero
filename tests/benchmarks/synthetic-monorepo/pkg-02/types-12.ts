// pkg-02 / types-12  (seed 212) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord212 {
  a212: { x: number; y: string; z: boolean };
  b212: { p: string[]; q: Record<string, number> };
  c212: { nested: { deep: { deeper: { deepest: string } } } };
  d212: number;
  e212: string;
  f212: boolean;
  g212: null;
  h212: undefined;
  i212: bigint;
  j212: symbol;
}

type PartialBig212 = DeepPartial<BigRecord212>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten212<T> = T extends Array<infer U> ? Flatten212<U> : T;
type Nested212 = number[][][][][][][][][][];
type Flat212 = Flatten212<Nested212>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly212<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly212<T[K]> : T[K];
};
type DeepRequired212<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired212<T[K]> : T[K];
};
type FR212 = DeepReadonly212<DeepRequired212<PartialBig212>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion212 =
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

type ExtractAlpha212 = Extract<BigUnion212, "alpha" | "bravo" | "charlie">;
type ExcludeZulu212 = Exclude<BigUnion212, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA212 { width: number; height: number; depth: number }
interface ShapeB212 { color: string; opacity: number; blend: string }
interface ShapeC212 { x: number; y: number; z: number; w: number }
interface ShapeD212 { label: string; title: string; summary: string }

type Combined212 = ShapeA212 & ShapeB212 & ShapeC212 & ShapeD212;
type OptionalAll212 = { [K in keyof Combined212]?: Combined212[K] };
type RequiredAll212 = { [K in keyof Combined212]-?: Combined212[K] };
type ReadonlyAll212 = { readonly [K in keyof Combined212]: Combined212[K] };
type NullableAll212 = { [K in keyof Combined212]: Combined212[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString212<T> = T extends string ? true : false;
type IsNumber212<T> = T extends number ? true : false;
type TypeName212<T> = T extends string
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

type TypeNames212 = {
  [K in keyof BigRecord212]: TypeName212<BigRecord212[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb212 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource212 = "user" | "post" | "comment" | "tag" | "category";
type Action212 = `${Verb212}_${Resource212}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise212<T> = T extends Promise<infer U> ? UnwrapPromise212<U> : T;
type UnwrapArray212<T> = T extends (infer U)[] ? UnwrapArray212<U> : T;
type Head212<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail212<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation212<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation212<Exclude<T, K>>]
  : never;

type SmallUnion212 = "a" | "b" | "c" | "d";
type AllPerms212 = Permutation212<SmallUnion212>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig212,
  Flat212,
  FR212,
  BigUnion212,
  ExtractAlpha212,
  ExcludeZulu212,
  OptionalAll212,
  RequiredAll212,
  ReadonlyAll212,
  NullableAll212,
  TypeNames212,
  Action212,
  AllPerms212,
};
