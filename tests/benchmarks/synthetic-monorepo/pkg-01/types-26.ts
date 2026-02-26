// pkg-01/types-26 - heavy interconnected types


type DeepMerge_0126<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object ? U[K] extends object ? DeepMerge_0126<T[K], U[K]> : U[K] : U[K]
    : K extends keyof T ? T[K] : K extends keyof U ? U[K] : never;
};

interface Entity_01_26 {
  id: string;
  meta: { created: Date; updated: Date; version: number; tags: string[]; attrs: Record<string, { v: unknown; t: string; ok: boolean }> };
  rels: { parent: Entity_01_26 | null; children: Entity_01_26[]; };
  cfg: { enabled: boolean; priority: number; rules: Array<{ cond: string; action: string; params: Record<string, unknown>; sub: { items: Array<{ id: string; w: number }> } }> };
  d26: { x0126: number; y0126: string; z0126: boolean };
}

type Path_0126<T, D extends unknown[] = []> = D['length'] extends 6 ? never
  : T extends object ? { [K in keyof T & string]: K | `${K}.${Path_0126<T[K], [...D, unknown]>}` }[keyof T & string] : never;
type EP_0126 = Path_0126<Entity_01_26>;

type Val_0126<T> = {
  [K in keyof T]: T[K] extends string ? { t: 's'; min: number; max: number }
    : T[K] extends number ? { t: 'n'; min: number; max: number }
    : T[K] extends boolean ? { t: 'b'; def: boolean }
    : T[K] extends unknown[] ? { t: 'a'; items: Val_0126<T[K][number]> }
    : T[K] extends object ? { t: 'o'; props: Val_0126<T[K]> }
    : { t: 'u' };
};
type EV_0126 = Val_0126<Entity_01_26>;

interface Registry_01_26 {
  entities: Map<string, Entity_01_26>;
  validators: EV_0126;
  paths: Set<EP_0126>;
  merged: DeepMerge_0126<Entity_01_26, { extra0126: string }>;
}

type CK_0126 = `p01.t26.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type { Entity_01_26, Registry_01_26, CK_0126, EP_0126, EV_0126, DeepMerge_0126 };
