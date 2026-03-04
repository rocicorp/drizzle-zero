// pkg-01/types-33 - heavy interconnected types


type DeepMerge_0133<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object ? U[K] extends object ? DeepMerge_0133<T[K], U[K]> : U[K] : U[K]
    : K extends keyof T ? T[K] : K extends keyof U ? U[K] : never;
};

interface Entity_01_33 {
  id: string;
  meta: { created: Date; updated: Date; version: number; tags: string[]; attrs: Record<string, { v: unknown; t: string; ok: boolean }> };
  rels: { parent: Entity_01_33 | null; children: Entity_01_33[]; };
  cfg: { enabled: boolean; priority: number; rules: Array<{ cond: string; action: string; params: Record<string, unknown>; sub: { items: Array<{ id: string; w: number }> } }> };
  d33: { x0133: number; y0133: string; z0133: boolean };
}

type Path_0133<T, D extends unknown[] = []> = D['length'] extends 6 ? never
  : T extends object ? { [K in keyof T & string]: K | `${K}.${Path_0133<T[K], [...D, unknown]>}` }[keyof T & string] : never;
type EP_0133 = Path_0133<Entity_01_33>;

type Val_0133<T> = {
  [K in keyof T]: T[K] extends string ? { t: 's'; min: number; max: number }
    : T[K] extends number ? { t: 'n'; min: number; max: number }
    : T[K] extends boolean ? { t: 'b'; def: boolean }
    : T[K] extends unknown[] ? { t: 'a'; items: Val_0133<T[K][number]> }
    : T[K] extends object ? { t: 'o'; props: Val_0133<T[K]> }
    : { t: 'u' };
};
type EV_0133 = Val_0133<Entity_01_33>;

interface Registry_01_33 {
  entities: Map<string, Entity_01_33>;
  validators: EV_0133;
  paths: Set<EP_0133>;
  merged: DeepMerge_0133<Entity_01_33, { extra0133: string }>;
}

type CK_0133 = `p01.t33.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type { Entity_01_33, Registry_01_33, CK_0133, EP_0133, EV_0133, DeepMerge_0133 };
