// pkg-01/types-24 - heavy interconnected types


type DeepMerge_0124<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object ? U[K] extends object ? DeepMerge_0124<T[K], U[K]> : U[K] : U[K]
    : K extends keyof T ? T[K] : K extends keyof U ? U[K] : never;
};

interface Entity_01_24 {
  id: string;
  meta: { created: Date; updated: Date; version: number; tags: string[]; attrs: Record<string, { v: unknown; t: string; ok: boolean }> };
  rels: { parent: Entity_01_24 | null; children: Entity_01_24[]; };
  cfg: { enabled: boolean; priority: number; rules: Array<{ cond: string; action: string; params: Record<string, unknown>; sub: { items: Array<{ id: string; w: number }> } }> };
  d24: { x0124: number; y0124: string; z0124: boolean };
}

type Path_0124<T, D extends unknown[] = []> = D['length'] extends 6 ? never
  : T extends object ? { [K in keyof T & string]: K | `${K}.${Path_0124<T[K], [...D, unknown]>}` }[keyof T & string] : never;
type EP_0124 = Path_0124<Entity_01_24>;

type Val_0124<T> = {
  [K in keyof T]: T[K] extends string ? { t: 's'; min: number; max: number }
    : T[K] extends number ? { t: 'n'; min: number; max: number }
    : T[K] extends boolean ? { t: 'b'; def: boolean }
    : T[K] extends unknown[] ? { t: 'a'; items: Val_0124<T[K][number]> }
    : T[K] extends object ? { t: 'o'; props: Val_0124<T[K]> }
    : { t: 'u' };
};
type EV_0124 = Val_0124<Entity_01_24>;

interface Registry_01_24 {
  entities: Map<string, Entity_01_24>;
  validators: EV_0124;
  paths: Set<EP_0124>;
  merged: DeepMerge_0124<Entity_01_24, { extra0124: string }>;
}

type CK_0124 = `p01.t24.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type { Entity_01_24, Registry_01_24, CK_0124, EP_0124, EV_0124, DeepMerge_0124 };
