// pkg-13/types-19 - heavy interconnected types

import type {Entity_12_01, Registry_12_01} from '../pkg-12/types-01';
import type {Entity_12_10, Registry_12_10} from '../pkg-12/types-10';
import type {Entity_12_20, Registry_12_20} from '../pkg-12/types-20';
import type {Entity_11_01, Registry_11_01} from '../pkg-11/types-01';
import type {Entity_11_10, Registry_11_10} from '../pkg-11/types-10';
import type {Entity_11_20, Registry_11_20} from '../pkg-11/types-20';
import type {Entity_10_01, Registry_10_01} from '../pkg-10/types-01';
import type {Entity_10_10, Registry_10_10} from '../pkg-10/types-10';
import type {Entity_10_20, Registry_10_20} from '../pkg-10/types-20';

type DeepMerge_1319<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object
      ? U[K] extends object
        ? DeepMerge_1319<T[K], U[K]>
        : U[K]
      : U[K]
    : K extends keyof T
      ? T[K]
      : K extends keyof U
        ? U[K]
        : never;
};

interface Entity_13_19 {
  id: string;
  meta: {
    created: Date;
    updated: Date;
    version: number;
    tags: string[];
    attrs: Record<string, {v: unknown; t: string; ok: boolean}>;
  };
  rels: {parent: Entity_13_19 | null; children: Entity_13_19[]};
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
  d19: {x1319: number; y1319: string; z1319: boolean};
}

type Path_1319<T, D extends unknown[] = []> = D['length'] extends 6
  ? never
  : T extends object
    ? {
        [K in keyof T & string]: K | `${K}.${Path_1319<T[K], [...D, unknown]>}`;
      }[keyof T & string]
    : never;
type EP_1319 = Path_1319<Entity_13_19>;

type Val_1319<T> = {
  [K in keyof T]: T[K] extends string
    ? {t: 's'; min: number; max: number}
    : T[K] extends number
      ? {t: 'n'; min: number; max: number}
      : T[K] extends boolean
        ? {t: 'b'; def: boolean}
        : T[K] extends unknown[]
          ? {t: 'a'; items: Val_1319<T[K][number]>}
          : T[K] extends object
            ? {t: 'o'; props: Val_1319<T[K]>}
            : {t: 'u'};
};
type EV_1319 = Val_1319<Entity_13_19>;

interface Registry_13_19 {
  entities: Map<string, Entity_13_19>;
  validators: EV_1319;
  paths: Set<EP_1319>;
  merged: DeepMerge_1319<Entity_13_19, {extra1319: string}>;
}

type CK_1319 =
  `p13.t19.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type {
  Entity_13_19,
  Registry_13_19,
  CK_1319,
  EP_1319,
  EV_1319,
  DeepMerge_1319,
};
