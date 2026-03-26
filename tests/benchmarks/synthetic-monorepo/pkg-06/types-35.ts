// pkg-06/types-35 - heavy interconnected types

import type {Entity_5_01, Registry_5_01} from '../pkg-05/types-01';
import type {Entity_5_10, Registry_5_10} from '../pkg-05/types-10';
import type {Entity_5_20, Registry_5_20} from '../pkg-05/types-20';
import type {Entity_4_01, Registry_4_01} from '../pkg-04/types-01';
import type {Entity_4_10, Registry_4_10} from '../pkg-04/types-10';
import type {Entity_4_20, Registry_4_20} from '../pkg-04/types-20';
import type {Entity_3_01, Registry_3_01} from '../pkg-03/types-01';
import type {Entity_3_10, Registry_3_10} from '../pkg-03/types-10';
import type {Entity_3_20, Registry_3_20} from '../pkg-03/types-20';

type DeepMerge_0635<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object
      ? U[K] extends object
        ? DeepMerge_0635<T[K], U[K]>
        : U[K]
      : U[K]
    : K extends keyof T
      ? T[K]
      : K extends keyof U
        ? U[K]
        : never;
};

interface Entity_06_35 {
  id: string;
  meta: {
    created: Date;
    updated: Date;
    version: number;
    tags: string[];
    attrs: Record<string, {v: unknown; t: string; ok: boolean}>;
  };
  rels: {parent: Entity_06_35 | null; children: Entity_06_35[]};
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
  d35: {x0635: number; y0635: string; z0635: boolean};
}

type Path_0635<T, D extends unknown[] = []> = D['length'] extends 6
  ? never
  : T extends object
    ? {
        [K in keyof T & string]: K | `${K}.${Path_0635<T[K], [...D, unknown]>}`;
      }[keyof T & string]
    : never;
type EP_0635 = Path_0635<Entity_06_35>;

type Val_0635<T> = {
  [K in keyof T]: T[K] extends string
    ? {t: 's'; min: number; max: number}
    : T[K] extends number
      ? {t: 'n'; min: number; max: number}
      : T[K] extends boolean
        ? {t: 'b'; def: boolean}
        : T[K] extends unknown[]
          ? {t: 'a'; items: Val_0635<T[K][number]>}
          : T[K] extends object
            ? {t: 'o'; props: Val_0635<T[K]>}
            : {t: 'u'};
};
type EV_0635 = Val_0635<Entity_06_35>;

interface Registry_06_35 {
  entities: Map<string, Entity_06_35>;
  validators: EV_0635;
  paths: Set<EP_0635>;
  merged: DeepMerge_0635<Entity_06_35, {extra0635: string}>;
}

type CK_0635 =
  `p06.t35.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type {
  Entity_06_35,
  Registry_06_35,
  CK_0635,
  EP_0635,
  EV_0635,
  DeepMerge_0635,
};
