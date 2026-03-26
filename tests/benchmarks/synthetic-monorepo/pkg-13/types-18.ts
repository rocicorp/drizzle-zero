// pkg-13/types-18 - heavy interconnected types

import type {Entity_12_01, Registry_12_01} from '../pkg-12/types-01';
import type {Entity_12_10, Registry_12_10} from '../pkg-12/types-10';
import type {Entity_12_20, Registry_12_20} from '../pkg-12/types-20';
import type {Entity_11_01, Registry_11_01} from '../pkg-11/types-01';
import type {Entity_11_10, Registry_11_10} from '../pkg-11/types-10';
import type {Entity_11_20, Registry_11_20} from '../pkg-11/types-20';
import type {Entity_10_01, Registry_10_01} from '../pkg-10/types-01';
import type {Entity_10_10, Registry_10_10} from '../pkg-10/types-10';
import type {Entity_10_20, Registry_10_20} from '../pkg-10/types-20';

type DeepMerge_1318<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object
      ? U[K] extends object
        ? DeepMerge_1318<T[K], U[K]>
        : U[K]
      : U[K]
    : K extends keyof T
      ? T[K]
      : K extends keyof U
        ? U[K]
        : never;
};

interface Entity_13_18 {
  id: string;
  meta: {
    created: Date;
    updated: Date;
    version: number;
    tags: string[];
    attrs: Record<string, {v: unknown; t: string; ok: boolean}>;
  };
  rels: {parent: Entity_13_18 | null; children: Entity_13_18[]};
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
  d18: {x1318: number; y1318: string; z1318: boolean};
}

type Path_1318<T, D extends unknown[] = []> = D['length'] extends 6
  ? never
  : T extends object
    ? {
        [K in keyof T & string]: K | `${K}.${Path_1318<T[K], [...D, unknown]>}`;
      }[keyof T & string]
    : never;
type EP_1318 = Path_1318<Entity_13_18>;

type Val_1318<T> = {
  [K in keyof T]: T[K] extends string
    ? {t: 's'; min: number; max: number}
    : T[K] extends number
      ? {t: 'n'; min: number; max: number}
      : T[K] extends boolean
        ? {t: 'b'; def: boolean}
        : T[K] extends unknown[]
          ? {t: 'a'; items: Val_1318<T[K][number]>}
          : T[K] extends object
            ? {t: 'o'; props: Val_1318<T[K]>}
            : {t: 'u'};
};
type EV_1318 = Val_1318<Entity_13_18>;

interface Registry_13_18 {
  entities: Map<string, Entity_13_18>;
  validators: EV_1318;
  paths: Set<EP_1318>;
  merged: DeepMerge_1318<Entity_13_18, {extra1318: string}>;
}

type CK_1318 =
  `p13.t18.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type {
  Entity_13_18,
  Registry_13_18,
  CK_1318,
  EP_1318,
  EV_1318,
  DeepMerge_1318,
};
