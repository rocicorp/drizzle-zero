// pkg-12/types-01 - heavy interconnected types

import type {Entity_11_01, Registry_11_01} from '../pkg-11/types-01';
import type {Entity_11_10, Registry_11_10} from '../pkg-11/types-10';
import type {Entity_11_20, Registry_11_20} from '../pkg-11/types-20';
import type {Entity_10_01, Registry_10_01} from '../pkg-10/types-01';
import type {Entity_10_10, Registry_10_10} from '../pkg-10/types-10';
import type {Entity_10_20, Registry_10_20} from '../pkg-10/types-20';
import type {Entity_9_01, Registry_9_01} from '../pkg-09/types-01';
import type {Entity_9_10, Registry_9_10} from '../pkg-09/types-10';
import type {Entity_9_20, Registry_9_20} from '../pkg-09/types-20';

type DeepMerge_1201<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object
      ? U[K] extends object
        ? DeepMerge_1201<T[K], U[K]>
        : U[K]
      : U[K]
    : K extends keyof T
      ? T[K]
      : K extends keyof U
        ? U[K]
        : never;
};

interface Entity_12_01 {
  id: string;
  meta: {
    created: Date;
    updated: Date;
    version: number;
    tags: string[];
    attrs: Record<string, {v: unknown; t: string; ok: boolean}>;
  };
  rels: {parent: Entity_12_01 | null; children: Entity_12_01[]};
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
  d01: {x1201: number; y1201: string; z1201: boolean};
}

type Path_1201<T, D extends unknown[] = []> = D['length'] extends 6
  ? never
  : T extends object
    ? {
        [K in keyof T & string]: K | `${K}.${Path_1201<T[K], [...D, unknown]>}`;
      }[keyof T & string]
    : never;
type EP_1201 = Path_1201<Entity_12_01>;

type Val_1201<T> = {
  [K in keyof T]: T[K] extends string
    ? {t: 's'; min: number; max: number}
    : T[K] extends number
      ? {t: 'n'; min: number; max: number}
      : T[K] extends boolean
        ? {t: 'b'; def: boolean}
        : T[K] extends unknown[]
          ? {t: 'a'; items: Val_1201<T[K][number]>}
          : T[K] extends object
            ? {t: 'o'; props: Val_1201<T[K]>}
            : {t: 'u'};
};
type EV_1201 = Val_1201<Entity_12_01>;

interface Registry_12_01 {
  entities: Map<string, Entity_12_01>;
  validators: EV_1201;
  paths: Set<EP_1201>;
  merged: DeepMerge_1201<Entity_12_01, {extra1201: string}>;
}

type CK_1201 =
  `p12.t01.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type {
  Entity_12_01,
  Registry_12_01,
  CK_1201,
  EP_1201,
  EV_1201,
  DeepMerge_1201,
};
