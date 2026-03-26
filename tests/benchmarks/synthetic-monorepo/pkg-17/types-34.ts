// pkg-17/types-34 - heavy interconnected types

import type {Entity_16_01, Registry_16_01} from '../pkg-16/types-01';
import type {Entity_16_10, Registry_16_10} from '../pkg-16/types-10';
import type {Entity_16_20, Registry_16_20} from '../pkg-16/types-20';
import type {Entity_15_01, Registry_15_01} from '../pkg-15/types-01';
import type {Entity_15_10, Registry_15_10} from '../pkg-15/types-10';
import type {Entity_15_20, Registry_15_20} from '../pkg-15/types-20';
import type {Entity_14_01, Registry_14_01} from '../pkg-14/types-01';
import type {Entity_14_10, Registry_14_10} from '../pkg-14/types-10';
import type {Entity_14_20, Registry_14_20} from '../pkg-14/types-20';

type DeepMerge_1734<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object
      ? U[K] extends object
        ? DeepMerge_1734<T[K], U[K]>
        : U[K]
      : U[K]
    : K extends keyof T
      ? T[K]
      : K extends keyof U
        ? U[K]
        : never;
};

interface Entity_17_34 {
  id: string;
  meta: {
    created: Date;
    updated: Date;
    version: number;
    tags: string[];
    attrs: Record<string, {v: unknown; t: string; ok: boolean}>;
  };
  rels: {parent: Entity_17_34 | null; children: Entity_17_34[]};
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
  d34: {x1734: number; y1734: string; z1734: boolean};
}

type Path_1734<T, D extends unknown[] = []> = D['length'] extends 6
  ? never
  : T extends object
    ? {
        [K in keyof T & string]: K | `${K}.${Path_1734<T[K], [...D, unknown]>}`;
      }[keyof T & string]
    : never;
type EP_1734 = Path_1734<Entity_17_34>;

type Val_1734<T> = {
  [K in keyof T]: T[K] extends string
    ? {t: 's'; min: number; max: number}
    : T[K] extends number
      ? {t: 'n'; min: number; max: number}
      : T[K] extends boolean
        ? {t: 'b'; def: boolean}
        : T[K] extends unknown[]
          ? {t: 'a'; items: Val_1734<T[K][number]>}
          : T[K] extends object
            ? {t: 'o'; props: Val_1734<T[K]>}
            : {t: 'u'};
};
type EV_1734 = Val_1734<Entity_17_34>;

interface Registry_17_34 {
  entities: Map<string, Entity_17_34>;
  validators: EV_1734;
  paths: Set<EP_1734>;
  merged: DeepMerge_1734<Entity_17_34, {extra1734: string}>;
}

type CK_1734 =
  `p17.t34.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type {
  Entity_17_34,
  Registry_17_34,
  CK_1734,
  EP_1734,
  EV_1734,
  DeepMerge_1734,
};
