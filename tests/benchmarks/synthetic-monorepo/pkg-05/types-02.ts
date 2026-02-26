// pkg-05 / types-02  (seed 502) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord502 {
  a502: { x: number; y: string; z: boolean };
  b502: { p: string[]; q: Record<string, number> };
  c502: { nested: { deep: { deeper: { deepest: string } } } };
  d502: number;
  e502: string;
  f502: boolean;
  g502: null;
  h502: undefined;
  i502: bigint;
  j502: symbol;
}

type PartialBig502 = DeepPartial<BigRecord502>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten502<T> = T extends Array<infer U> ? Flatten502<U> : T;
type Nested502 = number[][][][][][][][][][];
type Flat502 = Flatten502<Nested502>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly502<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly502<T[K]> : T[K];
};
type DeepRequired502<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired502<T[K]> : T[K];
};
type FR502 = DeepReadonly502<DeepRequired502<PartialBig502>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion502 =
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

type ExtractAlpha502 = Extract<BigUnion502, "alpha" | "bravo" | "charlie">;
type ExcludeZulu502 = Exclude<BigUnion502, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA502 { width: number; height: number; depth: number }
interface ShapeB502 { color: string; opacity: number; blend: string }
interface ShapeC502 { x: number; y: number; z: number; w: number }
interface ShapeD502 { label: string; title: string; summary: string }

type Combined502 = ShapeA502 & ShapeB502 & ShapeC502 & ShapeD502;
type OptionalAll502 = { [K in keyof Combined502]?: Combined502[K] };
type RequiredAll502 = { [K in keyof Combined502]-?: Combined502[K] };
type ReadonlyAll502 = { readonly [K in keyof Combined502]: Combined502[K] };
type NullableAll502 = { [K in keyof Combined502]: Combined502[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString502<T> = T extends string ? true : false;
type IsNumber502<T> = T extends number ? true : false;
type TypeName502<T> = T extends string
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

type TypeNames502 = {
  [K in keyof BigRecord502]: TypeName502<BigRecord502[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb502 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource502 = "user" | "post" | "comment" | "tag" | "category";
type Action502 = `${Verb502}_${Resource502}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise502<T> = T extends Promise<infer U> ? UnwrapPromise502<U> : T;
type UnwrapArray502<T> = T extends (infer U)[] ? UnwrapArray502<U> : T;
type Head502<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail502<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation502<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation502<Exclude<T, K>>]
  : never;

type SmallUnion502 = "a" | "b" | "c" | "d";
type AllPerms502 = Permutation502<SmallUnion502>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig502,
  Flat502,
  FR502,
  BigUnion502,
  ExtractAlpha502,
  ExcludeZulu502,
  OptionalAll502,
  RequiredAll502,
  ReadonlyAll502,
  NullableAll502,
  TypeNames502,
  Action502,
  AllPerms502,
};
