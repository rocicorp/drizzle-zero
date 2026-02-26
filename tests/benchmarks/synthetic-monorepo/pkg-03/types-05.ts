// pkg-03 / types-05  (seed 305) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord305 {
  a305: { x: number; y: string; z: boolean };
  b305: { p: string[]; q: Record<string, number> };
  c305: { nested: { deep: { deeper: { deepest: string } } } };
  d305: number;
  e305: string;
  f305: boolean;
  g305: null;
  h305: undefined;
  i305: bigint;
  j305: symbol;
}

type PartialBig305 = DeepPartial<BigRecord305>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten305<T> = T extends Array<infer U> ? Flatten305<U> : T;
type Nested305 = number[][][][][][][][][][];
type Flat305 = Flatten305<Nested305>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly305<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly305<T[K]> : T[K];
};
type DeepRequired305<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired305<T[K]> : T[K];
};
type FR305 = DeepReadonly305<DeepRequired305<PartialBig305>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion305 =
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

type ExtractAlpha305 = Extract<BigUnion305, "alpha" | "bravo" | "charlie">;
type ExcludeZulu305 = Exclude<BigUnion305, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA305 { width: number; height: number; depth: number }
interface ShapeB305 { color: string; opacity: number; blend: string }
interface ShapeC305 { x: number; y: number; z: number; w: number }
interface ShapeD305 { label: string; title: string; summary: string }

type Combined305 = ShapeA305 & ShapeB305 & ShapeC305 & ShapeD305;
type OptionalAll305 = { [K in keyof Combined305]?: Combined305[K] };
type RequiredAll305 = { [K in keyof Combined305]-?: Combined305[K] };
type ReadonlyAll305 = { readonly [K in keyof Combined305]: Combined305[K] };
type NullableAll305 = { [K in keyof Combined305]: Combined305[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString305<T> = T extends string ? true : false;
type IsNumber305<T> = T extends number ? true : false;
type TypeName305<T> = T extends string
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

type TypeNames305 = {
  [K in keyof BigRecord305]: TypeName305<BigRecord305[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb305 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource305 = "user" | "post" | "comment" | "tag" | "category";
type Action305 = `${Verb305}_${Resource305}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise305<T> = T extends Promise<infer U> ? UnwrapPromise305<U> : T;
type UnwrapArray305<T> = T extends (infer U)[] ? UnwrapArray305<U> : T;
type Head305<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail305<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation305<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation305<Exclude<T, K>>]
  : never;

type SmallUnion305 = "a" | "b" | "c" | "d";
type AllPerms305 = Permutation305<SmallUnion305>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig305,
  Flat305,
  FR305,
  BigUnion305,
  ExtractAlpha305,
  ExcludeZulu305,
  OptionalAll305,
  RequiredAll305,
  ReadonlyAll305,
  NullableAll305,
  TypeNames305,
  Action305,
  AllPerms305,
};
