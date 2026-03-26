// pkg-06/types-48 - heavy interconnected types

import type {Entity_5_01, Registry_5_01} from '../pkg-05/types-01';
import type {Entity_5_10, Registry_5_10} from '../pkg-05/types-10';
import type {Entity_5_20, Registry_5_20} from '../pkg-05/types-20';
import type {Entity_4_01, Registry_4_01} from '../pkg-04/types-01';
import type {Entity_4_10, Registry_4_10} from '../pkg-04/types-10';
import type {Entity_4_20, Registry_4_20} from '../pkg-04/types-20';
import type {Entity_3_01, Registry_3_01} from '../pkg-03/types-01';
import type {Entity_3_10, Registry_3_10} from '../pkg-03/types-10';
import type {Entity_3_20, Registry_3_20} from '../pkg-03/types-20';

type DeepMerge_0648<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object
      ? U[K] extends object
        ? DeepMerge_0648<T[K], U[K]>
        : U[K]
      : U[K]
    : K extends keyof T
      ? T[K]
      : K extends keyof U
        ? U[K]
        : never;
};

interface Entity_06_48 {
  id: string;
  meta: {
    created: Date;
    updated: Date;
    version: number;
    tags: string[];
    attrs: Record<string, {v: unknown; t: string; ok: boolean}>;
  };
  rels: {parent: Entity_06_48 | null; children: Entity_06_48[]};
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
  d48: {x0648: number; y0648: string; z0648: boolean};
}

type Path_0648<T, D extends unknown[] = []> = D['length'] extends 6
  ? never
  : T extends object
    ? {
        [K in keyof T & string]: K | `${K}.${Path_0648<T[K], [...D, unknown]>}`;
      }[keyof T & string]
    : never;
type EP_0648 = Path_0648<Entity_06_48>;

type Val_0648<T> = {
  [K in keyof T]: T[K] extends string
    ? {t: 's'; min: number; max: number}
    : T[K] extends number
      ? {t: 'n'; min: number; max: number}
      : T[K] extends boolean
        ? {t: 'b'; def: boolean}
        : T[K] extends unknown[]
          ? {t: 'a'; items: Val_0648<T[K][number]>}
          : T[K] extends object
            ? {t: 'o'; props: Val_0648<T[K]>}
            : {t: 'u'};
};
type EV_0648 = Val_0648<Entity_06_48>;

interface Registry_06_48 {
  entities: Map<string, Entity_06_48>;
  validators: EV_0648;
  paths: Set<EP_0648>;
  merged: DeepMerge_0648<Entity_06_48, {extra0648: string}>;
}

type CK_0648 =
  `p06.t48.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type {
  Entity_06_48,
  Registry_06_48,
  CK_0648,
  EP_0648,
  EV_0648,
  DeepMerge_0648,
};
