// pkg-09 / types-03  (seed 903) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord903 {
  a903: { x: number; y: string; z: boolean };
  b903: { p: string[]; q: Record<string, number> };
  c903: { nested: { deep: { deeper: { deepest: string } } } };
  d903: number;
  e903: string;
  f903: boolean;
  g903: null;
  h903: undefined;
  i903: bigint;
  j903: symbol;
}

type PartialBig903 = DeepPartial<BigRecord903>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten903<T> = T extends Array<infer U> ? Flatten903<U> : T;
type Nested903 = number[][][][][][][][][][];
type Flat903 = Flatten903<Nested903>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly903<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly903<T[K]> : T[K];
};
type DeepRequired903<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired903<T[K]> : T[K];
};
type FR903 = DeepReadonly903<DeepRequired903<PartialBig903>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion903 =
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

type ExtractAlpha903 = Extract<BigUnion903, "alpha" | "bravo" | "charlie">;
type ExcludeZulu903 = Exclude<BigUnion903, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA903 { width: number; height: number; depth: number }
interface ShapeB903 { color: string; opacity: number; blend: string }
interface ShapeC903 { x: number; y: number; z: number; w: number }
interface ShapeD903 { label: string; title: string; summary: string }

type Combined903 = ShapeA903 & ShapeB903 & ShapeC903 & ShapeD903;
type OptionalAll903 = { [K in keyof Combined903]?: Combined903[K] };
type RequiredAll903 = { [K in keyof Combined903]-?: Combined903[K] };
type ReadonlyAll903 = { readonly [K in keyof Combined903]: Combined903[K] };
type NullableAll903 = { [K in keyof Combined903]: Combined903[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString903<T> = T extends string ? true : false;
type IsNumber903<T> = T extends number ? true : false;
type TypeName903<T> = T extends string
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

type TypeNames903 = {
  [K in keyof BigRecord903]: TypeName903<BigRecord903[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb903 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource903 = "user" | "post" | "comment" | "tag" | "category";
type Action903 = `${Verb903}_${Resource903}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise903<T> = T extends Promise<infer U> ? UnwrapPromise903<U> : T;
type UnwrapArray903<T> = T extends (infer U)[] ? UnwrapArray903<U> : T;
type Head903<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail903<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation903<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation903<Exclude<T, K>>]
  : never;

type SmallUnion903 = "a" | "b" | "c" | "d";
type AllPerms903 = Permutation903<SmallUnion903>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig903,
  Flat903,
  FR903,
  BigUnion903,
  ExtractAlpha903,
  ExcludeZulu903,
  OptionalAll903,
  RequiredAll903,
  ReadonlyAll903,
  NullableAll903,
  TypeNames903,
  Action903,
  AllPerms903,
};
