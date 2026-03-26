// pkg-01/types-15 - heavy interconnected types

type DeepMerge_0115<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object
      ? U[K] extends object
        ? DeepMerge_0115<T[K], U[K]>
        : U[K]
      : U[K]
    : K extends keyof T
      ? T[K]
      : K extends keyof U
        ? U[K]
        : never;
};

interface Entity_01_15 {
  id: string;
  meta: {
    created: Date;
    updated: Date;
    version: number;
    tags: string[];
    attrs: Record<string, {v: unknown; t: string; ok: boolean}>;
  };
  rels: {parent: Entity_01_15 | null; children: Entity_01_15[]};
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
  d15: {x0115: number; y0115: string; z0115: boolean};
}

type Path_0115<T, D extends unknown[] = []> = D['length'] extends 6
  ? never
  : T extends object
    ? {
        [K in keyof T & string]: K | `${K}.${Path_0115<T[K], [...D, unknown]>}`;
      }[keyof T & string]
    : never;
type EP_0115 = Path_0115<Entity_01_15>;

type Val_0115<T> = {
  [K in keyof T]: T[K] extends string
    ? {t: 's'; min: number; max: number}
    : T[K] extends number
      ? {t: 'n'; min: number; max: number}
      : T[K] extends boolean
        ? {t: 'b'; def: boolean}
        : T[K] extends unknown[]
          ? {t: 'a'; items: Val_0115<T[K][number]>}
          : T[K] extends object
            ? {t: 'o'; props: Val_0115<T[K]>}
            : {t: 'u'};
};
type EV_0115 = Val_0115<Entity_01_15>;

interface Registry_01_15 {
  entities: Map<string, Entity_01_15>;
  validators: EV_0115;
  paths: Set<EP_0115>;
  merged: DeepMerge_0115<Entity_01_15, {extra0115: string}>;
}

type CK_0115 =
  `p01.t15.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type {
  Entity_01_15,
  Registry_01_15,
  CK_0115,
  EP_0115,
  EV_0115,
  DeepMerge_0115,
};
