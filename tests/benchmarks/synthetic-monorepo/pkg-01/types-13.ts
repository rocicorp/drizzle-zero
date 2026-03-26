// pkg-01/types-13 - heavy interconnected types

type DeepMerge_0113<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object
      ? U[K] extends object
        ? DeepMerge_0113<T[K], U[K]>
        : U[K]
      : U[K]
    : K extends keyof T
      ? T[K]
      : K extends keyof U
        ? U[K]
        : never;
};

interface Entity_01_13 {
  id: string;
  meta: {
    created: Date;
    updated: Date;
    version: number;
    tags: string[];
    attrs: Record<string, {v: unknown; t: string; ok: boolean}>;
  };
  rels: {parent: Entity_01_13 | null; children: Entity_01_13[]};
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
  d13: {x0113: number; y0113: string; z0113: boolean};
}

type Path_0113<T, D extends unknown[] = []> = D['length'] extends 6
  ? never
  : T extends object
    ? {
        [K in keyof T & string]: K | `${K}.${Path_0113<T[K], [...D, unknown]>}`;
      }[keyof T & string]
    : never;
type EP_0113 = Path_0113<Entity_01_13>;

type Val_0113<T> = {
  [K in keyof T]: T[K] extends string
    ? {t: 's'; min: number; max: number}
    : T[K] extends number
      ? {t: 'n'; min: number; max: number}
      : T[K] extends boolean
        ? {t: 'b'; def: boolean}
        : T[K] extends unknown[]
          ? {t: 'a'; items: Val_0113<T[K][number]>}
          : T[K] extends object
            ? {t: 'o'; props: Val_0113<T[K]>}
            : {t: 'u'};
};
type EV_0113 = Val_0113<Entity_01_13>;

interface Registry_01_13 {
  entities: Map<string, Entity_01_13>;
  validators: EV_0113;
  paths: Set<EP_0113>;
  merged: DeepMerge_0113<Entity_01_13, {extra0113: string}>;
}

type CK_0113 =
  `p01.t13.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type {
  Entity_01_13,
  Registry_01_13,
  CK_0113,
  EP_0113,
  EV_0113,
  DeepMerge_0113,
};
