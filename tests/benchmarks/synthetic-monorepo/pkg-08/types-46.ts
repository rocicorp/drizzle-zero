// pkg-08/types-46 - heavy interconnected types

import type {Entity_7_01, Registry_7_01} from '../pkg-07/types-01';
import type {Entity_7_10, Registry_7_10} from '../pkg-07/types-10';
import type {Entity_7_20, Registry_7_20} from '../pkg-07/types-20';
import type {Entity_6_01, Registry_6_01} from '../pkg-06/types-01';
import type {Entity_6_10, Registry_6_10} from '../pkg-06/types-10';
import type {Entity_6_20, Registry_6_20} from '../pkg-06/types-20';
import type {Entity_5_01, Registry_5_01} from '../pkg-05/types-01';
import type {Entity_5_10, Registry_5_10} from '../pkg-05/types-10';
import type {Entity_5_20, Registry_5_20} from '../pkg-05/types-20';

type DeepMerge_0846<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object
      ? U[K] extends object
        ? DeepMerge_0846<T[K], U[K]>
        : U[K]
      : U[K]
    : K extends keyof T
      ? T[K]
      : K extends keyof U
        ? U[K]
        : never;
};

interface Entity_08_46 {
  id: string;
  meta: {
    created: Date;
    updated: Date;
    version: number;
    tags: string[];
    attrs: Record<string, {v: unknown; t: string; ok: boolean}>;
  };
  rels: {parent: Entity_08_46 | null; children: Entity_08_46[]};
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
  d46: {x0846: number; y0846: string; z0846: boolean};
}

type Path_0846<T, D extends unknown[] = []> = D['length'] extends 6
  ? never
  : T extends object
    ? {
        [K in keyof T & string]: K | `${K}.${Path_0846<T[K], [...D, unknown]>}`;
      }[keyof T & string]
    : never;
type EP_0846 = Path_0846<Entity_08_46>;

type Val_0846<T> = {
  [K in keyof T]: T[K] extends string
    ? {t: 's'; min: number; max: number}
    : T[K] extends number
      ? {t: 'n'; min: number; max: number}
      : T[K] extends boolean
        ? {t: 'b'; def: boolean}
        : T[K] extends unknown[]
          ? {t: 'a'; items: Val_0846<T[K][number]>}
          : T[K] extends object
            ? {t: 'o'; props: Val_0846<T[K]>}
            : {t: 'u'};
};
type EV_0846 = Val_0846<Entity_08_46>;

interface Registry_08_46 {
  entities: Map<string, Entity_08_46>;
  validators: EV_0846;
  paths: Set<EP_0846>;
  merged: DeepMerge_0846<Entity_08_46, {extra0846: string}>;
}

type CK_0846 =
  `p08.t46.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type {
  Entity_08_46,
  Registry_08_46,
  CK_0846,
  EP_0846,
  EV_0846,
  DeepMerge_0846,
};
