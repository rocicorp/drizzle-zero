// pkg-15/types-34 - heavy interconnected types

import type {Entity_14_01, Registry_14_01} from '../pkg-14/types-01';
import type {Entity_14_10, Registry_14_10} from '../pkg-14/types-10';
import type {Entity_14_20, Registry_14_20} from '../pkg-14/types-20';
import type {Entity_13_01, Registry_13_01} from '../pkg-13/types-01';
import type {Entity_13_10, Registry_13_10} from '../pkg-13/types-10';
import type {Entity_13_20, Registry_13_20} from '../pkg-13/types-20';
import type {Entity_12_01, Registry_12_01} from '../pkg-12/types-01';
import type {Entity_12_10, Registry_12_10} from '../pkg-12/types-10';
import type {Entity_12_20, Registry_12_20} from '../pkg-12/types-20';

type DeepMerge_1534<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object
      ? U[K] extends object
        ? DeepMerge_1534<T[K], U[K]>
        : U[K]
      : U[K]
    : K extends keyof T
      ? T[K]
      : K extends keyof U
        ? U[K]
        : never;
};

interface Entity_15_34 {
  id: string;
  meta: {
    created: Date;
    updated: Date;
    version: number;
    tags: string[];
    attrs: Record<string, {v: unknown; t: string; ok: boolean}>;
  };
  rels: {parent: Entity_15_34 | null; children: Entity_15_34[]};
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
  d34: {x1534: number; y1534: string; z1534: boolean};
}

type Path_1534<T, D extends unknown[] = []> = D['length'] extends 6
  ? never
  : T extends object
    ? {
        [K in keyof T & string]: K | `${K}.${Path_1534<T[K], [...D, unknown]>}`;
      }[keyof T & string]
    : never;
type EP_1534 = Path_1534<Entity_15_34>;

type Val_1534<T> = {
  [K in keyof T]: T[K] extends string
    ? {t: 's'; min: number; max: number}
    : T[K] extends number
      ? {t: 'n'; min: number; max: number}
      : T[K] extends boolean
        ? {t: 'b'; def: boolean}
        : T[K] extends unknown[]
          ? {t: 'a'; items: Val_1534<T[K][number]>}
          : T[K] extends object
            ? {t: 'o'; props: Val_1534<T[K]>}
            : {t: 'u'};
};
type EV_1534 = Val_1534<Entity_15_34>;

interface Registry_15_34 {
  entities: Map<string, Entity_15_34>;
  validators: EV_1534;
  paths: Set<EP_1534>;
  merged: DeepMerge_1534<Entity_15_34, {extra1534: string}>;
}

type CK_1534 =
  `p15.t34.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type {
  Entity_15_34,
  Registry_15_34,
  CK_1534,
  EP_1534,
  EV_1534,
  DeepMerge_1534,
};
