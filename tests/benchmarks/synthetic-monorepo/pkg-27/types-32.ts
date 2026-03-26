// pkg-27/types-32 - heavy interconnected types

import type {Entity_26_01, Registry_26_01} from '../pkg-26/types-01';
import type {Entity_26_10, Registry_26_10} from '../pkg-26/types-10';
import type {Entity_26_20, Registry_26_20} from '../pkg-26/types-20';
import type {Entity_25_01, Registry_25_01} from '../pkg-25/types-01';
import type {Entity_25_10, Registry_25_10} from '../pkg-25/types-10';
import type {Entity_25_20, Registry_25_20} from '../pkg-25/types-20';
import type {Entity_24_01, Registry_24_01} from '../pkg-24/types-01';
import type {Entity_24_10, Registry_24_10} from '../pkg-24/types-10';
import type {Entity_24_20, Registry_24_20} from '../pkg-24/types-20';

type DeepMerge_2732<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object
      ? U[K] extends object
        ? DeepMerge_2732<T[K], U[K]>
        : U[K]
      : U[K]
    : K extends keyof T
      ? T[K]
      : K extends keyof U
        ? U[K]
        : never;
};

interface Entity_27_32 {
  id: string;
  meta: {
    created: Date;
    updated: Date;
    version: number;
    tags: string[];
    attrs: Record<string, {v: unknown; t: string; ok: boolean}>;
  };
  rels: {parent: Entity_27_32 | null; children: Entity_27_32[]};
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
  d32: {x2732: number; y2732: string; z2732: boolean};
}

type Path_2732<T, D extends unknown[] = []> = D['length'] extends 6
  ? never
  : T extends object
    ? {
        [K in keyof T & string]: K | `${K}.${Path_2732<T[K], [...D, unknown]>}`;
      }[keyof T & string]
    : never;
type EP_2732 = Path_2732<Entity_27_32>;

type Val_2732<T> = {
  [K in keyof T]: T[K] extends string
    ? {t: 's'; min: number; max: number}
    : T[K] extends number
      ? {t: 'n'; min: number; max: number}
      : T[K] extends boolean
        ? {t: 'b'; def: boolean}
        : T[K] extends unknown[]
          ? {t: 'a'; items: Val_2732<T[K][number]>}
          : T[K] extends object
            ? {t: 'o'; props: Val_2732<T[K]>}
            : {t: 'u'};
};
type EV_2732 = Val_2732<Entity_27_32>;

interface Registry_27_32 {
  entities: Map<string, Entity_27_32>;
  validators: EV_2732;
  paths: Set<EP_2732>;
  merged: DeepMerge_2732<Entity_27_32, {extra2732: string}>;
}

type CK_2732 =
  `p27.t32.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type {
  Entity_27_32,
  Registry_27_32,
  CK_2732,
  EP_2732,
  EV_2732,
  DeepMerge_2732,
};
