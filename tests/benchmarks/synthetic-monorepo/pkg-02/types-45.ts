// pkg-02 / types-45  (seed 245) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord245 {
  a245: { x: number; y: string; z: boolean };
  b245: { p: string[]; q: Record<string, number> };
  c245: { nested: { deep: { deeper: { deepest: string } } } };
  d245: number;
  e245: string;
  f245: boolean;
  g245: null;
  h245: undefined;
  i245: bigint;
  j245: symbol;
}

type PartialBig245 = DeepPartial<BigRecord245>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten245<T> = T extends Array<infer U> ? Flatten245<U> : T;
type Nested245 = number[][][][][][][][][][];
type Flat245 = Flatten245<Nested245>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly245<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly245<T[K]> : T[K];
};
type DeepRequired245<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired245<T[K]> : T[K];
};
type FR245 = DeepReadonly245<DeepRequired245<PartialBig245>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion245 =
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

type ExtractAlpha245 = Extract<BigUnion245, "alpha" | "bravo" | "charlie">;
type ExcludeZulu245 = Exclude<BigUnion245, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA245 { width: number; height: number; depth: number }
interface ShapeB245 { color: string; opacity: number; blend: string }
interface ShapeC245 { x: number; y: number; z: number; w: number }
interface ShapeD245 { label: string; title: string; summary: string }

type Combined245 = ShapeA245 & ShapeB245 & ShapeC245 & ShapeD245;
type OptionalAll245 = { [K in keyof Combined245]?: Combined245[K] };
type RequiredAll245 = { [K in keyof Combined245]-?: Combined245[K] };
type ReadonlyAll245 = { readonly [K in keyof Combined245]: Combined245[K] };
type NullableAll245 = { [K in keyof Combined245]: Combined245[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString245<T> = T extends string ? true : false;
type IsNumber245<T> = T extends number ? true : false;
type TypeName245<T> = T extends string
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

type TypeNames245 = {
  [K in keyof BigRecord245]: TypeName245<BigRecord245[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb245 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource245 = "user" | "post" | "comment" | "tag" | "category";
type Action245 = `${Verb245}_${Resource245}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise245<T> = T extends Promise<infer U> ? UnwrapPromise245<U> : T;
type UnwrapArray245<T> = T extends (infer U)[] ? UnwrapArray245<U> : T;
type Head245<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail245<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation245<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation245<Exclude<T, K>>]
  : never;

type SmallUnion245 = "a" | "b" | "c" | "d";
type AllPerms245 = Permutation245<SmallUnion245>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig245,
  Flat245,
  FR245,
  BigUnion245,
  ExtractAlpha245,
  ExcludeZulu245,
  OptionalAll245,
  RequiredAll245,
  ReadonlyAll245,
  NullableAll245,
  TypeNames245,
  Action245,
  AllPerms245,
};
