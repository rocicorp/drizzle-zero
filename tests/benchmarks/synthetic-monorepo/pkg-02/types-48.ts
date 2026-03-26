// pkg-02/types-48 - heavy interconnected types

import type {Entity_1_01, Registry_1_01} from '../pkg-01/types-01';
import type {Entity_1_10, Registry_1_10} from '../pkg-01/types-10';
import type {Entity_1_20, Registry_1_20} from '../pkg-01/types-20';

type DeepMerge_0248<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object
      ? U[K] extends object
        ? DeepMerge_0248<T[K], U[K]>
        : U[K]
      : U[K]
    : K extends keyof T
      ? T[K]
      : K extends keyof U
        ? U[K]
        : never;
};

interface Entity_02_48 {
  id: string;
  meta: {
    created: Date;
    updated: Date;
    version: number;
    tags: string[];
    attrs: Record<string, {v: unknown; t: string; ok: boolean}>;
  };
  rels: {parent: Entity_02_48 | null; children: Entity_02_48[]};
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
  d48: {x0248: number; y0248: string; z0248: boolean};
}

type Path_0248<T, D extends unknown[] = []> = D['length'] extends 6
  ? never
  : T extends object
    ? {
        [K in keyof T & string]: K | `${K}.${Path_0248<T[K], [...D, unknown]>}`;
      }[keyof T & string]
    : never;
type EP_0248 = Path_0248<Entity_02_48>;

type Val_0248<T> = {
  [K in keyof T]: T[K] extends string
    ? {t: 's'; min: number; max: number}
    : T[K] extends number
      ? {t: 'n'; min: number; max: number}
      : T[K] extends boolean
        ? {t: 'b'; def: boolean}
        : T[K] extends unknown[]
          ? {t: 'a'; items: Val_0248<T[K][number]>}
          : T[K] extends object
            ? {t: 'o'; props: Val_0248<T[K]>}
            : {t: 'u'};
};
type EV_0248 = Val_0248<Entity_02_48>;

interface Registry_02_48 {
  entities: Map<string, Entity_02_48>;
  validators: EV_0248;
  paths: Set<EP_0248>;
  merged: DeepMerge_0248<Entity_02_48, {extra0248: string}>;
}

type CK_0248 =
  `p02.t48.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type {
  Entity_02_48,
  Registry_02_48,
  CK_0248,
  EP_0248,
  EV_0248,
  DeepMerge_0248,
};
