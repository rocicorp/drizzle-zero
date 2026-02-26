// pkg-03 / types-28  (seed 328) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord328 {
  a328: { x: number; y: string; z: boolean };
  b328: { p: string[]; q: Record<string, number> };
  c328: { nested: { deep: { deeper: { deepest: string } } } };
  d328: number;
  e328: string;
  f328: boolean;
  g328: null;
  h328: undefined;
  i328: bigint;
  j328: symbol;
}

type PartialBig328 = DeepPartial<BigRecord328>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten328<T> = T extends Array<infer U> ? Flatten328<U> : T;
type Nested328 = number[][][][][][][][][][];
type Flat328 = Flatten328<Nested328>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly328<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly328<T[K]> : T[K];
};
type DeepRequired328<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired328<T[K]> : T[K];
};
type FR328 = DeepReadonly328<DeepRequired328<PartialBig328>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion328 =
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

type ExtractAlpha328 = Extract<BigUnion328, "alpha" | "bravo" | "charlie">;
type ExcludeZulu328 = Exclude<BigUnion328, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA328 { width: number; height: number; depth: number }
interface ShapeB328 { color: string; opacity: number; blend: string }
interface ShapeC328 { x: number; y: number; z: number; w: number }
interface ShapeD328 { label: string; title: string; summary: string }

type Combined328 = ShapeA328 & ShapeB328 & ShapeC328 & ShapeD328;
type OptionalAll328 = { [K in keyof Combined328]?: Combined328[K] };
type RequiredAll328 = { [K in keyof Combined328]-?: Combined328[K] };
type ReadonlyAll328 = { readonly [K in keyof Combined328]: Combined328[K] };
type NullableAll328 = { [K in keyof Combined328]: Combined328[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString328<T> = T extends string ? true : false;
type IsNumber328<T> = T extends number ? true : false;
type TypeName328<T> = T extends string
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

type TypeNames328 = {
  [K in keyof BigRecord328]: TypeName328<BigRecord328[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb328 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource328 = "user" | "post" | "comment" | "tag" | "category";
type Action328 = `${Verb328}_${Resource328}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise328<T> = T extends Promise<infer U> ? UnwrapPromise328<U> : T;
type UnwrapArray328<T> = T extends (infer U)[] ? UnwrapArray328<U> : T;
type Head328<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail328<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation328<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation328<Exclude<T, K>>]
  : never;

type SmallUnion328 = "a" | "b" | "c" | "d";
type AllPerms328 = Permutation328<SmallUnion328>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig328,
  Flat328,
  FR328,
  BigUnion328,
  ExtractAlpha328,
  ExcludeZulu328,
  OptionalAll328,
  RequiredAll328,
  ReadonlyAll328,
  NullableAll328,
  TypeNames328,
  Action328,
  AllPerms328,
};
