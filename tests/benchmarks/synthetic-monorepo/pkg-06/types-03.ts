// pkg-06 / types-03  (seed 603) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord603 {
  a603: { x: number; y: string; z: boolean };
  b603: { p: string[]; q: Record<string, number> };
  c603: { nested: { deep: { deeper: { deepest: string } } } };
  d603: number;
  e603: string;
  f603: boolean;
  g603: null;
  h603: undefined;
  i603: bigint;
  j603: symbol;
}

type PartialBig603 = DeepPartial<BigRecord603>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten603<T> = T extends Array<infer U> ? Flatten603<U> : T;
type Nested603 = number[][][][][][][][][][];
type Flat603 = Flatten603<Nested603>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly603<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly603<T[K]> : T[K];
};
type DeepRequired603<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired603<T[K]> : T[K];
};
type FR603 = DeepReadonly603<DeepRequired603<PartialBig603>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion603 =
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

type ExtractAlpha603 = Extract<BigUnion603, "alpha" | "bravo" | "charlie">;
type ExcludeZulu603 = Exclude<BigUnion603, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA603 { width: number; height: number; depth: number }
interface ShapeB603 { color: string; opacity: number; blend: string }
interface ShapeC603 { x: number; y: number; z: number; w: number }
interface ShapeD603 { label: string; title: string; summary: string }

type Combined603 = ShapeA603 & ShapeB603 & ShapeC603 & ShapeD603;
type OptionalAll603 = { [K in keyof Combined603]?: Combined603[K] };
type RequiredAll603 = { [K in keyof Combined603]-?: Combined603[K] };
type ReadonlyAll603 = { readonly [K in keyof Combined603]: Combined603[K] };
type NullableAll603 = { [K in keyof Combined603]: Combined603[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString603<T> = T extends string ? true : false;
type IsNumber603<T> = T extends number ? true : false;
type TypeName603<T> = T extends string
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

type TypeNames603 = {
  [K in keyof BigRecord603]: TypeName603<BigRecord603[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb603 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource603 = "user" | "post" | "comment" | "tag" | "category";
type Action603 = `${Verb603}_${Resource603}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise603<T> = T extends Promise<infer U> ? UnwrapPromise603<U> : T;
type UnwrapArray603<T> = T extends (infer U)[] ? UnwrapArray603<U> : T;
type Head603<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail603<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation603<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation603<Exclude<T, K>>]
  : never;

type SmallUnion603 = "a" | "b" | "c" | "d";
type AllPerms603 = Permutation603<SmallUnion603>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig603,
  Flat603,
  FR603,
  BigUnion603,
  ExtractAlpha603,
  ExcludeZulu603,
  OptionalAll603,
  RequiredAll603,
  ReadonlyAll603,
  NullableAll603,
  TypeNames603,
  Action603,
  AllPerms603,
};
