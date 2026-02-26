// pkg-02 / types-22  (seed 222) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord222 {
  a222: { x: number; y: string; z: boolean };
  b222: { p: string[]; q: Record<string, number> };
  c222: { nested: { deep: { deeper: { deepest: string } } } };
  d222: number;
  e222: string;
  f222: boolean;
  g222: null;
  h222: undefined;
  i222: bigint;
  j222: symbol;
}

type PartialBig222 = DeepPartial<BigRecord222>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten222<T> = T extends Array<infer U> ? Flatten222<U> : T;
type Nested222 = number[][][][][][][][][][];
type Flat222 = Flatten222<Nested222>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly222<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly222<T[K]> : T[K];
};
type DeepRequired222<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired222<T[K]> : T[K];
};
type FR222 = DeepReadonly222<DeepRequired222<PartialBig222>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion222 =
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

type ExtractAlpha222 = Extract<BigUnion222, "alpha" | "bravo" | "charlie">;
type ExcludeZulu222 = Exclude<BigUnion222, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA222 { width: number; height: number; depth: number }
interface ShapeB222 { color: string; opacity: number; blend: string }
interface ShapeC222 { x: number; y: number; z: number; w: number }
interface ShapeD222 { label: string; title: string; summary: string }

type Combined222 = ShapeA222 & ShapeB222 & ShapeC222 & ShapeD222;
type OptionalAll222 = { [K in keyof Combined222]?: Combined222[K] };
type RequiredAll222 = { [K in keyof Combined222]-?: Combined222[K] };
type ReadonlyAll222 = { readonly [K in keyof Combined222]: Combined222[K] };
type NullableAll222 = { [K in keyof Combined222]: Combined222[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString222<T> = T extends string ? true : false;
type IsNumber222<T> = T extends number ? true : false;
type TypeName222<T> = T extends string
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

type TypeNames222 = {
  [K in keyof BigRecord222]: TypeName222<BigRecord222[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb222 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource222 = "user" | "post" | "comment" | "tag" | "category";
type Action222 = `${Verb222}_${Resource222}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise222<T> = T extends Promise<infer U> ? UnwrapPromise222<U> : T;
type UnwrapArray222<T> = T extends (infer U)[] ? UnwrapArray222<U> : T;
type Head222<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail222<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation222<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation222<Exclude<T, K>>]
  : never;

type SmallUnion222 = "a" | "b" | "c" | "d";
type AllPerms222 = Permutation222<SmallUnion222>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig222,
  Flat222,
  FR222,
  BigUnion222,
  ExtractAlpha222,
  ExcludeZulu222,
  OptionalAll222,
  RequiredAll222,
  ReadonlyAll222,
  NullableAll222,
  TypeNames222,
  Action222,
  AllPerms222,
};
