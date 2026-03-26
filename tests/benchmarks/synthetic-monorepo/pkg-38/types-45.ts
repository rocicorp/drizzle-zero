// pkg-38/types-45 - heavy interconnected types

import type {Entity_37_01, Registry_37_01} from '../pkg-37/types-01';
import type {Entity_37_10, Registry_37_10} from '../pkg-37/types-10';
import type {Entity_37_20, Registry_37_20} from '../pkg-37/types-20';
import type {Entity_36_01, Registry_36_01} from '../pkg-36/types-01';
import type {Entity_36_10, Registry_36_10} from '../pkg-36/types-10';
import type {Entity_36_20, Registry_36_20} from '../pkg-36/types-20';
import type {Entity_35_01, Registry_35_01} from '../pkg-35/types-01';
import type {Entity_35_10, Registry_35_10} from '../pkg-35/types-10';
import type {Entity_35_20, Registry_35_20} from '../pkg-35/types-20';

type DeepMerge_3845<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object
      ? U[K] extends object
        ? DeepMerge_3845<T[K], U[K]>
        : U[K]
      : U[K]
    : K extends keyof T
      ? T[K]
      : K extends keyof U
        ? U[K]
        : never;
};

interface Entity_38_45 {
  id: string;
  meta: {
    created: Date;
    updated: Date;
    version: number;
    tags: string[];
    attrs: Record<string, {v: unknown; t: string; ok: boolean}>;
  };
  rels: {parent: Entity_38_45 | null; children: Entity_38_45[]};
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
  d45: {x3845: number; y3845: string; z3845: boolean};
}

type Path_3845<T, D extends unknown[] = []> = D['length'] extends 6
  ? never
  : T extends object
    ? {
        [K in keyof T & string]: K | `${K}.${Path_3845<T[K], [...D, unknown]>}`;
      }[keyof T & string]
    : never;
type EP_3845 = Path_3845<Entity_38_45>;

type Val_3845<T> = {
  [K in keyof T]: T[K] extends string
    ? {t: 's'; min: number; max: number}
    : T[K] extends number
      ? {t: 'n'; min: number; max: number}
      : T[K] extends boolean
        ? {t: 'b'; def: boolean}
        : T[K] extends unknown[]
          ? {t: 'a'; items: Val_3845<T[K][number]>}
          : T[K] extends object
            ? {t: 'o'; props: Val_3845<T[K]>}
            : {t: 'u'};
};
type EV_3845 = Val_3845<Entity_38_45>;

interface Registry_38_45 {
  entities: Map<string, Entity_38_45>;
  validators: EV_3845;
  paths: Set<EP_3845>;
  merged: DeepMerge_3845<Entity_38_45, {extra3845: string}>;
}

type CK_3845 =
  `p38.t45.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type {
  Entity_38_45,
  Registry_38_45,
  CK_3845,
  EP_3845,
  EV_3845,
  DeepMerge_3845,
};
