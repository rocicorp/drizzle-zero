// pkg-28/types-18 - heavy interconnected types

import type {Entity_27_01, Registry_27_01} from '../pkg-27/types-01';
import type {Entity_27_10, Registry_27_10} from '../pkg-27/types-10';
import type {Entity_27_20, Registry_27_20} from '../pkg-27/types-20';
import type {Entity_26_01, Registry_26_01} from '../pkg-26/types-01';
import type {Entity_26_10, Registry_26_10} from '../pkg-26/types-10';
import type {Entity_26_20, Registry_26_20} from '../pkg-26/types-20';
import type {Entity_25_01, Registry_25_01} from '../pkg-25/types-01';
import type {Entity_25_10, Registry_25_10} from '../pkg-25/types-10';
import type {Entity_25_20, Registry_25_20} from '../pkg-25/types-20';

type DeepMerge_2818<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object
      ? U[K] extends object
        ? DeepMerge_2818<T[K], U[K]>
        : U[K]
      : U[K]
    : K extends keyof T
      ? T[K]
      : K extends keyof U
        ? U[K]
        : never;
};

interface Entity_28_18 {
  id: string;
  meta: {
    created: Date;
    updated: Date;
    version: number;
    tags: string[];
    attrs: Record<string, {v: unknown; t: string; ok: boolean}>;
  };
  rels: {parent: Entity_28_18 | null; children: Entity_28_18[]};
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
  d18: {x2818: number; y2818: string; z2818: boolean};
}

type Path_2818<T, D extends unknown[] = []> = D['length'] extends 6
  ? never
  : T extends object
    ? {
        [K in keyof T & string]: K | `${K}.${Path_2818<T[K], [...D, unknown]>}`;
      }[keyof T & string]
    : never;
type EP_2818 = Path_2818<Entity_28_18>;

type Val_2818<T> = {
  [K in keyof T]: T[K] extends string
    ? {t: 's'; min: number; max: number}
    : T[K] extends number
      ? {t: 'n'; min: number; max: number}
      : T[K] extends boolean
        ? {t: 'b'; def: boolean}
        : T[K] extends unknown[]
          ? {t: 'a'; items: Val_2818<T[K][number]>}
          : T[K] extends object
            ? {t: 'o'; props: Val_2818<T[K]>}
            : {t: 'u'};
};
type EV_2818 = Val_2818<Entity_28_18>;

interface Registry_28_18 {
  entities: Map<string, Entity_28_18>;
  validators: EV_2818;
  paths: Set<EP_2818>;
  merged: DeepMerge_2818<Entity_28_18, {extra2818: string}>;
}

type CK_2818 =
  `p28.t18.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type {
  Entity_28_18,
  Registry_28_18,
  CK_2818,
  EP_2818,
  EV_2818,
  DeepMerge_2818,
};
