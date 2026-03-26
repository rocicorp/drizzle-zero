// pkg-19/types-04 - heavy interconnected types

import type {Entity_18_01, Registry_18_01} from '../pkg-18/types-01';
import type {Entity_18_10, Registry_18_10} from '../pkg-18/types-10';
import type {Entity_18_20, Registry_18_20} from '../pkg-18/types-20';
import type {Entity_17_01, Registry_17_01} from '../pkg-17/types-01';
import type {Entity_17_10, Registry_17_10} from '../pkg-17/types-10';
import type {Entity_17_20, Registry_17_20} from '../pkg-17/types-20';
import type {Entity_16_01, Registry_16_01} from '../pkg-16/types-01';
import type {Entity_16_10, Registry_16_10} from '../pkg-16/types-10';
import type {Entity_16_20, Registry_16_20} from '../pkg-16/types-20';

type DeepMerge_1904<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object
      ? U[K] extends object
        ? DeepMerge_1904<T[K], U[K]>
        : U[K]
      : U[K]
    : K extends keyof T
      ? T[K]
      : K extends keyof U
        ? U[K]
        : never;
};

interface Entity_19_04 {
  id: string;
  meta: {
    created: Date;
    updated: Date;
    version: number;
    tags: string[];
    attrs: Record<string, {v: unknown; t: string; ok: boolean}>;
  };
  rels: {parent: Entity_19_04 | null; children: Entity_19_04[]};
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
  d04: {x1904: number; y1904: string; z1904: boolean};
}

type Path_1904<T, D extends unknown[] = []> = D['length'] extends 6
  ? never
  : T extends object
    ? {
        [K in keyof T & string]: K | `${K}.${Path_1904<T[K], [...D, unknown]>}`;
      }[keyof T & string]
    : never;
type EP_1904 = Path_1904<Entity_19_04>;

type Val_1904<T> = {
  [K in keyof T]: T[K] extends string
    ? {t: 's'; min: number; max: number}
    : T[K] extends number
      ? {t: 'n'; min: number; max: number}
      : T[K] extends boolean
        ? {t: 'b'; def: boolean}
        : T[K] extends unknown[]
          ? {t: 'a'; items: Val_1904<T[K][number]>}
          : T[K] extends object
            ? {t: 'o'; props: Val_1904<T[K]>}
            : {t: 'u'};
};
type EV_1904 = Val_1904<Entity_19_04>;

interface Registry_19_04 {
  entities: Map<string, Entity_19_04>;
  validators: EV_1904;
  paths: Set<EP_1904>;
  merged: DeepMerge_1904<Entity_19_04, {extra1904: string}>;
}

type CK_1904 =
  `p19.t04.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type {
  Entity_19_04,
  Registry_19_04,
  CK_1904,
  EP_1904,
  EV_1904,
  DeepMerge_1904,
};
