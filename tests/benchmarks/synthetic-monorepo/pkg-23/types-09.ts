// pkg-23/types-09 - heavy interconnected types

import type { Entity_22_01, Registry_22_01 } from '../pkg-22/types-01';
import type { Entity_22_10, Registry_22_10 } from '../pkg-22/types-10';
import type { Entity_22_20, Registry_22_20 } from '../pkg-22/types-20';
import type { Entity_21_01, Registry_21_01 } from '../pkg-21/types-01';
import type { Entity_21_10, Registry_21_10 } from '../pkg-21/types-10';
import type { Entity_21_20, Registry_21_20 } from '../pkg-21/types-20';
import type { Entity_20_01, Registry_20_01 } from '../pkg-20/types-01';
import type { Entity_20_10, Registry_20_10 } from '../pkg-20/types-10';
import type { Entity_20_20, Registry_20_20 } from '../pkg-20/types-20';

type DeepMerge_2309<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object ? U[K] extends object ? DeepMerge_2309<T[K], U[K]> : U[K] : U[K]
    : K extends keyof T ? T[K] : K extends keyof U ? U[K] : never;
};

interface Entity_23_09 {
  id: string;
  meta: { created: Date; updated: Date; version: number; tags: string[]; attrs: Record<string, { v: unknown; t: string; ok: boolean }> };
  rels: { parent: Entity_23_09 | null; children: Entity_23_09[]; };
  cfg: { enabled: boolean; priority: number; rules: Array<{ cond: string; action: string; params: Record<string, unknown>; sub: { items: Array<{ id: string; w: number }> } }> };
  d09: { x2309: number; y2309: string; z2309: boolean };
}

type Path_2309<T, D extends unknown[] = []> = D['length'] extends 6 ? never
  : T extends object ? { [K in keyof T & string]: K | `${K}.${Path_2309<T[K], [...D, unknown]>}` }[keyof T & string] : never;
type EP_2309 = Path_2309<Entity_23_09>;

type Val_2309<T> = {
  [K in keyof T]: T[K] extends string ? { t: 's'; min: number; max: number }
    : T[K] extends number ? { t: 'n'; min: number; max: number }
    : T[K] extends boolean ? { t: 'b'; def: boolean }
    : T[K] extends unknown[] ? { t: 'a'; items: Val_2309<T[K][number]> }
    : T[K] extends object ? { t: 'o'; props: Val_2309<T[K]> }
    : { t: 'u' };
};
type EV_2309 = Val_2309<Entity_23_09>;

interface Registry_23_09 {
  entities: Map<string, Entity_23_09>;
  validators: EV_2309;
  paths: Set<EP_2309>;
  merged: DeepMerge_2309<Entity_23_09, { extra2309: string }>;
}

type CK_2309 = `p23.t09.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type { Entity_23_09, Registry_23_09, CK_2309, EP_2309, EV_2309, DeepMerge_2309 };
