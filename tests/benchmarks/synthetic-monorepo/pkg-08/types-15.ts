// pkg-08 / types-15  (seed 815) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord815 {
  a815: { x: number; y: string; z: boolean };
  b815: { p: string[]; q: Record<string, number> };
  c815: { nested: { deep: { deeper: { deepest: string } } } };
  d815: number;
  e815: string;
  f815: boolean;
  g815: null;
  h815: undefined;
  i815: bigint;
  j815: symbol;
}

type PartialBig815 = DeepPartial<BigRecord815>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten815<T> = T extends Array<infer U> ? Flatten815<U> : T;
type Nested815 = number[][][][][][][][][][];
type Flat815 = Flatten815<Nested815>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly815<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly815<T[K]> : T[K];
};
type DeepRequired815<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired815<T[K]> : T[K];
};
type FR815 = DeepReadonly815<DeepRequired815<PartialBig815>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion815 =
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

type ExtractAlpha815 = Extract<BigUnion815, "alpha" | "bravo" | "charlie">;
type ExcludeZulu815 = Exclude<BigUnion815, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA815 { width: number; height: number; depth: number }
interface ShapeB815 { color: string; opacity: number; blend: string }
interface ShapeC815 { x: number; y: number; z: number; w: number }
interface ShapeD815 { label: string; title: string; summary: string }

type Combined815 = ShapeA815 & ShapeB815 & ShapeC815 & ShapeD815;
type OptionalAll815 = { [K in keyof Combined815]?: Combined815[K] };
type RequiredAll815 = { [K in keyof Combined815]-?: Combined815[K] };
type ReadonlyAll815 = { readonly [K in keyof Combined815]: Combined815[K] };
type NullableAll815 = { [K in keyof Combined815]: Combined815[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString815<T> = T extends string ? true : false;
type IsNumber815<T> = T extends number ? true : false;
type TypeName815<T> = T extends string
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

type TypeNames815 = {
  [K in keyof BigRecord815]: TypeName815<BigRecord815[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb815 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource815 = "user" | "post" | "comment" | "tag" | "category";
type Action815 = `${Verb815}_${Resource815}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise815<T> = T extends Promise<infer U> ? UnwrapPromise815<U> : T;
type UnwrapArray815<T> = T extends (infer U)[] ? UnwrapArray815<U> : T;
type Head815<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail815<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation815<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation815<Exclude<T, K>>]
  : never;

type SmallUnion815 = "a" | "b" | "c" | "d";
type AllPerms815 = Permutation815<SmallUnion815>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig815,
  Flat815,
  FR815,
  BigUnion815,
  ExtractAlpha815,
  ExcludeZulu815,
  OptionalAll815,
  RequiredAll815,
  ReadonlyAll815,
  NullableAll815,
  TypeNames815,
  Action815,
  AllPerms815,
};
