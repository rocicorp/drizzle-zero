// pkg-03/types-35 - heavy interconnected types

import type {Entity_2_01, Registry_2_01} from '../pkg-02/types-01';
import type {Entity_2_10, Registry_2_10} from '../pkg-02/types-10';
import type {Entity_2_20, Registry_2_20} from '../pkg-02/types-20';
import type {Entity_1_01, Registry_1_01} from '../pkg-01/types-01';
import type {Entity_1_10, Registry_1_10} from '../pkg-01/types-10';
import type {Entity_1_20, Registry_1_20} from '../pkg-01/types-20';

type DeepMerge_0335<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object
      ? U[K] extends object
        ? DeepMerge_0335<T[K], U[K]>
        : U[K]
      : U[K]
    : K extends keyof T
      ? T[K]
      : K extends keyof U
        ? U[K]
        : never;
};

interface Entity_03_35 {
  id: string;
  meta: {
    created: Date;
    updated: Date;
    version: number;
    tags: string[];
    attrs: Record<string, {v: unknown; t: string; ok: boolean}>;
  };
  rels: {parent: Entity_03_35 | null; children: Entity_03_35[]};
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
  d35: {x0335: number; y0335: string; z0335: boolean};
}

type Path_0335<T, D extends unknown[] = []> = D['length'] extends 6
  ? never
  : T extends object
    ? {
        [K in keyof T & string]: K | `${K}.${Path_0335<T[K], [...D, unknown]>}`;
      }[keyof T & string]
    : never;
type EP_0335 = Path_0335<Entity_03_35>;

type Val_0335<T> = {
  [K in keyof T]: T[K] extends string
    ? {t: 's'; min: number; max: number}
    : T[K] extends number
      ? {t: 'n'; min: number; max: number}
      : T[K] extends boolean
        ? {t: 'b'; def: boolean}
        : T[K] extends unknown[]
          ? {t: 'a'; items: Val_0335<T[K][number]>}
          : T[K] extends object
            ? {t: 'o'; props: Val_0335<T[K]>}
            : {t: 'u'};
};
type EV_0335 = Val_0335<Entity_03_35>;

interface Registry_03_35 {
  entities: Map<string, Entity_03_35>;
  validators: EV_0335;
  paths: Set<EP_0335>;
  merged: DeepMerge_0335<Entity_03_35, {extra0335: string}>;
}

type CK_0335 =
  `p03.t35.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type {
  Entity_03_35,
  Registry_03_35,
  CK_0335,
  EP_0335,
  EV_0335,
  DeepMerge_0335,
};
