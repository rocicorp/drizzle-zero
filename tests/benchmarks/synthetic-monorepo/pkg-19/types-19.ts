// pkg-19/types-19 - heavy interconnected types

import type {Entity_18_01, Registry_18_01} from '../pkg-18/types-01';
import type {Entity_18_10, Registry_18_10} from '../pkg-18/types-10';
import type {Entity_18_20, Registry_18_20} from '../pkg-18/types-20';
import type {Entity_17_01, Registry_17_01} from '../pkg-17/types-01';
import type {Entity_17_10, Registry_17_10} from '../pkg-17/types-10';
import type {Entity_17_20, Registry_17_20} from '../pkg-17/types-20';
import type {Entity_16_01, Registry_16_01} from '../pkg-16/types-01';
import type {Entity_16_10, Registry_16_10} from '../pkg-16/types-10';
import type {Entity_16_20, Registry_16_20} from '../pkg-16/types-20';

type DeepMerge_1919<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object
      ? U[K] extends object
        ? DeepMerge_1919<T[K], U[K]>
        : U[K]
      : U[K]
    : K extends keyof T
      ? T[K]
      : K extends keyof U
        ? U[K]
        : never;
};

interface Entity_19_19 {
  id: string;
  meta: {
    created: Date;
    updated: Date;
    version: number;
    tags: string[];
    attrs: Record<string, {v: unknown; t: string; ok: boolean}>;
  };
  rels: {parent: Entity_19_19 | null; children: Entity_19_19[]};
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
  d19: {x1919: number; y1919: string; z1919: boolean};
}

type Path_1919<T, D extends unknown[] = []> = D['length'] extends 6
  ? never
  : T extends object
    ? {
        [K in keyof T & string]: K | `${K}.${Path_1919<T[K], [...D, unknown]>}`;
      }[keyof T & string]
    : never;
type EP_1919 = Path_1919<Entity_19_19>;

type Val_1919<T> = {
  [K in keyof T]: T[K] extends string
    ? {t: 's'; min: number; max: number}
    : T[K] extends number
      ? {t: 'n'; min: number; max: number}
      : T[K] extends boolean
        ? {t: 'b'; def: boolean}
        : T[K] extends unknown[]
          ? {t: 'a'; items: Val_1919<T[K][number]>}
          : T[K] extends object
            ? {t: 'o'; props: Val_1919<T[K]>}
            : {t: 'u'};
};
type EV_1919 = Val_1919<Entity_19_19>;

interface Registry_19_19 {
  entities: Map<string, Entity_19_19>;
  validators: EV_1919;
  paths: Set<EP_1919>;
  merged: DeepMerge_1919<Entity_19_19, {extra1919: string}>;
}

type CK_1919 =
  `p19.t19.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type {
  Entity_19_19,
  Registry_19_19,
  CK_1919,
  EP_1919,
  EV_1919,
  DeepMerge_1919,
};
