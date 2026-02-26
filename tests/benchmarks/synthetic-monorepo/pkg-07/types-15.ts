// pkg-07 / types-15  (seed 715) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord715 {
  a715: { x: number; y: string; z: boolean };
  b715: { p: string[]; q: Record<string, number> };
  c715: { nested: { deep: { deeper: { deepest: string } } } };
  d715: number;
  e715: string;
  f715: boolean;
  g715: null;
  h715: undefined;
  i715: bigint;
  j715: symbol;
}

type PartialBig715 = DeepPartial<BigRecord715>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten715<T> = T extends Array<infer U> ? Flatten715<U> : T;
type Nested715 = number[][][][][][][][][][];
type Flat715 = Flatten715<Nested715>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly715<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly715<T[K]> : T[K];
};
type DeepRequired715<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired715<T[K]> : T[K];
};
type FR715 = DeepReadonly715<DeepRequired715<PartialBig715>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion715 =
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

type ExtractAlpha715 = Extract<BigUnion715, "alpha" | "bravo" | "charlie">;
type ExcludeZulu715 = Exclude<BigUnion715, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA715 { width: number; height: number; depth: number }
interface ShapeB715 { color: string; opacity: number; blend: string }
interface ShapeC715 { x: number; y: number; z: number; w: number }
interface ShapeD715 { label: string; title: string; summary: string }

type Combined715 = ShapeA715 & ShapeB715 & ShapeC715 & ShapeD715;
type OptionalAll715 = { [K in keyof Combined715]?: Combined715[K] };
type RequiredAll715 = { [K in keyof Combined715]-?: Combined715[K] };
type ReadonlyAll715 = { readonly [K in keyof Combined715]: Combined715[K] };
type NullableAll715 = { [K in keyof Combined715]: Combined715[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString715<T> = T extends string ? true : false;
type IsNumber715<T> = T extends number ? true : false;
type TypeName715<T> = T extends string
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

type TypeNames715 = {
  [K in keyof BigRecord715]: TypeName715<BigRecord715[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb715 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource715 = "user" | "post" | "comment" | "tag" | "category";
type Action715 = `${Verb715}_${Resource715}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise715<T> = T extends Promise<infer U> ? UnwrapPromise715<U> : T;
type UnwrapArray715<T> = T extends (infer U)[] ? UnwrapArray715<U> : T;
type Head715<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail715<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation715<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation715<Exclude<T, K>>]
  : never;

type SmallUnion715 = "a" | "b" | "c" | "d";
type AllPerms715 = Permutation715<SmallUnion715>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig715,
  Flat715,
  FR715,
  BigUnion715,
  ExtractAlpha715,
  ExcludeZulu715,
  OptionalAll715,
  RequiredAll715,
  ReadonlyAll715,
  NullableAll715,
  TypeNames715,
  Action715,
  AllPerms715,
};
