// pkg-09/types-30 - heavy interconnected types

import type { Entity_8_01, Registry_8_01 } from '../pkg-08/types-01';
import type { Entity_8_10, Registry_8_10 } from '../pkg-08/types-10';
import type { Entity_8_20, Registry_8_20 } from '../pkg-08/types-20';
import type { Entity_7_01, Registry_7_01 } from '../pkg-07/types-01';
import type { Entity_7_10, Registry_7_10 } from '../pkg-07/types-10';
import type { Entity_7_20, Registry_7_20 } from '../pkg-07/types-20';
import type { Entity_6_01, Registry_6_01 } from '../pkg-06/types-01';
import type { Entity_6_10, Registry_6_10 } from '../pkg-06/types-10';
import type { Entity_6_20, Registry_6_20 } from '../pkg-06/types-20';

type DeepMerge_0930<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object ? U[K] extends object ? DeepMerge_0930<T[K], U[K]> : U[K] : U[K]
    : K extends keyof T ? T[K] : K extends keyof U ? U[K] : never;
};

interface Entity_09_30 {
  id: string;
  meta: { created: Date; updated: Date; version: number; tags: string[]; attrs: Record<string, { v: unknown; t: string; ok: boolean }> };
  rels: { parent: Entity_09_30 | null; children: Entity_09_30[]; };
  cfg: { enabled: boolean; priority: number; rules: Array<{ cond: string; action: string; params: Record<string, unknown>; sub: { items: Array<{ id: string; w: number }> } }> };
  d30: { x0930: number; y0930: string; z0930: boolean };
}

type Path_0930<T, D extends unknown[] = []> = D['length'] extends 6 ? never
  : T extends object ? { [K in keyof T & string]: K | `${K}.${Path_0930<T[K], [...D, unknown]>}` }[keyof T & string] : never;
type EP_0930 = Path_0930<Entity_09_30>;

type Val_0930<T> = {
  [K in keyof T]: T[K] extends string ? { t: 's'; min: number; max: number }
    : T[K] extends number ? { t: 'n'; min: number; max: number }
    : T[K] extends boolean ? { t: 'b'; def: boolean }
    : T[K] extends unknown[] ? { t: 'a'; items: Val_0930<T[K][number]> }
    : T[K] extends object ? { t: 'o'; props: Val_0930<T[K]> }
    : { t: 'u' };
};
type EV_0930 = Val_0930<Entity_09_30>;

interface Registry_09_30 {
  entities: Map<string, Entity_09_30>;
  validators: EV_0930;
  paths: Set<EP_0930>;
  merged: DeepMerge_0930<Entity_09_30, { extra0930: string }>;
}

type CK_0930 = `p09.t30.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type { Entity_09_30, Registry_09_30, CK_0930, EP_0930, EV_0930, DeepMerge_0930 };
