// pkg-01 / types-01  (seed 101) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord101 {
  a101: { x: number; y: string; z: boolean };
  b101: { p: string[]; q: Record<string, number> };
  c101: { nested: { deep: { deeper: { deepest: string } } } };
  d101: number;
  e101: string;
  f101: boolean;
  g101: null;
  h101: undefined;
  i101: bigint;
  j101: symbol;
}

type PartialBig101 = DeepPartial<BigRecord101>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten101<T> = T extends Array<infer U> ? Flatten101<U> : T;
type Nested101 = number[][][][][][][][][][];
type Flat101 = Flatten101<Nested101>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly101<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly101<T[K]> : T[K];
};
type DeepRequired101<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired101<T[K]> : T[K];
};
type FR101 = DeepReadonly101<DeepRequired101<PartialBig101>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion101 =
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

type ExtractAlpha101 = Extract<BigUnion101, "alpha" | "bravo" | "charlie">;
type ExcludeZulu101 = Exclude<BigUnion101, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA101 { width: number; height: number; depth: number }
interface ShapeB101 { color: string; opacity: number; blend: string }
interface ShapeC101 { x: number; y: number; z: number; w: number }
interface ShapeD101 { label: string; title: string; summary: string }

type Combined101 = ShapeA101 & ShapeB101 & ShapeC101 & ShapeD101;
type OptionalAll101 = { [K in keyof Combined101]?: Combined101[K] };
type RequiredAll101 = { [K in keyof Combined101]-?: Combined101[K] };
type ReadonlyAll101 = { readonly [K in keyof Combined101]: Combined101[K] };
type NullableAll101 = { [K in keyof Combined101]: Combined101[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString101<T> = T extends string ? true : false;
type IsNumber101<T> = T extends number ? true : false;
type TypeName101<T> = T extends string
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

type TypeNames101 = {
  [K in keyof BigRecord101]: TypeName101<BigRecord101[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb101 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource101 = "user" | "post" | "comment" | "tag" | "category";
type Action101 = `${Verb101}_${Resource101}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise101<T> = T extends Promise<infer U> ? UnwrapPromise101<U> : T;
type UnwrapArray101<T> = T extends (infer U)[] ? UnwrapArray101<U> : T;
type Head101<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail101<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation101<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation101<Exclude<T, K>>]
  : never;

type SmallUnion101 = "a" | "b" | "c" | "d";
type AllPerms101 = Permutation101<SmallUnion101>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig101,
  Flat101,
  FR101,
  BigUnion101,
  ExtractAlpha101,
  ExcludeZulu101,
  OptionalAll101,
  RequiredAll101,
  ReadonlyAll101,
  NullableAll101,
  TypeNames101,
  Action101,
  AllPerms101,
};
