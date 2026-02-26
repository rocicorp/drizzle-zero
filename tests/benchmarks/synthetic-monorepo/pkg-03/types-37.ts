// pkg-03 / types-37  (seed 337) - expensive recursive & mapped types

// ── 1. DeepPartial over a large interface ────────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface BigRecord337 {
  a337: { x: number; y: string; z: boolean };
  b337: { p: string[]; q: Record<string, number> };
  c337: { nested: { deep: { deeper: { deepest: string } } } };
  d337: number;
  e337: string;
  f337: boolean;
  g337: null;
  h337: undefined;
  i337: bigint;
  j337: symbol;
}

type PartialBig337 = DeepPartial<BigRecord337>;

// ── 2. Recursive Flatten ─────────────────────────────────────────────────────
type Flatten337<T> = T extends Array<infer U> ? Flatten337<U> : T;
type Nested337 = number[][][][][][][][][][];
type Flat337 = Flatten337<Nested337>;

// ── 3. Deep readonly + required ──────────────────────────────────────────────
type DeepReadonly337<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly337<T[K]> : T[K];
};
type DeepRequired337<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired337<T[K]> : T[K];
};
type FR337 = DeepReadonly337<DeepRequired337<PartialBig337>>;

// ── 4. Large union type (50 members) ─────────────────────────────────────────
type BigUnion337 =
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

type ExtractAlpha337 = Extract<BigUnion337, "alpha" | "bravo" | "charlie">;
type ExcludeZulu337 = Exclude<BigUnion337, "zulu">;

// ── 5. Mapped type over intersection of interfaces ───────────────────────────
interface ShapeA337 { width: number; height: number; depth: number }
interface ShapeB337 { color: string; opacity: number; blend: string }
interface ShapeC337 { x: number; y: number; z: number; w: number }
interface ShapeD337 { label: string; title: string; summary: string }

type Combined337 = ShapeA337 & ShapeB337 & ShapeC337 & ShapeD337;
type OptionalAll337 = { [K in keyof Combined337]?: Combined337[K] };
type RequiredAll337 = { [K in keyof Combined337]-?: Combined337[K] };
type ReadonlyAll337 = { readonly [K in keyof Combined337]: Combined337[K] };
type NullableAll337 = { [K in keyof Combined337]: Combined337[K] | null };

// ── 6. Conditional type chains ───────────────────────────────────────────────
type IsString337<T> = T extends string ? true : false;
type IsNumber337<T> = T extends number ? true : false;
type TypeName337<T> = T extends string
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

type TypeNames337 = {
  [K in keyof BigRecord337]: TypeName337<BigRecord337[K]>;
};

// ── 7. Template literal type combinations ────────────────────────────────────
type Verb337 = "get" | "set" | "delete" | "update" | "create" | "list";
type Resource337 = "user" | "post" | "comment" | "tag" | "category";
type Action337 = `${Verb337}_${Resource337}`;

// ── 8. Infer in conditional types ────────────────────────────────────────────
type UnwrapPromise337<T> = T extends Promise<infer U> ? UnwrapPromise337<U> : T;
type UnwrapArray337<T> = T extends (infer U)[] ? UnwrapArray337<U> : T;
type Head337<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never;
type Tail337<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

// ── 9. Permutation of union ───────────────────────────────────────────────────
type Permutation337<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation337<Exclude<T, K>>]
  : never;

type SmallUnion337 = "a" | "b" | "c" | "d";
type AllPerms337 = Permutation337<SmallUnion337>;

// ── 10. Re-export to force inclusion ─────────────────────────────────────────
export type {
  PartialBig337,
  Flat337,
  FR337,
  BigUnion337,
  ExtractAlpha337,
  ExcludeZulu337,
  OptionalAll337,
  RequiredAll337,
  ReadonlyAll337,
  NullableAll337,
  TypeNames337,
  Action337,
  AllPerms337,
};
