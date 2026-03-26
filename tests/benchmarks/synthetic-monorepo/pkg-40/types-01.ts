// pkg-40/types-01 - heavy interconnected types

import type {Entity_39_01, Registry_39_01} from '../pkg-39/types-01';
import type {Entity_39_10, Registry_39_10} from '../pkg-39/types-10';
import type {Entity_39_20, Registry_39_20} from '../pkg-39/types-20';
import type {Entity_38_01, Registry_38_01} from '../pkg-38/types-01';
import type {Entity_38_10, Registry_38_10} from '../pkg-38/types-10';
import type {Entity_38_20, Registry_38_20} from '../pkg-38/types-20';
import type {Entity_37_01, Registry_37_01} from '../pkg-37/types-01';
import type {Entity_37_10, Registry_37_10} from '../pkg-37/types-10';
import type {Entity_37_20, Registry_37_20} from '../pkg-37/types-20';

type DeepMerge_4001<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object
      ? U[K] extends object
        ? DeepMerge_4001<T[K], U[K]>
        : U[K]
      : U[K]
    : K extends keyof T
      ? T[K]
      : K extends keyof U
        ? U[K]
        : never;
};

interface Entity_40_01 {
  id: string;
  meta: {
    created: Date;
    updated: Date;
    version: number;
    tags: string[];
    attrs: Record<string, {v: unknown; t: string; ok: boolean}>;
  };
  rels: {parent: Entity_40_01 | null; children: Entity_40_01[]};
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
  d01: {x4001: number; y4001: string; z4001: boolean};
}

type Path_4001<T, D extends unknown[] = []> = D['length'] extends 6
  ? never
  : T extends object
    ? {
        [K in keyof T & string]: K | `${K}.${Path_4001<T[K], [...D, unknown]>}`;
      }[keyof T & string]
    : never;
type EP_4001 = Path_4001<Entity_40_01>;

type Val_4001<T> = {
  [K in keyof T]: T[K] extends string
    ? {t: 's'; min: number; max: number}
    : T[K] extends number
      ? {t: 'n'; min: number; max: number}
      : T[K] extends boolean
        ? {t: 'b'; def: boolean}
        : T[K] extends unknown[]
          ? {t: 'a'; items: Val_4001<T[K][number]>}
          : T[K] extends object
            ? {t: 'o'; props: Val_4001<T[K]>}
            : {t: 'u'};
};
type EV_4001 = Val_4001<Entity_40_01>;

interface Registry_40_01 {
  entities: Map<string, Entity_40_01>;
  validators: EV_4001;
  paths: Set<EP_4001>;
  merged: DeepMerge_4001<Entity_40_01, {extra4001: string}>;
}

type CK_4001 =
  `p40.t01.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type {
  Entity_40_01,
  Registry_40_01,
  CK_4001,
  EP_4001,
  EV_4001,
  DeepMerge_4001,
};
