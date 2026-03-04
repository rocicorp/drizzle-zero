// pkg-01/types-01 - heavy interconnected types


type DeepMerge_0101<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object ? U[K] extends object ? DeepMerge_0101<T[K], U[K]> : U[K] : U[K]
    : K extends keyof T ? T[K] : K extends keyof U ? U[K] : never;
};

interface Entity_01_01 {
  id: string;
  meta: { created: Date; updated: Date; version: number; tags: string[]; attrs: Record<string, { v: unknown; t: string; ok: boolean }> };
  rels: { parent: Entity_01_01 | null; children: Entity_01_01[]; };
  cfg: { enabled: boolean; priority: number; rules: Array<{ cond: string; action: string; params: Record<string, unknown>; sub: { items: Array<{ id: string; w: number }> } }> };
  d01: { x0101: number; y0101: string; z0101: boolean };
}

type Path_0101<T, D extends unknown[] = []> = D['length'] extends 6 ? never
  : T extends object ? { [K in keyof T & string]: K | `${K}.${Path_0101<T[K], [...D, unknown]>}` }[keyof T & string] : never;
type EP_0101 = Path_0101<Entity_01_01>;

type Val_0101<T> = {
  [K in keyof T]: T[K] extends string ? { t: 's'; min: number; max: number }
    : T[K] extends number ? { t: 'n'; min: number; max: number }
    : T[K] extends boolean ? { t: 'b'; def: boolean }
    : T[K] extends unknown[] ? { t: 'a'; items: Val_0101<T[K][number]> }
    : T[K] extends object ? { t: 'o'; props: Val_0101<T[K]> }
    : { t: 'u' };
};
type EV_0101 = Val_0101<Entity_01_01>;

interface Registry_01_01 {
  entities: Map<string, Entity_01_01>;
  validators: EV_0101;
  paths: Set<EP_0101>;
  merged: DeepMerge_0101<Entity_01_01, { extra0101: string }>;
}

type CK_0101 = `p01.t01.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type { Entity_01_01, Registry_01_01, CK_0101, EP_0101, EV_0101, DeepMerge_0101 };
