// pkg-29/types-14 - heavy interconnected types

import type {Entity_28_01, Registry_28_01} from '../pkg-28/types-01';
import type {Entity_28_10, Registry_28_10} from '../pkg-28/types-10';
import type {Entity_28_20, Registry_28_20} from '../pkg-28/types-20';
import type {Entity_27_01, Registry_27_01} from '../pkg-27/types-01';
import type {Entity_27_10, Registry_27_10} from '../pkg-27/types-10';
import type {Entity_27_20, Registry_27_20} from '../pkg-27/types-20';
import type {Entity_26_01, Registry_26_01} from '../pkg-26/types-01';
import type {Entity_26_10, Registry_26_10} from '../pkg-26/types-10';
import type {Entity_26_20, Registry_26_20} from '../pkg-26/types-20';

type DeepMerge_2914<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object
      ? U[K] extends object
        ? DeepMerge_2914<T[K], U[K]>
        : U[K]
      : U[K]
    : K extends keyof T
      ? T[K]
      : K extends keyof U
        ? U[K]
        : never;
};

interface Entity_29_14 {
  id: string;
  meta: {
    created: Date;
    updated: Date;
    version: number;
    tags: string[];
    attrs: Record<string, {v: unknown; t: string; ok: boolean}>;
  };
  rels: {parent: Entity_29_14 | null; children: Entity_29_14[]};
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
  d14: {x2914: number; y2914: string; z2914: boolean};
}

type Path_2914<T, D extends unknown[] = []> = D['length'] extends 6
  ? never
  : T extends object
    ? {
        [K in keyof T & string]: K | `${K}.${Path_2914<T[K], [...D, unknown]>}`;
      }[keyof T & string]
    : never;
type EP_2914 = Path_2914<Entity_29_14>;

type Val_2914<T> = {
  [K in keyof T]: T[K] extends string
    ? {t: 's'; min: number; max: number}
    : T[K] extends number
      ? {t: 'n'; min: number; max: number}
      : T[K] extends boolean
        ? {t: 'b'; def: boolean}
        : T[K] extends unknown[]
          ? {t: 'a'; items: Val_2914<T[K][number]>}
          : T[K] extends object
            ? {t: 'o'; props: Val_2914<T[K]>}
            : {t: 'u'};
};
type EV_2914 = Val_2914<Entity_29_14>;

interface Registry_29_14 {
  entities: Map<string, Entity_29_14>;
  validators: EV_2914;
  paths: Set<EP_2914>;
  merged: DeepMerge_2914<Entity_29_14, {extra2914: string}>;
}

type CK_2914 =
  `p29.t14.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type {
  Entity_29_14,
  Registry_29_14,
  CK_2914,
  EP_2914,
  EV_2914,
  DeepMerge_2914,
};
