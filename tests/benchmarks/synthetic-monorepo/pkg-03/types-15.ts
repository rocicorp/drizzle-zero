// pkg-03/types-15 - heavy interconnected types

import type { Entity_2_01, Registry_2_01 } from '../pkg-02/types-01';
import type { Entity_2_10, Registry_2_10 } from '../pkg-02/types-10';
import type { Entity_2_20, Registry_2_20 } from '../pkg-02/types-20';
import type { Entity_1_01, Registry_1_01 } from '../pkg-01/types-01';
import type { Entity_1_10, Registry_1_10 } from '../pkg-01/types-10';
import type { Entity_1_20, Registry_1_20 } from '../pkg-01/types-20';

type DeepMerge_0315<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object ? U[K] extends object ? DeepMerge_0315<T[K], U[K]> : U[K] : U[K]
    : K extends keyof T ? T[K] : K extends keyof U ? U[K] : never;
};

interface Entity_03_15 {
  id: string;
  meta: { created: Date; updated: Date; version: number; tags: string[]; attrs: Record<string, { v: unknown; t: string; ok: boolean }> };
  rels: { parent: Entity_03_15 | null; children: Entity_03_15[]; };
  cfg: { enabled: boolean; priority: number; rules: Array<{ cond: string; action: string; params: Record<string, unknown>; sub: { items: Array<{ id: string; w: number }> } }> };
  d15: { x0315: number; y0315: string; z0315: boolean };
}

type Path_0315<T, D extends unknown[] = []> = D['length'] extends 6 ? never
  : T extends object ? { [K in keyof T & string]: K | `${K}.${Path_0315<T[K], [...D, unknown]>}` }[keyof T & string] : never;
type EP_0315 = Path_0315<Entity_03_15>;

type Val_0315<T> = {
  [K in keyof T]: T[K] extends string ? { t: 's'; min: number; max: number }
    : T[K] extends number ? { t: 'n'; min: number; max: number }
    : T[K] extends boolean ? { t: 'b'; def: boolean }
    : T[K] extends unknown[] ? { t: 'a'; items: Val_0315<T[K][number]> }
    : T[K] extends object ? { t: 'o'; props: Val_0315<T[K]> }
    : { t: 'u' };
};
type EV_0315 = Val_0315<Entity_03_15>;

interface Registry_03_15 {
  entities: Map<string, Entity_03_15>;
  validators: EV_0315;
  paths: Set<EP_0315>;
  merged: DeepMerge_0315<Entity_03_15, { extra0315: string }>;
}

type CK_0315 = `p03.t15.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type { Entity_03_15, Registry_03_15, CK_0315, EP_0315, EV_0315, DeepMerge_0315 };
