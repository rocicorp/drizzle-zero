// pkg-36/types-31 - heavy interconnected types

import type {Entity_35_01, Registry_35_01} from '../pkg-35/types-01';
import type {Entity_35_10, Registry_35_10} from '../pkg-35/types-10';
import type {Entity_35_20, Registry_35_20} from '../pkg-35/types-20';
import type {Entity_34_01, Registry_34_01} from '../pkg-34/types-01';
import type {Entity_34_10, Registry_34_10} from '../pkg-34/types-10';
import type {Entity_34_20, Registry_34_20} from '../pkg-34/types-20';
import type {Entity_33_01, Registry_33_01} from '../pkg-33/types-01';
import type {Entity_33_10, Registry_33_10} from '../pkg-33/types-10';
import type {Entity_33_20, Registry_33_20} from '../pkg-33/types-20';

type DeepMerge_3631<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object
      ? U[K] extends object
        ? DeepMerge_3631<T[K], U[K]>
        : U[K]
      : U[K]
    : K extends keyof T
      ? T[K]
      : K extends keyof U
        ? U[K]
        : never;
};

interface Entity_36_31 {
  id: string;
  meta: {
    created: Date;
    updated: Date;
    version: number;
    tags: string[];
    attrs: Record<string, {v: unknown; t: string; ok: boolean}>;
  };
  rels: {parent: Entity_36_31 | null; children: Entity_36_31[]};
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
  d31: {x3631: number; y3631: string; z3631: boolean};
}

type Path_3631<T, D extends unknown[] = []> = D['length'] extends 6
  ? never
  : T extends object
    ? {
        [K in keyof T & string]: K | `${K}.${Path_3631<T[K], [...D, unknown]>}`;
      }[keyof T & string]
    : never;
type EP_3631 = Path_3631<Entity_36_31>;

type Val_3631<T> = {
  [K in keyof T]: T[K] extends string
    ? {t: 's'; min: number; max: number}
    : T[K] extends number
      ? {t: 'n'; min: number; max: number}
      : T[K] extends boolean
        ? {t: 'b'; def: boolean}
        : T[K] extends unknown[]
          ? {t: 'a'; items: Val_3631<T[K][number]>}
          : T[K] extends object
            ? {t: 'o'; props: Val_3631<T[K]>}
            : {t: 'u'};
};
type EV_3631 = Val_3631<Entity_36_31>;

interface Registry_36_31 {
  entities: Map<string, Entity_36_31>;
  validators: EV_3631;
  paths: Set<EP_3631>;
  merged: DeepMerge_3631<Entity_36_31, {extra3631: string}>;
}

type CK_3631 =
  `p36.t31.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type {
  Entity_36_31,
  Registry_36_31,
  CK_3631,
  EP_3631,
  EV_3631,
  DeepMerge_3631,
};
