// pkg-25/types-31 - heavy interconnected types

import type {Entity_24_01, Registry_24_01} from '../pkg-24/types-01';
import type {Entity_24_10, Registry_24_10} from '../pkg-24/types-10';
import type {Entity_24_20, Registry_24_20} from '../pkg-24/types-20';
import type {Entity_23_01, Registry_23_01} from '../pkg-23/types-01';
import type {Entity_23_10, Registry_23_10} from '../pkg-23/types-10';
import type {Entity_23_20, Registry_23_20} from '../pkg-23/types-20';
import type {Entity_22_01, Registry_22_01} from '../pkg-22/types-01';
import type {Entity_22_10, Registry_22_10} from '../pkg-22/types-10';
import type {Entity_22_20, Registry_22_20} from '../pkg-22/types-20';

type DeepMerge_2531<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object
      ? U[K] extends object
        ? DeepMerge_2531<T[K], U[K]>
        : U[K]
      : U[K]
    : K extends keyof T
      ? T[K]
      : K extends keyof U
        ? U[K]
        : never;
};

interface Entity_25_31 {
  id: string;
  meta: {
    created: Date;
    updated: Date;
    version: number;
    tags: string[];
    attrs: Record<string, {v: unknown; t: string; ok: boolean}>;
  };
  rels: {parent: Entity_25_31 | null; children: Entity_25_31[]};
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
  d31: {x2531: number; y2531: string; z2531: boolean};
}

type Path_2531<T, D extends unknown[] = []> = D['length'] extends 6
  ? never
  : T extends object
    ? {
        [K in keyof T & string]: K | `${K}.${Path_2531<T[K], [...D, unknown]>}`;
      }[keyof T & string]
    : never;
type EP_2531 = Path_2531<Entity_25_31>;

type Val_2531<T> = {
  [K in keyof T]: T[K] extends string
    ? {t: 's'; min: number; max: number}
    : T[K] extends number
      ? {t: 'n'; min: number; max: number}
      : T[K] extends boolean
        ? {t: 'b'; def: boolean}
        : T[K] extends unknown[]
          ? {t: 'a'; items: Val_2531<T[K][number]>}
          : T[K] extends object
            ? {t: 'o'; props: Val_2531<T[K]>}
            : {t: 'u'};
};
type EV_2531 = Val_2531<Entity_25_31>;

interface Registry_25_31 {
  entities: Map<string, Entity_25_31>;
  validators: EV_2531;
  paths: Set<EP_2531>;
  merged: DeepMerge_2531<Entity_25_31, {extra2531: string}>;
}

type CK_2531 =
  `p25.t31.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type {
  Entity_25_31,
  Registry_25_31,
  CK_2531,
  EP_2531,
  EV_2531,
  DeepMerge_2531,
};
