// pkg-06 / types-13  (seed 613) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord613 {
  a613: { x: number; y: string; z: boolean };
  b613: { p: string[]; q: Record<string, number> };
  c613: { nested: { deep: { deeper: { deepest: string } } } };
  d613: number;
  e613: string;
  f613: boolean;
  g613: null;
  h613: undefined;
  i613: bigint;
  j613: symbol;
}

type PartialBig613 = DeepPartial<BigRecord613>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten613<T> = T extends Array<infer U> ? Flatten613<U> : T;
type Nested613 = number[][][][][][][][][][];
type Flat613 = Flatten613<Nested613>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly613<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly613<T[K]> : T[K];
};
type DeepRequired613<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired613<T[K]> : T[K];
};
type FR613 = DeepReadonly613<DeepRequired613<PartialBig613>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion613 =
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

type ExtractAlpha613 = Extract<BigUnion613, "alpha" | "bravo" | "charlie">;
type ExcludeZulu613 = Exclude<BigUnion613, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA613 { width: number; height: number; depth: number }
interface ShapeB613 { color: string; opacity: number; blend: string }
interface ShapeC613 { x: number; y: number; z: number; w: number }
interface ShapeD613 { label: string; title: string; summary: string }

type Combined613 = ShapeA613 & ShapeB613 & ShapeC613 & ShapeD613;
type OptionalAll613 = { [K in keyof Combined613]?: Combined613[K] };
type RequiredAll613 = { [K in keyof Combined613]-?: Combined613[K] };
type ReadonlyAll613 = { readonly [K in keyof Combined613]: Combined613[K] };
type NullableAll613 = { [K in keyof Combined613]: Combined613[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString613<T> = T extends string ? true : false;
type IsNumber613<T> = T extends number ? true : false;
type TypeName613<T> = T extends string
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

type TypeNames613 = {
  [K in keyof BigRecord613]: TypeName613<BigRecord613[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb613 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource613 = "user" | "post" | "comment" | "tag" | "category";
type Action613 = `${Verb613}_${Resource613}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise613<T> = T extends Promise<infer U> ? UnwrapPromise613<U> : T;
type UnwrapArray613<T> = T extends (infer U)[] ? UnwrapArray613<U> : T;
type Head613<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail613<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation613<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation613<Exclude<T, K>>]
  : never;

type SmallUnion613 = "a" | "b" | "c" | "d";
type AllPerms613 = Permutation613<SmallUnion613>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig613,
  Flat613,
  FR613,
  BigUnion613,
  ExtractAlpha613,
  ExcludeZulu613,
  OptionalAll613,
  RequiredAll613,
  ReadonlyAll613,
  NullableAll613,
  TypeNames613,
  Action613,
  AllPerms613,
};
