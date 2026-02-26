// pkg-03 / types-02  (seed 302) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord302 {
  a302: { x: number; y: string; z: boolean };
  b302: { p: string[]; q: Record<string, number> };
  c302: { nested: { deep: { deeper: { deepest: string } } } };
  d302: number;
  e302: string;
  f302: boolean;
  g302: null;
  h302: undefined;
  i302: bigint;
  j302: symbol;
}

type PartialBig302 = DeepPartial<BigRecord302>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten302<T> = T extends Array<infer U> ? Flatten302<U> : T;
type Nested302 = number[][][][][][][][][][];
type Flat302 = Flatten302<Nested302>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly302<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly302<T[K]> : T[K];
};
type DeepRequired302<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired302<T[K]> : T[K];
};
type FR302 = DeepReadonly302<DeepRequired302<PartialBig302>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion302 =
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

type ExtractAlpha302 = Extract<BigUnion302, "alpha" | "bravo" | "charlie">;
type ExcludeZulu302 = Exclude<BigUnion302, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA302 { width: number; height: number; depth: number }
interface ShapeB302 { color: string; opacity: number; blend: string }
interface ShapeC302 { x: number; y: number; z: number; w: number }
interface ShapeD302 { label: string; title: string; summary: string }

type Combined302 = ShapeA302 & ShapeB302 & ShapeC302 & ShapeD302;
type OptionalAll302 = { [K in keyof Combined302]?: Combined302[K] };
type RequiredAll302 = { [K in keyof Combined302]-?: Combined302[K] };
type ReadonlyAll302 = { readonly [K in keyof Combined302]: Combined302[K] };
type NullableAll302 = { [K in keyof Combined302]: Combined302[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString302<T> = T extends string ? true : false;
type IsNumber302<T> = T extends number ? true : false;
type TypeName302<T> = T extends string
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

type TypeNames302 = {
  [K in keyof BigRecord302]: TypeName302<BigRecord302[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb302 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource302 = "user" | "post" | "comment" | "tag" | "category";
type Action302 = `${Verb302}_${Resource302}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise302<T> = T extends Promise<infer U> ? UnwrapPromise302<U> : T;
type UnwrapArray302<T> = T extends (infer U)[] ? UnwrapArray302<U> : T;
type Head302<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail302<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation302<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation302<Exclude<T, K>>]
  : never;

type SmallUnion302 = "a" | "b" | "c" | "d";
type AllPerms302 = Permutation302<SmallUnion302>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig302,
  Flat302,
  FR302,
  BigUnion302,
  ExtractAlpha302,
  ExcludeZulu302,
  OptionalAll302,
  RequiredAll302,
  ReadonlyAll302,
  NullableAll302,
  TypeNames302,
  Action302,
  AllPerms302,
};
