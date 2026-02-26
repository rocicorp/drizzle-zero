// pkg-06 / types-04  (seed 604) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord604 {
  a604: { x: number; y: string; z: boolean };
  b604: { p: string[]; q: Record<string, number> };
  c604: { nested: { deep: { deeper: { deepest: string } } } };
  d604: number;
  e604: string;
  f604: boolean;
  g604: null;
  h604: undefined;
  i604: bigint;
  j604: symbol;
}

type PartialBig604 = DeepPartial<BigRecord604>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten604<T> = T extends Array<infer U> ? Flatten604<U> : T;
type Nested604 = number[][][][][][][][][][];
type Flat604 = Flatten604<Nested604>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly604<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly604<T[K]> : T[K];
};
type DeepRequired604<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired604<T[K]> : T[K];
};
type FR604 = DeepReadonly604<DeepRequired604<PartialBig604>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion604 =
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

type ExtractAlpha604 = Extract<BigUnion604, "alpha" | "bravo" | "charlie">;
type ExcludeZulu604 = Exclude<BigUnion604, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA604 { width: number; height: number; depth: number }
interface ShapeB604 { color: string; opacity: number; blend: string }
interface ShapeC604 { x: number; y: number; z: number; w: number }
interface ShapeD604 { label: string; title: string; summary: string }

type Combined604 = ShapeA604 & ShapeB604 & ShapeC604 & ShapeD604;
type OptionalAll604 = { [K in keyof Combined604]?: Combined604[K] };
type RequiredAll604 = { [K in keyof Combined604]-?: Combined604[K] };
type ReadonlyAll604 = { readonly [K in keyof Combined604]: Combined604[K] };
type NullableAll604 = { [K in keyof Combined604]: Combined604[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString604<T> = T extends string ? true : false;
type IsNumber604<T> = T extends number ? true : false;
type TypeName604<T> = T extends string
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

type TypeNames604 = {
  [K in keyof BigRecord604]: TypeName604<BigRecord604[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb604 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource604 = "user" | "post" | "comment" | "tag" | "category";
type Action604 = `${Verb604}_${Resource604}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise604<T> = T extends Promise<infer U> ? UnwrapPromise604<U> : T;
type UnwrapArray604<T> = T extends (infer U)[] ? UnwrapArray604<U> : T;
type Head604<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail604<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation604<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation604<Exclude<T, K>>]
  : never;

type SmallUnion604 = "a" | "b" | "c" | "d";
type AllPerms604 = Permutation604<SmallUnion604>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig604,
  Flat604,
  FR604,
  BigUnion604,
  ExtractAlpha604,
  ExcludeZulu604,
  OptionalAll604,
  RequiredAll604,
  ReadonlyAll604,
  NullableAll604,
  TypeNames604,
  Action604,
  AllPerms604,
};
