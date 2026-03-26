// pkg-37/types-42 - heavy interconnected types

import type {Entity_36_01, Registry_36_01} from '../pkg-36/types-01';
import type {Entity_36_10, Registry_36_10} from '../pkg-36/types-10';
import type {Entity_36_20, Registry_36_20} from '../pkg-36/types-20';
import type {Entity_35_01, Registry_35_01} from '../pkg-35/types-01';
import type {Entity_35_10, Registry_35_10} from '../pkg-35/types-10';
import type {Entity_35_20, Registry_35_20} from '../pkg-35/types-20';
import type {Entity_34_01, Registry_34_01} from '../pkg-34/types-01';
import type {Entity_34_10, Registry_34_10} from '../pkg-34/types-10';
import type {Entity_34_20, Registry_34_20} from '../pkg-34/types-20';

type DeepMerge_3742<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object
      ? U[K] extends object
        ? DeepMerge_3742<T[K], U[K]>
        : U[K]
      : U[K]
    : K extends keyof T
      ? T[K]
      : K extends keyof U
        ? U[K]
        : never;
};

interface Entity_37_42 {
  id: string;
  meta: {
    created: Date;
    updated: Date;
    version: number;
    tags: string[];
    attrs: Record<string, {v: unknown; t: string; ok: boolean}>;
  };
  rels: {parent: Entity_37_42 | null; children: Entity_37_42[]};
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
  d42: {x3742: number; y3742: string; z3742: boolean};
}

type Path_3742<T, D extends unknown[] = []> = D['length'] extends 6
  ? never
  : T extends object
    ? {
        [K in keyof T & string]: K | `${K}.${Path_3742<T[K], [...D, unknown]>}`;
      }[keyof T & string]
    : never;
type EP_3742 = Path_3742<Entity_37_42>;

type Val_3742<T> = {
  [K in keyof T]: T[K] extends string
    ? {t: 's'; min: number; max: number}
    : T[K] extends number
      ? {t: 'n'; min: number; max: number}
      : T[K] extends boolean
        ? {t: 'b'; def: boolean}
        : T[K] extends unknown[]
          ? {t: 'a'; items: Val_3742<T[K][number]>}
          : T[K] extends object
            ? {t: 'o'; props: Val_3742<T[K]>}
            : {t: 'u'};
};
type EV_3742 = Val_3742<Entity_37_42>;

interface Registry_37_42 {
  entities: Map<string, Entity_37_42>;
  validators: EV_3742;
  paths: Set<EP_3742>;
  merged: DeepMerge_3742<Entity_37_42, {extra3742: string}>;
}

type CK_3742 =
  `p37.t42.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type {
  Entity_37_42,
  Registry_37_42,
  CK_3742,
  EP_3742,
  EV_3742,
  DeepMerge_3742,
};
