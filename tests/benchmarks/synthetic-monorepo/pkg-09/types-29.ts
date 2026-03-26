// pkg-09/types-29 - heavy interconnected types

import type {Entity_8_01, Registry_8_01} from '../pkg-08/types-01';
import type {Entity_8_10, Registry_8_10} from '../pkg-08/types-10';
import type {Entity_8_20, Registry_8_20} from '../pkg-08/types-20';
import type {Entity_7_01, Registry_7_01} from '../pkg-07/types-01';
import type {Entity_7_10, Registry_7_10} from '../pkg-07/types-10';
import type {Entity_7_20, Registry_7_20} from '../pkg-07/types-20';
import type {Entity_6_01, Registry_6_01} from '../pkg-06/types-01';
import type {Entity_6_10, Registry_6_10} from '../pkg-06/types-10';
import type {Entity_6_20, Registry_6_20} from '../pkg-06/types-20';

type DeepMerge_0929<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object
      ? U[K] extends object
        ? DeepMerge_0929<T[K], U[K]>
        : U[K]
      : U[K]
    : K extends keyof T
      ? T[K]
      : K extends keyof U
        ? U[K]
        : never;
};

interface Entity_09_29 {
  id: string;
  meta: {
    created: Date;
    updated: Date;
    version: number;
    tags: string[];
    attrs: Record<string, {v: unknown; t: string; ok: boolean}>;
  };
  rels: {parent: Entity_09_29 | null; children: Entity_09_29[]};
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
  d29: {x0929: number; y0929: string; z0929: boolean};
}

type Path_0929<T, D extends unknown[] = []> = D['length'] extends 6
  ? never
  : T extends object
    ? {
        [K in keyof T & string]: K | `${K}.${Path_0929<T[K], [...D, unknown]>}`;
      }[keyof T & string]
    : never;
type EP_0929 = Path_0929<Entity_09_29>;

type Val_0929<T> = {
  [K in keyof T]: T[K] extends string
    ? {t: 's'; min: number; max: number}
    : T[K] extends number
      ? {t: 'n'; min: number; max: number}
      : T[K] extends boolean
        ? {t: 'b'; def: boolean}
        : T[K] extends unknown[]
          ? {t: 'a'; items: Val_0929<T[K][number]>}
          : T[K] extends object
            ? {t: 'o'; props: Val_0929<T[K]>}
            : {t: 'u'};
};
type EV_0929 = Val_0929<Entity_09_29>;

interface Registry_09_29 {
  entities: Map<string, Entity_09_29>;
  validators: EV_0929;
  paths: Set<EP_0929>;
  merged: DeepMerge_0929<Entity_09_29, {extra0929: string}>;
}

type CK_0929 =
  `p09.t29.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type {
  Entity_09_29,
  Registry_09_29,
  CK_0929,
  EP_0929,
  EV_0929,
  DeepMerge_0929,
};
