// pkg-39/types-42 - heavy interconnected types

import type {Entity_38_01, Registry_38_01} from '../pkg-38/types-01';
import type {Entity_38_10, Registry_38_10} from '../pkg-38/types-10';
import type {Entity_38_20, Registry_38_20} from '../pkg-38/types-20';
import type {Entity_37_01, Registry_37_01} from '../pkg-37/types-01';
import type {Entity_37_10, Registry_37_10} from '../pkg-37/types-10';
import type {Entity_37_20, Registry_37_20} from '../pkg-37/types-20';
import type {Entity_36_01, Registry_36_01} from '../pkg-36/types-01';
import type {Entity_36_10, Registry_36_10} from '../pkg-36/types-10';
import type {Entity_36_20, Registry_36_20} from '../pkg-36/types-20';

type DeepMerge_3942<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object
      ? U[K] extends object
        ? DeepMerge_3942<T[K], U[K]>
        : U[K]
      : U[K]
    : K extends keyof T
      ? T[K]
      : K extends keyof U
        ? U[K]
        : never;
};

interface Entity_39_42 {
  id: string;
  meta: {
    created: Date;
    updated: Date;
    version: number;
    tags: string[];
    attrs: Record<string, {v: unknown; t: string; ok: boolean}>;
  };
  rels: {parent: Entity_39_42 | null; children: Entity_39_42[]};
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
  d42: {x3942: number; y3942: string; z3942: boolean};
}

type Path_3942<T, D extends unknown[] = []> = D['length'] extends 6
  ? never
  : T extends object
    ? {
        [K in keyof T & string]: K | `${K}.${Path_3942<T[K], [...D, unknown]>}`;
      }[keyof T & string]
    : never;
type EP_3942 = Path_3942<Entity_39_42>;

type Val_3942<T> = {
  [K in keyof T]: T[K] extends string
    ? {t: 's'; min: number; max: number}
    : T[K] extends number
      ? {t: 'n'; min: number; max: number}
      : T[K] extends boolean
        ? {t: 'b'; def: boolean}
        : T[K] extends unknown[]
          ? {t: 'a'; items: Val_3942<T[K][number]>}
          : T[K] extends object
            ? {t: 'o'; props: Val_3942<T[K]>}
            : {t: 'u'};
};
type EV_3942 = Val_3942<Entity_39_42>;

interface Registry_39_42 {
  entities: Map<string, Entity_39_42>;
  validators: EV_3942;
  paths: Set<EP_3942>;
  merged: DeepMerge_3942<Entity_39_42, {extra3942: string}>;
}

type CK_3942 =
  `p39.t42.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type {
  Entity_39_42,
  Registry_39_42,
  CK_3942,
  EP_3942,
  EV_3942,
  DeepMerge_3942,
};
