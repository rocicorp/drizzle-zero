// pkg-01/types-40 - heavy interconnected types

type DeepMerge_0140<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object
      ? U[K] extends object
        ? DeepMerge_0140<T[K], U[K]>
        : U[K]
      : U[K]
    : K extends keyof T
      ? T[K]
      : K extends keyof U
        ? U[K]
        : never;
};

interface Entity_01_40 {
  id: string;
  meta: {
    created: Date;
    updated: Date;
    version: number;
    tags: string[];
    attrs: Record<string, {v: unknown; t: string; ok: boolean}>;
  };
  rels: {parent: Entity_01_40 | null; children: Entity_01_40[]};
  cfg: {
    enabled: boolean;
    priority: number;
    rules: Array<{
      cond: string;
      action: string;
      params: Record<string, unknown>;
      sub: {items: Array<{id: string; w: number}>};
    }>;
  };
  d40: {x0140: number; y0140: string; z0140: boolean};
}

type Path_0140<T, D extends unknown[] = []> = D['length'] extends 6
  ? never
  : T extends object
    ? {
        [K in keyof T & string]: K | `${K}.${Path_0140<T[K], [...D, unknown]>}`;
      }[keyof T & string]
    : never;
type EP_0140 = Path_0140<Entity_01_40>;

type Val_0140<T> = {
  [K in keyof T]: T[K] extends string
    ? {t: 's'; min: number; max: number}
    : T[K] extends number
      ? {t: 'n'; min: number; max: number}
      : T[K] extends boolean
        ? {t: 'b'; def: boolean}
        : T[K] extends unknown[]
          ? {t: 'a'; items: Val_0140<T[K][number]>}
          : T[K] extends object
            ? {t: 'o'; props: Val_0140<T[K]>}
            : {t: 'u'};
};
type EV_0140 = Val_0140<Entity_01_40>;

interface Registry_01_40 {
  entities: Map<string, Entity_01_40>;
  validators: EV_0140;
  paths: Set<EP_0140>;
  merged: DeepMerge_0140<Entity_01_40, {extra0140: string}>;
}

type CK_0140 =
  `p01.t40.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type {
  Entity_01_40,
  Registry_01_40,
  CK_0140,
  EP_0140,
  EV_0140,
  DeepMerge_0140,
};
