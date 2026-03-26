// pkg-24/types-45 - heavy interconnected types

import type {Entity_23_01, Registry_23_01} from '../pkg-23/types-01';
import type {Entity_23_10, Registry_23_10} from '../pkg-23/types-10';
import type {Entity_23_20, Registry_23_20} from '../pkg-23/types-20';
import type {Entity_22_01, Registry_22_01} from '../pkg-22/types-01';
import type {Entity_22_10, Registry_22_10} from '../pkg-22/types-10';
import type {Entity_22_20, Registry_22_20} from '../pkg-22/types-20';
import type {Entity_21_01, Registry_21_01} from '../pkg-21/types-01';
import type {Entity_21_10, Registry_21_10} from '../pkg-21/types-10';
import type {Entity_21_20, Registry_21_20} from '../pkg-21/types-20';

type DeepMerge_2445<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object
      ? U[K] extends object
        ? DeepMerge_2445<T[K], U[K]>
        : U[K]
      : U[K]
    : K extends keyof T
      ? T[K]
      : K extends keyof U
        ? U[K]
        : never;
};

interface Entity_24_45 {
  id: string;
  meta: {
    created: Date;
    updated: Date;
    version: number;
    tags: string[];
    attrs: Record<string, {v: unknown; t: string; ok: boolean}>;
  };
  rels: {parent: Entity_24_45 | null; children: Entity_24_45[]};
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
  d45: {x2445: number; y2445: string; z2445: boolean};
}

type Path_2445<T, D extends unknown[] = []> = D['length'] extends 6
  ? never
  : T extends object
    ? {
        [K in keyof T & string]: K | `${K}.${Path_2445<T[K], [...D, unknown]>}`;
      }[keyof T & string]
    : never;
type EP_2445 = Path_2445<Entity_24_45>;

type Val_2445<T> = {
  [K in keyof T]: T[K] extends string
    ? {t: 's'; min: number; max: number}
    : T[K] extends number
      ? {t: 'n'; min: number; max: number}
      : T[K] extends boolean
        ? {t: 'b'; def: boolean}
        : T[K] extends unknown[]
          ? {t: 'a'; items: Val_2445<T[K][number]>}
          : T[K] extends object
            ? {t: 'o'; props: Val_2445<T[K]>}
            : {t: 'u'};
};
type EV_2445 = Val_2445<Entity_24_45>;

interface Registry_24_45 {
  entities: Map<string, Entity_24_45>;
  validators: EV_2445;
  paths: Set<EP_2445>;
  merged: DeepMerge_2445<Entity_24_45, {extra2445: string}>;
}

type CK_2445 =
  `p24.t45.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type {
  Entity_24_45,
  Registry_24_45,
  CK_2445,
  EP_2445,
  EV_2445,
  DeepMerge_2445,
};
