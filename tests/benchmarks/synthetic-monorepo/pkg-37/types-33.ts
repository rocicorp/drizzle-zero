// pkg-37/types-33 - heavy interconnected types

import type {Entity_36_01, Registry_36_01} from '../pkg-36/types-01';
import type {Entity_36_10, Registry_36_10} from '../pkg-36/types-10';
import type {Entity_36_20, Registry_36_20} from '../pkg-36/types-20';
import type {Entity_35_01, Registry_35_01} from '../pkg-35/types-01';
import type {Entity_35_10, Registry_35_10} from '../pkg-35/types-10';
import type {Entity_35_20, Registry_35_20} from '../pkg-35/types-20';
import type {Entity_34_01, Registry_34_01} from '../pkg-34/types-01';
import type {Entity_34_10, Registry_34_10} from '../pkg-34/types-10';
import type {Entity_34_20, Registry_34_20} from '../pkg-34/types-20';

type DeepMerge_3733<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object
      ? U[K] extends object
        ? DeepMerge_3733<T[K], U[K]>
        : U[K]
      : U[K]
    : K extends keyof T
      ? T[K]
      : K extends keyof U
        ? U[K]
        : never;
};

interface Entity_37_33 {
  id: string;
  meta: {
    created: Date;
    updated: Date;
    version: number;
    tags: string[];
    attrs: Record<string, {v: unknown; t: string; ok: boolean}>;
  };
  rels: {parent: Entity_37_33 | null; children: Entity_37_33[]};
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
  d33: {x3733: number; y3733: string; z3733: boolean};
}

type Path_3733<T, D extends unknown[] = []> = D['length'] extends 6
  ? never
  : T extends object
    ? {
        [K in keyof T & string]: K | `${K}.${Path_3733<T[K], [...D, unknown]>}`;
      }[keyof T & string]
    : never;
type EP_3733 = Path_3733<Entity_37_33>;

type Val_3733<T> = {
  [K in keyof T]: T[K] extends string
    ? {t: 's'; min: number; max: number}
    : T[K] extends number
      ? {t: 'n'; min: number; max: number}
      : T[K] extends boolean
        ? {t: 'b'; def: boolean}
        : T[K] extends unknown[]
          ? {t: 'a'; items: Val_3733<T[K][number]>}
          : T[K] extends object
            ? {t: 'o'; props: Val_3733<T[K]>}
            : {t: 'u'};
};
type EV_3733 = Val_3733<Entity_37_33>;

interface Registry_37_33 {
  entities: Map<string, Entity_37_33>;
  validators: EV_3733;
  paths: Set<EP_3733>;
  merged: DeepMerge_3733<Entity_37_33, {extra3733: string}>;
}

type CK_3733 =
  `p37.t33.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type {
  Entity_37_33,
  Registry_37_33,
  CK_3733,
  EP_3733,
  EV_3733,
  DeepMerge_3733,
};
