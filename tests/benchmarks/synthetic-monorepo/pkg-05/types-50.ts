// pkg-05/types-50 - heavy interconnected types

import type {Entity_4_01, Registry_4_01} from '../pkg-04/types-01';
import type {Entity_4_10, Registry_4_10} from '../pkg-04/types-10';
import type {Entity_4_20, Registry_4_20} from '../pkg-04/types-20';
import type {Entity_3_01, Registry_3_01} from '../pkg-03/types-01';
import type {Entity_3_10, Registry_3_10} from '../pkg-03/types-10';
import type {Entity_3_20, Registry_3_20} from '../pkg-03/types-20';
import type {Entity_2_01, Registry_2_01} from '../pkg-02/types-01';
import type {Entity_2_10, Registry_2_10} from '../pkg-02/types-10';
import type {Entity_2_20, Registry_2_20} from '../pkg-02/types-20';

type DeepMerge_0550<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object
      ? U[K] extends object
        ? DeepMerge_0550<T[K], U[K]>
        : U[K]
      : U[K]
    : K extends keyof T
      ? T[K]
      : K extends keyof U
        ? U[K]
        : never;
};

interface Entity_05_50 {
  id: string;
  meta: {
    created: Date;
    updated: Date;
    version: number;
    tags: string[];
    attrs: Record<string, {v: unknown; t: string; ok: boolean}>;
  };
  rels: {parent: Entity_05_50 | null; children: Entity_05_50[]};
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
  d50: {x0550: number; y0550: string; z0550: boolean};
}

type Path_0550<T, D extends unknown[] = []> = D['length'] extends 6
  ? never
  : T extends object
    ? {
        [K in keyof T & string]: K | `${K}.${Path_0550<T[K], [...D, unknown]>}`;
      }[keyof T & string]
    : never;
type EP_0550 = Path_0550<Entity_05_50>;

type Val_0550<T> = {
  [K in keyof T]: T[K] extends string
    ? {t: 's'; min: number; max: number}
    : T[K] extends number
      ? {t: 'n'; min: number; max: number}
      : T[K] extends boolean
        ? {t: 'b'; def: boolean}
        : T[K] extends unknown[]
          ? {t: 'a'; items: Val_0550<T[K][number]>}
          : T[K] extends object
            ? {t: 'o'; props: Val_0550<T[K]>}
            : {t: 'u'};
};
type EV_0550 = Val_0550<Entity_05_50>;

interface Registry_05_50 {
  entities: Map<string, Entity_05_50>;
  validators: EV_0550;
  paths: Set<EP_0550>;
  merged: DeepMerge_0550<Entity_05_50, {extra0550: string}>;
}

type CK_0550 =
  `p05.t50.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type {
  Entity_05_50,
  Registry_05_50,
  CK_0550,
  EP_0550,
  EV_0550,
  DeepMerge_0550,
};
