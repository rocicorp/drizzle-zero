// pkg-01/types-03 - heavy interconnected types

type DeepMerge_0103<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object
      ? U[K] extends object
        ? DeepMerge_0103<T[K], U[K]>
        : U[K]
      : U[K]
    : K extends keyof T
      ? T[K]
      : K extends keyof U
        ? U[K]
        : never;
};

interface Entity_01_03 {
  id: string;
  meta: {
    created: Date;
    updated: Date;
    version: number;
    tags: string[];
    attrs: Record<string, {v: unknown; t: string; ok: boolean}>;
  };
  rels: {parent: Entity_01_03 | null; children: Entity_01_03[]};
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
  d03: {x0103: number; y0103: string; z0103: boolean};
}

type Path_0103<T, D extends unknown[] = []> = D['length'] extends 6
  ? never
  : T extends object
    ? {
        [K in keyof T & string]: K | `${K}.${Path_0103<T[K], [...D, unknown]>}`;
      }[keyof T & string]
    : never;
type EP_0103 = Path_0103<Entity_01_03>;

type Val_0103<T> = {
  [K in keyof T]: T[K] extends string
    ? {t: 's'; min: number; max: number}
    : T[K] extends number
      ? {t: 'n'; min: number; max: number}
      : T[K] extends boolean
        ? {t: 'b'; def: boolean}
        : T[K] extends unknown[]
          ? {t: 'a'; items: Val_0103<T[K][number]>}
          : T[K] extends object
            ? {t: 'o'; props: Val_0103<T[K]>}
            : {t: 'u'};
};
type EV_0103 = Val_0103<Entity_01_03>;

interface Registry_01_03 {
  entities: Map<string, Entity_01_03>;
  validators: EV_0103;
  paths: Set<EP_0103>;
  merged: DeepMerge_0103<Entity_01_03, {extra0103: string}>;
}

type CK_0103 =
  `p01.t03.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type {
  Entity_01_03,
  Registry_01_03,
  CK_0103,
  EP_0103,
  EV_0103,
  DeepMerge_0103,
};
