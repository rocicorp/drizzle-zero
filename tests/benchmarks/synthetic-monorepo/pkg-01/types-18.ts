// pkg-01/types-18 - heavy interconnected types


type DeepMerge_0118<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object ? U[K] extends object ? DeepMerge_0118<T[K], U[K]> : U[K] : U[K]
    : K extends keyof T ? T[K] : K extends keyof U ? U[K] : never;
};

interface Entity_01_18 {
  id: string;
  meta: { created: Date; updated: Date; version: number; tags: string[]; attrs: Record<string, { v: unknown; t: string; ok: boolean }> };
  rels: { parent: Entity_01_18 | null; children: Entity_01_18[]; };
  cfg: { enabled: boolean; priority: number; rules: Array<{ cond: string; action: string; params: Record<string, unknown>; sub: { items: Array<{ id: string; w: number }> } }> };
  d18: { x0118: number; y0118: string; z0118: boolean };
}

type Path_0118<T, D extends unknown[] = []> = D['length'] extends 6 ? never
  : T extends object ? { [K in keyof T & string]: K | `${K}.${Path_0118<T[K], [...D, unknown]>}` }[keyof T & string] : never;
type EP_0118 = Path_0118<Entity_01_18>;

type Val_0118<T> = {
  [K in keyof T]: T[K] extends string ? { t: 's'; min: number; max: number }
    : T[K] extends number ? { t: 'n'; min: number; max: number }
    : T[K] extends boolean ? { t: 'b'; def: boolean }
    : T[K] extends unknown[] ? { t: 'a'; items: Val_0118<T[K][number]> }
    : T[K] extends object ? { t: 'o'; props: Val_0118<T[K]> }
    : { t: 'u' };
};
type EV_0118 = Val_0118<Entity_01_18>;

interface Registry_01_18 {
  entities: Map<string, Entity_01_18>;
  validators: EV_0118;
  paths: Set<EP_0118>;
  merged: DeepMerge_0118<Entity_01_18, { extra0118: string }>;
}

type CK_0118 = `p01.t18.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type { Entity_01_18, Registry_01_18, CK_0118, EP_0118, EV_0118, DeepMerge_0118 };
