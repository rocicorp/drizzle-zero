// pkg-01/types-37 - heavy interconnected types


type DeepMerge_0137<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object ? U[K] extends object ? DeepMerge_0137<T[K], U[K]> : U[K] : U[K]
    : K extends keyof T ? T[K] : K extends keyof U ? U[K] : never;
};

interface Entity_01_37 {
  id: string;
  meta: { created: Date; updated: Date; version: number; tags: string[]; attrs: Record<string, { v: unknown; t: string; ok: boolean }> };
  rels: { parent: Entity_01_37 | null; children: Entity_01_37[]; };
  cfg: { enabled: boolean; priority: number; rules: Array<{ cond: string; action: string; params: Record<string, unknown>; sub: { items: Array<{ id: string; w: number }> } }> };
  d37: { x0137: number; y0137: string; z0137: boolean };
}

type Path_0137<T, D extends unknown[] = []> = D['length'] extends 6 ? never
  : T extends object ? { [K in keyof T & string]: K | `${K}.${Path_0137<T[K], [...D, unknown]>}` }[keyof T & string] : never;
type EP_0137 = Path_0137<Entity_01_37>;

type Val_0137<T> = {
  [K in keyof T]: T[K] extends string ? { t: 's'; min: number; max: number }
    : T[K] extends number ? { t: 'n'; min: number; max: number }
    : T[K] extends boolean ? { t: 'b'; def: boolean }
    : T[K] extends unknown[] ? { t: 'a'; items: Val_0137<T[K][number]> }
    : T[K] extends object ? { t: 'o'; props: Val_0137<T[K]> }
    : { t: 'u' };
};
type EV_0137 = Val_0137<Entity_01_37>;

interface Registry_01_37 {
  entities: Map<string, Entity_01_37>;
  validators: EV_0137;
  paths: Set<EP_0137>;
  merged: DeepMerge_0137<Entity_01_37, { extra0137: string }>;
}

type CK_0137 = `p01.t37.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type { Entity_01_37, Registry_01_37, CK_0137, EP_0137, EV_0137, DeepMerge_0137 };
