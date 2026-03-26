// pkg-09/types-09 - heavy interconnected types

import type {Entity_8_01, Registry_8_01} from '../pkg-08/types-01';
import type {Entity_8_10, Registry_8_10} from '../pkg-08/types-10';
import type {Entity_8_20, Registry_8_20} from '../pkg-08/types-20';
import type {Entity_7_01, Registry_7_01} from '../pkg-07/types-01';
import type {Entity_7_10, Registry_7_10} from '../pkg-07/types-10';
import type {Entity_7_20, Registry_7_20} from '../pkg-07/types-20';
import type {Entity_6_01, Registry_6_01} from '../pkg-06/types-01';
import type {Entity_6_10, Registry_6_10} from '../pkg-06/types-10';
import type {Entity_6_20, Registry_6_20} from '../pkg-06/types-20';

type DeepMerge_0909<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object
      ? U[K] extends object
        ? DeepMerge_0909<T[K], U[K]>
        : U[K]
      : U[K]
    : K extends keyof T
      ? T[K]
      : K extends keyof U
        ? U[K]
        : never;
};

interface Entity_09_09 {
  id: string;
  meta: {
    created: Date;
    updated: Date;
    version: number;
    tags: string[];
    attrs: Record<string, {v: unknown; t: string; ok: boolean}>;
  };
  rels: {parent: Entity_09_09 | null; children: Entity_09_09[]};
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
  d09: {x0909: number; y0909: string; z0909: boolean};
}

type Path_0909<T, D extends unknown[] = []> = D['length'] extends 6
  ? never
  : T extends object
    ? {
        [K in keyof T & string]: K | `${K}.${Path_0909<T[K], [...D, unknown]>}`;
      }[keyof T & string]
    : never;
type EP_0909 = Path_0909<Entity_09_09>;

type Val_0909<T> = {
  [K in keyof T]: T[K] extends string
    ? {t: 's'; min: number; max: number}
    : T[K] extends number
      ? {t: 'n'; min: number; max: number}
      : T[K] extends boolean
        ? {t: 'b'; def: boolean}
        : T[K] extends unknown[]
          ? {t: 'a'; items: Val_0909<T[K][number]>}
          : T[K] extends object
            ? {t: 'o'; props: Val_0909<T[K]>}
            : {t: 'u'};
};
type EV_0909 = Val_0909<Entity_09_09>;

interface Registry_09_09 {
  entities: Map<string, Entity_09_09>;
  validators: EV_0909;
  paths: Set<EP_0909>;
  merged: DeepMerge_0909<Entity_09_09, {extra0909: string}>;
}

type CK_0909 =
  `p09.t09.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type {
  Entity_09_09,
  Registry_09_09,
  CK_0909,
  EP_0909,
  EV_0909,
  DeepMerge_0909,
};
