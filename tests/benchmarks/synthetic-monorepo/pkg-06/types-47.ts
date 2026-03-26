// pkg-06/types-47 - heavy interconnected types

import type {Entity_5_01, Registry_5_01} from '../pkg-05/types-01';
import type {Entity_5_10, Registry_5_10} from '../pkg-05/types-10';
import type {Entity_5_20, Registry_5_20} from '../pkg-05/types-20';
import type {Entity_4_01, Registry_4_01} from '../pkg-04/types-01';
import type {Entity_4_10, Registry_4_10} from '../pkg-04/types-10';
import type {Entity_4_20, Registry_4_20} from '../pkg-04/types-20';
import type {Entity_3_01, Registry_3_01} from '../pkg-03/types-01';
import type {Entity_3_10, Registry_3_10} from '../pkg-03/types-10';
import type {Entity_3_20, Registry_3_20} from '../pkg-03/types-20';

type DeepMerge_0647<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object
      ? U[K] extends object
        ? DeepMerge_0647<T[K], U[K]>
        : U[K]
      : U[K]
    : K extends keyof T
      ? T[K]
      : K extends keyof U
        ? U[K]
        : never;
};

interface Entity_06_47 {
  id: string;
  meta: {
    created: Date;
    updated: Date;
    version: number;
    tags: string[];
    attrs: Record<string, {v: unknown; t: string; ok: boolean}>;
  };
  rels: {parent: Entity_06_47 | null; children: Entity_06_47[]};
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
  d47: {x0647: number; y0647: string; z0647: boolean};
}

type Path_0647<T, D extends unknown[] = []> = D['length'] extends 6
  ? never
  : T extends object
    ? {
        [K in keyof T & string]: K | `${K}.${Path_0647<T[K], [...D, unknown]>}`;
      }[keyof T & string]
    : never;
type EP_0647 = Path_0647<Entity_06_47>;

type Val_0647<T> = {
  [K in keyof T]: T[K] extends string
    ? {t: 's'; min: number; max: number}
    : T[K] extends number
      ? {t: 'n'; min: number; max: number}
      : T[K] extends boolean
        ? {t: 'b'; def: boolean}
        : T[K] extends unknown[]
          ? {t: 'a'; items: Val_0647<T[K][number]>}
          : T[K] extends object
            ? {t: 'o'; props: Val_0647<T[K]>}
            : {t: 'u'};
};
type EV_0647 = Val_0647<Entity_06_47>;

interface Registry_06_47 {
  entities: Map<string, Entity_06_47>;
  validators: EV_0647;
  paths: Set<EP_0647>;
  merged: DeepMerge_0647<Entity_06_47, {extra0647: string}>;
}

type CK_0647 =
  `p06.t47.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type {
  Entity_06_47,
  Registry_06_47,
  CK_0647,
  EP_0647,
  EV_0647,
  DeepMerge_0647,
};
