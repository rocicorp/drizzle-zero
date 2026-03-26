// pkg-08/types-04 - heavy interconnected types

import type {Entity_7_01, Registry_7_01} from '../pkg-07/types-01';
import type {Entity_7_10, Registry_7_10} from '../pkg-07/types-10';
import type {Entity_7_20, Registry_7_20} from '../pkg-07/types-20';
import type {Entity_6_01, Registry_6_01} from '../pkg-06/types-01';
import type {Entity_6_10, Registry_6_10} from '../pkg-06/types-10';
import type {Entity_6_20, Registry_6_20} from '../pkg-06/types-20';
import type {Entity_5_01, Registry_5_01} from '../pkg-05/types-01';
import type {Entity_5_10, Registry_5_10} from '../pkg-05/types-10';
import type {Entity_5_20, Registry_5_20} from '../pkg-05/types-20';

type DeepMerge_0804<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object
      ? U[K] extends object
        ? DeepMerge_0804<T[K], U[K]>
        : U[K]
      : U[K]
    : K extends keyof T
      ? T[K]
      : K extends keyof U
        ? U[K]
        : never;
};

interface Entity_08_04 {
  id: string;
  meta: {
    created: Date;
    updated: Date;
    version: number;
    tags: string[];
    attrs: Record<string, {v: unknown; t: string; ok: boolean}>;
  };
  rels: {parent: Entity_08_04 | null; children: Entity_08_04[]};
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
  d04: {x0804: number; y0804: string; z0804: boolean};
}

type Path_0804<T, D extends unknown[] = []> = D['length'] extends 6
  ? never
  : T extends object
    ? {
        [K in keyof T & string]: K | `${K}.${Path_0804<T[K], [...D, unknown]>}`;
      }[keyof T & string]
    : never;
type EP_0804 = Path_0804<Entity_08_04>;

type Val_0804<T> = {
  [K in keyof T]: T[K] extends string
    ? {t: 's'; min: number; max: number}
    : T[K] extends number
      ? {t: 'n'; min: number; max: number}
      : T[K] extends boolean
        ? {t: 'b'; def: boolean}
        : T[K] extends unknown[]
          ? {t: 'a'; items: Val_0804<T[K][number]>}
          : T[K] extends object
            ? {t: 'o'; props: Val_0804<T[K]>}
            : {t: 'u'};
};
type EV_0804 = Val_0804<Entity_08_04>;

interface Registry_08_04 {
  entities: Map<string, Entity_08_04>;
  validators: EV_0804;
  paths: Set<EP_0804>;
  merged: DeepMerge_0804<Entity_08_04, {extra0804: string}>;
}

type CK_0804 =
  `p08.t04.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type {
  Entity_08_04,
  Registry_08_04,
  CK_0804,
  EP_0804,
  EV_0804,
  DeepMerge_0804,
};
