// pkg-01/types-47 - heavy interconnected types

type DeepMerge_0147<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object
      ? U[K] extends object
        ? DeepMerge_0147<T[K], U[K]>
        : U[K]
      : U[K]
    : K extends keyof T
      ? T[K]
      : K extends keyof U
        ? U[K]
        : never;
};

interface Entity_01_47 {
  id: string;
  meta: {
    created: Date;
    updated: Date;
    version: number;
    tags: string[];
    attrs: Record<string, {v: unknown; t: string; ok: boolean}>;
  };
  rels: {parent: Entity_01_47 | null; children: Entity_01_47[]};
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
  d47: {x0147: number; y0147: string; z0147: boolean};
}

type Path_0147<T, D extends unknown[] = []> = D['length'] extends 6
  ? never
  : T extends object
    ? {
        [K in keyof T & string]: K | `${K}.${Path_0147<T[K], [...D, unknown]>}`;
      }[keyof T & string]
    : never;
type EP_0147 = Path_0147<Entity_01_47>;

type Val_0147<T> = {
  [K in keyof T]: T[K] extends string
    ? {t: 's'; min: number; max: number}
    : T[K] extends number
      ? {t: 'n'; min: number; max: number}
      : T[K] extends boolean
        ? {t: 'b'; def: boolean}
        : T[K] extends unknown[]
          ? {t: 'a'; items: Val_0147<T[K][number]>}
          : T[K] extends object
            ? {t: 'o'; props: Val_0147<T[K]>}
            : {t: 'u'};
};
type EV_0147 = Val_0147<Entity_01_47>;

interface Registry_01_47 {
  entities: Map<string, Entity_01_47>;
  validators: EV_0147;
  paths: Set<EP_0147>;
  merged: DeepMerge_0147<Entity_01_47, {extra0147: string}>;
}

type CK_0147 =
  `p01.t47.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type {
  Entity_01_47,
  Registry_01_47,
  CK_0147,
  EP_0147,
  EV_0147,
  DeepMerge_0147,
};
