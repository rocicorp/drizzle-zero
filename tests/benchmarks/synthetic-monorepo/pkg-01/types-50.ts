// pkg-01/types-50 - heavy interconnected types

type DeepMerge_0150<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object
      ? U[K] extends object
        ? DeepMerge_0150<T[K], U[K]>
        : U[K]
      : U[K]
    : K extends keyof T
      ? T[K]
      : K extends keyof U
        ? U[K]
        : never;
};

interface Entity_01_50 {
  id: string;
  meta: {
    created: Date;
    updated: Date;
    version: number;
    tags: string[];
    attrs: Record<string, {v: unknown; t: string; ok: boolean}>;
  };
  rels: {parent: Entity_01_50 | null; children: Entity_01_50[]};
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
  d50: {x0150: number; y0150: string; z0150: boolean};
}

type Path_0150<T, D extends unknown[] = []> = D['length'] extends 6
  ? never
  : T extends object
    ? {
        [K in keyof T & string]: K | `${K}.${Path_0150<T[K], [...D, unknown]>}`;
      }[keyof T & string]
    : never;
type EP_0150 = Path_0150<Entity_01_50>;

type Val_0150<T> = {
  [K in keyof T]: T[K] extends string
    ? {t: 's'; min: number; max: number}
    : T[K] extends number
      ? {t: 'n'; min: number; max: number}
      : T[K] extends boolean
        ? {t: 'b'; def: boolean}
        : T[K] extends unknown[]
          ? {t: 'a'; items: Val_0150<T[K][number]>}
          : T[K] extends object
            ? {t: 'o'; props: Val_0150<T[K]>}
            : {t: 'u'};
};
type EV_0150 = Val_0150<Entity_01_50>;

interface Registry_01_50 {
  entities: Map<string, Entity_01_50>;
  validators: EV_0150;
  paths: Set<EP_0150>;
  merged: DeepMerge_0150<Entity_01_50, {extra0150: string}>;
}

type CK_0150 =
  `p01.t50.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type {
  Entity_01_50,
  Registry_01_50,
  CK_0150,
  EP_0150,
  EV_0150,
  DeepMerge_0150,
};
