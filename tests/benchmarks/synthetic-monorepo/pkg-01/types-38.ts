// pkg-01/types-38 - heavy interconnected types


type DeepMerge_0138<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object ? U[K] extends object ? DeepMerge_0138<T[K], U[K]> : U[K] : U[K]
    : K extends keyof T ? T[K] : K extends keyof U ? U[K] : never;
};

interface Entity_01_38 {
  id: string;
  meta: { created: Date; updated: Date; version: number; tags: string[]; attrs: Record<string, { v: unknown; t: string; ok: boolean }> };
  rels: { parent: Entity_01_38 | null; children: Entity_01_38[]; };
  cfg: { enabled: boolean; priority: number; rules: Array<{ cond: string; action: string; params: Record<string, unknown>; sub: { items: Array<{ id: string; w: number }> } }> };
  d38: { x0138: number; y0138: string; z0138: boolean };
}

type Path_0138<T, D extends unknown[] = []> = D['length'] extends 6 ? never
  : T extends object ? { [K in keyof T & string]: K | `${K}.${Path_0138<T[K], [...D, unknown]>}` }[keyof T & string] : never;
type EP_0138 = Path_0138<Entity_01_38>;

type Val_0138<T> = {
  [K in keyof T]: T[K] extends string ? { t: 's'; min: number; max: number }
    : T[K] extends number ? { t: 'n'; min: number; max: number }
    : T[K] extends boolean ? { t: 'b'; def: boolean }
    : T[K] extends unknown[] ? { t: 'a'; items: Val_0138<T[K][number]> }
    : T[K] extends object ? { t: 'o'; props: Val_0138<T[K]> }
    : { t: 'u' };
};
type EV_0138 = Val_0138<Entity_01_38>;

interface Registry_01_38 {
  entities: Map<string, Entity_01_38>;
  validators: EV_0138;
  paths: Set<EP_0138>;
  merged: DeepMerge_0138<Entity_01_38, { extra0138: string }>;
}

type CK_0138 = `p01.t38.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type { Entity_01_38, Registry_01_38, CK_0138, EP_0138, EV_0138, DeepMerge_0138 };
