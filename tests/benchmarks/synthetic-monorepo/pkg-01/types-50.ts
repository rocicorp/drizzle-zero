// pkg-01 / types-50  (seed 150) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord150 {
  a150: { x: number; y: string; z: boolean };
  b150: { p: string[]; q: Record<string, number> };
  c150: { nested: { deep: { deeper: { deepest: string } } } };
  d150: number;
  e150: string;
  f150: boolean;
  g150: null;
  h150: undefined;
  i150: bigint;
  j150: symbol;
}

type PartialBig150 = DeepPartial<BigRecord150>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten150<T> = T extends Array<infer U> ? Flatten150<U> : T;
type Nested150 = number[][][][][][][][][][];
type Flat150 = Flatten150<Nested150>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly150<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly150<T[K]> : T[K];
};
type DeepRequired150<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired150<T[K]> : T[K];
};
type FR150 = DeepReadonly150<DeepRequired150<PartialBig150>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion150 =
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

type ExtractAlpha150 = Extract<BigUnion150, "alpha" | "bravo" | "charlie">;
type ExcludeZulu150 = Exclude<BigUnion150, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA150 { width: number; height: number; depth: number }
interface ShapeB150 { color: string; opacity: number; blend: string }
interface ShapeC150 { x: number; y: number; z: number; w: number }
interface ShapeD150 { label: string; title: string; summary: string }

type Combined150 = ShapeA150 & ShapeB150 & ShapeC150 & ShapeD150;
type OptionalAll150 = { [K in keyof Combined150]?: Combined150[K] };
type RequiredAll150 = { [K in keyof Combined150]-?: Combined150[K] };
type ReadonlyAll150 = { readonly [K in keyof Combined150]: Combined150[K] };
type NullableAll150 = { [K in keyof Combined150]: Combined150[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString150<T> = T extends string ? true : false;
type IsNumber150<T> = T extends number ? true : false;
type TypeName150<T> = T extends string
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

type TypeNames150 = {
  [K in keyof BigRecord150]: TypeName150<BigRecord150[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb150 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource150 = "user" | "post" | "comment" | "tag" | "category";
type Action150 = `${Verb150}_${Resource150}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise150<T> = T extends Promise<infer U> ? UnwrapPromise150<U> : T;
type UnwrapArray150<T> = T extends (infer U)[] ? UnwrapArray150<U> : T;
type Head150<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail150<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation150<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation150<Exclude<T, K>>]
  : never;

type SmallUnion150 = "a" | "b" | "c" | "d";
type AllPerms150 = Permutation150<SmallUnion150>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig150,
  Flat150,
  FR150,
  BigUnion150,
  ExtractAlpha150,
  ExcludeZulu150,
  OptionalAll150,
  RequiredAll150,
  ReadonlyAll150,
  NullableAll150,
  TypeNames150,
  Action150,
  AllPerms150,
};
