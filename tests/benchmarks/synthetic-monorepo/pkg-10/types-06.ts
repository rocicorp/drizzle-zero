// pkg-10/types-06 - heavy interconnected types

import type {Entity_9_01, Registry_9_01} from '../pkg-09/types-01';
import type {Entity_9_10, Registry_9_10} from '../pkg-09/types-10';
import type {Entity_9_20, Registry_9_20} from '../pkg-09/types-20';
import type {Entity_8_01, Registry_8_01} from '../pkg-08/types-01';
import type {Entity_8_10, Registry_8_10} from '../pkg-08/types-10';
import type {Entity_8_20, Registry_8_20} from '../pkg-08/types-20';
import type {Entity_7_01, Registry_7_01} from '../pkg-07/types-01';
import type {Entity_7_10, Registry_7_10} from '../pkg-07/types-10';
import type {Entity_7_20, Registry_7_20} from '../pkg-07/types-20';

type DeepMerge_1006<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object
      ? U[K] extends object
        ? DeepMerge_1006<T[K], U[K]>
        : U[K]
      : U[K]
    : K extends keyof T
      ? T[K]
      : K extends keyof U
        ? U[K]
        : never;
};

interface Entity_10_06 {
  id: string;
  meta: {
    created: Date;
    updated: Date;
    version: number;
    tags: string[];
    attrs: Record<string, {v: unknown; t: string; ok: boolean}>;
  };
  rels: {parent: Entity_10_06 | null; children: Entity_10_06[]};
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
  d06: {x1006: number; y1006: string; z1006: boolean};
}

type Path_1006<T, D extends unknown[] = []> = D['length'] extends 6
  ? never
  : T extends object
    ? {
        [K in keyof T & string]: K | `${K}.${Path_1006<T[K], [...D, unknown]>}`;
      }[keyof T & string]
    : never;
type EP_1006 = Path_1006<Entity_10_06>;

type Val_1006<T> = {
  [K in keyof T]: T[K] extends string
    ? {t: 's'; min: number; max: number}
    : T[K] extends number
      ? {t: 'n'; min: number; max: number}
      : T[K] extends boolean
        ? {t: 'b'; def: boolean}
        : T[K] extends unknown[]
          ? {t: 'a'; items: Val_1006<T[K][number]>}
          : T[K] extends object
            ? {t: 'o'; props: Val_1006<T[K]>}
            : {t: 'u'};
};
type EV_1006 = Val_1006<Entity_10_06>;

interface Registry_10_06 {
  entities: Map<string, Entity_10_06>;
  validators: EV_1006;
  paths: Set<EP_1006>;
  merged: DeepMerge_1006<Entity_10_06, {extra1006: string}>;
}

type CK_1006 =
  `p10.t06.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type {
  Entity_10_06,
  Registry_10_06,
  CK_1006,
  EP_1006,
  EV_1006,
  DeepMerge_1006,
};
