// pkg-22/types-36 - heavy interconnected types

import type {Entity_21_01, Registry_21_01} from '../pkg-21/types-01';
import type {Entity_21_10, Registry_21_10} from '../pkg-21/types-10';
import type {Entity_21_20, Registry_21_20} from '../pkg-21/types-20';
import type {Entity_20_01, Registry_20_01} from '../pkg-20/types-01';
import type {Entity_20_10, Registry_20_10} from '../pkg-20/types-10';
import type {Entity_20_20, Registry_20_20} from '../pkg-20/types-20';
import type {Entity_19_01, Registry_19_01} from '../pkg-19/types-01';
import type {Entity_19_10, Registry_19_10} from '../pkg-19/types-10';
import type {Entity_19_20, Registry_19_20} from '../pkg-19/types-20';

type DeepMerge_2236<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object
      ? U[K] extends object
        ? DeepMerge_2236<T[K], U[K]>
        : U[K]
      : U[K]
    : K extends keyof T
      ? T[K]
      : K extends keyof U
        ? U[K]
        : never;
};

interface Entity_22_36 {
  id: string;
  meta: {
    created: Date;
    updated: Date;
    version: number;
    tags: string[];
    attrs: Record<string, {v: unknown; t: string; ok: boolean}>;
  };
  rels: {parent: Entity_22_36 | null; children: Entity_22_36[]};
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
  d36: {x2236: number; y2236: string; z2236: boolean};
}

type Path_2236<T, D extends unknown[] = []> = D['length'] extends 6
  ? never
  : T extends object
    ? {
        [K in keyof T & string]: K | `${K}.${Path_2236<T[K], [...D, unknown]>}`;
      }[keyof T & string]
    : never;
type EP_2236 = Path_2236<Entity_22_36>;

type Val_2236<T> = {
  [K in keyof T]: T[K] extends string
    ? {t: 's'; min: number; max: number}
    : T[K] extends number
      ? {t: 'n'; min: number; max: number}
      : T[K] extends boolean
        ? {t: 'b'; def: boolean}
        : T[K] extends unknown[]
          ? {t: 'a'; items: Val_2236<T[K][number]>}
          : T[K] extends object
            ? {t: 'o'; props: Val_2236<T[K]>}
            : {t: 'u'};
};
type EV_2236 = Val_2236<Entity_22_36>;

interface Registry_22_36 {
  entities: Map<string, Entity_22_36>;
  validators: EV_2236;
  paths: Set<EP_2236>;
  merged: DeepMerge_2236<Entity_22_36, {extra2236: string}>;
}

type CK_2236 =
  `p22.t36.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type {
  Entity_22_36,
  Registry_22_36,
  CK_2236,
  EP_2236,
  EV_2236,
  DeepMerge_2236,
};
