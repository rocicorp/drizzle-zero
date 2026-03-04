// pkg-01/types-30 - heavy interconnected types


type DeepMerge_0130<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object ? U[K] extends object ? DeepMerge_0130<T[K], U[K]> : U[K] : U[K]
    : K extends keyof T ? T[K] : K extends keyof U ? U[K] : never;
};

interface Entity_01_30 {
  id: string;
  meta: { created: Date; updated: Date; version: number; tags: string[]; attrs: Record<string, { v: unknown; t: string; ok: boolean }> };
  rels: { parent: Entity_01_30 | null; children: Entity_01_30[]; };
  cfg: { enabled: boolean; priority: number; rules: Array<{ cond: string; action: string; params: Record<string, unknown>; sub: { items: Array<{ id: string; w: number }> } }> };
  d30: { x0130: number; y0130: string; z0130: boolean };
}

type Path_0130<T, D extends unknown[] = []> = D['length'] extends 6 ? never
  : T extends object ? { [K in keyof T & string]: K | `${K}.${Path_0130<T[K], [...D, unknown]>}` }[keyof T & string] : never;
type EP_0130 = Path_0130<Entity_01_30>;

type Val_0130<T> = {
  [K in keyof T]: T[K] extends string ? { t: 's'; min: number; max: number }
    : T[K] extends number ? { t: 'n'; min: number; max: number }
    : T[K] extends boolean ? { t: 'b'; def: boolean }
    : T[K] extends unknown[] ? { t: 'a'; items: Val_0130<T[K][number]> }
    : T[K] extends object ? { t: 'o'; props: Val_0130<T[K]> }
    : { t: 'u' };
};
type EV_0130 = Val_0130<Entity_01_30>;

interface Registry_01_30 {
  entities: Map<string, Entity_01_30>;
  validators: EV_0130;
  paths: Set<EP_0130>;
  merged: DeepMerge_0130<Entity_01_30, { extra0130: string }>;
}

type CK_0130 = `p01.t30.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type { Entity_01_30, Registry_01_30, CK_0130, EP_0130, EV_0130, DeepMerge_0130 };
