// pkg-03/types-06 - heavy interconnected types

import type {Entity_2_01, Registry_2_01} from '../pkg-02/types-01';
import type {Entity_2_10, Registry_2_10} from '../pkg-02/types-10';
import type {Entity_2_20, Registry_2_20} from '../pkg-02/types-20';
import type {Entity_1_01, Registry_1_01} from '../pkg-01/types-01';
import type {Entity_1_10, Registry_1_10} from '../pkg-01/types-10';
import type {Entity_1_20, Registry_1_20} from '../pkg-01/types-20';

type DeepMerge_0306<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object
      ? U[K] extends object
        ? DeepMerge_0306<T[K], U[K]>
        : U[K]
      : U[K]
    : K extends keyof T
      ? T[K]
      : K extends keyof U
        ? U[K]
        : never;
};

interface Entity_03_06 {
  id: string;
  meta: {
    created: Date;
    updated: Date;
    version: number;
    tags: string[];
    attrs: Record<string, {v: unknown; t: string; ok: boolean}>;
  };
  rels: {parent: Entity_03_06 | null; children: Entity_03_06[]};
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
  d06: {x0306: number; y0306: string; z0306: boolean};
}

type Path_0306<T, D extends unknown[] = []> = D['length'] extends 6
  ? never
  : T extends object
    ? {
        [K in keyof T & string]: K | `${K}.${Path_0306<T[K], [...D, unknown]>}`;
      }[keyof T & string]
    : never;
type EP_0306 = Path_0306<Entity_03_06>;

type Val_0306<T> = {
  [K in keyof T]: T[K] extends string
    ? {t: 's'; min: number; max: number}
    : T[K] extends number
      ? {t: 'n'; min: number; max: number}
      : T[K] extends boolean
        ? {t: 'b'; def: boolean}
        : T[K] extends unknown[]
          ? {t: 'a'; items: Val_0306<T[K][number]>}
          : T[K] extends object
            ? {t: 'o'; props: Val_0306<T[K]>}
            : {t: 'u'};
};
type EV_0306 = Val_0306<Entity_03_06>;

interface Registry_03_06 {
  entities: Map<string, Entity_03_06>;
  validators: EV_0306;
  paths: Set<EP_0306>;
  merged: DeepMerge_0306<Entity_03_06, {extra0306: string}>;
}

type CK_0306 =
  `p03.t06.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type {
  Entity_03_06,
  Registry_03_06,
  CK_0306,
  EP_0306,
  EV_0306,
  DeepMerge_0306,
};
