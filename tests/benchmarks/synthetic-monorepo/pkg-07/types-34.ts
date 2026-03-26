// pkg-07/types-34 - heavy interconnected types

import type {Entity_6_01, Registry_6_01} from '../pkg-06/types-01';
import type {Entity_6_10, Registry_6_10} from '../pkg-06/types-10';
import type {Entity_6_20, Registry_6_20} from '../pkg-06/types-20';
import type {Entity_5_01, Registry_5_01} from '../pkg-05/types-01';
import type {Entity_5_10, Registry_5_10} from '../pkg-05/types-10';
import type {Entity_5_20, Registry_5_20} from '../pkg-05/types-20';
import type {Entity_4_01, Registry_4_01} from '../pkg-04/types-01';
import type {Entity_4_10, Registry_4_10} from '../pkg-04/types-10';
import type {Entity_4_20, Registry_4_20} from '../pkg-04/types-20';

type DeepMerge_0734<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object
      ? U[K] extends object
        ? DeepMerge_0734<T[K], U[K]>
        : U[K]
      : U[K]
    : K extends keyof T
      ? T[K]
      : K extends keyof U
        ? U[K]
        : never;
};

interface Entity_07_34 {
  id: string;
  meta: {
    created: Date;
    updated: Date;
    version: number;
    tags: string[];
    attrs: Record<string, {v: unknown; t: string; ok: boolean}>;
  };
  rels: {parent: Entity_07_34 | null; children: Entity_07_34[]};
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
  d34: {x0734: number; y0734: string; z0734: boolean};
}

type Path_0734<T, D extends unknown[] = []> = D['length'] extends 6
  ? never
  : T extends object
    ? {
        [K in keyof T & string]: K | `${K}.${Path_0734<T[K], [...D, unknown]>}`;
      }[keyof T & string]
    : never;
type EP_0734 = Path_0734<Entity_07_34>;

type Val_0734<T> = {
  [K in keyof T]: T[K] extends string
    ? {t: 's'; min: number; max: number}
    : T[K] extends number
      ? {t: 'n'; min: number; max: number}
      : T[K] extends boolean
        ? {t: 'b'; def: boolean}
        : T[K] extends unknown[]
          ? {t: 'a'; items: Val_0734<T[K][number]>}
          : T[K] extends object
            ? {t: 'o'; props: Val_0734<T[K]>}
            : {t: 'u'};
};
type EV_0734 = Val_0734<Entity_07_34>;

interface Registry_07_34 {
  entities: Map<string, Entity_07_34>;
  validators: EV_0734;
  paths: Set<EP_0734>;
  merged: DeepMerge_0734<Entity_07_34, {extra0734: string}>;
}

type CK_0734 =
  `p07.t34.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type {
  Entity_07_34,
  Registry_07_34,
  CK_0734,
  EP_0734,
  EV_0734,
  DeepMerge_0734,
};
