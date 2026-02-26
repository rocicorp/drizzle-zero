// pkg-09 / types-38  (seed 938) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord938 {
  a938: { x: number; y: string; z: boolean };
  b938: { p: string[]; q: Record<string, number> };
  c938: { nested: { deep: { deeper: { deepest: string } } } };
  d938: number;
  e938: string;
  f938: boolean;
  g938: null;
  h938: undefined;
  i938: bigint;
  j938: symbol;
}

type PartialBig938 = DeepPartial<BigRecord938>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten938<T> = T extends Array<infer U> ? Flatten938<U> : T;
type Nested938 = number[][][][][][][][][][];
type Flat938 = Flatten938<Nested938>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly938<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly938<T[K]> : T[K];
};
type DeepRequired938<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired938<T[K]> : T[K];
};
type FR938 = DeepReadonly938<DeepRequired938<PartialBig938>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion938 =
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

type ExtractAlpha938 = Extract<BigUnion938, "alpha" | "bravo" | "charlie">;
type ExcludeZulu938 = Exclude<BigUnion938, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA938 { width: number; height: number; depth: number }
interface ShapeB938 { color: string; opacity: number; blend: string }
interface ShapeC938 { x: number; y: number; z: number; w: number }
interface ShapeD938 { label: string; title: string; summary: string }

type Combined938 = ShapeA938 & ShapeB938 & ShapeC938 & ShapeD938;
type OptionalAll938 = { [K in keyof Combined938]?: Combined938[K] };
type RequiredAll938 = { [K in keyof Combined938]-?: Combined938[K] };
type ReadonlyAll938 = { readonly [K in keyof Combined938]: Combined938[K] };
type NullableAll938 = { [K in keyof Combined938]: Combined938[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString938<T> = T extends string ? true : false;
type IsNumber938<T> = T extends number ? true : false;
type TypeName938<T> = T extends string
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

type TypeNames938 = {
  [K in keyof BigRecord938]: TypeName938<BigRecord938[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb938 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource938 = "user" | "post" | "comment" | "tag" | "category";
type Action938 = `${Verb938}_${Resource938}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise938<T> = T extends Promise<infer U> ? UnwrapPromise938<U> : T;
type UnwrapArray938<T> = T extends (infer U)[] ? UnwrapArray938<U> : T;
type Head938<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail938<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation938<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation938<Exclude<T, K>>]
  : never;

type SmallUnion938 = "a" | "b" | "c" | "d";
type AllPerms938 = Permutation938<SmallUnion938>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig938,
  Flat938,
  FR938,
  BigUnion938,
  ExtractAlpha938,
  ExcludeZulu938,
  OptionalAll938,
  RequiredAll938,
  ReadonlyAll938,
  NullableAll938,
  TypeNames938,
  Action938,
  AllPerms938,
};
