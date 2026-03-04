// pkg-01/types-04 - heavy interconnected types


type DeepMerge_0104<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object ? U[K] extends object ? DeepMerge_0104<T[K], U[K]> : U[K] : U[K]
    : K extends keyof T ? T[K] : K extends keyof U ? U[K] : never;
};

interface Entity_01_04 {
  id: string;
  meta: { created: Date; updated: Date; version: number; tags: string[]; attrs: Record<string, { v: unknown; t: string; ok: boolean }> };
  rels: { parent: Entity_01_04 | null; children: Entity_01_04[]; };
  cfg: { enabled: boolean; priority: number; rules: Array<{ cond: string; action: string; params: Record<string, unknown>; sub: { items: Array<{ id: string; w: number }> } }> };
  d04: { x0104: number; y0104: string; z0104: boolean };
}

type Path_0104<T, D extends unknown[] = []> = D['length'] extends 6 ? never
  : T extends object ? { [K in keyof T & string]: K | `${K}.${Path_0104<T[K], [...D, unknown]>}` }[keyof T & string] : never;
type EP_0104 = Path_0104<Entity_01_04>;

type Val_0104<T> = {
  [K in keyof T]: T[K] extends string ? { t: 's'; min: number; max: number }
    : T[K] extends number ? { t: 'n'; min: number; max: number }
    : T[K] extends boolean ? { t: 'b'; def: boolean }
    : T[K] extends unknown[] ? { t: 'a'; items: Val_0104<T[K][number]> }
    : T[K] extends object ? { t: 'o'; props: Val_0104<T[K]> }
    : { t: 'u' };
};
type EV_0104 = Val_0104<Entity_01_04>;

interface Registry_01_04 {
  entities: Map<string, Entity_01_04>;
  validators: EV_0104;
  paths: Set<EP_0104>;
  merged: DeepMerge_0104<Entity_01_04, { extra0104: string }>;
}

type CK_0104 = `p01.t04.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type { Entity_01_04, Registry_01_04, CK_0104, EP_0104, EV_0104, DeepMerge_0104 };
