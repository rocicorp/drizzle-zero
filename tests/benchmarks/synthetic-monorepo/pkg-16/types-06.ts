// pkg-16/types-06 - heavy interconnected types

import type { Entity_15_01, Registry_15_01 } from '../pkg-15/types-01';
import type { Entity_15_10, Registry_15_10 } from '../pkg-15/types-10';
import type { Entity_15_20, Registry_15_20 } from '../pkg-15/types-20';
import type { Entity_14_01, Registry_14_01 } from '../pkg-14/types-01';
import type { Entity_14_10, Registry_14_10 } from '../pkg-14/types-10';
import type { Entity_14_20, Registry_14_20 } from '../pkg-14/types-20';
import type { Entity_13_01, Registry_13_01 } from '../pkg-13/types-01';
import type { Entity_13_10, Registry_13_10 } from '../pkg-13/types-10';
import type { Entity_13_20, Registry_13_20 } from '../pkg-13/types-20';

type DeepMerge_1606<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object ? U[K] extends object ? DeepMerge_1606<T[K], U[K]> : U[K] : U[K]
    : K extends keyof T ? T[K] : K extends keyof U ? U[K] : never;
};

interface Entity_16_06 {
  id: string;
  meta: { created: Date; updated: Date; version: number; tags: string[]; attrs: Record<string, { v: unknown; t: string; ok: boolean }> };
  rels: { parent: Entity_16_06 | null; children: Entity_16_06[]; };
  cfg: { enabled: boolean; priority: number; rules: Array<{ cond: string; action: string; params: Record<string, unknown>; sub: { items: Array<{ id: string; w: number }> } }> };
  d06: { x1606: number; y1606: string; z1606: boolean };
}

type Path_1606<T, D extends unknown[] = []> = D['length'] extends 6 ? never
  : T extends object ? { [K in keyof T & string]: K | `${K}.${Path_1606<T[K], [...D, unknown]>}` }[keyof T & string] : never;
type EP_1606 = Path_1606<Entity_16_06>;

type Val_1606<T> = {
  [K in keyof T]: T[K] extends string ? { t: 's'; min: number; max: number }
    : T[K] extends number ? { t: 'n'; min: number; max: number }
    : T[K] extends boolean ? { t: 'b'; def: boolean }
    : T[K] extends unknown[] ? { t: 'a'; items: Val_1606<T[K][number]> }
    : T[K] extends object ? { t: 'o'; props: Val_1606<T[K]> }
    : { t: 'u' };
};
type EV_1606 = Val_1606<Entity_16_06>;

interface Registry_16_06 {
  entities: Map<string, Entity_16_06>;
  validators: EV_1606;
  paths: Set<EP_1606>;
  merged: DeepMerge_1606<Entity_16_06, { extra1606: string }>;
}

type CK_1606 = `p16.t06.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type { Entity_16_06, Registry_16_06, CK_1606, EP_1606, EV_1606, DeepMerge_1606 };
