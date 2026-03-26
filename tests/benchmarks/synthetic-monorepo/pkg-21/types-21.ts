// pkg-21/types-21 - heavy interconnected types

import type {Entity_20_01, Registry_20_01} from '../pkg-20/types-01';
import type {Entity_20_10, Registry_20_10} from '../pkg-20/types-10';
import type {Entity_20_20, Registry_20_20} from '../pkg-20/types-20';
import type {Entity_19_01, Registry_19_01} from '../pkg-19/types-01';
import type {Entity_19_10, Registry_19_10} from '../pkg-19/types-10';
import type {Entity_19_20, Registry_19_20} from '../pkg-19/types-20';
import type {Entity_18_01, Registry_18_01} from '../pkg-18/types-01';
import type {Entity_18_10, Registry_18_10} from '../pkg-18/types-10';
import type {Entity_18_20, Registry_18_20} from '../pkg-18/types-20';

type DeepMerge_2121<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object
      ? U[K] extends object
        ? DeepMerge_2121<T[K], U[K]>
        : U[K]
      : U[K]
    : K extends keyof T
      ? T[K]
      : K extends keyof U
        ? U[K]
        : never;
};

interface Entity_21_21 {
  id: string;
  meta: {
    created: Date;
    updated: Date;
    version: number;
    tags: string[];
    attrs: Record<string, {v: unknown; t: string; ok: boolean}>;
  };
  rels: {parent: Entity_21_21 | null; children: Entity_21_21[]};
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
  d21: {x2121: number; y2121: string; z2121: boolean};
}

type Path_2121<T, D extends unknown[] = []> = D['length'] extends 6
  ? never
  : T extends object
    ? {
        [K in keyof T & string]: K | `${K}.${Path_2121<T[K], [...D, unknown]>}`;
      }[keyof T & string]
    : never;
type EP_2121 = Path_2121<Entity_21_21>;

type Val_2121<T> = {
  [K in keyof T]: T[K] extends string
    ? {t: 's'; min: number; max: number}
    : T[K] extends number
      ? {t: 'n'; min: number; max: number}
      : T[K] extends boolean
        ? {t: 'b'; def: boolean}
        : T[K] extends unknown[]
          ? {t: 'a'; items: Val_2121<T[K][number]>}
          : T[K] extends object
            ? {t: 'o'; props: Val_2121<T[K]>}
            : {t: 'u'};
};
type EV_2121 = Val_2121<Entity_21_21>;

interface Registry_21_21 {
  entities: Map<string, Entity_21_21>;
  validators: EV_2121;
  paths: Set<EP_2121>;
  merged: DeepMerge_2121<Entity_21_21, {extra2121: string}>;
}

type CK_2121 =
  `p21.t21.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type {
  Entity_21_21,
  Registry_21_21,
  CK_2121,
  EP_2121,
  EV_2121,
  DeepMerge_2121,
};
