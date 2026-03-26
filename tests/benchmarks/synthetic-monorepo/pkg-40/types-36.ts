// pkg-40/types-36 - heavy interconnected types

import type {Entity_39_01, Registry_39_01} from '../pkg-39/types-01';
import type {Entity_39_10, Registry_39_10} from '../pkg-39/types-10';
import type {Entity_39_20, Registry_39_20} from '../pkg-39/types-20';
import type {Entity_38_01, Registry_38_01} from '../pkg-38/types-01';
import type {Entity_38_10, Registry_38_10} from '../pkg-38/types-10';
import type {Entity_38_20, Registry_38_20} from '../pkg-38/types-20';
import type {Entity_37_01, Registry_37_01} from '../pkg-37/types-01';
import type {Entity_37_10, Registry_37_10} from '../pkg-37/types-10';
import type {Entity_37_20, Registry_37_20} from '../pkg-37/types-20';

type DeepMerge_4036<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object
      ? U[K] extends object
        ? DeepMerge_4036<T[K], U[K]>
        : U[K]
      : U[K]
    : K extends keyof T
      ? T[K]
      : K extends keyof U
        ? U[K]
        : never;
};

interface Entity_40_36 {
  id: string;
  meta: {
    created: Date;
    updated: Date;
    version: number;
    tags: string[];
    attrs: Record<string, {v: unknown; t: string; ok: boolean}>;
  };
  rels: {parent: Entity_40_36 | null; children: Entity_40_36[]};
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
  d36: {x4036: number; y4036: string; z4036: boolean};
}

type Path_4036<T, D extends unknown[] = []> = D['length'] extends 6
  ? never
  : T extends object
    ? {
        [K in keyof T & string]: K | `${K}.${Path_4036<T[K], [...D, unknown]>}`;
      }[keyof T & string]
    : never;
type EP_4036 = Path_4036<Entity_40_36>;

type Val_4036<T> = {
  [K in keyof T]: T[K] extends string
    ? {t: 's'; min: number; max: number}
    : T[K] extends number
      ? {t: 'n'; min: number; max: number}
      : T[K] extends boolean
        ? {t: 'b'; def: boolean}
        : T[K] extends unknown[]
          ? {t: 'a'; items: Val_4036<T[K][number]>}
          : T[K] extends object
            ? {t: 'o'; props: Val_4036<T[K]>}
            : {t: 'u'};
};
type EV_4036 = Val_4036<Entity_40_36>;

interface Registry_40_36 {
  entities: Map<string, Entity_40_36>;
  validators: EV_4036;
  paths: Set<EP_4036>;
  merged: DeepMerge_4036<Entity_40_36, {extra4036: string}>;
}

type CK_4036 =
  `p40.t36.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type {
  Entity_40_36,
  Registry_40_36,
  CK_4036,
  EP_4036,
  EV_4036,
  DeepMerge_4036,
};
