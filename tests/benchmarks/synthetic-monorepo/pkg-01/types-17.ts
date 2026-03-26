// pkg-01/types-17 - heavy interconnected types

type DeepMerge_0117<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object
      ? U[K] extends object
        ? DeepMerge_0117<T[K], U[K]>
        : U[K]
      : U[K]
    : K extends keyof T
      ? T[K]
      : K extends keyof U
        ? U[K]
        : never;
};

interface Entity_01_17 {
  id: string;
  meta: {
    created: Date;
    updated: Date;
    version: number;
    tags: string[];
    attrs: Record<string, {v: unknown; t: string; ok: boolean}>;
  };
  rels: {parent: Entity_01_17 | null; children: Entity_01_17[]};
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
  d17: {x0117: number; y0117: string; z0117: boolean};
}

type Path_0117<T, D extends unknown[] = []> = D['length'] extends 6
  ? never
  : T extends object
    ? {
        [K in keyof T & string]: K | `${K}.${Path_0117<T[K], [...D, unknown]>}`;
      }[keyof T & string]
    : never;
type EP_0117 = Path_0117<Entity_01_17>;

type Val_0117<T> = {
  [K in keyof T]: T[K] extends string
    ? {t: 's'; min: number; max: number}
    : T[K] extends number
      ? {t: 'n'; min: number; max: number}
      : T[K] extends boolean
        ? {t: 'b'; def: boolean}
        : T[K] extends unknown[]
          ? {t: 'a'; items: Val_0117<T[K][number]>}
          : T[K] extends object
            ? {t: 'o'; props: Val_0117<T[K]>}
            : {t: 'u'};
};
type EV_0117 = Val_0117<Entity_01_17>;

interface Registry_01_17 {
  entities: Map<string, Entity_01_17>;
  validators: EV_0117;
  paths: Set<EP_0117>;
  merged: DeepMerge_0117<Entity_01_17, {extra0117: string}>;
}

type CK_0117 =
  `p01.t17.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type {
  Entity_01_17,
  Registry_01_17,
  CK_0117,
  EP_0117,
  EV_0117,
  DeepMerge_0117,
};
