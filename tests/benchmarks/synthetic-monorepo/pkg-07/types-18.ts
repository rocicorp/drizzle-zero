// pkg-07/types-18 - heavy interconnected types

import type { Entity_6_01, Registry_6_01 } from '../pkg-06/types-01';
import type { Entity_6_10, Registry_6_10 } from '../pkg-06/types-10';
import type { Entity_6_20, Registry_6_20 } from '../pkg-06/types-20';
import type { Entity_5_01, Registry_5_01 } from '../pkg-05/types-01';
import type { Entity_5_10, Registry_5_10 } from '../pkg-05/types-10';
import type { Entity_5_20, Registry_5_20 } from '../pkg-05/types-20';
import type { Entity_4_01, Registry_4_01 } from '../pkg-04/types-01';
import type { Entity_4_10, Registry_4_10 } from '../pkg-04/types-10';
import type { Entity_4_20, Registry_4_20 } from '../pkg-04/types-20';

type DeepMerge_0718<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object ? U[K] extends object ? DeepMerge_0718<T[K], U[K]> : U[K] : U[K]
    : K extends keyof T ? T[K] : K extends keyof U ? U[K] : never;
};

interface Entity_07_18 {
  id: string;
  meta: { created: Date; updated: Date; version: number; tags: string[]; attrs: Record<string, { v: unknown; t: string; ok: boolean }> };
  rels: { parent: Entity_07_18 | null; children: Entity_07_18[]; };
  cfg: { enabled: boolean; priority: number; rules: Array<{ cond: string; action: string; params: Record<string, unknown>; sub: { items: Array<{ id: string; w: number }> } }> };
  d18: { x0718: number; y0718: string; z0718: boolean };
}

type Path_0718<T, D extends unknown[] = []> = D['length'] extends 6 ? never
  : T extends object ? { [K in keyof T & string]: K | `${K}.${Path_0718<T[K], [...D, unknown]>}` }[keyof T & string] : never;
type EP_0718 = Path_0718<Entity_07_18>;

type Val_0718<T> = {
  [K in keyof T]: T[K] extends string ? { t: 's'; min: number; max: number }
    : T[K] extends number ? { t: 'n'; min: number; max: number }
    : T[K] extends boolean ? { t: 'b'; def: boolean }
    : T[K] extends unknown[] ? { t: 'a'; items: Val_0718<T[K][number]> }
    : T[K] extends object ? { t: 'o'; props: Val_0718<T[K]> }
    : { t: 'u' };
};
type EV_0718 = Val_0718<Entity_07_18>;

interface Registry_07_18 {
  entities: Map<string, Entity_07_18>;
  validators: EV_0718;
  paths: Set<EP_0718>;
  merged: DeepMerge_0718<Entity_07_18, { extra0718: string }>;
}

type CK_0718 = `p07.t18.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type { Entity_07_18, Registry_07_18, CK_0718, EP_0718, EV_0718, DeepMerge_0718 };
