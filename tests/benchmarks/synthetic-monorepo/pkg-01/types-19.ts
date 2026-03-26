// pkg-01/types-19 - heavy interconnected types

type DeepMerge_0119<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object
      ? U[K] extends object
        ? DeepMerge_0119<T[K], U[K]>
        : U[K]
      : U[K]
    : K extends keyof T
      ? T[K]
      : K extends keyof U
        ? U[K]
        : never;
};

interface Entity_01_19 {
  id: string;
  meta: {
    created: Date;
    updated: Date;
    version: number;
    tags: string[];
    attrs: Record<string, {v: unknown; t: string; ok: boolean}>;
  };
  rels: {parent: Entity_01_19 | null; children: Entity_01_19[]};
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
  d19: {x0119: number; y0119: string; z0119: boolean};
}

type Path_0119<T, D extends unknown[] = []> = D['length'] extends 6
  ? never
  : T extends object
    ? {
        [K in keyof T & string]: K | `${K}.${Path_0119<T[K], [...D, unknown]>}`;
      }[keyof T & string]
    : never;
type EP_0119 = Path_0119<Entity_01_19>;

type Val_0119<T> = {
  [K in keyof T]: T[K] extends string
    ? {t: 's'; min: number; max: number}
    : T[K] extends number
      ? {t: 'n'; min: number; max: number}
      : T[K] extends boolean
        ? {t: 'b'; def: boolean}
        : T[K] extends unknown[]
          ? {t: 'a'; items: Val_0119<T[K][number]>}
          : T[K] extends object
            ? {t: 'o'; props: Val_0119<T[K]>}
            : {t: 'u'};
};
type EV_0119 = Val_0119<Entity_01_19>;

interface Registry_01_19 {
  entities: Map<string, Entity_01_19>;
  validators: EV_0119;
  paths: Set<EP_0119>;
  merged: DeepMerge_0119<Entity_01_19, {extra0119: string}>;
}

type CK_0119 =
  `p01.t19.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type {
  Entity_01_19,
  Registry_01_19,
  CK_0119,
  EP_0119,
  EV_0119,
  DeepMerge_0119,
};
