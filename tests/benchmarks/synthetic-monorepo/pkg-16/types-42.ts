// pkg-16/types-42 - heavy interconnected types

import type { Entity_15_01, Registry_15_01 } from '../pkg-15/types-01';
import type { Entity_15_10, Registry_15_10 } from '../pkg-15/types-10';
import type { Entity_15_20, Registry_15_20 } from '../pkg-15/types-20';
import type { Entity_14_01, Registry_14_01 } from '../pkg-14/types-01';
import type { Entity_14_10, Registry_14_10 } from '../pkg-14/types-10';
import type { Entity_14_20, Registry_14_20 } from '../pkg-14/types-20';
import type { Entity_13_01, Registry_13_01 } from '../pkg-13/types-01';
import type { Entity_13_10, Registry_13_10 } from '../pkg-13/types-10';
import type { Entity_13_20, Registry_13_20 } from '../pkg-13/types-20';

type DeepMerge_1642<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object ? U[K] extends object ? DeepMerge_1642<T[K], U[K]> : U[K] : U[K]
    : K extends keyof T ? T[K] : K extends keyof U ? U[K] : never;
};

interface Entity_16_42 {
  id: string;
  meta: { created: Date; updated: Date; version: number; tags: string[]; attrs: Record<string, { v: unknown; t: string; ok: boolean }> };
  rels: { parent: Entity_16_42 | null; children: Entity_16_42[]; };
  cfg: { enabled: boolean; priority: number; rules: Array<{ cond: string; action: string; params: Record<string, unknown>; sub: { items: Array<{ id: string; w: number }> } }> };
  d42: { x1642: number; y1642: string; z1642: boolean };
}

type Path_1642<T, D extends unknown[] = []> = D['length'] extends 6 ? never
  : T extends object ? { [K in keyof T & string]: K | `${K}.${Path_1642<T[K], [...D, unknown]>}` }[keyof T & string] : never;
type EP_1642 = Path_1642<Entity_16_42>;

type Val_1642<T> = {
  [K in keyof T]: T[K] extends string ? { t: 's'; min: number; max: number }
    : T[K] extends number ? { t: 'n'; min: number; max: number }
    : T[K] extends boolean ? { t: 'b'; def: boolean }
    : T[K] extends unknown[] ? { t: 'a'; items: Val_1642<T[K][number]> }
    : T[K] extends object ? { t: 'o'; props: Val_1642<T[K]> }
    : { t: 'u' };
};
type EV_1642 = Val_1642<Entity_16_42>;

interface Registry_16_42 {
  entities: Map<string, Entity_16_42>;
  validators: EV_1642;
  paths: Set<EP_1642>;
  merged: DeepMerge_1642<Entity_16_42, { extra1642: string }>;
}

type CK_1642 = `p16.t42.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type { Entity_16_42, Registry_16_42, CK_1642, EP_1642, EV_1642, DeepMerge_1642 };
