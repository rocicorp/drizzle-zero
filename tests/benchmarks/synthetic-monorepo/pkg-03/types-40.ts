// pkg-03 / types-40  (seed 340) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord340 {
  a340: { x: number; y: string; z: boolean };
  b340: { p: string[]; q: Record<string, number> };
  c340: { nested: { deep: { deeper: { deepest: string } } } };
  d340: number;
  e340: string;
  f340: boolean;
  g340: null;
  h340: undefined;
  i340: bigint;
  j340: symbol;
}

type PartialBig340 = DeepPartial<BigRecord340>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten340<T> = T extends Array<infer U> ? Flatten340<U> : T;
type Nested340 = number[][][][][][][][][][];
type Flat340 = Flatten340<Nested340>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly340<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly340<T[K]> : T[K];
};
type DeepRequired340<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired340<T[K]> : T[K];
};
type FR340 = DeepReadonly340<DeepRequired340<PartialBig340>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion340 =
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

type ExtractAlpha340 = Extract<BigUnion340, "alpha" | "bravo" | "charlie">;
type ExcludeZulu340 = Exclude<BigUnion340, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA340 { width: number; height: number; depth: number }
interface ShapeB340 { color: string; opacity: number; blend: string }
interface ShapeC340 { x: number; y: number; z: number; w: number }
interface ShapeD340 { label: string; title: string; summary: string }

type Combined340 = ShapeA340 & ShapeB340 & ShapeC340 & ShapeD340;
type OptionalAll340 = { [K in keyof Combined340]?: Combined340[K] };
type RequiredAll340 = { [K in keyof Combined340]-?: Combined340[K] };
type ReadonlyAll340 = { readonly [K in keyof Combined340]: Combined340[K] };
type NullableAll340 = { [K in keyof Combined340]: Combined340[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString340<T> = T extends string ? true : false;
type IsNumber340<T> = T extends number ? true : false;
type TypeName340<T> = T extends string
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

type TypeNames340 = {
  [K in keyof BigRecord340]: TypeName340<BigRecord340[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb340 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource340 = "user" | "post" | "comment" | "tag" | "category";
type Action340 = `${Verb340}_${Resource340}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise340<T> = T extends Promise<infer U> ? UnwrapPromise340<U> : T;
type UnwrapArray340<T> = T extends (infer U)[] ? UnwrapArray340<U> : T;
type Head340<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail340<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation340<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation340<Exclude<T, K>>]
  : never;

type SmallUnion340 = "a" | "b" | "c" | "d";
type AllPerms340 = Permutation340<SmallUnion340>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig340,
  Flat340,
  FR340,
  BigUnion340,
  ExtractAlpha340,
  ExcludeZulu340,
  OptionalAll340,
  RequiredAll340,
  ReadonlyAll340,
  NullableAll340,
  TypeNames340,
  Action340,
  AllPerms340,
};
