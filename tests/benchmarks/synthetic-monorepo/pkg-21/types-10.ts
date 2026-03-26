// pkg-21/types-10 - heavy interconnected types

import type {Entity_20_01, Registry_20_01} from '../pkg-20/types-01';
import type {Entity_20_10, Registry_20_10} from '../pkg-20/types-10';
import type {Entity_20_20, Registry_20_20} from '../pkg-20/types-20';
import type {Entity_19_01, Registry_19_01} from '../pkg-19/types-01';
import type {Entity_19_10, Registry_19_10} from '../pkg-19/types-10';
import type {Entity_19_20, Registry_19_20} from '../pkg-19/types-20';
import type {Entity_18_01, Registry_18_01} from '../pkg-18/types-01';
import type {Entity_18_10, Registry_18_10} from '../pkg-18/types-10';
import type {Entity_18_20, Registry_18_20} from '../pkg-18/types-20';

type DeepMerge_2110<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object
      ? U[K] extends object
        ? DeepMerge_2110<T[K], U[K]>
        : U[K]
      : U[K]
    : K extends keyof T
      ? T[K]
      : K extends keyof U
        ? U[K]
        : never;
};

interface Entity_21_10 {
  id: string;
  meta: {
    created: Date;
    updated: Date;
    version: number;
    tags: string[];
    attrs: Record<string, {v: unknown; t: string; ok: boolean}>;
  };
  rels: {parent: Entity_21_10 | null; children: Entity_21_10[]};
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
  d10: {x2110: number; y2110: string; z2110: boolean};
}

type Path_2110<T, D extends unknown[] = []> = D['length'] extends 6
  ? never
  : T extends object
    ? {
        [K in keyof T & string]: K | `${K}.${Path_2110<T[K], [...D, unknown]>}`;
      }[keyof T & string]
    : never;
type EP_2110 = Path_2110<Entity_21_10>;

type Val_2110<T> = {
  [K in keyof T]: T[K] extends string
    ? {t: 's'; min: number; max: number}
    : T[K] extends number
      ? {t: 'n'; min: number; max: number}
      : T[K] extends boolean
        ? {t: 'b'; def: boolean}
        : T[K] extends unknown[]
          ? {t: 'a'; items: Val_2110<T[K][number]>}
          : T[K] extends object
            ? {t: 'o'; props: Val_2110<T[K]>}
            : {t: 'u'};
};
type EV_2110 = Val_2110<Entity_21_10>;

interface Registry_21_10 {
  entities: Map<string, Entity_21_10>;
  validators: EV_2110;
  paths: Set<EP_2110>;
  merged: DeepMerge_2110<Entity_21_10, {extra2110: string}>;
}

type CK_2110 =
  `p21.t10.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type {
  Entity_21_10,
  Registry_21_10,
  CK_2110,
  EP_2110,
  EV_2110,
  DeepMerge_2110,
};
