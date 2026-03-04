// pkg-01/types-21 - heavy interconnected types


type DeepMerge_0121<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object ? U[K] extends object ? DeepMerge_0121<T[K], U[K]> : U[K] : U[K]
    : K extends keyof T ? T[K] : K extends keyof U ? U[K] : never;
};

interface Entity_01_21 {
  id: string;
  meta: { created: Date; updated: Date; version: number; tags: string[]; attrs: Record<string, { v: unknown; t: string; ok: boolean }> };
  rels: { parent: Entity_01_21 | null; children: Entity_01_21[]; };
  cfg: { enabled: boolean; priority: number; rules: Array<{ cond: string; action: string; params: Record<string, unknown>; sub: { items: Array<{ id: string; w: number }> } }> };
  d21: { x0121: number; y0121: string; z0121: boolean };
}

type Path_0121<T, D extends unknown[] = []> = D['length'] extends 6 ? never
  : T extends object ? { [K in keyof T & string]: K | `${K}.${Path_0121<T[K], [...D, unknown]>}` }[keyof T & string] : never;
type EP_0121 = Path_0121<Entity_01_21>;

type Val_0121<T> = {
  [K in keyof T]: T[K] extends string ? { t: 's'; min: number; max: number }
    : T[K] extends number ? { t: 'n'; min: number; max: number }
    : T[K] extends boolean ? { t: 'b'; def: boolean }
    : T[K] extends unknown[] ? { t: 'a'; items: Val_0121<T[K][number]> }
    : T[K] extends object ? { t: 'o'; props: Val_0121<T[K]> }
    : { t: 'u' };
};
type EV_0121 = Val_0121<Entity_01_21>;

interface Registry_01_21 {
  entities: Map<string, Entity_01_21>;
  validators: EV_0121;
  paths: Set<EP_0121>;
  merged: DeepMerge_0121<Entity_01_21, { extra0121: string }>;
}

type CK_0121 = `p01.t21.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type { Entity_01_21, Registry_01_21, CK_0121, EP_0121, EV_0121, DeepMerge_0121 };
