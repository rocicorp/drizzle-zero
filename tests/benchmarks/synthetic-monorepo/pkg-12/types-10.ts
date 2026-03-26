// pkg-12/types-10 - heavy interconnected types

import type {Entity_11_01, Registry_11_01} from '../pkg-11/types-01';
import type {Entity_11_10, Registry_11_10} from '../pkg-11/types-10';
import type {Entity_11_20, Registry_11_20} from '../pkg-11/types-20';
import type {Entity_10_01, Registry_10_01} from '../pkg-10/types-01';
import type {Entity_10_10, Registry_10_10} from '../pkg-10/types-10';
import type {Entity_10_20, Registry_10_20} from '../pkg-10/types-20';
import type {Entity_9_01, Registry_9_01} from '../pkg-09/types-01';
import type {Entity_9_10, Registry_9_10} from '../pkg-09/types-10';
import type {Entity_9_20, Registry_9_20} from '../pkg-09/types-20';

type DeepMerge_1210<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object
      ? U[K] extends object
        ? DeepMerge_1210<T[K], U[K]>
        : U[K]
      : U[K]
    : K extends keyof T
      ? T[K]
      : K extends keyof U
        ? U[K]
        : never;
};

interface Entity_12_10 {
  id: string;
  meta: {
    created: Date;
    updated: Date;
    version: number;
    tags: string[];
    attrs: Record<string, {v: unknown; t: string; ok: boolean}>;
  };
  rels: {parent: Entity_12_10 | null; children: Entity_12_10[]};
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
  d10: {x1210: number; y1210: string; z1210: boolean};
}

type Path_1210<T, D extends unknown[] = []> = D['length'] extends 6
  ? never
  : T extends object
    ? {
        [K in keyof T & string]: K | `${K}.${Path_1210<T[K], [...D, unknown]>}`;
      }[keyof T & string]
    : never;
type EP_1210 = Path_1210<Entity_12_10>;

type Val_1210<T> = {
  [K in keyof T]: T[K] extends string
    ? {t: 's'; min: number; max: number}
    : T[K] extends number
      ? {t: 'n'; min: number; max: number}
      : T[K] extends boolean
        ? {t: 'b'; def: boolean}
        : T[K] extends unknown[]
          ? {t: 'a'; items: Val_1210<T[K][number]>}
          : T[K] extends object
            ? {t: 'o'; props: Val_1210<T[K]>}
            : {t: 'u'};
};
type EV_1210 = Val_1210<Entity_12_10>;

interface Registry_12_10 {
  entities: Map<string, Entity_12_10>;
  validators: EV_1210;
  paths: Set<EP_1210>;
  merged: DeepMerge_1210<Entity_12_10, {extra1210: string}>;
}

type CK_1210 =
  `p12.t10.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type {
  Entity_12_10,
  Registry_12_10,
  CK_1210,
  EP_1210,
  EV_1210,
  DeepMerge_1210,
};
