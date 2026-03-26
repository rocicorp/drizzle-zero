// pkg-37/types-31 - heavy interconnected types

import type {Entity_36_01, Registry_36_01} from '../pkg-36/types-01';
import type {Entity_36_10, Registry_36_10} from '../pkg-36/types-10';
import type {Entity_36_20, Registry_36_20} from '../pkg-36/types-20';
import type {Entity_35_01, Registry_35_01} from '../pkg-35/types-01';
import type {Entity_35_10, Registry_35_10} from '../pkg-35/types-10';
import type {Entity_35_20, Registry_35_20} from '../pkg-35/types-20';
import type {Entity_34_01, Registry_34_01} from '../pkg-34/types-01';
import type {Entity_34_10, Registry_34_10} from '../pkg-34/types-10';
import type {Entity_34_20, Registry_34_20} from '../pkg-34/types-20';

type DeepMerge_3731<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object
      ? U[K] extends object
        ? DeepMerge_3731<T[K], U[K]>
        : U[K]
      : U[K]
    : K extends keyof T
      ? T[K]
      : K extends keyof U
        ? U[K]
        : never;
};

interface Entity_37_31 {
  id: string;
  meta: {
    created: Date;
    updated: Date;
    version: number;
    tags: string[];
    attrs: Record<string, {v: unknown; t: string; ok: boolean}>;
  };
  rels: {parent: Entity_37_31 | null; children: Entity_37_31[]};
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
  d31: {x3731: number; y3731: string; z3731: boolean};
}

type Path_3731<T, D extends unknown[] = []> = D['length'] extends 6
  ? never
  : T extends object
    ? {
        [K in keyof T & string]: K | `${K}.${Path_3731<T[K], [...D, unknown]>}`;
      }[keyof T & string]
    : never;
type EP_3731 = Path_3731<Entity_37_31>;

type Val_3731<T> = {
  [K in keyof T]: T[K] extends string
    ? {t: 's'; min: number; max: number}
    : T[K] extends number
      ? {t: 'n'; min: number; max: number}
      : T[K] extends boolean
        ? {t: 'b'; def: boolean}
        : T[K] extends unknown[]
          ? {t: 'a'; items: Val_3731<T[K][number]>}
          : T[K] extends object
            ? {t: 'o'; props: Val_3731<T[K]>}
            : {t: 'u'};
};
type EV_3731 = Val_3731<Entity_37_31>;

interface Registry_37_31 {
  entities: Map<string, Entity_37_31>;
  validators: EV_3731;
  paths: Set<EP_3731>;
  merged: DeepMerge_3731<Entity_37_31, {extra3731: string}>;
}

type CK_3731 =
  `p37.t31.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type {
  Entity_37_31,
  Registry_37_31,
  CK_3731,
  EP_3731,
  EV_3731,
  DeepMerge_3731,
};
