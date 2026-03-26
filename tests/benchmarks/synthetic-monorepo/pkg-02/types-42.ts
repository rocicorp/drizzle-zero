// pkg-02/types-42 - heavy interconnected types

import type {Entity_1_01, Registry_1_01} from '../pkg-01/types-01';
import type {Entity_1_10, Registry_1_10} from '../pkg-01/types-10';
import type {Entity_1_20, Registry_1_20} from '../pkg-01/types-20';

type DeepMerge_0242<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object
      ? U[K] extends object
        ? DeepMerge_0242<T[K], U[K]>
        : U[K]
      : U[K]
    : K extends keyof T
      ? T[K]
      : K extends keyof U
        ? U[K]
        : never;
};

interface Entity_02_42 {
  id: string;
  meta: {
    created: Date;
    updated: Date;
    version: number;
    tags: string[];
    attrs: Record<string, {v: unknown; t: string; ok: boolean}>;
  };
  rels: {parent: Entity_02_42 | null; children: Entity_02_42[]};
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
  d42: {x0242: number; y0242: string; z0242: boolean};
}

type Path_0242<T, D extends unknown[] = []> = D['length'] extends 6
  ? never
  : T extends object
    ? {
        [K in keyof T & string]: K | `${K}.${Path_0242<T[K], [...D, unknown]>}`;
      }[keyof T & string]
    : never;
type EP_0242 = Path_0242<Entity_02_42>;

type Val_0242<T> = {
  [K in keyof T]: T[K] extends string
    ? {t: 's'; min: number; max: number}
    : T[K] extends number
      ? {t: 'n'; min: number; max: number}
      : T[K] extends boolean
        ? {t: 'b'; def: boolean}
        : T[K] extends unknown[]
          ? {t: 'a'; items: Val_0242<T[K][number]>}
          : T[K] extends object
            ? {t: 'o'; props: Val_0242<T[K]>}
            : {t: 'u'};
};
type EV_0242 = Val_0242<Entity_02_42>;

interface Registry_02_42 {
  entities: Map<string, Entity_02_42>;
  validators: EV_0242;
  paths: Set<EP_0242>;
  merged: DeepMerge_0242<Entity_02_42, {extra0242: string}>;
}

type CK_0242 =
  `p02.t42.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type {
  Entity_02_42,
  Registry_02_42,
  CK_0242,
  EP_0242,
  EV_0242,
  DeepMerge_0242,
};
