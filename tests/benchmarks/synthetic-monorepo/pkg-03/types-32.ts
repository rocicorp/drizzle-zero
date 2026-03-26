// pkg-03/types-32 - heavy interconnected types

import type {Entity_2_01, Registry_2_01} from '../pkg-02/types-01';
import type {Entity_2_10, Registry_2_10} from '../pkg-02/types-10';
import type {Entity_2_20, Registry_2_20} from '../pkg-02/types-20';
import type {Entity_1_01, Registry_1_01} from '../pkg-01/types-01';
import type {Entity_1_10, Registry_1_10} from '../pkg-01/types-10';
import type {Entity_1_20, Registry_1_20} from '../pkg-01/types-20';

type DeepMerge_0332<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object
      ? U[K] extends object
        ? DeepMerge_0332<T[K], U[K]>
        : U[K]
      : U[K]
    : K extends keyof T
      ? T[K]
      : K extends keyof U
        ? U[K]
        : never;
};

interface Entity_03_32 {
  id: string;
  meta: {
    created: Date;
    updated: Date;
    version: number;
    tags: string[];
    attrs: Record<string, {v: unknown; t: string; ok: boolean}>;
  };
  rels: {parent: Entity_03_32 | null; children: Entity_03_32[]};
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
  d32: {x0332: number; y0332: string; z0332: boolean};
}

type Path_0332<T, D extends unknown[] = []> = D['length'] extends 6
  ? never
  : T extends object
    ? {
        [K in keyof T & string]: K | `${K}.${Path_0332<T[K], [...D, unknown]>}`;
      }[keyof T & string]
    : never;
type EP_0332 = Path_0332<Entity_03_32>;

type Val_0332<T> = {
  [K in keyof T]: T[K] extends string
    ? {t: 's'; min: number; max: number}
    : T[K] extends number
      ? {t: 'n'; min: number; max: number}
      : T[K] extends boolean
        ? {t: 'b'; def: boolean}
        : T[K] extends unknown[]
          ? {t: 'a'; items: Val_0332<T[K][number]>}
          : T[K] extends object
            ? {t: 'o'; props: Val_0332<T[K]>}
            : {t: 'u'};
};
type EV_0332 = Val_0332<Entity_03_32>;

interface Registry_03_32 {
  entities: Map<string, Entity_03_32>;
  validators: EV_0332;
  paths: Set<EP_0332>;
  merged: DeepMerge_0332<Entity_03_32, {extra0332: string}>;
}

type CK_0332 =
  `p03.t32.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type {
  Entity_03_32,
  Registry_03_32,
  CK_0332,
  EP_0332,
  EV_0332,
  DeepMerge_0332,
};
