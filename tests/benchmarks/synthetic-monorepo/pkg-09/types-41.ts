// pkg-09 / types-41  (seed 941) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord941 {
  a941: { x: number; y: string; z: boolean };
  b941: { p: string[]; q: Record<string, number> };
  c941: { nested: { deep: { deeper: { deepest: string } } } };
  d941: number;
  e941: string;
  f941: boolean;
  g941: null;
  h941: undefined;
  i941: bigint;
  j941: symbol;
}

type PartialBig941 = DeepPartial<BigRecord941>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten941<T> = T extends Array<infer U> ? Flatten941<U> : T;
type Nested941 = number[][][][][][][][][][];
type Flat941 = Flatten941<Nested941>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly941<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly941<T[K]> : T[K];
};
type DeepRequired941<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired941<T[K]> : T[K];
};
type FR941 = DeepReadonly941<DeepRequired941<PartialBig941>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion941 =
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

type ExtractAlpha941 = Extract<BigUnion941, "alpha" | "bravo" | "charlie">;
type ExcludeZulu941 = Exclude<BigUnion941, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA941 { width: number; height: number; depth: number }
interface ShapeB941 { color: string; opacity: number; blend: string }
interface ShapeC941 { x: number; y: number; z: number; w: number }
interface ShapeD941 { label: string; title: string; summary: string }

type Combined941 = ShapeA941 & ShapeB941 & ShapeC941 & ShapeD941;
type OptionalAll941 = { [K in keyof Combined941]?: Combined941[K] };
type RequiredAll941 = { [K in keyof Combined941]-?: Combined941[K] };
type ReadonlyAll941 = { readonly [K in keyof Combined941]: Combined941[K] };
type NullableAll941 = { [K in keyof Combined941]: Combined941[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString941<T> = T extends string ? true : false;
type IsNumber941<T> = T extends number ? true : false;
type TypeName941<T> = T extends string
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

type TypeNames941 = {
  [K in keyof BigRecord941]: TypeName941<BigRecord941[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb941 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource941 = "user" | "post" | "comment" | "tag" | "category";
type Action941 = `${Verb941}_${Resource941}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise941<T> = T extends Promise<infer U> ? UnwrapPromise941<U> : T;
type UnwrapArray941<T> = T extends (infer U)[] ? UnwrapArray941<U> : T;
type Head941<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail941<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation941<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation941<Exclude<T, K>>]
  : never;

type SmallUnion941 = "a" | "b" | "c" | "d";
type AllPerms941 = Permutation941<SmallUnion941>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig941,
  Flat941,
  FR941,
  BigUnion941,
  ExtractAlpha941,
  ExcludeZulu941,
  OptionalAll941,
  RequiredAll941,
  ReadonlyAll941,
  NullableAll941,
  TypeNames941,
  Action941,
  AllPerms941,
};
