// pkg-01/types-44 - heavy interconnected types

type DeepMerge_0144<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object
      ? U[K] extends object
        ? DeepMerge_0144<T[K], U[K]>
        : U[K]
      : U[K]
    : K extends keyof T
      ? T[K]
      : K extends keyof U
        ? U[K]
        : never;
};

interface Entity_01_44 {
  id: string;
  meta: {
    created: Date;
    updated: Date;
    version: number;
    tags: string[];
    attrs: Record<string, {v: unknown; t: string; ok: boolean}>;
  };
  rels: {parent: Entity_01_44 | null; children: Entity_01_44[]};
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
  d44: {x0144: number; y0144: string; z0144: boolean};
}

type Path_0144<T, D extends unknown[] = []> = D['length'] extends 6
  ? never
  : T extends object
    ? {
        [K in keyof T & string]: K | `${K}.${Path_0144<T[K], [...D, unknown]>}`;
      }[keyof T & string]
    : never;
type EP_0144 = Path_0144<Entity_01_44>;

type Val_0144<T> = {
  [K in keyof T]: T[K] extends string
    ? {t: 's'; min: number; max: number}
    : T[K] extends number
      ? {t: 'n'; min: number; max: number}
      : T[K] extends boolean
        ? {t: 'b'; def: boolean}
        : T[K] extends unknown[]
          ? {t: 'a'; items: Val_0144<T[K][number]>}
          : T[K] extends object
            ? {t: 'o'; props: Val_0144<T[K]>}
            : {t: 'u'};
};
type EV_0144 = Val_0144<Entity_01_44>;

interface Registry_01_44 {
  entities: Map<string, Entity_01_44>;
  validators: EV_0144;
  paths: Set<EP_0144>;
  merged: DeepMerge_0144<Entity_01_44, {extra0144: string}>;
}

type CK_0144 =
  `p01.t44.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type {
  Entity_01_44,
  Registry_01_44,
  CK_0144,
  EP_0144,
  EV_0144,
  DeepMerge_0144,
};
