// pkg-18/types-37 - heavy interconnected types

import type {Entity_17_01, Registry_17_01} from '../pkg-17/types-01';
import type {Entity_17_10, Registry_17_10} from '../pkg-17/types-10';
import type {Entity_17_20, Registry_17_20} from '../pkg-17/types-20';
import type {Entity_16_01, Registry_16_01} from '../pkg-16/types-01';
import type {Entity_16_10, Registry_16_10} from '../pkg-16/types-10';
import type {Entity_16_20, Registry_16_20} from '../pkg-16/types-20';
import type {Entity_15_01, Registry_15_01} from '../pkg-15/types-01';
import type {Entity_15_10, Registry_15_10} from '../pkg-15/types-10';
import type {Entity_15_20, Registry_15_20} from '../pkg-15/types-20';

type DeepMerge_1837<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object
      ? U[K] extends object
        ? DeepMerge_1837<T[K], U[K]>
        : U[K]
      : U[K]
    : K extends keyof T
      ? T[K]
      : K extends keyof U
        ? U[K]
        : never;
};

interface Entity_18_37 {
  id: string;
  meta: {
    created: Date;
    updated: Date;
    version: number;
    tags: string[];
    attrs: Record<string, {v: unknown; t: string; ok: boolean}>;
  };
  rels: {parent: Entity_18_37 | null; children: Entity_18_37[]};
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
  d37: {x1837: number; y1837: string; z1837: boolean};
}

type Path_1837<T, D extends unknown[] = []> = D['length'] extends 6
  ? never
  : T extends object
    ? {
        [K in keyof T & string]: K | `${K}.${Path_1837<T[K], [...D, unknown]>}`;
      }[keyof T & string]
    : never;
type EP_1837 = Path_1837<Entity_18_37>;

type Val_1837<T> = {
  [K in keyof T]: T[K] extends string
    ? {t: 's'; min: number; max: number}
    : T[K] extends number
      ? {t: 'n'; min: number; max: number}
      : T[K] extends boolean
        ? {t: 'b'; def: boolean}
        : T[K] extends unknown[]
          ? {t: 'a'; items: Val_1837<T[K][number]>}
          : T[K] extends object
            ? {t: 'o'; props: Val_1837<T[K]>}
            : {t: 'u'};
};
type EV_1837 = Val_1837<Entity_18_37>;

interface Registry_18_37 {
  entities: Map<string, Entity_18_37>;
  validators: EV_1837;
  paths: Set<EP_1837>;
  merged: DeepMerge_1837<Entity_18_37, {extra1837: string}>;
}

type CK_1837 =
  `p18.t37.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type {
  Entity_18_37,
  Registry_18_37,
  CK_1837,
  EP_1837,
  EV_1837,
  DeepMerge_1837,
};
