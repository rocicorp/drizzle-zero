// pkg-07/types-07 - heavy interconnected types

import type { Entity_6_01, Registry_6_01 } from '../pkg-06/types-01';
import type { Entity_6_10, Registry_6_10 } from '../pkg-06/types-10';
import type { Entity_6_20, Registry_6_20 } from '../pkg-06/types-20';
import type { Entity_5_01, Registry_5_01 } from '../pkg-05/types-01';
import type { Entity_5_10, Registry_5_10 } from '../pkg-05/types-10';
import type { Entity_5_20, Registry_5_20 } from '../pkg-05/types-20';
import type { Entity_4_01, Registry_4_01 } from '../pkg-04/types-01';
import type { Entity_4_10, Registry_4_10 } from '../pkg-04/types-10';
import type { Entity_4_20, Registry_4_20 } from '../pkg-04/types-20';

type DeepMerge_0707<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object ? U[K] extends object ? DeepMerge_0707<T[K], U[K]> : U[K] : U[K]
    : K extends keyof T ? T[K] : K extends keyof U ? U[K] : never;
};

interface Entity_07_07 {
  id: string;
  meta: { created: Date; updated: Date; version: number; tags: string[]; attrs: Record<string, { v: unknown; t: string; ok: boolean }> };
  rels: { parent: Entity_07_07 | null; children: Entity_07_07[]; };
  cfg: { enabled: boolean; priority: number; rules: Array<{ cond: string; action: string; params: Record<string, unknown>; sub: { items: Array<{ id: string; w: number }> } }> };
  d07: { x0707: number; y0707: string; z0707: boolean };
}

type Path_0707<T, D extends unknown[] = []> = D['length'] extends 6 ? never
  : T extends object ? { [K in keyof T & string]: K | `${K}.${Path_0707<T[K], [...D, unknown]>}` }[keyof T & string] : never;
type EP_0707 = Path_0707<Entity_07_07>;

type Val_0707<T> = {
  [K in keyof T]: T[K] extends string ? { t: 's'; min: number; max: number }
    : T[K] extends number ? { t: 'n'; min: number; max: number }
    : T[K] extends boolean ? { t: 'b'; def: boolean }
    : T[K] extends unknown[] ? { t: 'a'; items: Val_0707<T[K][number]> }
    : T[K] extends object ? { t: 'o'; props: Val_0707<T[K]> }
    : { t: 'u' };
};
type EV_0707 = Val_0707<Entity_07_07>;

interface Registry_07_07 {
  entities: Map<string, Entity_07_07>;
  validators: EV_0707;
  paths: Set<EP_0707>;
  merged: DeepMerge_0707<Entity_07_07, { extra0707: string }>;
}

type CK_0707 = `p07.t07.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type { Entity_07_07, Registry_07_07, CK_0707, EP_0707, EV_0707, DeepMerge_0707 };
