// pkg-14/types-42 - heavy interconnected types

import type {Entity_13_01, Registry_13_01} from '../pkg-13/types-01';
import type {Entity_13_10, Registry_13_10} from '../pkg-13/types-10';
import type {Entity_13_20, Registry_13_20} from '../pkg-13/types-20';
import type {Entity_12_01, Registry_12_01} from '../pkg-12/types-01';
import type {Entity_12_10, Registry_12_10} from '../pkg-12/types-10';
import type {Entity_12_20, Registry_12_20} from '../pkg-12/types-20';
import type {Entity_11_01, Registry_11_01} from '../pkg-11/types-01';
import type {Entity_11_10, Registry_11_10} from '../pkg-11/types-10';
import type {Entity_11_20, Registry_11_20} from '../pkg-11/types-20';

type DeepMerge_1442<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object
      ? U[K] extends object
        ? DeepMerge_1442<T[K], U[K]>
        : U[K]
      : U[K]
    : K extends keyof T
      ? T[K]
      : K extends keyof U
        ? U[K]
        : never;
};

interface Entity_14_42 {
  id: string;
  meta: {
    created: Date;
    updated: Date;
    version: number;
    tags: string[];
    attrs: Record<string, {v: unknown; t: string; ok: boolean}>;
  };
  rels: {parent: Entity_14_42 | null; children: Entity_14_42[]};
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
  d42: {x1442: number; y1442: string; z1442: boolean};
}

type Path_1442<T, D extends unknown[] = []> = D['length'] extends 6
  ? never
  : T extends object
    ? {
        [K in keyof T & string]: K | `${K}.${Path_1442<T[K], [...D, unknown]>}`;
      }[keyof T & string]
    : never;
type EP_1442 = Path_1442<Entity_14_42>;

type Val_1442<T> = {
  [K in keyof T]: T[K] extends string
    ? {t: 's'; min: number; max: number}
    : T[K] extends number
      ? {t: 'n'; min: number; max: number}
      : T[K] extends boolean
        ? {t: 'b'; def: boolean}
        : T[K] extends unknown[]
          ? {t: 'a'; items: Val_1442<T[K][number]>}
          : T[K] extends object
            ? {t: 'o'; props: Val_1442<T[K]>}
            : {t: 'u'};
};
type EV_1442 = Val_1442<Entity_14_42>;

interface Registry_14_42 {
  entities: Map<string, Entity_14_42>;
  validators: EV_1442;
  paths: Set<EP_1442>;
  merged: DeepMerge_1442<Entity_14_42, {extra1442: string}>;
}

type CK_1442 =
  `p14.t42.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type {
  Entity_14_42,
  Registry_14_42,
  CK_1442,
  EP_1442,
  EV_1442,
  DeepMerge_1442,
};
