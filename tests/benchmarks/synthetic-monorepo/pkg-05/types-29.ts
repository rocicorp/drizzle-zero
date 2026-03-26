// pkg-05/types-29 - heavy interconnected types

import type {Entity_4_01, Registry_4_01} from '../pkg-04/types-01';
import type {Entity_4_10, Registry_4_10} from '../pkg-04/types-10';
import type {Entity_4_20, Registry_4_20} from '../pkg-04/types-20';
import type {Entity_3_01, Registry_3_01} from '../pkg-03/types-01';
import type {Entity_3_10, Registry_3_10} from '../pkg-03/types-10';
import type {Entity_3_20, Registry_3_20} from '../pkg-03/types-20';
import type {Entity_2_01, Registry_2_01} from '../pkg-02/types-01';
import type {Entity_2_10, Registry_2_10} from '../pkg-02/types-10';
import type {Entity_2_20, Registry_2_20} from '../pkg-02/types-20';

type DeepMerge_0529<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object
      ? U[K] extends object
        ? DeepMerge_0529<T[K], U[K]>
        : U[K]
      : U[K]
    : K extends keyof T
      ? T[K]
      : K extends keyof U
        ? U[K]
        : never;
};

interface Entity_05_29 {
  id: string;
  meta: {
    created: Date;
    updated: Date;
    version: number;
    tags: string[];
    attrs: Record<string, {v: unknown; t: string; ok: boolean}>;
  };
  rels: {parent: Entity_05_29 | null; children: Entity_05_29[]};
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
  d29: {x0529: number; y0529: string; z0529: boolean};
}

type Path_0529<T, D extends unknown[] = []> = D['length'] extends 6
  ? never
  : T extends object
    ? {
        [K in keyof T & string]: K | `${K}.${Path_0529<T[K], [...D, unknown]>}`;
      }[keyof T & string]
    : never;
type EP_0529 = Path_0529<Entity_05_29>;

type Val_0529<T> = {
  [K in keyof T]: T[K] extends string
    ? {t: 's'; min: number; max: number}
    : T[K] extends number
      ? {t: 'n'; min: number; max: number}
      : T[K] extends boolean
        ? {t: 'b'; def: boolean}
        : T[K] extends unknown[]
          ? {t: 'a'; items: Val_0529<T[K][number]>}
          : T[K] extends object
            ? {t: 'o'; props: Val_0529<T[K]>}
            : {t: 'u'};
};
type EV_0529 = Val_0529<Entity_05_29>;

interface Registry_05_29 {
  entities: Map<string, Entity_05_29>;
  validators: EV_0529;
  paths: Set<EP_0529>;
  merged: DeepMerge_0529<Entity_05_29, {extra0529: string}>;
}

type CK_0529 =
  `p05.t29.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type {
  Entity_05_29,
  Registry_05_29,
  CK_0529,
  EP_0529,
  EV_0529,
  DeepMerge_0529,
};
