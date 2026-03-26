// pkg-21/types-38 - heavy interconnected types

import type {Entity_20_01, Registry_20_01} from '../pkg-20/types-01';
import type {Entity_20_10, Registry_20_10} from '../pkg-20/types-10';
import type {Entity_20_20, Registry_20_20} from '../pkg-20/types-20';
import type {Entity_19_01, Registry_19_01} from '../pkg-19/types-01';
import type {Entity_19_10, Registry_19_10} from '../pkg-19/types-10';
import type {Entity_19_20, Registry_19_20} from '../pkg-19/types-20';
import type {Entity_18_01, Registry_18_01} from '../pkg-18/types-01';
import type {Entity_18_10, Registry_18_10} from '../pkg-18/types-10';
import type {Entity_18_20, Registry_18_20} from '../pkg-18/types-20';

type DeepMerge_2138<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object
      ? U[K] extends object
        ? DeepMerge_2138<T[K], U[K]>
        : U[K]
      : U[K]
    : K extends keyof T
      ? T[K]
      : K extends keyof U
        ? U[K]
        : never;
};

interface Entity_21_38 {
  id: string;
  meta: {
    created: Date;
    updated: Date;
    version: number;
    tags: string[];
    attrs: Record<string, {v: unknown; t: string; ok: boolean}>;
  };
  rels: {parent: Entity_21_38 | null; children: Entity_21_38[]};
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
  d38: {x2138: number; y2138: string; z2138: boolean};
}

type Path_2138<T, D extends unknown[] = []> = D['length'] extends 6
  ? never
  : T extends object
    ? {
        [K in keyof T & string]: K | `${K}.${Path_2138<T[K], [...D, unknown]>}`;
      }[keyof T & string]
    : never;
type EP_2138 = Path_2138<Entity_21_38>;

type Val_2138<T> = {
  [K in keyof T]: T[K] extends string
    ? {t: 's'; min: number; max: number}
    : T[K] extends number
      ? {t: 'n'; min: number; max: number}
      : T[K] extends boolean
        ? {t: 'b'; def: boolean}
        : T[K] extends unknown[]
          ? {t: 'a'; items: Val_2138<T[K][number]>}
          : T[K] extends object
            ? {t: 'o'; props: Val_2138<T[K]>}
            : {t: 'u'};
};
type EV_2138 = Val_2138<Entity_21_38>;

interface Registry_21_38 {
  entities: Map<string, Entity_21_38>;
  validators: EV_2138;
  paths: Set<EP_2138>;
  merged: DeepMerge_2138<Entity_21_38, {extra2138: string}>;
}

type CK_2138 =
  `p21.t38.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type {
  Entity_21_38,
  Registry_21_38,
  CK_2138,
  EP_2138,
  EV_2138,
  DeepMerge_2138,
};
