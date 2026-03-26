// pkg-29/types-10 - heavy interconnected types

import type {Entity_28_01, Registry_28_01} from '../pkg-28/types-01';
import type {Entity_28_10, Registry_28_10} from '../pkg-28/types-10';
import type {Entity_28_20, Registry_28_20} from '../pkg-28/types-20';
import type {Entity_27_01, Registry_27_01} from '../pkg-27/types-01';
import type {Entity_27_10, Registry_27_10} from '../pkg-27/types-10';
import type {Entity_27_20, Registry_27_20} from '../pkg-27/types-20';
import type {Entity_26_01, Registry_26_01} from '../pkg-26/types-01';
import type {Entity_26_10, Registry_26_10} from '../pkg-26/types-10';
import type {Entity_26_20, Registry_26_20} from '../pkg-26/types-20';

type DeepMerge_2910<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object
      ? U[K] extends object
        ? DeepMerge_2910<T[K], U[K]>
        : U[K]
      : U[K]
    : K extends keyof T
      ? T[K]
      : K extends keyof U
        ? U[K]
        : never;
};

interface Entity_29_10 {
  id: string;
  meta: {
    created: Date;
    updated: Date;
    version: number;
    tags: string[];
    attrs: Record<string, {v: unknown; t: string; ok: boolean}>;
  };
  rels: {parent: Entity_29_10 | null; children: Entity_29_10[]};
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
  d10: {x2910: number; y2910: string; z2910: boolean};
}

type Path_2910<T, D extends unknown[] = []> = D['length'] extends 6
  ? never
  : T extends object
    ? {
        [K in keyof T & string]: K | `${K}.${Path_2910<T[K], [...D, unknown]>}`;
      }[keyof T & string]
    : never;
type EP_2910 = Path_2910<Entity_29_10>;

type Val_2910<T> = {
  [K in keyof T]: T[K] extends string
    ? {t: 's'; min: number; max: number}
    : T[K] extends number
      ? {t: 'n'; min: number; max: number}
      : T[K] extends boolean
        ? {t: 'b'; def: boolean}
        : T[K] extends unknown[]
          ? {t: 'a'; items: Val_2910<T[K][number]>}
          : T[K] extends object
            ? {t: 'o'; props: Val_2910<T[K]>}
            : {t: 'u'};
};
type EV_2910 = Val_2910<Entity_29_10>;

interface Registry_29_10 {
  entities: Map<string, Entity_29_10>;
  validators: EV_2910;
  paths: Set<EP_2910>;
  merged: DeepMerge_2910<Entity_29_10, {extra2910: string}>;
}

type CK_2910 =
  `p29.t10.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type {
  Entity_29_10,
  Registry_29_10,
  CK_2910,
  EP_2910,
  EV_2910,
  DeepMerge_2910,
};
