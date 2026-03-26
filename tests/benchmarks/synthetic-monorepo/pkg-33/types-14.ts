// pkg-33/types-14 - heavy interconnected types

import type {Entity_32_01, Registry_32_01} from '../pkg-32/types-01';
import type {Entity_32_10, Registry_32_10} from '../pkg-32/types-10';
import type {Entity_32_20, Registry_32_20} from '../pkg-32/types-20';
import type {Entity_31_01, Registry_31_01} from '../pkg-31/types-01';
import type {Entity_31_10, Registry_31_10} from '../pkg-31/types-10';
import type {Entity_31_20, Registry_31_20} from '../pkg-31/types-20';
import type {Entity_30_01, Registry_30_01} from '../pkg-30/types-01';
import type {Entity_30_10, Registry_30_10} from '../pkg-30/types-10';
import type {Entity_30_20, Registry_30_20} from '../pkg-30/types-20';

type DeepMerge_3314<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object
      ? U[K] extends object
        ? DeepMerge_3314<T[K], U[K]>
        : U[K]
      : U[K]
    : K extends keyof T
      ? T[K]
      : K extends keyof U
        ? U[K]
        : never;
};

interface Entity_33_14 {
  id: string;
  meta: {
    created: Date;
    updated: Date;
    version: number;
    tags: string[];
    attrs: Record<string, {v: unknown; t: string; ok: boolean}>;
  };
  rels: {parent: Entity_33_14 | null; children: Entity_33_14[]};
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
  d14: {x3314: number; y3314: string; z3314: boolean};
}

type Path_3314<T, D extends unknown[] = []> = D['length'] extends 6
  ? never
  : T extends object
    ? {
        [K in keyof T & string]: K | `${K}.${Path_3314<T[K], [...D, unknown]>}`;
      }[keyof T & string]
    : never;
type EP_3314 = Path_3314<Entity_33_14>;

type Val_3314<T> = {
  [K in keyof T]: T[K] extends string
    ? {t: 's'; min: number; max: number}
    : T[K] extends number
      ? {t: 'n'; min: number; max: number}
      : T[K] extends boolean
        ? {t: 'b'; def: boolean}
        : T[K] extends unknown[]
          ? {t: 'a'; items: Val_3314<T[K][number]>}
          : T[K] extends object
            ? {t: 'o'; props: Val_3314<T[K]>}
            : {t: 'u'};
};
type EV_3314 = Val_3314<Entity_33_14>;

interface Registry_33_14 {
  entities: Map<string, Entity_33_14>;
  validators: EV_3314;
  paths: Set<EP_3314>;
  merged: DeepMerge_3314<Entity_33_14, {extra3314: string}>;
}

type CK_3314 =
  `p33.t14.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type {
  Entity_33_14,
  Registry_33_14,
  CK_3314,
  EP_3314,
  EV_3314,
  DeepMerge_3314,
};
