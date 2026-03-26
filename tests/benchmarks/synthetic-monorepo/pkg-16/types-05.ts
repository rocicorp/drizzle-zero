// pkg-16/types-05 - heavy interconnected types

import type {Entity_15_01, Registry_15_01} from '../pkg-15/types-01';
import type {Entity_15_10, Registry_15_10} from '../pkg-15/types-10';
import type {Entity_15_20, Registry_15_20} from '../pkg-15/types-20';
import type {Entity_14_01, Registry_14_01} from '../pkg-14/types-01';
import type {Entity_14_10, Registry_14_10} from '../pkg-14/types-10';
import type {Entity_14_20, Registry_14_20} from '../pkg-14/types-20';
import type {Entity_13_01, Registry_13_01} from '../pkg-13/types-01';
import type {Entity_13_10, Registry_13_10} from '../pkg-13/types-10';
import type {Entity_13_20, Registry_13_20} from '../pkg-13/types-20';

type DeepMerge_1605<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object
      ? U[K] extends object
        ? DeepMerge_1605<T[K], U[K]>
        : U[K]
      : U[K]
    : K extends keyof T
      ? T[K]
      : K extends keyof U
        ? U[K]
        : never;
};

interface Entity_16_05 {
  id: string;
  meta: {
    created: Date;
    updated: Date;
    version: number;
    tags: string[];
    attrs: Record<string, {v: unknown; t: string; ok: boolean}>;
  };
  rels: {parent: Entity_16_05 | null; children: Entity_16_05[]};
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
  d05: {x1605: number; y1605: string; z1605: boolean};
}

type Path_1605<T, D extends unknown[] = []> = D['length'] extends 6
  ? never
  : T extends object
    ? {
        [K in keyof T & string]: K | `${K}.${Path_1605<T[K], [...D, unknown]>}`;
      }[keyof T & string]
    : never;
type EP_1605 = Path_1605<Entity_16_05>;

type Val_1605<T> = {
  [K in keyof T]: T[K] extends string
    ? {t: 's'; min: number; max: number}
    : T[K] extends number
      ? {t: 'n'; min: number; max: number}
      : T[K] extends boolean
        ? {t: 'b'; def: boolean}
        : T[K] extends unknown[]
          ? {t: 'a'; items: Val_1605<T[K][number]>}
          : T[K] extends object
            ? {t: 'o'; props: Val_1605<T[K]>}
            : {t: 'u'};
};
type EV_1605 = Val_1605<Entity_16_05>;

interface Registry_16_05 {
  entities: Map<string, Entity_16_05>;
  validators: EV_1605;
  paths: Set<EP_1605>;
  merged: DeepMerge_1605<Entity_16_05, {extra1605: string}>;
}

type CK_1605 =
  `p16.t05.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type {
  Entity_16_05,
  Registry_16_05,
  CK_1605,
  EP_1605,
  EV_1605,
  DeepMerge_1605,
};
