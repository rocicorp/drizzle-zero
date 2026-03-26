// pkg-23/types-44 - heavy interconnected types

import type {Entity_22_01, Registry_22_01} from '../pkg-22/types-01';
import type {Entity_22_10, Registry_22_10} from '../pkg-22/types-10';
import type {Entity_22_20, Registry_22_20} from '../pkg-22/types-20';
import type {Entity_21_01, Registry_21_01} from '../pkg-21/types-01';
import type {Entity_21_10, Registry_21_10} from '../pkg-21/types-10';
import type {Entity_21_20, Registry_21_20} from '../pkg-21/types-20';
import type {Entity_20_01, Registry_20_01} from '../pkg-20/types-01';
import type {Entity_20_10, Registry_20_10} from '../pkg-20/types-10';
import type {Entity_20_20, Registry_20_20} from '../pkg-20/types-20';

type DeepMerge_2344<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object
      ? U[K] extends object
        ? DeepMerge_2344<T[K], U[K]>
        : U[K]
      : U[K]
    : K extends keyof T
      ? T[K]
      : K extends keyof U
        ? U[K]
        : never;
};

interface Entity_23_44 {
  id: string;
  meta: {
    created: Date;
    updated: Date;
    version: number;
    tags: string[];
    attrs: Record<string, {v: unknown; t: string; ok: boolean}>;
  };
  rels: {parent: Entity_23_44 | null; children: Entity_23_44[]};
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
  d44: {x2344: number; y2344: string; z2344: boolean};
}

type Path_2344<T, D extends unknown[] = []> = D['length'] extends 6
  ? never
  : T extends object
    ? {
        [K in keyof T & string]: K | `${K}.${Path_2344<T[K], [...D, unknown]>}`;
      }[keyof T & string]
    : never;
type EP_2344 = Path_2344<Entity_23_44>;

type Val_2344<T> = {
  [K in keyof T]: T[K] extends string
    ? {t: 's'; min: number; max: number}
    : T[K] extends number
      ? {t: 'n'; min: number; max: number}
      : T[K] extends boolean
        ? {t: 'b'; def: boolean}
        : T[K] extends unknown[]
          ? {t: 'a'; items: Val_2344<T[K][number]>}
          : T[K] extends object
            ? {t: 'o'; props: Val_2344<T[K]>}
            : {t: 'u'};
};
type EV_2344 = Val_2344<Entity_23_44>;

interface Registry_23_44 {
  entities: Map<string, Entity_23_44>;
  validators: EV_2344;
  paths: Set<EP_2344>;
  merged: DeepMerge_2344<Entity_23_44, {extra2344: string}>;
}

type CK_2344 =
  `p23.t44.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type {
  Entity_23_44,
  Registry_23_44,
  CK_2344,
  EP_2344,
  EV_2344,
  DeepMerge_2344,
};
