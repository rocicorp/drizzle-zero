// pkg-01/types-09 - heavy interconnected types

type DeepMerge_0109<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object
      ? U[K] extends object
        ? DeepMerge_0109<T[K], U[K]>
        : U[K]
      : U[K]
    : K extends keyof T
      ? T[K]
      : K extends keyof U
        ? U[K]
        : never;
};

interface Entity_01_09 {
  id: string;
  meta: {
    created: Date;
    updated: Date;
    version: number;
    tags: string[];
    attrs: Record<string, {v: unknown; t: string; ok: boolean}>;
  };
  rels: {parent: Entity_01_09 | null; children: Entity_01_09[]};
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
  d09: {x0109: number; y0109: string; z0109: boolean};
}

type Path_0109<T, D extends unknown[] = []> = D['length'] extends 6
  ? never
  : T extends object
    ? {
        [K in keyof T & string]: K | `${K}.${Path_0109<T[K], [...D, unknown]>}`;
      }[keyof T & string]
    : never;
type EP_0109 = Path_0109<Entity_01_09>;

type Val_0109<T> = {
  [K in keyof T]: T[K] extends string
    ? {t: 's'; min: number; max: number}
    : T[K] extends number
      ? {t: 'n'; min: number; max: number}
      : T[K] extends boolean
        ? {t: 'b'; def: boolean}
        : T[K] extends unknown[]
          ? {t: 'a'; items: Val_0109<T[K][number]>}
          : T[K] extends object
            ? {t: 'o'; props: Val_0109<T[K]>}
            : {t: 'u'};
};
type EV_0109 = Val_0109<Entity_01_09>;

interface Registry_01_09 {
  entities: Map<string, Entity_01_09>;
  validators: EV_0109;
  paths: Set<EP_0109>;
  merged: DeepMerge_0109<Entity_01_09, {extra0109: string}>;
}

type CK_0109 =
  `p01.t09.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type {
  Entity_01_09,
  Registry_01_09,
  CK_0109,
  EP_0109,
  EV_0109,
  DeepMerge_0109,
};
