// pkg-01/types-27 - heavy interconnected types

type DeepMerge_0127<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object
      ? U[K] extends object
        ? DeepMerge_0127<T[K], U[K]>
        : U[K]
      : U[K]
    : K extends keyof T
      ? T[K]
      : K extends keyof U
        ? U[K]
        : never;
};

interface Entity_01_27 {
  id: string;
  meta: {
    created: Date;
    updated: Date;
    version: number;
    tags: string[];
    attrs: Record<string, {v: unknown; t: string; ok: boolean}>;
  };
  rels: {parent: Entity_01_27 | null; children: Entity_01_27[]};
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
  d27: {x0127: number; y0127: string; z0127: boolean};
}

type Path_0127<T, D extends unknown[] = []> = D['length'] extends 6
  ? never
  : T extends object
    ? {
        [K in keyof T & string]: K | `${K}.${Path_0127<T[K], [...D, unknown]>}`;
      }[keyof T & string]
    : never;
type EP_0127 = Path_0127<Entity_01_27>;

type Val_0127<T> = {
  [K in keyof T]: T[K] extends string
    ? {t: 's'; min: number; max: number}
    : T[K] extends number
      ? {t: 'n'; min: number; max: number}
      : T[K] extends boolean
        ? {t: 'b'; def: boolean}
        : T[K] extends unknown[]
          ? {t: 'a'; items: Val_0127<T[K][number]>}
          : T[K] extends object
            ? {t: 'o'; props: Val_0127<T[K]>}
            : {t: 'u'};
};
type EV_0127 = Val_0127<Entity_01_27>;

interface Registry_01_27 {
  entities: Map<string, Entity_01_27>;
  validators: EV_0127;
  paths: Set<EP_0127>;
  merged: DeepMerge_0127<Entity_01_27, {extra0127: string}>;
}

type CK_0127 =
  `p01.t27.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type {
  Entity_01_27,
  Registry_01_27,
  CK_0127,
  EP_0127,
  EV_0127,
  DeepMerge_0127,
};
