// pkg-01/types-32 - heavy interconnected types

type DeepMerge_0132<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object
      ? U[K] extends object
        ? DeepMerge_0132<T[K], U[K]>
        : U[K]
      : U[K]
    : K extends keyof T
      ? T[K]
      : K extends keyof U
        ? U[K]
        : never;
};

interface Entity_01_32 {
  id: string;
  meta: {
    created: Date;
    updated: Date;
    version: number;
    tags: string[];
    attrs: Record<string, {v: unknown; t: string; ok: boolean}>;
  };
  rels: {parent: Entity_01_32 | null; children: Entity_01_32[]};
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
  d32: {x0132: number; y0132: string; z0132: boolean};
}

type Path_0132<T, D extends unknown[] = []> = D['length'] extends 6
  ? never
  : T extends object
    ? {
        [K in keyof T & string]: K | `${K}.${Path_0132<T[K], [...D, unknown]>}`;
      }[keyof T & string]
    : never;
type EP_0132 = Path_0132<Entity_01_32>;

type Val_0132<T> = {
  [K in keyof T]: T[K] extends string
    ? {t: 's'; min: number; max: number}
    : T[K] extends number
      ? {t: 'n'; min: number; max: number}
      : T[K] extends boolean
        ? {t: 'b'; def: boolean}
        : T[K] extends unknown[]
          ? {t: 'a'; items: Val_0132<T[K][number]>}
          : T[K] extends object
            ? {t: 'o'; props: Val_0132<T[K]>}
            : {t: 'u'};
};
type EV_0132 = Val_0132<Entity_01_32>;

interface Registry_01_32 {
  entities: Map<string, Entity_01_32>;
  validators: EV_0132;
  paths: Set<EP_0132>;
  merged: DeepMerge_0132<Entity_01_32, {extra0132: string}>;
}

type CK_0132 =
  `p01.t32.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type {
  Entity_01_32,
  Registry_01_32,
  CK_0132,
  EP_0132,
  EV_0132,
  DeepMerge_0132,
};
