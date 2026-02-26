// pkg-01/types-06 - heavy interconnected types


type DeepMerge_0106<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object ? U[K] extends object ? DeepMerge_0106<T[K], U[K]> : U[K] : U[K]
    : K extends keyof T ? T[K] : K extends keyof U ? U[K] : never;
};

interface Entity_01_06 {
  id: string;
  meta: { created: Date; updated: Date; version: number; tags: string[]; attrs: Record<string, { v: unknown; t: string; ok: boolean }> };
  rels: { parent: Entity_01_06 | null; children: Entity_01_06[]; };
  cfg: { enabled: boolean; priority: number; rules: Array<{ cond: string; action: string; params: Record<string, unknown>; sub: { items: Array<{ id: string; w: number }> } }> };
  d06: { x0106: number; y0106: string; z0106: boolean };
}

type Path_0106<T, D extends unknown[] = []> = D['length'] extends 6 ? never
  : T extends object ? { [K in keyof T & string]: K | `${K}.${Path_0106<T[K], [...D, unknown]>}` }[keyof T & string] : never;
type EP_0106 = Path_0106<Entity_01_06>;

type Val_0106<T> = {
  [K in keyof T]: T[K] extends string ? { t: 's'; min: number; max: number }
    : T[K] extends number ? { t: 'n'; min: number; max: number }
    : T[K] extends boolean ? { t: 'b'; def: boolean }
    : T[K] extends unknown[] ? { t: 'a'; items: Val_0106<T[K][number]> }
    : T[K] extends object ? { t: 'o'; props: Val_0106<T[K]> }
    : { t: 'u' };
};
type EV_0106 = Val_0106<Entity_01_06>;

interface Registry_01_06 {
  entities: Map<string, Entity_01_06>;
  validators: EV_0106;
  paths: Set<EP_0106>;
  merged: DeepMerge_0106<Entity_01_06, { extra0106: string }>;
}

type CK_0106 = `p01.t06.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type { Entity_01_06, Registry_01_06, CK_0106, EP_0106, EV_0106, DeepMerge_0106 };
