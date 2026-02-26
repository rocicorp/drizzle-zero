// pkg-03/types-12 - heavy interconnected types

import type { Entity_2_01, Registry_2_01 } from '../pkg-02/types-01';
import type { Entity_2_10, Registry_2_10 } from '../pkg-02/types-10';
import type { Entity_2_20, Registry_2_20 } from '../pkg-02/types-20';
import type { Entity_1_01, Registry_1_01 } from '../pkg-01/types-01';
import type { Entity_1_10, Registry_1_10 } from '../pkg-01/types-10';
import type { Entity_1_20, Registry_1_20 } from '../pkg-01/types-20';

type DeepMerge_0312<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object ? U[K] extends object ? DeepMerge_0312<T[K], U[K]> : U[K] : U[K]
    : K extends keyof T ? T[K] : K extends keyof U ? U[K] : never;
};

interface Entity_03_12 {
  id: string;
  meta: { created: Date; updated: Date; version: number; tags: string[]; attrs: Record<string, { v: unknown; t: string; ok: boolean }> };
  rels: { parent: Entity_03_12 | null; children: Entity_03_12[]; };
  cfg: { enabled: boolean; priority: number; rules: Array<{ cond: string; action: string; params: Record<string, unknown>; sub: { items: Array<{ id: string; w: number }> } }> };
  d12: { x0312: number; y0312: string; z0312: boolean };
}

type Path_0312<T, D extends unknown[] = []> = D['length'] extends 6 ? never
  : T extends object ? { [K in keyof T & string]: K | `${K}.${Path_0312<T[K], [...D, unknown]>}` }[keyof T & string] : never;
type EP_0312 = Path_0312<Entity_03_12>;

type Val_0312<T> = {
  [K in keyof T]: T[K] extends string ? { t: 's'; min: number; max: number }
    : T[K] extends number ? { t: 'n'; min: number; max: number }
    : T[K] extends boolean ? { t: 'b'; def: boolean }
    : T[K] extends unknown[] ? { t: 'a'; items: Val_0312<T[K][number]> }
    : T[K] extends object ? { t: 'o'; props: Val_0312<T[K]> }
    : { t: 'u' };
};
type EV_0312 = Val_0312<Entity_03_12>;

interface Registry_03_12 {
  entities: Map<string, Entity_03_12>;
  validators: EV_0312;
  paths: Set<EP_0312>;
  merged: DeepMerge_0312<Entity_03_12, { extra0312: string }>;
}

type CK_0312 = `p03.t12.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type { Entity_03_12, Registry_03_12, CK_0312, EP_0312, EV_0312, DeepMerge_0312 };
