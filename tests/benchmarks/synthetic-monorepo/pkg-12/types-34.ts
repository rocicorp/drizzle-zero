// pkg-12/types-34 - heavy interconnected types

import type {Entity_11_01, Registry_11_01} from '../pkg-11/types-01';
import type {Entity_11_10, Registry_11_10} from '../pkg-11/types-10';
import type {Entity_11_20, Registry_11_20} from '../pkg-11/types-20';
import type {Entity_10_01, Registry_10_01} from '../pkg-10/types-01';
import type {Entity_10_10, Registry_10_10} from '../pkg-10/types-10';
import type {Entity_10_20, Registry_10_20} from '../pkg-10/types-20';
import type {Entity_9_01, Registry_9_01} from '../pkg-09/types-01';
import type {Entity_9_10, Registry_9_10} from '../pkg-09/types-10';
import type {Entity_9_20, Registry_9_20} from '../pkg-09/types-20';

type DeepMerge_1234<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object
      ? U[K] extends object
        ? DeepMerge_1234<T[K], U[K]>
        : U[K]
      : U[K]
    : K extends keyof T
      ? T[K]
      : K extends keyof U
        ? U[K]
        : never;
};

interface Entity_12_34 {
  id: string;
  meta: {
    created: Date;
    updated: Date;
    version: number;
    tags: string[];
    attrs: Record<string, {v: unknown; t: string; ok: boolean}>;
  };
  rels: {parent: Entity_12_34 | null; children: Entity_12_34[]};
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
  d34: {x1234: number; y1234: string; z1234: boolean};
}

type Path_1234<T, D extends unknown[] = []> = D['length'] extends 6
  ? never
  : T extends object
    ? {
        [K in keyof T & string]: K | `${K}.${Path_1234<T[K], [...D, unknown]>}`;
      }[keyof T & string]
    : never;
type EP_1234 = Path_1234<Entity_12_34>;

type Val_1234<T> = {
  [K in keyof T]: T[K] extends string
    ? {t: 's'; min: number; max: number}
    : T[K] extends number
      ? {t: 'n'; min: number; max: number}
      : T[K] extends boolean
        ? {t: 'b'; def: boolean}
        : T[K] extends unknown[]
          ? {t: 'a'; items: Val_1234<T[K][number]>}
          : T[K] extends object
            ? {t: 'o'; props: Val_1234<T[K]>}
            : {t: 'u'};
};
type EV_1234 = Val_1234<Entity_12_34>;

interface Registry_12_34 {
  entities: Map<string, Entity_12_34>;
  validators: EV_1234;
  paths: Set<EP_1234>;
  merged: DeepMerge_1234<Entity_12_34, {extra1234: string}>;
}

type CK_1234 =
  `p12.t34.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type {
  Entity_12_34,
  Registry_12_34,
  CK_1234,
  EP_1234,
  EV_1234,
  DeepMerge_1234,
};
