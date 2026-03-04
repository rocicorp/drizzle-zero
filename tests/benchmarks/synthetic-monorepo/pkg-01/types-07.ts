// pkg-01/types-07 - heavy interconnected types


type DeepMerge_0107<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object ? U[K] extends object ? DeepMerge_0107<T[K], U[K]> : U[K] : U[K]
    : K extends keyof T ? T[K] : K extends keyof U ? U[K] : never;
};

interface Entity_01_07 {
  id: string;
  meta: { created: Date; updated: Date; version: number; tags: string[]; attrs: Record<string, { v: unknown; t: string; ok: boolean }> };
  rels: { parent: Entity_01_07 | null; children: Entity_01_07[]; };
  cfg: { enabled: boolean; priority: number; rules: Array<{ cond: string; action: string; params: Record<string, unknown>; sub: { items: Array<{ id: string; w: number }> } }> };
  d07: { x0107: number; y0107: string; z0107: boolean };
}

type Path_0107<T, D extends unknown[] = []> = D['length'] extends 6 ? never
  : T extends object ? { [K in keyof T & string]: K | `${K}.${Path_0107<T[K], [...D, unknown]>}` }[keyof T & string] : never;
type EP_0107 = Path_0107<Entity_01_07>;

type Val_0107<T> = {
  [K in keyof T]: T[K] extends string ? { t: 's'; min: number; max: number }
    : T[K] extends number ? { t: 'n'; min: number; max: number }
    : T[K] extends boolean ? { t: 'b'; def: boolean }
    : T[K] extends unknown[] ? { t: 'a'; items: Val_0107<T[K][number]> }
    : T[K] extends object ? { t: 'o'; props: Val_0107<T[K]> }
    : { t: 'u' };
};
type EV_0107 = Val_0107<Entity_01_07>;

interface Registry_01_07 {
  entities: Map<string, Entity_01_07>;
  validators: EV_0107;
  paths: Set<EP_0107>;
  merged: DeepMerge_0107<Entity_01_07, { extra0107: string }>;
}

type CK_0107 = `p01.t07.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type { Entity_01_07, Registry_01_07, CK_0107, EP_0107, EV_0107, DeepMerge_0107 };
