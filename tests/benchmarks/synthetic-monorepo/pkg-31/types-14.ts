// pkg-31/types-14 - heavy interconnected types

import type {Entity_30_01, Registry_30_01} from '../pkg-30/types-01';
import type {Entity_30_10, Registry_30_10} from '../pkg-30/types-10';
import type {Entity_30_20, Registry_30_20} from '../pkg-30/types-20';
import type {Entity_29_01, Registry_29_01} from '../pkg-29/types-01';
import type {Entity_29_10, Registry_29_10} from '../pkg-29/types-10';
import type {Entity_29_20, Registry_29_20} from '../pkg-29/types-20';
import type {Entity_28_01, Registry_28_01} from '../pkg-28/types-01';
import type {Entity_28_10, Registry_28_10} from '../pkg-28/types-10';
import type {Entity_28_20, Registry_28_20} from '../pkg-28/types-20';

type DeepMerge_3114<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object
      ? U[K] extends object
        ? DeepMerge_3114<T[K], U[K]>
        : U[K]
      : U[K]
    : K extends keyof T
      ? T[K]
      : K extends keyof U
        ? U[K]
        : never;
};

interface Entity_31_14 {
  id: string;
  meta: {
    created: Date;
    updated: Date;
    version: number;
    tags: string[];
    attrs: Record<string, {v: unknown; t: string; ok: boolean}>;
  };
  rels: {parent: Entity_31_14 | null; children: Entity_31_14[]};
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
  d14: {x3114: number; y3114: string; z3114: boolean};
}

type Path_3114<T, D extends unknown[] = []> = D['length'] extends 6
  ? never
  : T extends object
    ? {
        [K in keyof T & string]: K | `${K}.${Path_3114<T[K], [...D, unknown]>}`;
      }[keyof T & string]
    : never;
type EP_3114 = Path_3114<Entity_31_14>;

type Val_3114<T> = {
  [K in keyof T]: T[K] extends string
    ? {t: 's'; min: number; max: number}
    : T[K] extends number
      ? {t: 'n'; min: number; max: number}
      : T[K] extends boolean
        ? {t: 'b'; def: boolean}
        : T[K] extends unknown[]
          ? {t: 'a'; items: Val_3114<T[K][number]>}
          : T[K] extends object
            ? {t: 'o'; props: Val_3114<T[K]>}
            : {t: 'u'};
};
type EV_3114 = Val_3114<Entity_31_14>;

interface Registry_31_14 {
  entities: Map<string, Entity_31_14>;
  validators: EV_3114;
  paths: Set<EP_3114>;
  merged: DeepMerge_3114<Entity_31_14, {extra3114: string}>;
}

type CK_3114 =
  `p31.t14.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type {
  Entity_31_14,
  Registry_31_14,
  CK_3114,
  EP_3114,
  EV_3114,
  DeepMerge_3114,
};
