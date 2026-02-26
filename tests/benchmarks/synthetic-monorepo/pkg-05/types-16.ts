// pkg-05 / types-16  (seed 516) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord516 {
  a516: { x: number; y: string; z: boolean };
  b516: { p: string[]; q: Record<string, number> };
  c516: { nested: { deep: { deeper: { deepest: string } } } };
  d516: number;
  e516: string;
  f516: boolean;
  g516: null;
  h516: undefined;
  i516: bigint;
  j516: symbol;
}

type PartialBig516 = DeepPartial<BigRecord516>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten516<T> = T extends Array<infer U> ? Flatten516<U> : T;
type Nested516 = number[][][][][][][][][][];
type Flat516 = Flatten516<Nested516>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly516<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly516<T[K]> : T[K];
};
type DeepRequired516<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired516<T[K]> : T[K];
};
type FR516 = DeepReadonly516<DeepRequired516<PartialBig516>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion516 =
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

type ExtractAlpha516 = Extract<BigUnion516, "alpha" | "bravo" | "charlie">;
type ExcludeZulu516 = Exclude<BigUnion516, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA516 { width: number; height: number; depth: number }
interface ShapeB516 { color: string; opacity: number; blend: string }
interface ShapeC516 { x: number; y: number; z: number; w: number }
interface ShapeD516 { label: string; title: string; summary: string }

type Combined516 = ShapeA516 & ShapeB516 & ShapeC516 & ShapeD516;
type OptionalAll516 = { [K in keyof Combined516]?: Combined516[K] };
type RequiredAll516 = { [K in keyof Combined516]-?: Combined516[K] };
type ReadonlyAll516 = { readonly [K in keyof Combined516]: Combined516[K] };
type NullableAll516 = { [K in keyof Combined516]: Combined516[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString516<T> = T extends string ? true : false;
type IsNumber516<T> = T extends number ? true : false;
type TypeName516<T> = T extends string
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

type TypeNames516 = {
  [K in keyof BigRecord516]: TypeName516<BigRecord516[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb516 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource516 = "user" | "post" | "comment" | "tag" | "category";
type Action516 = `${Verb516}_${Resource516}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise516<T> = T extends Promise<infer U> ? UnwrapPromise516<U> : T;
type UnwrapArray516<T> = T extends (infer U)[] ? UnwrapArray516<U> : T;
type Head516<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail516<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation516<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation516<Exclude<T, K>>]
  : never;

type SmallUnion516 = "a" | "b" | "c" | "d";
type AllPerms516 = Permutation516<SmallUnion516>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig516,
  Flat516,
  FR516,
  BigUnion516,
  ExtractAlpha516,
  ExcludeZulu516,
  OptionalAll516,
  RequiredAll516,
  ReadonlyAll516,
  NullableAll516,
  TypeNames516,
  Action516,
  AllPerms516,
};
