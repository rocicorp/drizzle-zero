// pkg-01/types-23 - heavy interconnected types

type DeepMerge_0123<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object
      ? U[K] extends object
        ? DeepMerge_0123<T[K], U[K]>
        : U[K]
      : U[K]
    : K extends keyof T
      ? T[K]
      : K extends keyof U
        ? U[K]
        : never;
};

interface Entity_01_23 {
  id: string;
  meta: {
    created: Date;
    updated: Date;
    version: number;
    tags: string[];
    attrs: Record<string, {v: unknown; t: string; ok: boolean}>;
  };
  rels: {parent: Entity_01_23 | null; children: Entity_01_23[]};
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
  d23: {x0123: number; y0123: string; z0123: boolean};
}

type Path_0123<T, D extends unknown[] = []> = D['length'] extends 6
  ? never
  : T extends object
    ? {
        [K in keyof T & string]: K | `${K}.${Path_0123<T[K], [...D, unknown]>}`;
      }[keyof T & string]
    : never;
type EP_0123 = Path_0123<Entity_01_23>;

type Val_0123<T> = {
  [K in keyof T]: T[K] extends string
    ? {t: 's'; min: number; max: number}
    : T[K] extends number
      ? {t: 'n'; min: number; max: number}
      : T[K] extends boolean
        ? {t: 'b'; def: boolean}
        : T[K] extends unknown[]
          ? {t: 'a'; items: Val_0123<T[K][number]>}
          : T[K] extends object
            ? {t: 'o'; props: Val_0123<T[K]>}
            : {t: 'u'};
};
type EV_0123 = Val_0123<Entity_01_23>;

interface Registry_01_23 {
  entities: Map<string, Entity_01_23>;
  validators: EV_0123;
  paths: Set<EP_0123>;
  merged: DeepMerge_0123<Entity_01_23, {extra0123: string}>;
}

type CK_0123 =
  `p01.t23.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type {
  Entity_01_23,
  Registry_01_23,
  CK_0123,
  EP_0123,
  EV_0123,
  DeepMerge_0123,
};
