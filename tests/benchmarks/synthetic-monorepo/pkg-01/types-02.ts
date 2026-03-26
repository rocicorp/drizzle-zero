// pkg-01/types-02 - heavy interconnected types

type DeepMerge_0102<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object
      ? U[K] extends object
        ? DeepMerge_0102<T[K], U[K]>
        : U[K]
      : U[K]
    : K extends keyof T
      ? T[K]
      : K extends keyof U
        ? U[K]
        : never;
};

interface Entity_01_02 {
  id: string;
  meta: {
    created: Date;
    updated: Date;
    version: number;
    tags: string[];
    attrs: Record<string, {v: unknown; t: string; ok: boolean}>;
  };
  rels: {parent: Entity_01_02 | null; children: Entity_01_02[]};
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
  d02: {x0102: number; y0102: string; z0102: boolean};
}

type Path_0102<T, D extends unknown[] = []> = D['length'] extends 6
  ? never
  : T extends object
    ? {
        [K in keyof T & string]: K | `${K}.${Path_0102<T[K], [...D, unknown]>}`;
      }[keyof T & string]
    : never;
type EP_0102 = Path_0102<Entity_01_02>;

type Val_0102<T> = {
  [K in keyof T]: T[K] extends string
    ? {t: 's'; min: number; max: number}
    : T[K] extends number
      ? {t: 'n'; min: number; max: number}
      : T[K] extends boolean
        ? {t: 'b'; def: boolean}
        : T[K] extends unknown[]
          ? {t: 'a'; items: Val_0102<T[K][number]>}
          : T[K] extends object
            ? {t: 'o'; props: Val_0102<T[K]>}
            : {t: 'u'};
};
type EV_0102 = Val_0102<Entity_01_02>;

interface Registry_01_02 {
  entities: Map<string, Entity_01_02>;
  validators: EV_0102;
  paths: Set<EP_0102>;
  merged: DeepMerge_0102<Entity_01_02, {extra0102: string}>;
}

type CK_0102 =
  `p01.t02.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type {
  Entity_01_02,
  Registry_01_02,
  CK_0102,
  EP_0102,
  EV_0102,
  DeepMerge_0102,
};
