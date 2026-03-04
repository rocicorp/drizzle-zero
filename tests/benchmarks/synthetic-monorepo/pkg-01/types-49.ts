// pkg-01/types-49 - heavy interconnected types


type DeepMerge_0149<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object ? U[K] extends object ? DeepMerge_0149<T[K], U[K]> : U[K] : U[K]
    : K extends keyof T ? T[K] : K extends keyof U ? U[K] : never;
};

interface Entity_01_49 {
  id: string;
  meta: { created: Date; updated: Date; version: number; tags: string[]; attrs: Record<string, { v: unknown; t: string; ok: boolean }> };
  rels: { parent: Entity_01_49 | null; children: Entity_01_49[]; };
  cfg: { enabled: boolean; priority: number; rules: Array<{ cond: string; action: string; params: Record<string, unknown>; sub: { items: Array<{ id: string; w: number }> } }> };
  d49: { x0149: number; y0149: string; z0149: boolean };
}

type Path_0149<T, D extends unknown[] = []> = D['length'] extends 6 ? never
  : T extends object ? { [K in keyof T & string]: K | `${K}.${Path_0149<T[K], [...D, unknown]>}` }[keyof T & string] : never;
type EP_0149 = Path_0149<Entity_01_49>;

type Val_0149<T> = {
  [K in keyof T]: T[K] extends string ? { t: 's'; min: number; max: number }
    : T[K] extends number ? { t: 'n'; min: number; max: number }
    : T[K] extends boolean ? { t: 'b'; def: boolean }
    : T[K] extends unknown[] ? { t: 'a'; items: Val_0149<T[K][number]> }
    : T[K] extends object ? { t: 'o'; props: Val_0149<T[K]> }
    : { t: 'u' };
};
type EV_0149 = Val_0149<Entity_01_49>;

interface Registry_01_49 {
  entities: Map<string, Entity_01_49>;
  validators: EV_0149;
  paths: Set<EP_0149>;
  merged: DeepMerge_0149<Entity_01_49, { extra0149: string }>;
}

type CK_0149 = `p01.t49.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type { Entity_01_49, Registry_01_49, CK_0149, EP_0149, EV_0149, DeepMerge_0149 };
