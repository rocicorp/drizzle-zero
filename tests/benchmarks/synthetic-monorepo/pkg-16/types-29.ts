// pkg-16/types-29 - heavy interconnected types

import type {Entity_15_01, Registry_15_01} from '../pkg-15/types-01';
import type {Entity_15_10, Registry_15_10} from '../pkg-15/types-10';
import type {Entity_15_20, Registry_15_20} from '../pkg-15/types-20';
import type {Entity_14_01, Registry_14_01} from '../pkg-14/types-01';
import type {Entity_14_10, Registry_14_10} from '../pkg-14/types-10';
import type {Entity_14_20, Registry_14_20} from '../pkg-14/types-20';
import type {Entity_13_01, Registry_13_01} from '../pkg-13/types-01';
import type {Entity_13_10, Registry_13_10} from '../pkg-13/types-10';
import type {Entity_13_20, Registry_13_20} from '../pkg-13/types-20';

type DeepMerge_1629<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object
      ? U[K] extends object
        ? DeepMerge_1629<T[K], U[K]>
        : U[K]
      : U[K]
    : K extends keyof T
      ? T[K]
      : K extends keyof U
        ? U[K]
        : never;
};

interface Entity_16_29 {
  id: string;
  meta: {
    created: Date;
    updated: Date;
    version: number;
    tags: string[];
    attrs: Record<string, {v: unknown; t: string; ok: boolean}>;
  };
  rels: {parent: Entity_16_29 | null; children: Entity_16_29[]};
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
  d29: {x1629: number; y1629: string; z1629: boolean};
}

type Path_1629<T, D extends unknown[] = []> = D['length'] extends 6
  ? never
  : T extends object
    ? {
        [K in keyof T & string]: K | `${K}.${Path_1629<T[K], [...D, unknown]>}`;
      }[keyof T & string]
    : never;
type EP_1629 = Path_1629<Entity_16_29>;

type Val_1629<T> = {
  [K in keyof T]: T[K] extends string
    ? {t: 's'; min: number; max: number}
    : T[K] extends number
      ? {t: 'n'; min: number; max: number}
      : T[K] extends boolean
        ? {t: 'b'; def: boolean}
        : T[K] extends unknown[]
          ? {t: 'a'; items: Val_1629<T[K][number]>}
          : T[K] extends object
            ? {t: 'o'; props: Val_1629<T[K]>}
            : {t: 'u'};
};
type EV_1629 = Val_1629<Entity_16_29>;

interface Registry_16_29 {
  entities: Map<string, Entity_16_29>;
  validators: EV_1629;
  paths: Set<EP_1629>;
  merged: DeepMerge_1629<Entity_16_29, {extra1629: string}>;
}

type CK_1629 =
  `p16.t29.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type {
  Entity_16_29,
  Registry_16_29,
  CK_1629,
  EP_1629,
  EV_1629,
  DeepMerge_1629,
};
