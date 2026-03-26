// pkg-33/types-23 - heavy interconnected types

import type {Entity_32_01, Registry_32_01} from '../pkg-32/types-01';
import type {Entity_32_10, Registry_32_10} from '../pkg-32/types-10';
import type {Entity_32_20, Registry_32_20} from '../pkg-32/types-20';
import type {Entity_31_01, Registry_31_01} from '../pkg-31/types-01';
import type {Entity_31_10, Registry_31_10} from '../pkg-31/types-10';
import type {Entity_31_20, Registry_31_20} from '../pkg-31/types-20';
import type {Entity_30_01, Registry_30_01} from '../pkg-30/types-01';
import type {Entity_30_10, Registry_30_10} from '../pkg-30/types-10';
import type {Entity_30_20, Registry_30_20} from '../pkg-30/types-20';

type DeepMerge_3323<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object
      ? U[K] extends object
        ? DeepMerge_3323<T[K], U[K]>
        : U[K]
      : U[K]
    : K extends keyof T
      ? T[K]
      : K extends keyof U
        ? U[K]
        : never;
};

interface Entity_33_23 {
  id: string;
  meta: {
    created: Date;
    updated: Date;
    version: number;
    tags: string[];
    attrs: Record<string, {v: unknown; t: string; ok: boolean}>;
  };
  rels: {parent: Entity_33_23 | null; children: Entity_33_23[]};
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
  d23: {x3323: number; y3323: string; z3323: boolean};
}

type Path_3323<T, D extends unknown[] = []> = D['length'] extends 6
  ? never
  : T extends object
    ? {
        [K in keyof T & string]: K | `${K}.${Path_3323<T[K], [...D, unknown]>}`;
      }[keyof T & string]
    : never;
type EP_3323 = Path_3323<Entity_33_23>;

type Val_3323<T> = {
  [K in keyof T]: T[K] extends string
    ? {t: 's'; min: number; max: number}
    : T[K] extends number
      ? {t: 'n'; min: number; max: number}
      : T[K] extends boolean
        ? {t: 'b'; def: boolean}
        : T[K] extends unknown[]
          ? {t: 'a'; items: Val_3323<T[K][number]>}
          : T[K] extends object
            ? {t: 'o'; props: Val_3323<T[K]>}
            : {t: 'u'};
};
type EV_3323 = Val_3323<Entity_33_23>;

interface Registry_33_23 {
  entities: Map<string, Entity_33_23>;
  validators: EV_3323;
  paths: Set<EP_3323>;
  merged: DeepMerge_3323<Entity_33_23, {extra3323: string}>;
}

type CK_3323 =
  `p33.t23.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type {
  Entity_33_23,
  Registry_33_23,
  CK_3323,
  EP_3323,
  EV_3323,
  DeepMerge_3323,
};
