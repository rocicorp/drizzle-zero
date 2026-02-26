// pkg-02 / types-02  (seed 202) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord202 {
  a202: { x: number; y: string; z: boolean };
  b202: { p: string[]; q: Record<string, number> };
  c202: { nested: { deep: { deeper: { deepest: string } } } };
  d202: number;
  e202: string;
  f202: boolean;
  g202: null;
  h202: undefined;
  i202: bigint;
  j202: symbol;
}

type PartialBig202 = DeepPartial<BigRecord202>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten202<T> = T extends Array<infer U> ? Flatten202<U> : T;
type Nested202 = number[][][][][][][][][][];
type Flat202 = Flatten202<Nested202>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly202<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly202<T[K]> : T[K];
};
type DeepRequired202<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired202<T[K]> : T[K];
};
type FR202 = DeepReadonly202<DeepRequired202<PartialBig202>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion202 =
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

type ExtractAlpha202 = Extract<BigUnion202, "alpha" | "bravo" | "charlie">;
type ExcludeZulu202 = Exclude<BigUnion202, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA202 { width: number; height: number; depth: number }
interface ShapeB202 { color: string; opacity: number; blend: string }
interface ShapeC202 { x: number; y: number; z: number; w: number }
interface ShapeD202 { label: string; title: string; summary: string }

type Combined202 = ShapeA202 & ShapeB202 & ShapeC202 & ShapeD202;
type OptionalAll202 = { [K in keyof Combined202]?: Combined202[K] };
type RequiredAll202 = { [K in keyof Combined202]-?: Combined202[K] };
type ReadonlyAll202 = { readonly [K in keyof Combined202]: Combined202[K] };
type NullableAll202 = { [K in keyof Combined202]: Combined202[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString202<T> = T extends string ? true : false;
type IsNumber202<T> = T extends number ? true : false;
type TypeName202<T> = T extends string
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

type TypeNames202 = {
  [K in keyof BigRecord202]: TypeName202<BigRecord202[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb202 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource202 = "user" | "post" | "comment" | "tag" | "category";
type Action202 = `${Verb202}_${Resource202}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise202<T> = T extends Promise<infer U> ? UnwrapPromise202<U> : T;
type UnwrapArray202<T> = T extends (infer U)[] ? UnwrapArray202<U> : T;
type Head202<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail202<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation202<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation202<Exclude<T, K>>]
  : never;

type SmallUnion202 = "a" | "b" | "c" | "d";
type AllPerms202 = Permutation202<SmallUnion202>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig202,
  Flat202,
  FR202,
  BigUnion202,
  ExtractAlpha202,
  ExcludeZulu202,
  OptionalAll202,
  RequiredAll202,
  ReadonlyAll202,
  NullableAll202,
  TypeNames202,
  Action202,
  AllPerms202,
};
