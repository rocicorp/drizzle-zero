// pkg-02 / types-41  (seed 241) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord241 {
  a241: { x: number; y: string; z: boolean };
  b241: { p: string[]; q: Record<string, number> };
  c241: { nested: { deep: { deeper: { deepest: string } } } };
  d241: number;
  e241: string;
  f241: boolean;
  g241: null;
  h241: undefined;
  i241: bigint;
  j241: symbol;
}

type PartialBig241 = DeepPartial<BigRecord241>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten241<T> = T extends Array<infer U> ? Flatten241<U> : T;
type Nested241 = number[][][][][][][][][][];
type Flat241 = Flatten241<Nested241>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly241<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly241<T[K]> : T[K];
};
type DeepRequired241<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired241<T[K]> : T[K];
};
type FR241 = DeepReadonly241<DeepRequired241<PartialBig241>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion241 =
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

type ExtractAlpha241 = Extract<BigUnion241, "alpha" | "bravo" | "charlie">;
type ExcludeZulu241 = Exclude<BigUnion241, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA241 { width: number; height: number; depth: number }
interface ShapeB241 { color: string; opacity: number; blend: string }
interface ShapeC241 { x: number; y: number; z: number; w: number }
interface ShapeD241 { label: string; title: string; summary: string }

type Combined241 = ShapeA241 & ShapeB241 & ShapeC241 & ShapeD241;
type OptionalAll241 = { [K in keyof Combined241]?: Combined241[K] };
type RequiredAll241 = { [K in keyof Combined241]-?: Combined241[K] };
type ReadonlyAll241 = { readonly [K in keyof Combined241]: Combined241[K] };
type NullableAll241 = { [K in keyof Combined241]: Combined241[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString241<T> = T extends string ? true : false;
type IsNumber241<T> = T extends number ? true : false;
type TypeName241<T> = T extends string
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

type TypeNames241 = {
  [K in keyof BigRecord241]: TypeName241<BigRecord241[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb241 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource241 = "user" | "post" | "comment" | "tag" | "category";
type Action241 = `${Verb241}_${Resource241}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise241<T> = T extends Promise<infer U> ? UnwrapPromise241<U> : T;
type UnwrapArray241<T> = T extends (infer U)[] ? UnwrapArray241<U> : T;
type Head241<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail241<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation241<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation241<Exclude<T, K>>]
  : never;

type SmallUnion241 = "a" | "b" | "c" | "d";
type AllPerms241 = Permutation241<SmallUnion241>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig241,
  Flat241,
  FR241,
  BigUnion241,
  ExtractAlpha241,
  ExcludeZulu241,
  OptionalAll241,
  RequiredAll241,
  ReadonlyAll241,
  NullableAll241,
  TypeNames241,
  Action241,
  AllPerms241,
};
