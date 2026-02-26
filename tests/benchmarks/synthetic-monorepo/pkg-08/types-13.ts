// pkg-08 / types-13  (seed 813) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord813 {
  a813: { x: number; y: string; z: boolean };
  b813: { p: string[]; q: Record<string, number> };
  c813: { nested: { deep: { deeper: { deepest: string } } } };
  d813: number;
  e813: string;
  f813: boolean;
  g813: null;
  h813: undefined;
  i813: bigint;
  j813: symbol;
}

type PartialBig813 = DeepPartial<BigRecord813>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten813<T> = T extends Array<infer U> ? Flatten813<U> : T;
type Nested813 = number[][][][][][][][][][];
type Flat813 = Flatten813<Nested813>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly813<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly813<T[K]> : T[K];
};
type DeepRequired813<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired813<T[K]> : T[K];
};
type FR813 = DeepReadonly813<DeepRequired813<PartialBig813>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion813 =
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

type ExtractAlpha813 = Extract<BigUnion813, "alpha" | "bravo" | "charlie">;
type ExcludeZulu813 = Exclude<BigUnion813, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA813 { width: number; height: number; depth: number }
interface ShapeB813 { color: string; opacity: number; blend: string }
interface ShapeC813 { x: number; y: number; z: number; w: number }
interface ShapeD813 { label: string; title: string; summary: string }

type Combined813 = ShapeA813 & ShapeB813 & ShapeC813 & ShapeD813;
type OptionalAll813 = { [K in keyof Combined813]?: Combined813[K] };
type RequiredAll813 = { [K in keyof Combined813]-?: Combined813[K] };
type ReadonlyAll813 = { readonly [K in keyof Combined813]: Combined813[K] };
type NullableAll813 = { [K in keyof Combined813]: Combined813[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString813<T> = T extends string ? true : false;
type IsNumber813<T> = T extends number ? true : false;
type TypeName813<T> = T extends string
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

type TypeNames813 = {
  [K in keyof BigRecord813]: TypeName813<BigRecord813[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb813 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource813 = "user" | "post" | "comment" | "tag" | "category";
type Action813 = `${Verb813}_${Resource813}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise813<T> = T extends Promise<infer U> ? UnwrapPromise813<U> : T;
type UnwrapArray813<T> = T extends (infer U)[] ? UnwrapArray813<U> : T;
type Head813<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail813<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation813<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation813<Exclude<T, K>>]
  : never;

type SmallUnion813 = "a" | "b" | "c" | "d";
type AllPerms813 = Permutation813<SmallUnion813>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig813,
  Flat813,
  FR813,
  BigUnion813,
  ExtractAlpha813,
  ExcludeZulu813,
  OptionalAll813,
  RequiredAll813,
  ReadonlyAll813,
  NullableAll813,
  TypeNames813,
  Action813,
  AllPerms813,
};
