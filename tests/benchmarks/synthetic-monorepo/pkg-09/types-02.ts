// pkg-09 / types-02  (seed 902) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord902 {
  a902: { x: number; y: string; z: boolean };
  b902: { p: string[]; q: Record<string, number> };
  c902: { nested: { deep: { deeper: { deepest: string } } } };
  d902: number;
  e902: string;
  f902: boolean;
  g902: null;
  h902: undefined;
  i902: bigint;
  j902: symbol;
}

type PartialBig902 = DeepPartial<BigRecord902>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten902<T> = T extends Array<infer U> ? Flatten902<U> : T;
type Nested902 = number[][][][][][][][][][];
type Flat902 = Flatten902<Nested902>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly902<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly902<T[K]> : T[K];
};
type DeepRequired902<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired902<T[K]> : T[K];
};
type FR902 = DeepReadonly902<DeepRequired902<PartialBig902>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion902 =
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

type ExtractAlpha902 = Extract<BigUnion902, "alpha" | "bravo" | "charlie">;
type ExcludeZulu902 = Exclude<BigUnion902, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA902 { width: number; height: number; depth: number }
interface ShapeB902 { color: string; opacity: number; blend: string }
interface ShapeC902 { x: number; y: number; z: number; w: number }
interface ShapeD902 { label: string; title: string; summary: string }

type Combined902 = ShapeA902 & ShapeB902 & ShapeC902 & ShapeD902;
type OptionalAll902 = { [K in keyof Combined902]?: Combined902[K] };
type RequiredAll902 = { [K in keyof Combined902]-?: Combined902[K] };
type ReadonlyAll902 = { readonly [K in keyof Combined902]: Combined902[K] };
type NullableAll902 = { [K in keyof Combined902]: Combined902[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString902<T> = T extends string ? true : false;
type IsNumber902<T> = T extends number ? true : false;
type TypeName902<T> = T extends string
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

type TypeNames902 = {
  [K in keyof BigRecord902]: TypeName902<BigRecord902[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb902 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource902 = "user" | "post" | "comment" | "tag" | "category";
type Action902 = `${Verb902}_${Resource902}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise902<T> = T extends Promise<infer U> ? UnwrapPromise902<U> : T;
type UnwrapArray902<T> = T extends (infer U)[] ? UnwrapArray902<U> : T;
type Head902<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail902<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation902<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation902<Exclude<T, K>>]
  : never;

type SmallUnion902 = "a" | "b" | "c" | "d";
type AllPerms902 = Permutation902<SmallUnion902>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig902,
  Flat902,
  FR902,
  BigUnion902,
  ExtractAlpha902,
  ExcludeZulu902,
  OptionalAll902,
  RequiredAll902,
  ReadonlyAll902,
  NullableAll902,
  TypeNames902,
  Action902,
  AllPerms902,
};
