// pkg-04/types-21 - heavy interconnected types

import type {Entity_3_01, Registry_3_01} from '../pkg-03/types-01';
import type {Entity_3_10, Registry_3_10} from '../pkg-03/types-10';
import type {Entity_3_20, Registry_3_20} from '../pkg-03/types-20';
import type {Entity_2_01, Registry_2_01} from '../pkg-02/types-01';
import type {Entity_2_10, Registry_2_10} from '../pkg-02/types-10';
import type {Entity_2_20, Registry_2_20} from '../pkg-02/types-20';
import type {Entity_1_01, Registry_1_01} from '../pkg-01/types-01';
import type {Entity_1_10, Registry_1_10} from '../pkg-01/types-10';
import type {Entity_1_20, Registry_1_20} from '../pkg-01/types-20';

type DeepMerge_0421<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object
      ? U[K] extends object
        ? DeepMerge_0421<T[K], U[K]>
        : U[K]
      : U[K]
    : K extends keyof T
      ? T[K]
      : K extends keyof U
        ? U[K]
        : never;
};

interface Entity_04_21 {
  id: string;
  meta: {
    created: Date;
    updated: Date;
    version: number;
    tags: string[];
    attrs: Record<string, {v: unknown; t: string; ok: boolean}>;
  };
  rels: {parent: Entity_04_21 | null; children: Entity_04_21[]};
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
  d21: {x0421: number; y0421: string; z0421: boolean};
}

type Path_0421<T, D extends unknown[] = []> = D['length'] extends 6
  ? never
  : T extends object
    ? {
        [K in keyof T & string]: K | `${K}.${Path_0421<T[K], [...D, unknown]>}`;
      }[keyof T & string]
    : never;
type EP_0421 = Path_0421<Entity_04_21>;

type Val_0421<T> = {
  [K in keyof T]: T[K] extends string
    ? {t: 's'; min: number; max: number}
    : T[K] extends number
      ? {t: 'n'; min: number; max: number}
      : T[K] extends boolean
        ? {t: 'b'; def: boolean}
        : T[K] extends unknown[]
          ? {t: 'a'; items: Val_0421<T[K][number]>}
          : T[K] extends object
            ? {t: 'o'; props: Val_0421<T[K]>}
            : {t: 'u'};
};
type EV_0421 = Val_0421<Entity_04_21>;

interface Registry_04_21 {
  entities: Map<string, Entity_04_21>;
  validators: EV_0421;
  paths: Set<EP_0421>;
  merged: DeepMerge_0421<Entity_04_21, {extra0421: string}>;
}

type CK_0421 =
  `p04.t21.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type {
  Entity_04_21,
  Registry_04_21,
  CK_0421,
  EP_0421,
  EV_0421,
  DeepMerge_0421,
};
