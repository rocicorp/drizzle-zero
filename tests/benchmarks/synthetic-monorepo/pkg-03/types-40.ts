// pkg-03/types-40 - heavy interconnected types

import type {Entity_2_01, Registry_2_01} from '../pkg-02/types-01';
import type {Entity_2_10, Registry_2_10} from '../pkg-02/types-10';
import type {Entity_2_20, Registry_2_20} from '../pkg-02/types-20';
import type {Entity_1_01, Registry_1_01} from '../pkg-01/types-01';
import type {Entity_1_10, Registry_1_10} from '../pkg-01/types-10';
import type {Entity_1_20, Registry_1_20} from '../pkg-01/types-20';

type DeepMerge_0340<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object
      ? U[K] extends object
        ? DeepMerge_0340<T[K], U[K]>
        : U[K]
      : U[K]
    : K extends keyof T
      ? T[K]
      : K extends keyof U
        ? U[K]
        : never;
};

interface Entity_03_40 {
  id: string;
  meta: {
    created: Date;
    updated: Date;
    version: number;
    tags: string[];
    attrs: Record<string, {v: unknown; t: string; ok: boolean}>;
  };
  rels: {parent: Entity_03_40 | null; children: Entity_03_40[]};
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
  d40: {x0340: number; y0340: string; z0340: boolean};
}

type Path_0340<T, D extends unknown[] = []> = D['length'] extends 6
  ? never
  : T extends object
    ? {
        [K in keyof T & string]: K | `${K}.${Path_0340<T[K], [...D, unknown]>}`;
      }[keyof T & string]
    : never;
type EP_0340 = Path_0340<Entity_03_40>;

type Val_0340<T> = {
  [K in keyof T]: T[K] extends string
    ? {t: 's'; min: number; max: number}
    : T[K] extends number
      ? {t: 'n'; min: number; max: number}
      : T[K] extends boolean
        ? {t: 'b'; def: boolean}
        : T[K] extends unknown[]
          ? {t: 'a'; items: Val_0340<T[K][number]>}
          : T[K] extends object
            ? {t: 'o'; props: Val_0340<T[K]>}
            : {t: 'u'};
};
type EV_0340 = Val_0340<Entity_03_40>;

interface Registry_03_40 {
  entities: Map<string, Entity_03_40>;
  validators: EV_0340;
  paths: Set<EP_0340>;
  merged: DeepMerge_0340<Entity_03_40, {extra0340: string}>;
}

type CK_0340 =
  `p03.t40.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type {
  Entity_03_40,
  Registry_03_40,
  CK_0340,
  EP_0340,
  EV_0340,
  DeepMerge_0340,
};
