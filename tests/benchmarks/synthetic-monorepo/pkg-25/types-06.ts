// pkg-25/types-06 - heavy interconnected types

import type {Entity_24_01, Registry_24_01} from '../pkg-24/types-01';
import type {Entity_24_10, Registry_24_10} from '../pkg-24/types-10';
import type {Entity_24_20, Registry_24_20} from '../pkg-24/types-20';
import type {Entity_23_01, Registry_23_01} from '../pkg-23/types-01';
import type {Entity_23_10, Registry_23_10} from '../pkg-23/types-10';
import type {Entity_23_20, Registry_23_20} from '../pkg-23/types-20';
import type {Entity_22_01, Registry_22_01} from '../pkg-22/types-01';
import type {Entity_22_10, Registry_22_10} from '../pkg-22/types-10';
import type {Entity_22_20, Registry_22_20} from '../pkg-22/types-20';

type DeepMerge_2506<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object
      ? U[K] extends object
        ? DeepMerge_2506<T[K], U[K]>
        : U[K]
      : U[K]
    : K extends keyof T
      ? T[K]
      : K extends keyof U
        ? U[K]
        : never;
};

interface Entity_25_06 {
  id: string;
  meta: {
    created: Date;
    updated: Date;
    version: number;
    tags: string[];
    attrs: Record<string, {v: unknown; t: string; ok: boolean}>;
  };
  rels: {parent: Entity_25_06 | null; children: Entity_25_06[]};
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
  d06: {x2506: number; y2506: string; z2506: boolean};
}

type Path_2506<T, D extends unknown[] = []> = D['length'] extends 6
  ? never
  : T extends object
    ? {
        [K in keyof T & string]: K | `${K}.${Path_2506<T[K], [...D, unknown]>}`;
      }[keyof T & string]
    : never;
type EP_2506 = Path_2506<Entity_25_06>;

type Val_2506<T> = {
  [K in keyof T]: T[K] extends string
    ? {t: 's'; min: number; max: number}
    : T[K] extends number
      ? {t: 'n'; min: number; max: number}
      : T[K] extends boolean
        ? {t: 'b'; def: boolean}
        : T[K] extends unknown[]
          ? {t: 'a'; items: Val_2506<T[K][number]>}
          : T[K] extends object
            ? {t: 'o'; props: Val_2506<T[K]>}
            : {t: 'u'};
};
type EV_2506 = Val_2506<Entity_25_06>;

interface Registry_25_06 {
  entities: Map<string, Entity_25_06>;
  validators: EV_2506;
  paths: Set<EP_2506>;
  merged: DeepMerge_2506<Entity_25_06, {extra2506: string}>;
}

type CK_2506 =
  `p25.t06.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type {
  Entity_25_06,
  Registry_25_06,
  CK_2506,
  EP_2506,
  EV_2506,
  DeepMerge_2506,
};
