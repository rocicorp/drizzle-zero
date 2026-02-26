// pkg-09 / types-37  (seed 937) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord937 {
  a937: { x: number; y: string; z: boolean };
  b937: { p: string[]; q: Record<string, number> };
  c937: { nested: { deep: { deeper: { deepest: string } } } };
  d937: number;
  e937: string;
  f937: boolean;
  g937: null;
  h937: undefined;
  i937: bigint;
  j937: symbol;
}

type PartialBig937 = DeepPartial<BigRecord937>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten937<T> = T extends Array<infer U> ? Flatten937<U> : T;
type Nested937 = number[][][][][][][][][][];
type Flat937 = Flatten937<Nested937>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly937<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly937<T[K]> : T[K];
};
type DeepRequired937<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired937<T[K]> : T[K];
};
type FR937 = DeepReadonly937<DeepRequired937<PartialBig937>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion937 =
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

type ExtractAlpha937 = Extract<BigUnion937, "alpha" | "bravo" | "charlie">;
type ExcludeZulu937 = Exclude<BigUnion937, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA937 { width: number; height: number; depth: number }
interface ShapeB937 { color: string; opacity: number; blend: string }
interface ShapeC937 { x: number; y: number; z: number; w: number }
interface ShapeD937 { label: string; title: string; summary: string }

type Combined937 = ShapeA937 & ShapeB937 & ShapeC937 & ShapeD937;
type OptionalAll937 = { [K in keyof Combined937]?: Combined937[K] };
type RequiredAll937 = { [K in keyof Combined937]-?: Combined937[K] };
type ReadonlyAll937 = { readonly [K in keyof Combined937]: Combined937[K] };
type NullableAll937 = { [K in keyof Combined937]: Combined937[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString937<T> = T extends string ? true : false;
type IsNumber937<T> = T extends number ? true : false;
type TypeName937<T> = T extends string
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

type TypeNames937 = {
  [K in keyof BigRecord937]: TypeName937<BigRecord937[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb937 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource937 = "user" | "post" | "comment" | "tag" | "category";
type Action937 = `${Verb937}_${Resource937}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise937<T> = T extends Promise<infer U> ? UnwrapPromise937<U> : T;
type UnwrapArray937<T> = T extends (infer U)[] ? UnwrapArray937<U> : T;
type Head937<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail937<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation937<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation937<Exclude<T, K>>]
  : never;

type SmallUnion937 = "a" | "b" | "c" | "d";
type AllPerms937 = Permutation937<SmallUnion937>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig937,
  Flat937,
  FR937,
  BigUnion937,
  ExtractAlpha937,
  ExcludeZulu937,
  OptionalAll937,
  RequiredAll937,
  ReadonlyAll937,
  NullableAll937,
  TypeNames937,
  Action937,
  AllPerms937,
};
