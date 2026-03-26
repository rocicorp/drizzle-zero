// pkg-24/types-22 - heavy interconnected types

import type {Entity_23_01, Registry_23_01} from '../pkg-23/types-01';
import type {Entity_23_10, Registry_23_10} from '../pkg-23/types-10';
import type {Entity_23_20, Registry_23_20} from '../pkg-23/types-20';
import type {Entity_22_01, Registry_22_01} from '../pkg-22/types-01';
import type {Entity_22_10, Registry_22_10} from '../pkg-22/types-10';
import type {Entity_22_20, Registry_22_20} from '../pkg-22/types-20';
import type {Entity_21_01, Registry_21_01} from '../pkg-21/types-01';
import type {Entity_21_10, Registry_21_10} from '../pkg-21/types-10';
import type {Entity_21_20, Registry_21_20} from '../pkg-21/types-20';

type DeepMerge_2422<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object
      ? U[K] extends object
        ? DeepMerge_2422<T[K], U[K]>
        : U[K]
      : U[K]
    : K extends keyof T
      ? T[K]
      : K extends keyof U
        ? U[K]
        : never;
};

interface Entity_24_22 {
  id: string;
  meta: {
    created: Date;
    updated: Date;
    version: number;
    tags: string[];
    attrs: Record<string, {v: unknown; t: string; ok: boolean}>;
  };
  rels: {parent: Entity_24_22 | null; children: Entity_24_22[]};
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
  d22: {x2422: number; y2422: string; z2422: boolean};
}

type Path_2422<T, D extends unknown[] = []> = D['length'] extends 6
  ? never
  : T extends object
    ? {
        [K in keyof T & string]: K | `${K}.${Path_2422<T[K], [...D, unknown]>}`;
      }[keyof T & string]
    : never;
type EP_2422 = Path_2422<Entity_24_22>;

type Val_2422<T> = {
  [K in keyof T]: T[K] extends string
    ? {t: 's'; min: number; max: number}
    : T[K] extends number
      ? {t: 'n'; min: number; max: number}
      : T[K] extends boolean
        ? {t: 'b'; def: boolean}
        : T[K] extends unknown[]
          ? {t: 'a'; items: Val_2422<T[K][number]>}
          : T[K] extends object
            ? {t: 'o'; props: Val_2422<T[K]>}
            : {t: 'u'};
};
type EV_2422 = Val_2422<Entity_24_22>;

interface Registry_24_22 {
  entities: Map<string, Entity_24_22>;
  validators: EV_2422;
  paths: Set<EP_2422>;
  merged: DeepMerge_2422<Entity_24_22, {extra2422: string}>;
}

type CK_2422 =
  `p24.t22.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type {
  Entity_24_22,
  Registry_24_22,
  CK_2422,
  EP_2422,
  EV_2422,
  DeepMerge_2422,
};
