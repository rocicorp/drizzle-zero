// pkg-09 / types-16  (seed 916) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord916 {
  a916: { x: number; y: string; z: boolean };
  b916: { p: string[]; q: Record<string, number> };
  c916: { nested: { deep: { deeper: { deepest: string } } } };
  d916: number;
  e916: string;
  f916: boolean;
  g916: null;
  h916: undefined;
  i916: bigint;
  j916: symbol;
}

type PartialBig916 = DeepPartial<BigRecord916>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten916<T> = T extends Array<infer U> ? Flatten916<U> : T;
type Nested916 = number[][][][][][][][][][];
type Flat916 = Flatten916<Nested916>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly916<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly916<T[K]> : T[K];
};
type DeepRequired916<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired916<T[K]> : T[K];
};
type FR916 = DeepReadonly916<DeepRequired916<PartialBig916>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion916 =
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

type ExtractAlpha916 = Extract<BigUnion916, "alpha" | "bravo" | "charlie">;
type ExcludeZulu916 = Exclude<BigUnion916, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA916 { width: number; height: number; depth: number }
interface ShapeB916 { color: string; opacity: number; blend: string }
interface ShapeC916 { x: number; y: number; z: number; w: number }
interface ShapeD916 { label: string; title: string; summary: string }

type Combined916 = ShapeA916 & ShapeB916 & ShapeC916 & ShapeD916;
type OptionalAll916 = { [K in keyof Combined916]?: Combined916[K] };
type RequiredAll916 = { [K in keyof Combined916]-?: Combined916[K] };
type ReadonlyAll916 = { readonly [K in keyof Combined916]: Combined916[K] };
type NullableAll916 = { [K in keyof Combined916]: Combined916[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString916<T> = T extends string ? true : false;
type IsNumber916<T> = T extends number ? true : false;
type TypeName916<T> = T extends string
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

type TypeNames916 = {
  [K in keyof BigRecord916]: TypeName916<BigRecord916[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb916 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource916 = "user" | "post" | "comment" | "tag" | "category";
type Action916 = `${Verb916}_${Resource916}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise916<T> = T extends Promise<infer U> ? UnwrapPromise916<U> : T;
type UnwrapArray916<T> = T extends (infer U)[] ? UnwrapArray916<U> : T;
type Head916<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail916<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation916<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation916<Exclude<T, K>>]
  : never;

type SmallUnion916 = "a" | "b" | "c" | "d";
type AllPerms916 = Permutation916<SmallUnion916>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig916,
  Flat916,
  FR916,
  BigUnion916,
  ExtractAlpha916,
  ExcludeZulu916,
  OptionalAll916,
  RequiredAll916,
  ReadonlyAll916,
  NullableAll916,
  TypeNames916,
  Action916,
  AllPerms916,
};
