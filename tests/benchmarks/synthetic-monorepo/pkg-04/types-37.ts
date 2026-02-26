// pkg-04 / types-37  (seed 437) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord437 {
  a437: { x: number; y: string; z: boolean };
  b437: { p: string[]; q: Record<string, number> };
  c437: { nested: { deep: { deeper: { deepest: string } } } };
  d437: number;
  e437: string;
  f437: boolean;
  g437: null;
  h437: undefined;
  i437: bigint;
  j437: symbol;
}

type PartialBig437 = DeepPartial<BigRecord437>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten437<T> = T extends Array<infer U> ? Flatten437<U> : T;
type Nested437 = number[][][][][][][][][][];
type Flat437 = Flatten437<Nested437>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly437<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly437<T[K]> : T[K];
};
type DeepRequired437<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired437<T[K]> : T[K];
};
type FR437 = DeepReadonly437<DeepRequired437<PartialBig437>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion437 =
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

type ExtractAlpha437 = Extract<BigUnion437, "alpha" | "bravo" | "charlie">;
type ExcludeZulu437 = Exclude<BigUnion437, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA437 { width: number; height: number; depth: number }
interface ShapeB437 { color: string; opacity: number; blend: string }
interface ShapeC437 { x: number; y: number; z: number; w: number }
interface ShapeD437 { label: string; title: string; summary: string }

type Combined437 = ShapeA437 & ShapeB437 & ShapeC437 & ShapeD437;
type OptionalAll437 = { [K in keyof Combined437]?: Combined437[K] };
type RequiredAll437 = { [K in keyof Combined437]-?: Combined437[K] };
type ReadonlyAll437 = { readonly [K in keyof Combined437]: Combined437[K] };
type NullableAll437 = { [K in keyof Combined437]: Combined437[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString437<T> = T extends string ? true : false;
type IsNumber437<T> = T extends number ? true : false;
type TypeName437<T> = T extends string
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

type TypeNames437 = {
  [K in keyof BigRecord437]: TypeName437<BigRecord437[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb437 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource437 = "user" | "post" | "comment" | "tag" | "category";
type Action437 = `${Verb437}_${Resource437}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise437<T> = T extends Promise<infer U> ? UnwrapPromise437<U> : T;
type UnwrapArray437<T> = T extends (infer U)[] ? UnwrapArray437<U> : T;
type Head437<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail437<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation437<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation437<Exclude<T, K>>]
  : never;

type SmallUnion437 = "a" | "b" | "c" | "d";
type AllPerms437 = Permutation437<SmallUnion437>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig437,
  Flat437,
  FR437,
  BigUnion437,
  ExtractAlpha437,
  ExcludeZulu437,
  OptionalAll437,
  RequiredAll437,
  ReadonlyAll437,
  NullableAll437,
  TypeNames437,
  Action437,
  AllPerms437,
};
