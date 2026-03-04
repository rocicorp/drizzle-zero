// pkg-06/types-05 - heavy interconnected types

import type { Entity_5_01, Registry_5_01 } from '../pkg-05/types-01';
import type { Entity_5_10, Registry_5_10 } from '../pkg-05/types-10';
import type { Entity_5_20, Registry_5_20 } from '../pkg-05/types-20';
import type { Entity_4_01, Registry_4_01 } from '../pkg-04/types-01';
import type { Entity_4_10, Registry_4_10 } from '../pkg-04/types-10';
import type { Entity_4_20, Registry_4_20 } from '../pkg-04/types-20';
import type { Entity_3_01, Registry_3_01 } from '../pkg-03/types-01';
import type { Entity_3_10, Registry_3_10 } from '../pkg-03/types-10';
import type { Entity_3_20, Registry_3_20 } from '../pkg-03/types-20';

type DeepMerge_0605<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object ? U[K] extends object ? DeepMerge_0605<T[K], U[K]> : U[K] : U[K]
    : K extends keyof T ? T[K] : K extends keyof U ? U[K] : never;
};

interface Entity_06_05 {
  id: string;
  meta: { created: Date; updated: Date; version: number; tags: string[]; attrs: Record<string, { v: unknown; t: string; ok: boolean }> };
  rels: { parent: Entity_06_05 | null; children: Entity_06_05[]; };
  cfg: { enabled: boolean; priority: number; rules: Array<{ cond: string; action: string; params: Record<string, unknown>; sub: { items: Array<{ id: string; w: number }> } }> };
  d05: { x0605: number; y0605: string; z0605: boolean };
}

type Path_0605<T, D extends unknown[] = []> = D['length'] extends 6 ? never
  : T extends object ? { [K in keyof T & string]: K | `${K}.${Path_0605<T[K], [...D, unknown]>}` }[keyof T & string] : never;
type EP_0605 = Path_0605<Entity_06_05>;

type Val_0605<T> = {
  [K in keyof T]: T[K] extends string ? { t: 's'; min: number; max: number }
    : T[K] extends number ? { t: 'n'; min: number; max: number }
    : T[K] extends boolean ? { t: 'b'; def: boolean }
    : T[K] extends unknown[] ? { t: 'a'; items: Val_0605<T[K][number]> }
    : T[K] extends object ? { t: 'o'; props: Val_0605<T[K]> }
    : { t: 'u' };
};
type EV_0605 = Val_0605<Entity_06_05>;

interface Registry_06_05 {
  entities: Map<string, Entity_06_05>;
  validators: EV_0605;
  paths: Set<EP_0605>;
  merged: DeepMerge_0605<Entity_06_05, { extra0605: string }>;
}

type CK_0605 = `p06.t05.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type { Entity_06_05, Registry_06_05, CK_0605, EP_0605, EV_0605, DeepMerge_0605 };
