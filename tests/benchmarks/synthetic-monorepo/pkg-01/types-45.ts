// pkg-01/types-45 - heavy interconnected types


type DeepMerge_0145<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object ? U[K] extends object ? DeepMerge_0145<T[K], U[K]> : U[K] : U[K]
    : K extends keyof T ? T[K] : K extends keyof U ? U[K] : never;
};

interface Entity_01_45 {
  id: string;
  meta: { created: Date; updated: Date; version: number; tags: string[]; attrs: Record<string, { v: unknown; t: string; ok: boolean }> };
  rels: { parent: Entity_01_45 | null; children: Entity_01_45[]; };
  cfg: { enabled: boolean; priority: number; rules: Array<{ cond: string; action: string; params: Record<string, unknown>; sub: { items: Array<{ id: string; w: number }> } }> };
  d45: { x0145: number; y0145: string; z0145: boolean };
}

type Path_0145<T, D extends unknown[] = []> = D['length'] extends 6 ? never
  : T extends object ? { [K in keyof T & string]: K | `${K}.${Path_0145<T[K], [...D, unknown]>}` }[keyof T & string] : never;
type EP_0145 = Path_0145<Entity_01_45>;

type Val_0145<T> = {
  [K in keyof T]: T[K] extends string ? { t: 's'; min: number; max: number }
    : T[K] extends number ? { t: 'n'; min: number; max: number }
    : T[K] extends boolean ? { t: 'b'; def: boolean }
    : T[K] extends unknown[] ? { t: 'a'; items: Val_0145<T[K][number]> }
    : T[K] extends object ? { t: 'o'; props: Val_0145<T[K]> }
    : { t: 'u' };
};
type EV_0145 = Val_0145<Entity_01_45>;

interface Registry_01_45 {
  entities: Map<string, Entity_01_45>;
  validators: EV_0145;
  paths: Set<EP_0145>;
  merged: DeepMerge_0145<Entity_01_45, { extra0145: string }>;
}

type CK_0145 = `p01.t45.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type { Entity_01_45, Registry_01_45, CK_0145, EP_0145, EV_0145, DeepMerge_0145 };
