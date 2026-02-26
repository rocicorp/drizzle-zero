// pkg-06 / types-32  (seed 632) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord632 {
  a632: { x: number; y: string; z: boolean };
  b632: { p: string[]; q: Record<string, number> };
  c632: { nested: { deep: { deeper: { deepest: string } } } };
  d632: number;
  e632: string;
  f632: boolean;
  g632: null;
  h632: undefined;
  i632: bigint;
  j632: symbol;
}

type PartialBig632 = DeepPartial<BigRecord632>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten632<T> = T extends Array<infer U> ? Flatten632<U> : T;
type Nested632 = number[][][][][][][][][][];
type Flat632 = Flatten632<Nested632>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly632<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly632<T[K]> : T[K];
};
type DeepRequired632<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired632<T[K]> : T[K];
};
type FR632 = DeepReadonly632<DeepRequired632<PartialBig632>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion632 =
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

type ExtractAlpha632 = Extract<BigUnion632, "alpha" | "bravo" | "charlie">;
type ExcludeZulu632 = Exclude<BigUnion632, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA632 { width: number; height: number; depth: number }
interface ShapeB632 { color: string; opacity: number; blend: string }
interface ShapeC632 { x: number; y: number; z: number; w: number }
interface ShapeD632 { label: string; title: string; summary: string }

type Combined632 = ShapeA632 & ShapeB632 & ShapeC632 & ShapeD632;
type OptionalAll632 = { [K in keyof Combined632]?: Combined632[K] };
type RequiredAll632 = { [K in keyof Combined632]-?: Combined632[K] };
type ReadonlyAll632 = { readonly [K in keyof Combined632]: Combined632[K] };
type NullableAll632 = { [K in keyof Combined632]: Combined632[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString632<T> = T extends string ? true : false;
type IsNumber632<T> = T extends number ? true : false;
type TypeName632<T> = T extends string
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

type TypeNames632 = {
  [K in keyof BigRecord632]: TypeName632<BigRecord632[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb632 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource632 = "user" | "post" | "comment" | "tag" | "category";
type Action632 = `${Verb632}_${Resource632}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise632<T> = T extends Promise<infer U> ? UnwrapPromise632<U> : T;
type UnwrapArray632<T> = T extends (infer U)[] ? UnwrapArray632<U> : T;
type Head632<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail632<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation632<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation632<Exclude<T, K>>]
  : never;

type SmallUnion632 = "a" | "b" | "c" | "d";
type AllPerms632 = Permutation632<SmallUnion632>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig632,
  Flat632,
  FR632,
  BigUnion632,
  ExtractAlpha632,
  ExcludeZulu632,
  OptionalAll632,
  RequiredAll632,
  ReadonlyAll632,
  NullableAll632,
  TypeNames632,
  Action632,
  AllPerms632,
};
