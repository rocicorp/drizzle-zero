// pkg-39/types-50 - heavy interconnected types

import type {Entity_38_01, Registry_38_01} from '../pkg-38/types-01';
import type {Entity_38_10, Registry_38_10} from '../pkg-38/types-10';
import type {Entity_38_20, Registry_38_20} from '../pkg-38/types-20';
import type {Entity_37_01, Registry_37_01} from '../pkg-37/types-01';
import type {Entity_37_10, Registry_37_10} from '../pkg-37/types-10';
import type {Entity_37_20, Registry_37_20} from '../pkg-37/types-20';
import type {Entity_36_01, Registry_36_01} from '../pkg-36/types-01';
import type {Entity_36_10, Registry_36_10} from '../pkg-36/types-10';
import type {Entity_36_20, Registry_36_20} from '../pkg-36/types-20';

type DeepMerge_3950<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object
      ? U[K] extends object
        ? DeepMerge_3950<T[K], U[K]>
        : U[K]
      : U[K]
    : K extends keyof T
      ? T[K]
      : K extends keyof U
        ? U[K]
        : never;
};

interface Entity_39_50 {
  id: string;
  meta: {
    created: Date;
    updated: Date;
    version: number;
    tags: string[];
    attrs: Record<string, {v: unknown; t: string; ok: boolean}>;
  };
  rels: {parent: Entity_39_50 | null; children: Entity_39_50[]};
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
  d50: {x3950: number; y3950: string; z3950: boolean};
}

type Path_3950<T, D extends unknown[] = []> = D['length'] extends 6
  ? never
  : T extends object
    ? {
        [K in keyof T & string]: K | `${K}.${Path_3950<T[K], [...D, unknown]>}`;
      }[keyof T & string]
    : never;
type EP_3950 = Path_3950<Entity_39_50>;

type Val_3950<T> = {
  [K in keyof T]: T[K] extends string
    ? {t: 's'; min: number; max: number}
    : T[K] extends number
      ? {t: 'n'; min: number; max: number}
      : T[K] extends boolean
        ? {t: 'b'; def: boolean}
        : T[K] extends unknown[]
          ? {t: 'a'; items: Val_3950<T[K][number]>}
          : T[K] extends object
            ? {t: 'o'; props: Val_3950<T[K]>}
            : {t: 'u'};
};
type EV_3950 = Val_3950<Entity_39_50>;

interface Registry_39_50 {
  entities: Map<string, Entity_39_50>;
  validators: EV_3950;
  paths: Set<EP_3950>;
  merged: DeepMerge_3950<Entity_39_50, {extra3950: string}>;
}

type CK_3950 =
  `p39.t50.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type {
  Entity_39_50,
  Registry_39_50,
  CK_3950,
  EP_3950,
  EV_3950,
  DeepMerge_3950,
};
