// pkg-01/types-16 - heavy interconnected types

type DeepMerge_0116<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object
      ? U[K] extends object
        ? DeepMerge_0116<T[K], U[K]>
        : U[K]
      : U[K]
    : K extends keyof T
      ? T[K]
      : K extends keyof U
        ? U[K]
        : never;
};

interface Entity_01_16 {
  id: string;
  meta: {
    created: Date;
    updated: Date;
    version: number;
    tags: string[];
    attrs: Record<string, {v: unknown; t: string; ok: boolean}>;
  };
  rels: {parent: Entity_01_16 | null; children: Entity_01_16[]};
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
  d16: {x0116: number; y0116: string; z0116: boolean};
}

type Path_0116<T, D extends unknown[] = []> = D['length'] extends 6
  ? never
  : T extends object
    ? {
        [K in keyof T & string]: K | `${K}.${Path_0116<T[K], [...D, unknown]>}`;
      }[keyof T & string]
    : never;
type EP_0116 = Path_0116<Entity_01_16>;

type Val_0116<T> = {
  [K in keyof T]: T[K] extends string
    ? {t: 's'; min: number; max: number}
    : T[K] extends number
      ? {t: 'n'; min: number; max: number}
      : T[K] extends boolean
        ? {t: 'b'; def: boolean}
        : T[K] extends unknown[]
          ? {t: 'a'; items: Val_0116<T[K][number]>}
          : T[K] extends object
            ? {t: 'o'; props: Val_0116<T[K]>}
            : {t: 'u'};
};
type EV_0116 = Val_0116<Entity_01_16>;

interface Registry_01_16 {
  entities: Map<string, Entity_01_16>;
  validators: EV_0116;
  paths: Set<EP_0116>;
  merged: DeepMerge_0116<Entity_01_16, {extra0116: string}>;
}

type CK_0116 =
  `p01.t16.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type {
  Entity_01_16,
  Registry_01_16,
  CK_0116,
  EP_0116,
  EV_0116,
  DeepMerge_0116,
};
