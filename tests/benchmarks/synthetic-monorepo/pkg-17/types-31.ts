// pkg-17/types-31 - heavy interconnected types

import type { Entity_16_01, Registry_16_01 } from '../pkg-16/types-01';
import type { Entity_16_10, Registry_16_10 } from '../pkg-16/types-10';
import type { Entity_16_20, Registry_16_20 } from '../pkg-16/types-20';
import type { Entity_15_01, Registry_15_01 } from '../pkg-15/types-01';
import type { Entity_15_10, Registry_15_10 } from '../pkg-15/types-10';
import type { Entity_15_20, Registry_15_20 } from '../pkg-15/types-20';
import type { Entity_14_01, Registry_14_01 } from '../pkg-14/types-01';
import type { Entity_14_10, Registry_14_10 } from '../pkg-14/types-10';
import type { Entity_14_20, Registry_14_20 } from '../pkg-14/types-20';

type DeepMerge_1731<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object ? U[K] extends object ? DeepMerge_1731<T[K], U[K]> : U[K] : U[K]
    : K extends keyof T ? T[K] : K extends keyof U ? U[K] : never;
};

interface Entity_17_31 {
  id: string;
  meta: { created: Date; updated: Date; version: number; tags: string[]; attrs: Record<string, { v: unknown; t: string; ok: boolean }> };
  rels: { parent: Entity_17_31 | null; children: Entity_17_31[]; };
  cfg: { enabled: boolean; priority: number; rules: Array<{ cond: string; action: string; params: Record<string, unknown>; sub: { items: Array<{ id: string; w: number }> } }> };
  d31: { x1731: number; y1731: string; z1731: boolean };
}

type Path_1731<T, D extends unknown[] = []> = D['length'] extends 6 ? never
  : T extends object ? { [K in keyof T & string]: K | `${K}.${Path_1731<T[K], [...D, unknown]>}` }[keyof T & string] : never;
type EP_1731 = Path_1731<Entity_17_31>;

type Val_1731<T> = {
  [K in keyof T]: T[K] extends string ? { t: 's'; min: number; max: number }
    : T[K] extends number ? { t: 'n'; min: number; max: number }
    : T[K] extends boolean ? { t: 'b'; def: boolean }
    : T[K] extends unknown[] ? { t: 'a'; items: Val_1731<T[K][number]> }
    : T[K] extends object ? { t: 'o'; props: Val_1731<T[K]> }
    : { t: 'u' };
};
type EV_1731 = Val_1731<Entity_17_31>;

interface Registry_17_31 {
  entities: Map<string, Entity_17_31>;
  validators: EV_1731;
  paths: Set<EP_1731>;
  merged: DeepMerge_1731<Entity_17_31, { extra1731: string }>;
}

type CK_1731 = `p17.t31.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type { Entity_17_31, Registry_17_31, CK_1731, EP_1731, EV_1731, DeepMerge_1731 };
