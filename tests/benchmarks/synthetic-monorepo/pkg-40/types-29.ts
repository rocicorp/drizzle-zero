// pkg-40/types-29 - heavy interconnected types

import type {Entity_39_01, Registry_39_01} from '../pkg-39/types-01';
import type {Entity_39_10, Registry_39_10} from '../pkg-39/types-10';
import type {Entity_39_20, Registry_39_20} from '../pkg-39/types-20';
import type {Entity_38_01, Registry_38_01} from '../pkg-38/types-01';
import type {Entity_38_10, Registry_38_10} from '../pkg-38/types-10';
import type {Entity_38_20, Registry_38_20} from '../pkg-38/types-20';
import type {Entity_37_01, Registry_37_01} from '../pkg-37/types-01';
import type {Entity_37_10, Registry_37_10} from '../pkg-37/types-10';
import type {Entity_37_20, Registry_37_20} from '../pkg-37/types-20';

type DeepMerge_4029<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object
      ? U[K] extends object
        ? DeepMerge_4029<T[K], U[K]>
        : U[K]
      : U[K]
    : K extends keyof T
      ? T[K]
      : K extends keyof U
        ? U[K]
        : never;
};

interface Entity_40_29 {
  id: string;
  meta: {
    created: Date;
    updated: Date;
    version: number;
    tags: string[];
    attrs: Record<string, {v: unknown; t: string; ok: boolean}>;
  };
  rels: {parent: Entity_40_29 | null; children: Entity_40_29[]};
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
  d29: {x4029: number; y4029: string; z4029: boolean};
}

type Path_4029<T, D extends unknown[] = []> = D['length'] extends 6
  ? never
  : T extends object
    ? {
        [K in keyof T & string]: K | `${K}.${Path_4029<T[K], [...D, unknown]>}`;
      }[keyof T & string]
    : never;
type EP_4029 = Path_4029<Entity_40_29>;

type Val_4029<T> = {
  [K in keyof T]: T[K] extends string
    ? {t: 's'; min: number; max: number}
    : T[K] extends number
      ? {t: 'n'; min: number; max: number}
      : T[K] extends boolean
        ? {t: 'b'; def: boolean}
        : T[K] extends unknown[]
          ? {t: 'a'; items: Val_4029<T[K][number]>}
          : T[K] extends object
            ? {t: 'o'; props: Val_4029<T[K]>}
            : {t: 'u'};
};
type EV_4029 = Val_4029<Entity_40_29>;

interface Registry_40_29 {
  entities: Map<string, Entity_40_29>;
  validators: EV_4029;
  paths: Set<EP_4029>;
  merged: DeepMerge_4029<Entity_40_29, {extra4029: string}>;
}

type CK_4029 =
  `p40.t29.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type {
  Entity_40_29,
  Registry_40_29,
  CK_4029,
  EP_4029,
  EV_4029,
  DeepMerge_4029,
};
