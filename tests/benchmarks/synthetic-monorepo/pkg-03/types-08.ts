// pkg-03 / types-08  (seed 308) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord308 {
  a308: { x: number; y: string; z: boolean };
  b308: { p: string[]; q: Record<string, number> };
  c308: { nested: { deep: { deeper: { deepest: string } } } };
  d308: number;
  e308: string;
  f308: boolean;
  g308: null;
  h308: undefined;
  i308: bigint;
  j308: symbol;
}

type PartialBig308 = DeepPartial<BigRecord308>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten308<T> = T extends Array<infer U> ? Flatten308<U> : T;
type Nested308 = number[][][][][][][][][][];
type Flat308 = Flatten308<Nested308>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly308<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly308<T[K]> : T[K];
};
type DeepRequired308<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired308<T[K]> : T[K];
};
type FR308 = DeepReadonly308<DeepRequired308<PartialBig308>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion308 =
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

type ExtractAlpha308 = Extract<BigUnion308, "alpha" | "bravo" | "charlie">;
type ExcludeZulu308 = Exclude<BigUnion308, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA308 { width: number; height: number; depth: number }
interface ShapeB308 { color: string; opacity: number; blend: string }
interface ShapeC308 { x: number; y: number; z: number; w: number }
interface ShapeD308 { label: string; title: string; summary: string }

type Combined308 = ShapeA308 & ShapeB308 & ShapeC308 & ShapeD308;
type OptionalAll308 = { [K in keyof Combined308]?: Combined308[K] };
type RequiredAll308 = { [K in keyof Combined308]-?: Combined308[K] };
type ReadonlyAll308 = { readonly [K in keyof Combined308]: Combined308[K] };
type NullableAll308 = { [K in keyof Combined308]: Combined308[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString308<T> = T extends string ? true : false;
type IsNumber308<T> = T extends number ? true : false;
type TypeName308<T> = T extends string
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

type TypeNames308 = {
  [K in keyof BigRecord308]: TypeName308<BigRecord308[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb308 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource308 = "user" | "post" | "comment" | "tag" | "category";
type Action308 = `${Verb308}_${Resource308}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise308<T> = T extends Promise<infer U> ? UnwrapPromise308<U> : T;
type UnwrapArray308<T> = T extends (infer U)[] ? UnwrapArray308<U> : T;
type Head308<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail308<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation308<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation308<Exclude<T, K>>]
  : never;

type SmallUnion308 = "a" | "b" | "c" | "d";
type AllPerms308 = Permutation308<SmallUnion308>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig308,
  Flat308,
  FR308,
  BigUnion308,
  ExtractAlpha308,
  ExcludeZulu308,
  OptionalAll308,
  RequiredAll308,
  ReadonlyAll308,
  NullableAll308,
  TypeNames308,
  Action308,
  AllPerms308,
};
