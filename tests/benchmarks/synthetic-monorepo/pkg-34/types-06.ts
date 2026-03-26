// pkg-34/types-06 - heavy interconnected types

import type {Entity_33_01, Registry_33_01} from '../pkg-33/types-01';
import type {Entity_33_10, Registry_33_10} from '../pkg-33/types-10';
import type {Entity_33_20, Registry_33_20} from '../pkg-33/types-20';
import type {Entity_32_01, Registry_32_01} from '../pkg-32/types-01';
import type {Entity_32_10, Registry_32_10} from '../pkg-32/types-10';
import type {Entity_32_20, Registry_32_20} from '../pkg-32/types-20';
import type {Entity_31_01, Registry_31_01} from '../pkg-31/types-01';
import type {Entity_31_10, Registry_31_10} from '../pkg-31/types-10';
import type {Entity_31_20, Registry_31_20} from '../pkg-31/types-20';

type DeepMerge_3406<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object
      ? U[K] extends object
        ? DeepMerge_3406<T[K], U[K]>
        : U[K]
      : U[K]
    : K extends keyof T
      ? T[K]
      : K extends keyof U
        ? U[K]
        : never;
};

interface Entity_34_06 {
  id: string;
  meta: {
    created: Date;
    updated: Date;
    version: number;
    tags: string[];
    attrs: Record<string, {v: unknown; t: string; ok: boolean}>;
  };
  rels: {parent: Entity_34_06 | null; children: Entity_34_06[]};
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
  d06: {x3406: number; y3406: string; z3406: boolean};
}

type Path_3406<T, D extends unknown[] = []> = D['length'] extends 6
  ? never
  : T extends object
    ? {
        [K in keyof T & string]: K | `${K}.${Path_3406<T[K], [...D, unknown]>}`;
      }[keyof T & string]
    : never;
type EP_3406 = Path_3406<Entity_34_06>;

type Val_3406<T> = {
  [K in keyof T]: T[K] extends string
    ? {t: 's'; min: number; max: number}
    : T[K] extends number
      ? {t: 'n'; min: number; max: number}
      : T[K] extends boolean
        ? {t: 'b'; def: boolean}
        : T[K] extends unknown[]
          ? {t: 'a'; items: Val_3406<T[K][number]>}
          : T[K] extends object
            ? {t: 'o'; props: Val_3406<T[K]>}
            : {t: 'u'};
};
type EV_3406 = Val_3406<Entity_34_06>;

interface Registry_34_06 {
  entities: Map<string, Entity_34_06>;
  validators: EV_3406;
  paths: Set<EP_3406>;
  merged: DeepMerge_3406<Entity_34_06, {extra3406: string}>;
}

type CK_3406 =
  `p34.t06.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type {
  Entity_34_06,
  Registry_34_06,
  CK_3406,
  EP_3406,
  EV_3406,
  DeepMerge_3406,
};
