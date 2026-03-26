// pkg-03/types-24 - heavy interconnected types

import type {Entity_2_01, Registry_2_01} from '../pkg-02/types-01';
import type {Entity_2_10, Registry_2_10} from '../pkg-02/types-10';
import type {Entity_2_20, Registry_2_20} from '../pkg-02/types-20';
import type {Entity_1_01, Registry_1_01} from '../pkg-01/types-01';
import type {Entity_1_10, Registry_1_10} from '../pkg-01/types-10';
import type {Entity_1_20, Registry_1_20} from '../pkg-01/types-20';

type DeepMerge_0324<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object
      ? U[K] extends object
        ? DeepMerge_0324<T[K], U[K]>
        : U[K]
      : U[K]
    : K extends keyof T
      ? T[K]
      : K extends keyof U
        ? U[K]
        : never;
};

interface Entity_03_24 {
  id: string;
  meta: {
    created: Date;
    updated: Date;
    version: number;
    tags: string[];
    attrs: Record<string, {v: unknown; t: string; ok: boolean}>;
  };
  rels: {parent: Entity_03_24 | null; children: Entity_03_24[]};
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
  d24: {x0324: number; y0324: string; z0324: boolean};
}

type Path_0324<T, D extends unknown[] = []> = D['length'] extends 6
  ? never
  : T extends object
    ? {
        [K in keyof T & string]: K | `${K}.${Path_0324<T[K], [...D, unknown]>}`;
      }[keyof T & string]
    : never;
type EP_0324 = Path_0324<Entity_03_24>;

type Val_0324<T> = {
  [K in keyof T]: T[K] extends string
    ? {t: 's'; min: number; max: number}
    : T[K] extends number
      ? {t: 'n'; min: number; max: number}
      : T[K] extends boolean
        ? {t: 'b'; def: boolean}
        : T[K] extends unknown[]
          ? {t: 'a'; items: Val_0324<T[K][number]>}
          : T[K] extends object
            ? {t: 'o'; props: Val_0324<T[K]>}
            : {t: 'u'};
};
type EV_0324 = Val_0324<Entity_03_24>;

interface Registry_03_24 {
  entities: Map<string, Entity_03_24>;
  validators: EV_0324;
  paths: Set<EP_0324>;
  merged: DeepMerge_0324<Entity_03_24, {extra0324: string}>;
}

type CK_0324 =
  `p03.t24.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type {
  Entity_03_24,
  Registry_03_24,
  CK_0324,
  EP_0324,
  EV_0324,
  DeepMerge_0324,
};
