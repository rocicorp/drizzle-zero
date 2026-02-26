// pkg-03/types-47 - heavy interconnected types

import type { Entity_2_01, Registry_2_01 } from '../pkg-02/types-01';
import type { Entity_2_10, Registry_2_10 } from '../pkg-02/types-10';
import type { Entity_2_20, Registry_2_20 } from '../pkg-02/types-20';
import type { Entity_1_01, Registry_1_01 } from '../pkg-01/types-01';
import type { Entity_1_10, Registry_1_10 } from '../pkg-01/types-10';
import type { Entity_1_20, Registry_1_20 } from '../pkg-01/types-20';

type DeepMerge_0347<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object ? U[K] extends object ? DeepMerge_0347<T[K], U[K]> : U[K] : U[K]
    : K extends keyof T ? T[K] : K extends keyof U ? U[K] : never;
};

interface Entity_03_47 {
  id: string;
  meta: { created: Date; updated: Date; version: number; tags: string[]; attrs: Record<string, { v: unknown; t: string; ok: boolean }> };
  rels: { parent: Entity_03_47 | null; children: Entity_03_47[]; };
  cfg: { enabled: boolean; priority: number; rules: Array<{ cond: string; action: string; params: Record<string, unknown>; sub: { items: Array<{ id: string; w: number }> } }> };
  d47: { x0347: number; y0347: string; z0347: boolean };
}

type Path_0347<T, D extends unknown[] = []> = D['length'] extends 6 ? never
  : T extends object ? { [K in keyof T & string]: K | `${K}.${Path_0347<T[K], [...D, unknown]>}` }[keyof T & string] : never;
type EP_0347 = Path_0347<Entity_03_47>;

type Val_0347<T> = {
  [K in keyof T]: T[K] extends string ? { t: 's'; min: number; max: number }
    : T[K] extends number ? { t: 'n'; min: number; max: number }
    : T[K] extends boolean ? { t: 'b'; def: boolean }
    : T[K] extends unknown[] ? { t: 'a'; items: Val_0347<T[K][number]> }
    : T[K] extends object ? { t: 'o'; props: Val_0347<T[K]> }
    : { t: 'u' };
};
type EV_0347 = Val_0347<Entity_03_47>;

interface Registry_03_47 {
  entities: Map<string, Entity_03_47>;
  validators: EV_0347;
  paths: Set<EP_0347>;
  merged: DeepMerge_0347<Entity_03_47, { extra0347: string }>;
}

type CK_0347 = `p03.t47.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type { Entity_03_47, Registry_03_47, CK_0347, EP_0347, EV_0347, DeepMerge_0347 };
