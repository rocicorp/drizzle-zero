// pkg-38/types-26 - heavy interconnected types

import type {Entity_37_01, Registry_37_01} from '../pkg-37/types-01';
import type {Entity_37_10, Registry_37_10} from '../pkg-37/types-10';
import type {Entity_37_20, Registry_37_20} from '../pkg-37/types-20';
import type {Entity_36_01, Registry_36_01} from '../pkg-36/types-01';
import type {Entity_36_10, Registry_36_10} from '../pkg-36/types-10';
import type {Entity_36_20, Registry_36_20} from '../pkg-36/types-20';
import type {Entity_35_01, Registry_35_01} from '../pkg-35/types-01';
import type {Entity_35_10, Registry_35_10} from '../pkg-35/types-10';
import type {Entity_35_20, Registry_35_20} from '../pkg-35/types-20';

type DeepMerge_3826<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object
      ? U[K] extends object
        ? DeepMerge_3826<T[K], U[K]>
        : U[K]
      : U[K]
    : K extends keyof T
      ? T[K]
      : K extends keyof U
        ? U[K]
        : never;
};

interface Entity_38_26 {
  id: string;
  meta: {
    created: Date;
    updated: Date;
    version: number;
    tags: string[];
    attrs: Record<string, {v: unknown; t: string; ok: boolean}>;
  };
  rels: {parent: Entity_38_26 | null; children: Entity_38_26[]};
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
  d26: {x3826: number; y3826: string; z3826: boolean};
}

type Path_3826<T, D extends unknown[] = []> = D['length'] extends 6
  ? never
  : T extends object
    ? {
        [K in keyof T & string]: K | `${K}.${Path_3826<T[K], [...D, unknown]>}`;
      }[keyof T & string]
    : never;
type EP_3826 = Path_3826<Entity_38_26>;

type Val_3826<T> = {
  [K in keyof T]: T[K] extends string
    ? {t: 's'; min: number; max: number}
    : T[K] extends number
      ? {t: 'n'; min: number; max: number}
      : T[K] extends boolean
        ? {t: 'b'; def: boolean}
        : T[K] extends unknown[]
          ? {t: 'a'; items: Val_3826<T[K][number]>}
          : T[K] extends object
            ? {t: 'o'; props: Val_3826<T[K]>}
            : {t: 'u'};
};
type EV_3826 = Val_3826<Entity_38_26>;

interface Registry_38_26 {
  entities: Map<string, Entity_38_26>;
  validators: EV_3826;
  paths: Set<EP_3826>;
  merged: DeepMerge_3826<Entity_38_26, {extra3826: string}>;
}

type CK_3826 =
  `p38.t26.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type {
  Entity_38_26,
  Registry_38_26,
  CK_3826,
  EP_3826,
  EV_3826,
  DeepMerge_3826,
};
