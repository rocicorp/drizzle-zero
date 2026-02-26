// pkg-01/types-36 - heavy interconnected types


type DeepMerge_0136<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object ? U[K] extends object ? DeepMerge_0136<T[K], U[K]> : U[K] : U[K]
    : K extends keyof T ? T[K] : K extends keyof U ? U[K] : never;
};

interface Entity_01_36 {
  id: string;
  meta: { created: Date; updated: Date; version: number; tags: string[]; attrs: Record<string, { v: unknown; t: string; ok: boolean }> };
  rels: { parent: Entity_01_36 | null; children: Entity_01_36[]; };
  cfg: { enabled: boolean; priority: number; rules: Array<{ cond: string; action: string; params: Record<string, unknown>; sub: { items: Array<{ id: string; w: number }> } }> };
  d36: { x0136: number; y0136: string; z0136: boolean };
}

type Path_0136<T, D extends unknown[] = []> = D['length'] extends 6 ? never
  : T extends object ? { [K in keyof T & string]: K | `${K}.${Path_0136<T[K], [...D, unknown]>}` }[keyof T & string] : never;
type EP_0136 = Path_0136<Entity_01_36>;

type Val_0136<T> = {
  [K in keyof T]: T[K] extends string ? { t: 's'; min: number; max: number }
    : T[K] extends number ? { t: 'n'; min: number; max: number }
    : T[K] extends boolean ? { t: 'b'; def: boolean }
    : T[K] extends unknown[] ? { t: 'a'; items: Val_0136<T[K][number]> }
    : T[K] extends object ? { t: 'o'; props: Val_0136<T[K]> }
    : { t: 'u' };
};
type EV_0136 = Val_0136<Entity_01_36>;

interface Registry_01_36 {
  entities: Map<string, Entity_01_36>;
  validators: EV_0136;
  paths: Set<EP_0136>;
  merged: DeepMerge_0136<Entity_01_36, { extra0136: string }>;
}

type CK_0136 = `p01.t36.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type { Entity_01_36, Registry_01_36, CK_0136, EP_0136, EV_0136, DeepMerge_0136 };
