// pkg-11/types-32 - heavy interconnected types

import type {Entity_10_01, Registry_10_01} from '../pkg-10/types-01';
import type {Entity_10_10, Registry_10_10} from '../pkg-10/types-10';
import type {Entity_10_20, Registry_10_20} from '../pkg-10/types-20';
import type {Entity_9_01, Registry_9_01} from '../pkg-09/types-01';
import type {Entity_9_10, Registry_9_10} from '../pkg-09/types-10';
import type {Entity_9_20, Registry_9_20} from '../pkg-09/types-20';
import type {Entity_8_01, Registry_8_01} from '../pkg-08/types-01';
import type {Entity_8_10, Registry_8_10} from '../pkg-08/types-10';
import type {Entity_8_20, Registry_8_20} from '../pkg-08/types-20';

type DeepMerge_1132<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object
      ? U[K] extends object
        ? DeepMerge_1132<T[K], U[K]>
        : U[K]
      : U[K]
    : K extends keyof T
      ? T[K]
      : K extends keyof U
        ? U[K]
        : never;
};

interface Entity_11_32 {
  id: string;
  meta: {
    created: Date;
    updated: Date;
    version: number;
    tags: string[];
    attrs: Record<string, {v: unknown; t: string; ok: boolean}>;
  };
  rels: {parent: Entity_11_32 | null; children: Entity_11_32[]};
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
  d32: {x1132: number; y1132: string; z1132: boolean};
}

type Path_1132<T, D extends unknown[] = []> = D['length'] extends 6
  ? never
  : T extends object
    ? {
        [K in keyof T & string]: K | `${K}.${Path_1132<T[K], [...D, unknown]>}`;
      }[keyof T & string]
    : never;
type EP_1132 = Path_1132<Entity_11_32>;

type Val_1132<T> = {
  [K in keyof T]: T[K] extends string
    ? {t: 's'; min: number; max: number}
    : T[K] extends number
      ? {t: 'n'; min: number; max: number}
      : T[K] extends boolean
        ? {t: 'b'; def: boolean}
        : T[K] extends unknown[]
          ? {t: 'a'; items: Val_1132<T[K][number]>}
          : T[K] extends object
            ? {t: 'o'; props: Val_1132<T[K]>}
            : {t: 'u'};
};
type EV_1132 = Val_1132<Entity_11_32>;

interface Registry_11_32 {
  entities: Map<string, Entity_11_32>;
  validators: EV_1132;
  paths: Set<EP_1132>;
  merged: DeepMerge_1132<Entity_11_32, {extra1132: string}>;
}

type CK_1132 =
  `p11.t32.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type {
  Entity_11_32,
  Registry_11_32,
  CK_1132,
  EP_1132,
  EV_1132,
  DeepMerge_1132,
};
