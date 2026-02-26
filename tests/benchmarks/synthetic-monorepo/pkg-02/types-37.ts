// pkg-02 / types-37  (seed 237) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord237 {
  a237: { x: number; y: string; z: boolean };
  b237: { p: string[]; q: Record<string, number> };
  c237: { nested: { deep: { deeper: { deepest: string } } } };
  d237: number;
  e237: string;
  f237: boolean;
  g237: null;
  h237: undefined;
  i237: bigint;
  j237: symbol;
}

type PartialBig237 = DeepPartial<BigRecord237>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten237<T> = T extends Array<infer U> ? Flatten237<U> : T;
type Nested237 = number[][][][][][][][][][];
type Flat237 = Flatten237<Nested237>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly237<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly237<T[K]> : T[K];
};
type DeepRequired237<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired237<T[K]> : T[K];
};
type FR237 = DeepReadonly237<DeepRequired237<PartialBig237>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion237 =
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

type ExtractAlpha237 = Extract<BigUnion237, "alpha" | "bravo" | "charlie">;
type ExcludeZulu237 = Exclude<BigUnion237, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA237 { width: number; height: number; depth: number }
interface ShapeB237 { color: string; opacity: number; blend: string }
interface ShapeC237 { x: number; y: number; z: number; w: number }
interface ShapeD237 { label: string; title: string; summary: string }

type Combined237 = ShapeA237 & ShapeB237 & ShapeC237 & ShapeD237;
type OptionalAll237 = { [K in keyof Combined237]?: Combined237[K] };
type RequiredAll237 = { [K in keyof Combined237]-?: Combined237[K] };
type ReadonlyAll237 = { readonly [K in keyof Combined237]: Combined237[K] };
type NullableAll237 = { [K in keyof Combined237]: Combined237[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString237<T> = T extends string ? true : false;
type IsNumber237<T> = T extends number ? true : false;
type TypeName237<T> = T extends string
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

type TypeNames237 = {
  [K in keyof BigRecord237]: TypeName237<BigRecord237[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb237 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource237 = "user" | "post" | "comment" | "tag" | "category";
type Action237 = `${Verb237}_${Resource237}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise237<T> = T extends Promise<infer U> ? UnwrapPromise237<U> : T;
type UnwrapArray237<T> = T extends (infer U)[] ? UnwrapArray237<U> : T;
type Head237<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail237<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation237<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation237<Exclude<T, K>>]
  : never;

type SmallUnion237 = "a" | "b" | "c" | "d";
type AllPerms237 = Permutation237<SmallUnion237>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig237,
  Flat237,
  FR237,
  BigUnion237,
  ExtractAlpha237,
  ExcludeZulu237,
  OptionalAll237,
  RequiredAll237,
  ReadonlyAll237,
  NullableAll237,
  TypeNames237,
  Action237,
  AllPerms237,
};
