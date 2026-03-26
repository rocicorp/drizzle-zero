// pkg-29/types-16 - heavy interconnected types

import type {Entity_28_01, Registry_28_01} from '../pkg-28/types-01';
import type {Entity_28_10, Registry_28_10} from '../pkg-28/types-10';
import type {Entity_28_20, Registry_28_20} from '../pkg-28/types-20';
import type {Entity_27_01, Registry_27_01} from '../pkg-27/types-01';
import type {Entity_27_10, Registry_27_10} from '../pkg-27/types-10';
import type {Entity_27_20, Registry_27_20} from '../pkg-27/types-20';
import type {Entity_26_01, Registry_26_01} from '../pkg-26/types-01';
import type {Entity_26_10, Registry_26_10} from '../pkg-26/types-10';
import type {Entity_26_20, Registry_26_20} from '../pkg-26/types-20';

type DeepMerge_2916<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object
      ? U[K] extends object
        ? DeepMerge_2916<T[K], U[K]>
        : U[K]
      : U[K]
    : K extends keyof T
      ? T[K]
      : K extends keyof U
        ? U[K]
        : never;
};

interface Entity_29_16 {
  id: string;
  meta: {
    created: Date;
    updated: Date;
    version: number;
    tags: string[];
    attrs: Record<string, {v: unknown; t: string; ok: boolean}>;
  };
  rels: {parent: Entity_29_16 | null; children: Entity_29_16[]};
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
  d16: {x2916: number; y2916: string; z2916: boolean};
}

type Path_2916<T, D extends unknown[] = []> = D['length'] extends 6
  ? never
  : T extends object
    ? {
        [K in keyof T & string]: K | `${K}.${Path_2916<T[K], [...D, unknown]>}`;
      }[keyof T & string]
    : never;
type EP_2916 = Path_2916<Entity_29_16>;

type Val_2916<T> = {
  [K in keyof T]: T[K] extends string
    ? {t: 's'; min: number; max: number}
    : T[K] extends number
      ? {t: 'n'; min: number; max: number}
      : T[K] extends boolean
        ? {t: 'b'; def: boolean}
        : T[K] extends unknown[]
          ? {t: 'a'; items: Val_2916<T[K][number]>}
          : T[K] extends object
            ? {t: 'o'; props: Val_2916<T[K]>}
            : {t: 'u'};
};
type EV_2916 = Val_2916<Entity_29_16>;

interface Registry_29_16 {
  entities: Map<string, Entity_29_16>;
  validators: EV_2916;
  paths: Set<EP_2916>;
  merged: DeepMerge_2916<Entity_29_16, {extra2916: string}>;
}

type CK_2916 =
  `p29.t16.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type {
  Entity_29_16,
  Registry_29_16,
  CK_2916,
  EP_2916,
  EV_2916,
  DeepMerge_2916,
};
