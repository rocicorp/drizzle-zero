// pkg-01/types-31 - heavy interconnected types

type DeepMerge_0131<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object
      ? U[K] extends object
        ? DeepMerge_0131<T[K], U[K]>
        : U[K]
      : U[K]
    : K extends keyof T
      ? T[K]
      : K extends keyof U
        ? U[K]
        : never;
};

interface Entity_01_31 {
  id: string;
  meta: {
    created: Date;
    updated: Date;
    version: number;
    tags: string[];
    attrs: Record<string, {v: unknown; t: string; ok: boolean}>;
  };
  rels: {parent: Entity_01_31 | null; children: Entity_01_31[]};
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
  d31: {x0131: number; y0131: string; z0131: boolean};
}

type Path_0131<T, D extends unknown[] = []> = D['length'] extends 6
  ? never
  : T extends object
    ? {
        [K in keyof T & string]: K | `${K}.${Path_0131<T[K], [...D, unknown]>}`;
      }[keyof T & string]
    : never;
type EP_0131 = Path_0131<Entity_01_31>;

type Val_0131<T> = {
  [K in keyof T]: T[K] extends string
    ? {t: 's'; min: number; max: number}
    : T[K] extends number
      ? {t: 'n'; min: number; max: number}
      : T[K] extends boolean
        ? {t: 'b'; def: boolean}
        : T[K] extends unknown[]
          ? {t: 'a'; items: Val_0131<T[K][number]>}
          : T[K] extends object
            ? {t: 'o'; props: Val_0131<T[K]>}
            : {t: 'u'};
};
type EV_0131 = Val_0131<Entity_01_31>;

interface Registry_01_31 {
  entities: Map<string, Entity_01_31>;
  validators: EV_0131;
  paths: Set<EP_0131>;
  merged: DeepMerge_0131<Entity_01_31, {extra0131: string}>;
}

type CK_0131 =
  `p01.t31.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type {
  Entity_01_31,
  Registry_01_31,
  CK_0131,
  EP_0131,
  EV_0131,
  DeepMerge_0131,
};
