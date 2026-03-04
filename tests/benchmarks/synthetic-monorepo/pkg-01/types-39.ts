// pkg-01/types-39 - heavy interconnected types


type DeepMerge_0139<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object ? U[K] extends object ? DeepMerge_0139<T[K], U[K]> : U[K] : U[K]
    : K extends keyof T ? T[K] : K extends keyof U ? U[K] : never;
};

interface Entity_01_39 {
  id: string;
  meta: { created: Date; updated: Date; version: number; tags: string[]; attrs: Record<string, { v: unknown; t: string; ok: boolean }> };
  rels: { parent: Entity_01_39 | null; children: Entity_01_39[]; };
  cfg: { enabled: boolean; priority: number; rules: Array<{ cond: string; action: string; params: Record<string, unknown>; sub: { items: Array<{ id: string; w: number }> } }> };
  d39: { x0139: number; y0139: string; z0139: boolean };
}

type Path_0139<T, D extends unknown[] = []> = D['length'] extends 6 ? never
  : T extends object ? { [K in keyof T & string]: K | `${K}.${Path_0139<T[K], [...D, unknown]>}` }[keyof T & string] : never;
type EP_0139 = Path_0139<Entity_01_39>;

type Val_0139<T> = {
  [K in keyof T]: T[K] extends string ? { t: 's'; min: number; max: number }
    : T[K] extends number ? { t: 'n'; min: number; max: number }
    : T[K] extends boolean ? { t: 'b'; def: boolean }
    : T[K] extends unknown[] ? { t: 'a'; items: Val_0139<T[K][number]> }
    : T[K] extends object ? { t: 'o'; props: Val_0139<T[K]> }
    : { t: 'u' };
};
type EV_0139 = Val_0139<Entity_01_39>;

interface Registry_01_39 {
  entities: Map<string, Entity_01_39>;
  validators: EV_0139;
  paths: Set<EP_0139>;
  merged: DeepMerge_0139<Entity_01_39, { extra0139: string }>;
}

type CK_0139 = `p01.t39.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type { Entity_01_39, Registry_01_39, CK_0139, EP_0139, EV_0139, DeepMerge_0139 };
