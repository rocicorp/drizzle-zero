// pkg-37/types-08 - heavy interconnected types

import type {Entity_36_01, Registry_36_01} from '../pkg-36/types-01';
import type {Entity_36_10, Registry_36_10} from '../pkg-36/types-10';
import type {Entity_36_20, Registry_36_20} from '../pkg-36/types-20';
import type {Entity_35_01, Registry_35_01} from '../pkg-35/types-01';
import type {Entity_35_10, Registry_35_10} from '../pkg-35/types-10';
import type {Entity_35_20, Registry_35_20} from '../pkg-35/types-20';
import type {Entity_34_01, Registry_34_01} from '../pkg-34/types-01';
import type {Entity_34_10, Registry_34_10} from '../pkg-34/types-10';
import type {Entity_34_20, Registry_34_20} from '../pkg-34/types-20';

type DeepMerge_3708<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object
      ? U[K] extends object
        ? DeepMerge_3708<T[K], U[K]>
        : U[K]
      : U[K]
    : K extends keyof T
      ? T[K]
      : K extends keyof U
        ? U[K]
        : never;
};

interface Entity_37_08 {
  id: string;
  meta: {
    created: Date;
    updated: Date;
    version: number;
    tags: string[];
    attrs: Record<string, {v: unknown; t: string; ok: boolean}>;
  };
  rels: {parent: Entity_37_08 | null; children: Entity_37_08[]};
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
  d08: {x3708: number; y3708: string; z3708: boolean};
}

type Path_3708<T, D extends unknown[] = []> = D['length'] extends 6
  ? never
  : T extends object
    ? {
        [K in keyof T & string]: K | `${K}.${Path_3708<T[K], [...D, unknown]>}`;
      }[keyof T & string]
    : never;
type EP_3708 = Path_3708<Entity_37_08>;

type Val_3708<T> = {
  [K in keyof T]: T[K] extends string
    ? {t: 's'; min: number; max: number}
    : T[K] extends number
      ? {t: 'n'; min: number; max: number}
      : T[K] extends boolean
        ? {t: 'b'; def: boolean}
        : T[K] extends unknown[]
          ? {t: 'a'; items: Val_3708<T[K][number]>}
          : T[K] extends object
            ? {t: 'o'; props: Val_3708<T[K]>}
            : {t: 'u'};
};
type EV_3708 = Val_3708<Entity_37_08>;

interface Registry_37_08 {
  entities: Map<string, Entity_37_08>;
  validators: EV_3708;
  paths: Set<EP_3708>;
  merged: DeepMerge_3708<Entity_37_08, {extra3708: string}>;
}

type CK_3708 =
  `p37.t08.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type {
  Entity_37_08,
  Registry_37_08,
  CK_3708,
  EP_3708,
  EV_3708,
  DeepMerge_3708,
};
