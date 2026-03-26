// pkg-05/types-35 - heavy interconnected types

import type {Entity_4_01, Registry_4_01} from '../pkg-04/types-01';
import type {Entity_4_10, Registry_4_10} from '../pkg-04/types-10';
import type {Entity_4_20, Registry_4_20} from '../pkg-04/types-20';
import type {Entity_3_01, Registry_3_01} from '../pkg-03/types-01';
import type {Entity_3_10, Registry_3_10} from '../pkg-03/types-10';
import type {Entity_3_20, Registry_3_20} from '../pkg-03/types-20';
import type {Entity_2_01, Registry_2_01} from '../pkg-02/types-01';
import type {Entity_2_10, Registry_2_10} from '../pkg-02/types-10';
import type {Entity_2_20, Registry_2_20} from '../pkg-02/types-20';

type DeepMerge_0535<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object
      ? U[K] extends object
        ? DeepMerge_0535<T[K], U[K]>
        : U[K]
      : U[K]
    : K extends keyof T
      ? T[K]
      : K extends keyof U
        ? U[K]
        : never;
};

interface Entity_05_35 {
  id: string;
  meta: {
    created: Date;
    updated: Date;
    version: number;
    tags: string[];
    attrs: Record<string, {v: unknown; t: string; ok: boolean}>;
  };
  rels: {parent: Entity_05_35 | null; children: Entity_05_35[]};
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
  d35: {x0535: number; y0535: string; z0535: boolean};
}

type Path_0535<T, D extends unknown[] = []> = D['length'] extends 6
  ? never
  : T extends object
    ? {
        [K in keyof T & string]: K | `${K}.${Path_0535<T[K], [...D, unknown]>}`;
      }[keyof T & string]
    : never;
type EP_0535 = Path_0535<Entity_05_35>;

type Val_0535<T> = {
  [K in keyof T]: T[K] extends string
    ? {t: 's'; min: number; max: number}
    : T[K] extends number
      ? {t: 'n'; min: number; max: number}
      : T[K] extends boolean
        ? {t: 'b'; def: boolean}
        : T[K] extends unknown[]
          ? {t: 'a'; items: Val_0535<T[K][number]>}
          : T[K] extends object
            ? {t: 'o'; props: Val_0535<T[K]>}
            : {t: 'u'};
};
type EV_0535 = Val_0535<Entity_05_35>;

interface Registry_05_35 {
  entities: Map<string, Entity_05_35>;
  validators: EV_0535;
  paths: Set<EP_0535>;
  merged: DeepMerge_0535<Entity_05_35, {extra0535: string}>;
}

type CK_0535 =
  `p05.t35.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type {
  Entity_05_35,
  Registry_05_35,
  CK_0535,
  EP_0535,
  EV_0535,
  DeepMerge_0535,
};
