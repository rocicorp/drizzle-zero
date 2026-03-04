// pkg-05/types-21 - heavy interconnected types

import type { Entity_4_01, Registry_4_01 } from '../pkg-04/types-01';
import type { Entity_4_10, Registry_4_10 } from '../pkg-04/types-10';
import type { Entity_4_20, Registry_4_20 } from '../pkg-04/types-20';
import type { Entity_3_01, Registry_3_01 } from '../pkg-03/types-01';
import type { Entity_3_10, Registry_3_10 } from '../pkg-03/types-10';
import type { Entity_3_20, Registry_3_20 } from '../pkg-03/types-20';
import type { Entity_2_01, Registry_2_01 } from '../pkg-02/types-01';
import type { Entity_2_10, Registry_2_10 } from '../pkg-02/types-10';
import type { Entity_2_20, Registry_2_20 } from '../pkg-02/types-20';

type DeepMerge_0521<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object ? U[K] extends object ? DeepMerge_0521<T[K], U[K]> : U[K] : U[K]
    : K extends keyof T ? T[K] : K extends keyof U ? U[K] : never;
};

interface Entity_05_21 {
  id: string;
  meta: { created: Date; updated: Date; version: number; tags: string[]; attrs: Record<string, { v: unknown; t: string; ok: boolean }> };
  rels: { parent: Entity_05_21 | null; children: Entity_05_21[]; };
  cfg: { enabled: boolean; priority: number; rules: Array<{ cond: string; action: string; params: Record<string, unknown>; sub: { items: Array<{ id: string; w: number }> } }> };
  d21: { x0521: number; y0521: string; z0521: boolean };
}

type Path_0521<T, D extends unknown[] = []> = D['length'] extends 6 ? never
  : T extends object ? { [K in keyof T & string]: K | `${K}.${Path_0521<T[K], [...D, unknown]>}` }[keyof T & string] : never;
type EP_0521 = Path_0521<Entity_05_21>;

type Val_0521<T> = {
  [K in keyof T]: T[K] extends string ? { t: 's'; min: number; max: number }
    : T[K] extends number ? { t: 'n'; min: number; max: number }
    : T[K] extends boolean ? { t: 'b'; def: boolean }
    : T[K] extends unknown[] ? { t: 'a'; items: Val_0521<T[K][number]> }
    : T[K] extends object ? { t: 'o'; props: Val_0521<T[K]> }
    : { t: 'u' };
};
type EV_0521 = Val_0521<Entity_05_21>;

interface Registry_05_21 {
  entities: Map<string, Entity_05_21>;
  validators: EV_0521;
  paths: Set<EP_0521>;
  merged: DeepMerge_0521<Entity_05_21, { extra0521: string }>;
}

type CK_0521 = `p05.t21.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type { Entity_05_21, Registry_05_21, CK_0521, EP_0521, EV_0521, DeepMerge_0521 };
