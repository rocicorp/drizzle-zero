// pkg-24/types-34 - heavy interconnected types

import type {Entity_23_01, Registry_23_01} from '../pkg-23/types-01';
import type {Entity_23_10, Registry_23_10} from '../pkg-23/types-10';
import type {Entity_23_20, Registry_23_20} from '../pkg-23/types-20';
import type {Entity_22_01, Registry_22_01} from '../pkg-22/types-01';
import type {Entity_22_10, Registry_22_10} from '../pkg-22/types-10';
import type {Entity_22_20, Registry_22_20} from '../pkg-22/types-20';
import type {Entity_21_01, Registry_21_01} from '../pkg-21/types-01';
import type {Entity_21_10, Registry_21_10} from '../pkg-21/types-10';
import type {Entity_21_20, Registry_21_20} from '../pkg-21/types-20';

type DeepMerge_2434<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object
      ? U[K] extends object
        ? DeepMerge_2434<T[K], U[K]>
        : U[K]
      : U[K]
    : K extends keyof T
      ? T[K]
      : K extends keyof U
        ? U[K]
        : never;
};

interface Entity_24_34 {
  id: string;
  meta: {
    created: Date;
    updated: Date;
    version: number;
    tags: string[];
    attrs: Record<string, {v: unknown; t: string; ok: boolean}>;
  };
  rels: {parent: Entity_24_34 | null; children: Entity_24_34[]};
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
  d34: {x2434: number; y2434: string; z2434: boolean};
}

type Path_2434<T, D extends unknown[] = []> = D['length'] extends 6
  ? never
  : T extends object
    ? {
        [K in keyof T & string]: K | `${K}.${Path_2434<T[K], [...D, unknown]>}`;
      }[keyof T & string]
    : never;
type EP_2434 = Path_2434<Entity_24_34>;

type Val_2434<T> = {
  [K in keyof T]: T[K] extends string
    ? {t: 's'; min: number; max: number}
    : T[K] extends number
      ? {t: 'n'; min: number; max: number}
      : T[K] extends boolean
        ? {t: 'b'; def: boolean}
        : T[K] extends unknown[]
          ? {t: 'a'; items: Val_2434<T[K][number]>}
          : T[K] extends object
            ? {t: 'o'; props: Val_2434<T[K]>}
            : {t: 'u'};
};
type EV_2434 = Val_2434<Entity_24_34>;

interface Registry_24_34 {
  entities: Map<string, Entity_24_34>;
  validators: EV_2434;
  paths: Set<EP_2434>;
  merged: DeepMerge_2434<Entity_24_34, {extra2434: string}>;
}

type CK_2434 =
  `p24.t34.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type {
  Entity_24_34,
  Registry_24_34,
  CK_2434,
  EP_2434,
  EV_2434,
  DeepMerge_2434,
};
