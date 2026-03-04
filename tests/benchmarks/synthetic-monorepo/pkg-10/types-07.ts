// pkg-10/types-07 - heavy interconnected types

import type { Entity_9_01, Registry_9_01 } from '../pkg-09/types-01';
import type { Entity_9_10, Registry_9_10 } from '../pkg-09/types-10';
import type { Entity_9_20, Registry_9_20 } from '../pkg-09/types-20';
import type { Entity_8_01, Registry_8_01 } from '../pkg-08/types-01';
import type { Entity_8_10, Registry_8_10 } from '../pkg-08/types-10';
import type { Entity_8_20, Registry_8_20 } from '../pkg-08/types-20';
import type { Entity_7_01, Registry_7_01 } from '../pkg-07/types-01';
import type { Entity_7_10, Registry_7_10 } from '../pkg-07/types-10';
import type { Entity_7_20, Registry_7_20 } from '../pkg-07/types-20';

type DeepMerge_1007<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object ? U[K] extends object ? DeepMerge_1007<T[K], U[K]> : U[K] : U[K]
    : K extends keyof T ? T[K] : K extends keyof U ? U[K] : never;
};

interface Entity_10_07 {
  id: string;
  meta: { created: Date; updated: Date; version: number; tags: string[]; attrs: Record<string, { v: unknown; t: string; ok: boolean }> };
  rels: { parent: Entity_10_07 | null; children: Entity_10_07[]; };
  cfg: { enabled: boolean; priority: number; rules: Array<{ cond: string; action: string; params: Record<string, unknown>; sub: { items: Array<{ id: string; w: number }> } }> };
  d07: { x1007: number; y1007: string; z1007: boolean };
}

type Path_1007<T, D extends unknown[] = []> = D['length'] extends 6 ? never
  : T extends object ? { [K in keyof T & string]: K | `${K}.${Path_1007<T[K], [...D, unknown]>}` }[keyof T & string] : never;
type EP_1007 = Path_1007<Entity_10_07>;

type Val_1007<T> = {
  [K in keyof T]: T[K] extends string ? { t: 's'; min: number; max: number }
    : T[K] extends number ? { t: 'n'; min: number; max: number }
    : T[K] extends boolean ? { t: 'b'; def: boolean }
    : T[K] extends unknown[] ? { t: 'a'; items: Val_1007<T[K][number]> }
    : T[K] extends object ? { t: 'o'; props: Val_1007<T[K]> }
    : { t: 'u' };
};
type EV_1007 = Val_1007<Entity_10_07>;

interface Registry_10_07 {
  entities: Map<string, Entity_10_07>;
  validators: EV_1007;
  paths: Set<EP_1007>;
  merged: DeepMerge_1007<Entity_10_07, { extra1007: string }>;
}

type CK_1007 = `p10.t07.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type { Entity_10_07, Registry_10_07, CK_1007, EP_1007, EV_1007, DeepMerge_1007 };
