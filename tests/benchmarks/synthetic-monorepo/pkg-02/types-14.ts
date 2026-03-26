// pkg-02/types-14 - heavy interconnected types

import type {Entity_1_01, Registry_1_01} from '../pkg-01/types-01';
import type {Entity_1_10, Registry_1_10} from '../pkg-01/types-10';
import type {Entity_1_20, Registry_1_20} from '../pkg-01/types-20';

type DeepMerge_0214<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object
      ? U[K] extends object
        ? DeepMerge_0214<T[K], U[K]>
        : U[K]
      : U[K]
    : K extends keyof T
      ? T[K]
      : K extends keyof U
        ? U[K]
        : never;
};

interface Entity_02_14 {
  id: string;
  meta: {
    created: Date;
    updated: Date;
    version: number;
    tags: string[];
    attrs: Record<string, {v: unknown; t: string; ok: boolean}>;
  };
  rels: {parent: Entity_02_14 | null; children: Entity_02_14[]};
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
  d14: {x0214: number; y0214: string; z0214: boolean};
}

type Path_0214<T, D extends unknown[] = []> = D['length'] extends 6
  ? never
  : T extends object
    ? {
        [K in keyof T & string]: K | `${K}.${Path_0214<T[K], [...D, unknown]>}`;
      }[keyof T & string]
    : never;
type EP_0214 = Path_0214<Entity_02_14>;

type Val_0214<T> = {
  [K in keyof T]: T[K] extends string
    ? {t: 's'; min: number; max: number}
    : T[K] extends number
      ? {t: 'n'; min: number; max: number}
      : T[K] extends boolean
        ? {t: 'b'; def: boolean}
        : T[K] extends unknown[]
          ? {t: 'a'; items: Val_0214<T[K][number]>}
          : T[K] extends object
            ? {t: 'o'; props: Val_0214<T[K]>}
            : {t: 'u'};
};
type EV_0214 = Val_0214<Entity_02_14>;

interface Registry_02_14 {
  entities: Map<string, Entity_02_14>;
  validators: EV_0214;
  paths: Set<EP_0214>;
  merged: DeepMerge_0214<Entity_02_14, {extra0214: string}>;
}

type CK_0214 =
  `p02.t14.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type {
  Entity_02_14,
  Registry_02_14,
  CK_0214,
  EP_0214,
  EV_0214,
  DeepMerge_0214,
};
