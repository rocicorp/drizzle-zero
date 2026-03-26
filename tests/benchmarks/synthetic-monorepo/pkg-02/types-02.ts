// pkg-02/types-02 - heavy interconnected types

import type {Entity_1_01, Registry_1_01} from '../pkg-01/types-01';
import type {Entity_1_10, Registry_1_10} from '../pkg-01/types-10';
import type {Entity_1_20, Registry_1_20} from '../pkg-01/types-20';

type DeepMerge_0202<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object
      ? U[K] extends object
        ? DeepMerge_0202<T[K], U[K]>
        : U[K]
      : U[K]
    : K extends keyof T
      ? T[K]
      : K extends keyof U
        ? U[K]
        : never;
};

interface Entity_02_02 {
  id: string;
  meta: {
    created: Date;
    updated: Date;
    version: number;
    tags: string[];
    attrs: Record<string, {v: unknown; t: string; ok: boolean}>;
  };
  rels: {parent: Entity_02_02 | null; children: Entity_02_02[]};
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
  d02: {x0202: number; y0202: string; z0202: boolean};
}

type Path_0202<T, D extends unknown[] = []> = D['length'] extends 6
  ? never
  : T extends object
    ? {
        [K in keyof T & string]: K | `${K}.${Path_0202<T[K], [...D, unknown]>}`;
      }[keyof T & string]
    : never;
type EP_0202 = Path_0202<Entity_02_02>;

type Val_0202<T> = {
  [K in keyof T]: T[K] extends string
    ? {t: 's'; min: number; max: number}
    : T[K] extends number
      ? {t: 'n'; min: number; max: number}
      : T[K] extends boolean
        ? {t: 'b'; def: boolean}
        : T[K] extends unknown[]
          ? {t: 'a'; items: Val_0202<T[K][number]>}
          : T[K] extends object
            ? {t: 'o'; props: Val_0202<T[K]>}
            : {t: 'u'};
};
type EV_0202 = Val_0202<Entity_02_02>;

interface Registry_02_02 {
  entities: Map<string, Entity_02_02>;
  validators: EV_0202;
  paths: Set<EP_0202>;
  merged: DeepMerge_0202<Entity_02_02, {extra0202: string}>;
}

type CK_0202 =
  `p02.t02.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type {
  Entity_02_02,
  Registry_02_02,
  CK_0202,
  EP_0202,
  EV_0202,
  DeepMerge_0202,
};
