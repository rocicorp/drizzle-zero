// pkg-15/types-03 - heavy interconnected types

import type { Entity_14_01, Registry_14_01 } from '../pkg-14/types-01';
import type { Entity_14_10, Registry_14_10 } from '../pkg-14/types-10';
import type { Entity_14_20, Registry_14_20 } from '../pkg-14/types-20';
import type { Entity_13_01, Registry_13_01 } from '../pkg-13/types-01';
import type { Entity_13_10, Registry_13_10 } from '../pkg-13/types-10';
import type { Entity_13_20, Registry_13_20 } from '../pkg-13/types-20';
import type { Entity_12_01, Registry_12_01 } from '../pkg-12/types-01';
import type { Entity_12_10, Registry_12_10 } from '../pkg-12/types-10';
import type { Entity_12_20, Registry_12_20 } from '../pkg-12/types-20';

type DeepMerge_1503<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object ? U[K] extends object ? DeepMerge_1503<T[K], U[K]> : U[K] : U[K]
    : K extends keyof T ? T[K] : K extends keyof U ? U[K] : never;
};

interface Entity_15_03 {
  id: string;
  meta: { created: Date; updated: Date; version: number; tags: string[]; attrs: Record<string, { v: unknown; t: string; ok: boolean }> };
  rels: { parent: Entity_15_03 | null; children: Entity_15_03[]; };
  cfg: { enabled: boolean; priority: number; rules: Array<{ cond: string; action: string; params: Record<string, unknown>; sub: { items: Array<{ id: string; w: number }> } }> };
  d03: { x1503: number; y1503: string; z1503: boolean };
}

type Path_1503<T, D extends unknown[] = []> = D['length'] extends 6 ? never
  : T extends object ? { [K in keyof T & string]: K | `${K}.${Path_1503<T[K], [...D, unknown]>}` }[keyof T & string] : never;
type EP_1503 = Path_1503<Entity_15_03>;

type Val_1503<T> = {
  [K in keyof T]: T[K] extends string ? { t: 's'; min: number; max: number }
    : T[K] extends number ? { t: 'n'; min: number; max: number }
    : T[K] extends boolean ? { t: 'b'; def: boolean }
    : T[K] extends unknown[] ? { t: 'a'; items: Val_1503<T[K][number]> }
    : T[K] extends object ? { t: 'o'; props: Val_1503<T[K]> }
    : { t: 'u' };
};
type EV_1503 = Val_1503<Entity_15_03>;

interface Registry_15_03 {
  entities: Map<string, Entity_15_03>;
  validators: EV_1503;
  paths: Set<EP_1503>;
  merged: DeepMerge_1503<Entity_15_03, { extra1503: string }>;
}

type CK_1503 = `p15.t03.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type { Entity_15_03, Registry_15_03, CK_1503, EP_1503, EV_1503, DeepMerge_1503 };
