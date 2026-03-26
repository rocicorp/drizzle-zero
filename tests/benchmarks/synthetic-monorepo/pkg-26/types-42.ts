// pkg-26/types-42 - heavy interconnected types

import type {Entity_25_01, Registry_25_01} from '../pkg-25/types-01';
import type {Entity_25_10, Registry_25_10} from '../pkg-25/types-10';
import type {Entity_25_20, Registry_25_20} from '../pkg-25/types-20';
import type {Entity_24_01, Registry_24_01} from '../pkg-24/types-01';
import type {Entity_24_10, Registry_24_10} from '../pkg-24/types-10';
import type {Entity_24_20, Registry_24_20} from '../pkg-24/types-20';
import type {Entity_23_01, Registry_23_01} from '../pkg-23/types-01';
import type {Entity_23_10, Registry_23_10} from '../pkg-23/types-10';
import type {Entity_23_20, Registry_23_20} from '../pkg-23/types-20';

type DeepMerge_2642<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object
      ? U[K] extends object
        ? DeepMerge_2642<T[K], U[K]>
        : U[K]
      : U[K]
    : K extends keyof T
      ? T[K]
      : K extends keyof U
        ? U[K]
        : never;
};

interface Entity_26_42 {
  id: string;
  meta: {
    created: Date;
    updated: Date;
    version: number;
    tags: string[];
    attrs: Record<string, {v: unknown; t: string; ok: boolean}>;
  };
  rels: {parent: Entity_26_42 | null; children: Entity_26_42[]};
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
  d42: {x2642: number; y2642: string; z2642: boolean};
}

type Path_2642<T, D extends unknown[] = []> = D['length'] extends 6
  ? never
  : T extends object
    ? {
        [K in keyof T & string]: K | `${K}.${Path_2642<T[K], [...D, unknown]>}`;
      }[keyof T & string]
    : never;
type EP_2642 = Path_2642<Entity_26_42>;

type Val_2642<T> = {
  [K in keyof T]: T[K] extends string
    ? {t: 's'; min: number; max: number}
    : T[K] extends number
      ? {t: 'n'; min: number; max: number}
      : T[K] extends boolean
        ? {t: 'b'; def: boolean}
        : T[K] extends unknown[]
          ? {t: 'a'; items: Val_2642<T[K][number]>}
          : T[K] extends object
            ? {t: 'o'; props: Val_2642<T[K]>}
            : {t: 'u'};
};
type EV_2642 = Val_2642<Entity_26_42>;

interface Registry_26_42 {
  entities: Map<string, Entity_26_42>;
  validators: EV_2642;
  paths: Set<EP_2642>;
  merged: DeepMerge_2642<Entity_26_42, {extra2642: string}>;
}

type CK_2642 =
  `p26.t42.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type {
  Entity_26_42,
  Registry_26_42,
  CK_2642,
  EP_2642,
  EV_2642,
  DeepMerge_2642,
};
