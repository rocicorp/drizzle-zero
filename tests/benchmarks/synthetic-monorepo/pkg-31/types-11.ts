// pkg-31/types-11 - heavy interconnected types

import type {Entity_30_01, Registry_30_01} from '../pkg-30/types-01';
import type {Entity_30_10, Registry_30_10} from '../pkg-30/types-10';
import type {Entity_30_20, Registry_30_20} from '../pkg-30/types-20';
import type {Entity_29_01, Registry_29_01} from '../pkg-29/types-01';
import type {Entity_29_10, Registry_29_10} from '../pkg-29/types-10';
import type {Entity_29_20, Registry_29_20} from '../pkg-29/types-20';
import type {Entity_28_01, Registry_28_01} from '../pkg-28/types-01';
import type {Entity_28_10, Registry_28_10} from '../pkg-28/types-10';
import type {Entity_28_20, Registry_28_20} from '../pkg-28/types-20';

type DeepMerge_3111<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object
      ? U[K] extends object
        ? DeepMerge_3111<T[K], U[K]>
        : U[K]
      : U[K]
    : K extends keyof T
      ? T[K]
      : K extends keyof U
        ? U[K]
        : never;
};

interface Entity_31_11 {
  id: string;
  meta: {
    created: Date;
    updated: Date;
    version: number;
    tags: string[];
    attrs: Record<string, {v: unknown; t: string; ok: boolean}>;
  };
  rels: {parent: Entity_31_11 | null; children: Entity_31_11[]};
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
  d11: {x3111: number; y3111: string; z3111: boolean};
}

type Path_3111<T, D extends unknown[] = []> = D['length'] extends 6
  ? never
  : T extends object
    ? {
        [K in keyof T & string]: K | `${K}.${Path_3111<T[K], [...D, unknown]>}`;
      }[keyof T & string]
    : never;
type EP_3111 = Path_3111<Entity_31_11>;

type Val_3111<T> = {
  [K in keyof T]: T[K] extends string
    ? {t: 's'; min: number; max: number}
    : T[K] extends number
      ? {t: 'n'; min: number; max: number}
      : T[K] extends boolean
        ? {t: 'b'; def: boolean}
        : T[K] extends unknown[]
          ? {t: 'a'; items: Val_3111<T[K][number]>}
          : T[K] extends object
            ? {t: 'o'; props: Val_3111<T[K]>}
            : {t: 'u'};
};
type EV_3111 = Val_3111<Entity_31_11>;

interface Registry_31_11 {
  entities: Map<string, Entity_31_11>;
  validators: EV_3111;
  paths: Set<EP_3111>;
  merged: DeepMerge_3111<Entity_31_11, {extra3111: string}>;
}

type CK_3111 =
  `p31.t11.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type {
  Entity_31_11,
  Registry_31_11,
  CK_3111,
  EP_3111,
  EV_3111,
  DeepMerge_3111,
};
