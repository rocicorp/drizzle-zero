// pkg-18/types-06 - heavy interconnected types

import type { Entity_17_01, Registry_17_01 } from '../pkg-17/types-01';
import type { Entity_17_10, Registry_17_10 } from '../pkg-17/types-10';
import type { Entity_17_20, Registry_17_20 } from '../pkg-17/types-20';
import type { Entity_16_01, Registry_16_01 } from '../pkg-16/types-01';
import type { Entity_16_10, Registry_16_10 } from '../pkg-16/types-10';
import type { Entity_16_20, Registry_16_20 } from '../pkg-16/types-20';
import type { Entity_15_01, Registry_15_01 } from '../pkg-15/types-01';
import type { Entity_15_10, Registry_15_10 } from '../pkg-15/types-10';
import type { Entity_15_20, Registry_15_20 } from '../pkg-15/types-20';

type DeepMerge_1806<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object ? U[K] extends object ? DeepMerge_1806<T[K], U[K]> : U[K] : U[K]
    : K extends keyof T ? T[K] : K extends keyof U ? U[K] : never;
};

interface Entity_18_06 {
  id: string;
  meta: { created: Date; updated: Date; version: number; tags: string[]; attrs: Record<string, { v: unknown; t: string; ok: boolean }> };
  rels: { parent: Entity_18_06 | null; children: Entity_18_06[]; };
  cfg: { enabled: boolean; priority: number; rules: Array<{ cond: string; action: string; params: Record<string, unknown>; sub: { items: Array<{ id: string; w: number }> } }> };
  d06: { x1806: number; y1806: string; z1806: boolean };
}

type Path_1806<T, D extends unknown[] = []> = D['length'] extends 6 ? never
  : T extends object ? { [K in keyof T & string]: K | `${K}.${Path_1806<T[K], [...D, unknown]>}` }[keyof T & string] : never;
type EP_1806 = Path_1806<Entity_18_06>;

type Val_1806<T> = {
  [K in keyof T]: T[K] extends string ? { t: 's'; min: number; max: number }
    : T[K] extends number ? { t: 'n'; min: number; max: number }
    : T[K] extends boolean ? { t: 'b'; def: boolean }
    : T[K] extends unknown[] ? { t: 'a'; items: Val_1806<T[K][number]> }
    : T[K] extends object ? { t: 'o'; props: Val_1806<T[K]> }
    : { t: 'u' };
};
type EV_1806 = Val_1806<Entity_18_06>;

interface Registry_18_06 {
  entities: Map<string, Entity_18_06>;
  validators: EV_1806;
  paths: Set<EP_1806>;
  merged: DeepMerge_1806<Entity_18_06, { extra1806: string }>;
}

type CK_1806 = `p18.t06.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type { Entity_18_06, Registry_18_06, CK_1806, EP_1806, EV_1806, DeepMerge_1806 };
