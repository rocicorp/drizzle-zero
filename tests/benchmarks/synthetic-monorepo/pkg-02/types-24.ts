// pkg-02/types-24 - heavy interconnected types

import type {Entity_1_01, Registry_1_01} from '../pkg-01/types-01';
import type {Entity_1_10, Registry_1_10} from '../pkg-01/types-10';
import type {Entity_1_20, Registry_1_20} from '../pkg-01/types-20';

type DeepMerge_0224<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object
      ? U[K] extends object
        ? DeepMerge_0224<T[K], U[K]>
        : U[K]
      : U[K]
    : K extends keyof T
      ? T[K]
      : K extends keyof U
        ? U[K]
        : never;
};

interface Entity_02_24 {
  id: string;
  meta: {
    created: Date;
    updated: Date;
    version: number;
    tags: string[];
    attrs: Record<string, {v: unknown; t: string; ok: boolean}>;
  };
  rels: {parent: Entity_02_24 | null; children: Entity_02_24[]};
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
  d24: {x0224: number; y0224: string; z0224: boolean};
}

type Path_0224<T, D extends unknown[] = []> = D['length'] extends 6
  ? never
  : T extends object
    ? {
        [K in keyof T & string]: K | `${K}.${Path_0224<T[K], [...D, unknown]>}`;
      }[keyof T & string]
    : never;
type EP_0224 = Path_0224<Entity_02_24>;

type Val_0224<T> = {
  [K in keyof T]: T[K] extends string
    ? {t: 's'; min: number; max: number}
    : T[K] extends number
      ? {t: 'n'; min: number; max: number}
      : T[K] extends boolean
        ? {t: 'b'; def: boolean}
        : T[K] extends unknown[]
          ? {t: 'a'; items: Val_0224<T[K][number]>}
          : T[K] extends object
            ? {t: 'o'; props: Val_0224<T[K]>}
            : {t: 'u'};
};
type EV_0224 = Val_0224<Entity_02_24>;

interface Registry_02_24 {
  entities: Map<string, Entity_02_24>;
  validators: EV_0224;
  paths: Set<EP_0224>;
  merged: DeepMerge_0224<Entity_02_24, {extra0224: string}>;
}

type CK_0224 =
  `p02.t24.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type {
  Entity_02_24,
  Registry_02_24,
  CK_0224,
  EP_0224,
  EV_0224,
  DeepMerge_0224,
};
