// pkg-07 / types-03  (seed 703) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord703 {
  a703: { x: number; y: string; z: boolean };
  b703: { p: string[]; q: Record<string, number> };
  c703: { nested: { deep: { deeper: { deepest: string } } } };
  d703: number;
  e703: string;
  f703: boolean;
  g703: null;
  h703: undefined;
  i703: bigint;
  j703: symbol;
}

type PartialBig703 = DeepPartial<BigRecord703>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten703<T> = T extends Array<infer U> ? Flatten703<U> : T;
type Nested703 = number[][][][][][][][][][];
type Flat703 = Flatten703<Nested703>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly703<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly703<T[K]> : T[K];
};
type DeepRequired703<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired703<T[K]> : T[K];
};
type FR703 = DeepReadonly703<DeepRequired703<PartialBig703>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion703 =
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

type ExtractAlpha703 = Extract<BigUnion703, "alpha" | "bravo" | "charlie">;
type ExcludeZulu703 = Exclude<BigUnion703, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA703 { width: number; height: number; depth: number }
interface ShapeB703 { color: string; opacity: number; blend: string }
interface ShapeC703 { x: number; y: number; z: number; w: number }
interface ShapeD703 { label: string; title: string; summary: string }

type Combined703 = ShapeA703 & ShapeB703 & ShapeC703 & ShapeD703;
type OptionalAll703 = { [K in keyof Combined703]?: Combined703[K] };
type RequiredAll703 = { [K in keyof Combined703]-?: Combined703[K] };
type ReadonlyAll703 = { readonly [K in keyof Combined703]: Combined703[K] };
type NullableAll703 = { [K in keyof Combined703]: Combined703[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString703<T> = T extends string ? true : false;
type IsNumber703<T> = T extends number ? true : false;
type TypeName703<T> = T extends string
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

type TypeNames703 = {
  [K in keyof BigRecord703]: TypeName703<BigRecord703[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb703 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource703 = "user" | "post" | "comment" | "tag" | "category";
type Action703 = `${Verb703}_${Resource703}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise703<T> = T extends Promise<infer U> ? UnwrapPromise703<U> : T;
type UnwrapArray703<T> = T extends (infer U)[] ? UnwrapArray703<U> : T;
type Head703<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail703<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation703<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation703<Exclude<T, K>>]
  : never;

type SmallUnion703 = "a" | "b" | "c" | "d";
type AllPerms703 = Permutation703<SmallUnion703>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig703,
  Flat703,
  FR703,
  BigUnion703,
  ExtractAlpha703,
  ExcludeZulu703,
  OptionalAll703,
  RequiredAll703,
  ReadonlyAll703,
  NullableAll703,
  TypeNames703,
  Action703,
  AllPerms703,
};
