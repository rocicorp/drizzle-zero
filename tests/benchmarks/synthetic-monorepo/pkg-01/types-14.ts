// pkg-01/types-14 - heavy interconnected types

type DeepMerge_0114<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object
      ? U[K] extends object
        ? DeepMerge_0114<T[K], U[K]>
        : U[K]
      : U[K]
    : K extends keyof T
      ? T[K]
      : K extends keyof U
        ? U[K]
        : never;
};

interface Entity_01_14 {
  id: string;
  meta: {
    created: Date;
    updated: Date;
    version: number;
    tags: string[];
    attrs: Record<string, {v: unknown; t: string; ok: boolean}>;
  };
  rels: {parent: Entity_01_14 | null; children: Entity_01_14[]};
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
  d14: {x0114: number; y0114: string; z0114: boolean};
}

type Path_0114<T, D extends unknown[] = []> = D['length'] extends 6
  ? never
  : T extends object
    ? {
        [K in keyof T & string]: K | `${K}.${Path_0114<T[K], [...D, unknown]>}`;
      }[keyof T & string]
    : never;
type EP_0114 = Path_0114<Entity_01_14>;

type Val_0114<T> = {
  [K in keyof T]: T[K] extends string
    ? {t: 's'; min: number; max: number}
    : T[K] extends number
      ? {t: 'n'; min: number; max: number}
      : T[K] extends boolean
        ? {t: 'b'; def: boolean}
        : T[K] extends unknown[]
          ? {t: 'a'; items: Val_0114<T[K][number]>}
          : T[K] extends object
            ? {t: 'o'; props: Val_0114<T[K]>}
            : {t: 'u'};
};
type EV_0114 = Val_0114<Entity_01_14>;

interface Registry_01_14 {
  entities: Map<string, Entity_01_14>;
  validators: EV_0114;
  paths: Set<EP_0114>;
  merged: DeepMerge_0114<Entity_01_14, {extra0114: string}>;
}

type CK_0114 =
  `p01.t14.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type {
  Entity_01_14,
  Registry_01_14,
  CK_0114,
  EP_0114,
  EV_0114,
  DeepMerge_0114,
};
