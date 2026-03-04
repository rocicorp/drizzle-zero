// pkg-18/types-03 - heavy interconnected types

import type { Entity_17_01, Registry_17_01 } from '../pkg-17/types-01';
import type { Entity_17_10, Registry_17_10 } from '../pkg-17/types-10';
import type { Entity_17_20, Registry_17_20 } from '../pkg-17/types-20';
import type { Entity_16_01, Registry_16_01 } from '../pkg-16/types-01';
import type { Entity_16_10, Registry_16_10 } from '../pkg-16/types-10';
import type { Entity_16_20, Registry_16_20 } from '../pkg-16/types-20';
import type { Entity_15_01, Registry_15_01 } from '../pkg-15/types-01';
import type { Entity_15_10, Registry_15_10 } from '../pkg-15/types-10';
import type { Entity_15_20, Registry_15_20 } from '../pkg-15/types-20';

type DeepMerge_1803<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object ? U[K] extends object ? DeepMerge_1803<T[K], U[K]> : U[K] : U[K]
    : K extends keyof T ? T[K] : K extends keyof U ? U[K] : never;
};

interface Entity_18_03 {
  id: string;
  meta: { created: Date; updated: Date; version: number; tags: string[]; attrs: Record<string, { v: unknown; t: string; ok: boolean }> };
  rels: { parent: Entity_18_03 | null; children: Entity_18_03[]; };
  cfg: { enabled: boolean; priority: number; rules: Array<{ cond: string; action: string; params: Record<string, unknown>; sub: { items: Array<{ id: string; w: number }> } }> };
  d03: { x1803: number; y1803: string; z1803: boolean };
}

type Path_1803<T, D extends unknown[] = []> = D['length'] extends 6 ? never
  : T extends object ? { [K in keyof T & string]: K | `${K}.${Path_1803<T[K], [...D, unknown]>}` }[keyof T & string] : never;
type EP_1803 = Path_1803<Entity_18_03>;

type Val_1803<T> = {
  [K in keyof T]: T[K] extends string ? { t: 's'; min: number; max: number }
    : T[K] extends number ? { t: 'n'; min: number; max: number }
    : T[K] extends boolean ? { t: 'b'; def: boolean }
    : T[K] extends unknown[] ? { t: 'a'; items: Val_1803<T[K][number]> }
    : T[K] extends object ? { t: 'o'; props: Val_1803<T[K]> }
    : { t: 'u' };
};
type EV_1803 = Val_1803<Entity_18_03>;

interface Registry_18_03 {
  entities: Map<string, Entity_18_03>;
  validators: EV_1803;
  paths: Set<EP_1803>;
  merged: DeepMerge_1803<Entity_18_03, { extra1803: string }>;
}

type CK_1803 = `p18.t03.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type { Entity_18_03, Registry_18_03, CK_1803, EP_1803, EV_1803, DeepMerge_1803 };
