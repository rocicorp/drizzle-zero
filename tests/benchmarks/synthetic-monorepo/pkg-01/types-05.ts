// pkg-01/types-05 - heavy interconnected types

type DeepMerge_0105<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object
      ? U[K] extends object
        ? DeepMerge_0105<T[K], U[K]>
        : U[K]
      : U[K]
    : K extends keyof T
      ? T[K]
      : K extends keyof U
        ? U[K]
        : never;
};

interface Entity_01_05 {
  id: string;
  meta: {
    created: Date;
    updated: Date;
    version: number;
    tags: string[];
    attrs: Record<string, {v: unknown; t: string; ok: boolean}>;
  };
  rels: {parent: Entity_01_05 | null; children: Entity_01_05[]};
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
  d05: {x0105: number; y0105: string; z0105: boolean};
}

type Path_0105<T, D extends unknown[] = []> = D['length'] extends 6
  ? never
  : T extends object
    ? {
        [K in keyof T & string]: K | `${K}.${Path_0105<T[K], [...D, unknown]>}`;
      }[keyof T & string]
    : never;
type EP_0105 = Path_0105<Entity_01_05>;

type Val_0105<T> = {
  [K in keyof T]: T[K] extends string
    ? {t: 's'; min: number; max: number}
    : T[K] extends number
      ? {t: 'n'; min: number; max: number}
      : T[K] extends boolean
        ? {t: 'b'; def: boolean}
        : T[K] extends unknown[]
          ? {t: 'a'; items: Val_0105<T[K][number]>}
          : T[K] extends object
            ? {t: 'o'; props: Val_0105<T[K]>}
            : {t: 'u'};
};
type EV_0105 = Val_0105<Entity_01_05>;

interface Registry_01_05 {
  entities: Map<string, Entity_01_05>;
  validators: EV_0105;
  paths: Set<EP_0105>;
  merged: DeepMerge_0105<Entity_01_05, {extra0105: string}>;
}

type CK_0105 =
  `p01.t05.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type {
  Entity_01_05,
  Registry_01_05,
  CK_0105,
  EP_0105,
  EV_0105,
  DeepMerge_0105,
};
