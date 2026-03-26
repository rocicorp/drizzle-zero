// pkg-01/types-22 - heavy interconnected types

type DeepMerge_0122<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object
      ? U[K] extends object
        ? DeepMerge_0122<T[K], U[K]>
        : U[K]
      : U[K]
    : K extends keyof T
      ? T[K]
      : K extends keyof U
        ? U[K]
        : never;
};

interface Entity_01_22 {
  id: string;
  meta: {
    created: Date;
    updated: Date;
    version: number;
    tags: string[];
    attrs: Record<string, {v: unknown; t: string; ok: boolean}>;
  };
  rels: {parent: Entity_01_22 | null; children: Entity_01_22[]};
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
  d22: {x0122: number; y0122: string; z0122: boolean};
}

type Path_0122<T, D extends unknown[] = []> = D['length'] extends 6
  ? never
  : T extends object
    ? {
        [K in keyof T & string]: K | `${K}.${Path_0122<T[K], [...D, unknown]>}`;
      }[keyof T & string]
    : never;
type EP_0122 = Path_0122<Entity_01_22>;

type Val_0122<T> = {
  [K in keyof T]: T[K] extends string
    ? {t: 's'; min: number; max: number}
    : T[K] extends number
      ? {t: 'n'; min: number; max: number}
      : T[K] extends boolean
        ? {t: 'b'; def: boolean}
        : T[K] extends unknown[]
          ? {t: 'a'; items: Val_0122<T[K][number]>}
          : T[K] extends object
            ? {t: 'o'; props: Val_0122<T[K]>}
            : {t: 'u'};
};
type EV_0122 = Val_0122<Entity_01_22>;

interface Registry_01_22 {
  entities: Map<string, Entity_01_22>;
  validators: EV_0122;
  paths: Set<EP_0122>;
  merged: DeepMerge_0122<Entity_01_22, {extra0122: string}>;
}

type CK_0122 =
  `p01.t22.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type {
  Entity_01_22,
  Registry_01_22,
  CK_0122,
  EP_0122,
  EV_0122,
  DeepMerge_0122,
};
