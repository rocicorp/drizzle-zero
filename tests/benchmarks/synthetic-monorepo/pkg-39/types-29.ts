// pkg-39/types-29 - heavy interconnected types

import type {Entity_38_01, Registry_38_01} from '../pkg-38/types-01';
import type {Entity_38_10, Registry_38_10} from '../pkg-38/types-10';
import type {Entity_38_20, Registry_38_20} from '../pkg-38/types-20';
import type {Entity_37_01, Registry_37_01} from '../pkg-37/types-01';
import type {Entity_37_10, Registry_37_10} from '../pkg-37/types-10';
import type {Entity_37_20, Registry_37_20} from '../pkg-37/types-20';
import type {Entity_36_01, Registry_36_01} from '../pkg-36/types-01';
import type {Entity_36_10, Registry_36_10} from '../pkg-36/types-10';
import type {Entity_36_20, Registry_36_20} from '../pkg-36/types-20';

type DeepMerge_3929<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object
      ? U[K] extends object
        ? DeepMerge_3929<T[K], U[K]>
        : U[K]
      : U[K]
    : K extends keyof T
      ? T[K]
      : K extends keyof U
        ? U[K]
        : never;
};

interface Entity_39_29 {
  id: string;
  meta: {
    created: Date;
    updated: Date;
    version: number;
    tags: string[];
    attrs: Record<string, {v: unknown; t: string; ok: boolean}>;
  };
  rels: {parent: Entity_39_29 | null; children: Entity_39_29[]};
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
  d29: {x3929: number; y3929: string; z3929: boolean};
}

type Path_3929<T, D extends unknown[] = []> = D['length'] extends 6
  ? never
  : T extends object
    ? {
        [K in keyof T & string]: K | `${K}.${Path_3929<T[K], [...D, unknown]>}`;
      }[keyof T & string]
    : never;
type EP_3929 = Path_3929<Entity_39_29>;

type Val_3929<T> = {
  [K in keyof T]: T[K] extends string
    ? {t: 's'; min: number; max: number}
    : T[K] extends number
      ? {t: 'n'; min: number; max: number}
      : T[K] extends boolean
        ? {t: 'b'; def: boolean}
        : T[K] extends unknown[]
          ? {t: 'a'; items: Val_3929<T[K][number]>}
          : T[K] extends object
            ? {t: 'o'; props: Val_3929<T[K]>}
            : {t: 'u'};
};
type EV_3929 = Val_3929<Entity_39_29>;

interface Registry_39_29 {
  entities: Map<string, Entity_39_29>;
  validators: EV_3929;
  paths: Set<EP_3929>;
  merged: DeepMerge_3929<Entity_39_29, {extra3929: string}>;
}

type CK_3929 =
  `p39.t29.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type {
  Entity_39_29,
  Registry_39_29,
  CK_3929,
  EP_3929,
  EV_3929,
  DeepMerge_3929,
};
