// pkg-26/types-20 - heavy interconnected types

import type {Entity_25_01, Registry_25_01} from '../pkg-25/types-01';
import type {Entity_25_10, Registry_25_10} from '../pkg-25/types-10';
import type {Entity_25_20, Registry_25_20} from '../pkg-25/types-20';
import type {Entity_24_01, Registry_24_01} from '../pkg-24/types-01';
import type {Entity_24_10, Registry_24_10} from '../pkg-24/types-10';
import type {Entity_24_20, Registry_24_20} from '../pkg-24/types-20';
import type {Entity_23_01, Registry_23_01} from '../pkg-23/types-01';
import type {Entity_23_10, Registry_23_10} from '../pkg-23/types-10';
import type {Entity_23_20, Registry_23_20} from '../pkg-23/types-20';

type DeepMerge_2620<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object
      ? U[K] extends object
        ? DeepMerge_2620<T[K], U[K]>
        : U[K]
      : U[K]
    : K extends keyof T
      ? T[K]
      : K extends keyof U
        ? U[K]
        : never;
};

interface Entity_26_20 {
  id: string;
  meta: {
    created: Date;
    updated: Date;
    version: number;
    tags: string[];
    attrs: Record<string, {v: unknown; t: string; ok: boolean}>;
  };
  rels: {parent: Entity_26_20 | null; children: Entity_26_20[]};
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
  d20: {x2620: number; y2620: string; z2620: boolean};
}

type Path_2620<T, D extends unknown[] = []> = D['length'] extends 6
  ? never
  : T extends object
    ? {
        [K in keyof T & string]: K | `${K}.${Path_2620<T[K], [...D, unknown]>}`;
      }[keyof T & string]
    : never;
type EP_2620 = Path_2620<Entity_26_20>;

type Val_2620<T> = {
  [K in keyof T]: T[K] extends string
    ? {t: 's'; min: number; max: number}
    : T[K] extends number
      ? {t: 'n'; min: number; max: number}
      : T[K] extends boolean
        ? {t: 'b'; def: boolean}
        : T[K] extends unknown[]
          ? {t: 'a'; items: Val_2620<T[K][number]>}
          : T[K] extends object
            ? {t: 'o'; props: Val_2620<T[K]>}
            : {t: 'u'};
};
type EV_2620 = Val_2620<Entity_26_20>;

interface Registry_26_20 {
  entities: Map<string, Entity_26_20>;
  validators: EV_2620;
  paths: Set<EP_2620>;
  merged: DeepMerge_2620<Entity_26_20, {extra2620: string}>;
}

type CK_2620 =
  `p26.t20.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type {
  Entity_26_20,
  Registry_26_20,
  CK_2620,
  EP_2620,
  EV_2620,
  DeepMerge_2620,
};
