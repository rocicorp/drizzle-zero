// pkg-19/types-12 - heavy interconnected types

import type {Entity_18_01, Registry_18_01} from '../pkg-18/types-01';
import type {Entity_18_10, Registry_18_10} from '../pkg-18/types-10';
import type {Entity_18_20, Registry_18_20} from '../pkg-18/types-20';
import type {Entity_17_01, Registry_17_01} from '../pkg-17/types-01';
import type {Entity_17_10, Registry_17_10} from '../pkg-17/types-10';
import type {Entity_17_20, Registry_17_20} from '../pkg-17/types-20';
import type {Entity_16_01, Registry_16_01} from '../pkg-16/types-01';
import type {Entity_16_10, Registry_16_10} from '../pkg-16/types-10';
import type {Entity_16_20, Registry_16_20} from '../pkg-16/types-20';

type DeepMerge_1912<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object
      ? U[K] extends object
        ? DeepMerge_1912<T[K], U[K]>
        : U[K]
      : U[K]
    : K extends keyof T
      ? T[K]
      : K extends keyof U
        ? U[K]
        : never;
};

interface Entity_19_12 {
  id: string;
  meta: {
    created: Date;
    updated: Date;
    version: number;
    tags: string[];
    attrs: Record<string, {v: unknown; t: string; ok: boolean}>;
  };
  rels: {parent: Entity_19_12 | null; children: Entity_19_12[]};
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
  d12: {x1912: number; y1912: string; z1912: boolean};
}

type Path_1912<T, D extends unknown[] = []> = D['length'] extends 6
  ? never
  : T extends object
    ? {
        [K in keyof T & string]: K | `${K}.${Path_1912<T[K], [...D, unknown]>}`;
      }[keyof T & string]
    : never;
type EP_1912 = Path_1912<Entity_19_12>;

type Val_1912<T> = {
  [K in keyof T]: T[K] extends string
    ? {t: 's'; min: number; max: number}
    : T[K] extends number
      ? {t: 'n'; min: number; max: number}
      : T[K] extends boolean
        ? {t: 'b'; def: boolean}
        : T[K] extends unknown[]
          ? {t: 'a'; items: Val_1912<T[K][number]>}
          : T[K] extends object
            ? {t: 'o'; props: Val_1912<T[K]>}
            : {t: 'u'};
};
type EV_1912 = Val_1912<Entity_19_12>;

interface Registry_19_12 {
  entities: Map<string, Entity_19_12>;
  validators: EV_1912;
  paths: Set<EP_1912>;
  merged: DeepMerge_1912<Entity_19_12, {extra1912: string}>;
}

type CK_1912 =
  `p19.t12.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type {
  Entity_19_12,
  Registry_19_12,
  CK_1912,
  EP_1912,
  EV_1912,
  DeepMerge_1912,
};
