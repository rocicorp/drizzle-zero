// pkg-11/types-15 - heavy interconnected types

import type { Entity_10_01, Registry_10_01 } from '../pkg-10/types-01';
import type { Entity_10_10, Registry_10_10 } from '../pkg-10/types-10';
import type { Entity_10_20, Registry_10_20 } from '../pkg-10/types-20';
import type { Entity_9_01, Registry_9_01 } from '../pkg-09/types-01';
import type { Entity_9_10, Registry_9_10 } from '../pkg-09/types-10';
import type { Entity_9_20, Registry_9_20 } from '../pkg-09/types-20';
import type { Entity_8_01, Registry_8_01 } from '../pkg-08/types-01';
import type { Entity_8_10, Registry_8_10 } from '../pkg-08/types-10';
import type { Entity_8_20, Registry_8_20 } from '../pkg-08/types-20';

type DeepMerge_1115<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object ? U[K] extends object ? DeepMerge_1115<T[K], U[K]> : U[K] : U[K]
    : K extends keyof T ? T[K] : K extends keyof U ? U[K] : never;
};

interface Entity_11_15 {
  id: string;
  meta: { created: Date; updated: Date; version: number; tags: string[]; attrs: Record<string, { v: unknown; t: string; ok: boolean }> };
  rels: { parent: Entity_11_15 | null; children: Entity_11_15[]; };
  cfg: { enabled: boolean; priority: number; rules: Array<{ cond: string; action: string; params: Record<string, unknown>; sub: { items: Array<{ id: string; w: number }> } }> };
  d15: { x1115: number; y1115: string; z1115: boolean };
}

type Path_1115<T, D extends unknown[] = []> = D['length'] extends 6 ? never
  : T extends object ? { [K in keyof T & string]: K | `${K}.${Path_1115<T[K], [...D, unknown]>}` }[keyof T & string] : never;
type EP_1115 = Path_1115<Entity_11_15>;

type Val_1115<T> = {
  [K in keyof T]: T[K] extends string ? { t: 's'; min: number; max: number }
    : T[K] extends number ? { t: 'n'; min: number; max: number }
    : T[K] extends boolean ? { t: 'b'; def: boolean }
    : T[K] extends unknown[] ? { t: 'a'; items: Val_1115<T[K][number]> }
    : T[K] extends object ? { t: 'o'; props: Val_1115<T[K]> }
    : { t: 'u' };
};
type EV_1115 = Val_1115<Entity_11_15>;

interface Registry_11_15 {
  entities: Map<string, Entity_11_15>;
  validators: EV_1115;
  paths: Set<EP_1115>;
  merged: DeepMerge_1115<Entity_11_15, { extra1115: string }>;
}

type CK_1115 = `p11.t15.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type { Entity_11_15, Registry_11_15, CK_1115, EP_1115, EV_1115, DeepMerge_1115 };
