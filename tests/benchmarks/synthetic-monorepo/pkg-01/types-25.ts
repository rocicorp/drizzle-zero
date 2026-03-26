// pkg-01/types-25 - heavy interconnected types

type DeepMerge_0125<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object
      ? U[K] extends object
        ? DeepMerge_0125<T[K], U[K]>
        : U[K]
      : U[K]
    : K extends keyof T
      ? T[K]
      : K extends keyof U
        ? U[K]
        : never;
};

interface Entity_01_25 {
  id: string;
  meta: {
    created: Date;
    updated: Date;
    version: number;
    tags: string[];
    attrs: Record<string, {v: unknown; t: string; ok: boolean}>;
  };
  rels: {parent: Entity_01_25 | null; children: Entity_01_25[]};
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
  d25: {x0125: number; y0125: string; z0125: boolean};
}

type Path_0125<T, D extends unknown[] = []> = D['length'] extends 6
  ? never
  : T extends object
    ? {
        [K in keyof T & string]: K | `${K}.${Path_0125<T[K], [...D, unknown]>}`;
      }[keyof T & string]
    : never;
type EP_0125 = Path_0125<Entity_01_25>;

type Val_0125<T> = {
  [K in keyof T]: T[K] extends string
    ? {t: 's'; min: number; max: number}
    : T[K] extends number
      ? {t: 'n'; min: number; max: number}
      : T[K] extends boolean
        ? {t: 'b'; def: boolean}
        : T[K] extends unknown[]
          ? {t: 'a'; items: Val_0125<T[K][number]>}
          : T[K] extends object
            ? {t: 'o'; props: Val_0125<T[K]>}
            : {t: 'u'};
};
type EV_0125 = Val_0125<Entity_01_25>;

interface Registry_01_25 {
  entities: Map<string, Entity_01_25>;
  validators: EV_0125;
  paths: Set<EP_0125>;
  merged: DeepMerge_0125<Entity_01_25, {extra0125: string}>;
}

type CK_0125 =
  `p01.t25.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type {
  Entity_01_25,
  Registry_01_25,
  CK_0125,
  EP_0125,
  EV_0125,
  DeepMerge_0125,
};
