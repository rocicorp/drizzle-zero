// pkg-09/types-41 - heavy interconnected types

import type { Entity_8_01, Registry_8_01 } from '../pkg-08/types-01';
import type { Entity_8_10, Registry_8_10 } from '../pkg-08/types-10';
import type { Entity_8_20, Registry_8_20 } from '../pkg-08/types-20';
import type { Entity_7_01, Registry_7_01 } from '../pkg-07/types-01';
import type { Entity_7_10, Registry_7_10 } from '../pkg-07/types-10';
import type { Entity_7_20, Registry_7_20 } from '../pkg-07/types-20';
import type { Entity_6_01, Registry_6_01 } from '../pkg-06/types-01';
import type { Entity_6_10, Registry_6_10 } from '../pkg-06/types-10';
import type { Entity_6_20, Registry_6_20 } from '../pkg-06/types-20';

type DeepMerge_0941<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object ? U[K] extends object ? DeepMerge_0941<T[K], U[K]> : U[K] : U[K]
    : K extends keyof T ? T[K] : K extends keyof U ? U[K] : never;
};

interface Entity_09_41 {
  id: string;
  meta: { created: Date; updated: Date; version: number; tags: string[]; attrs: Record<string, { v: unknown; t: string; ok: boolean }> };
  rels: { parent: Entity_09_41 | null; children: Entity_09_41[]; };
  cfg: { enabled: boolean; priority: number; rules: Array<{ cond: string; action: string; params: Record<string, unknown>; sub: { items: Array<{ id: string; w: number }> } }> };
  d41: { x0941: number; y0941: string; z0941: boolean };
}

type Path_0941<T, D extends unknown[] = []> = D['length'] extends 6 ? never
  : T extends object ? { [K in keyof T & string]: K | `${K}.${Path_0941<T[K], [...D, unknown]>}` }[keyof T & string] : never;
type EP_0941 = Path_0941<Entity_09_41>;

type Val_0941<T> = {
  [K in keyof T]: T[K] extends string ? { t: 's'; min: number; max: number }
    : T[K] extends number ? { t: 'n'; min: number; max: number }
    : T[K] extends boolean ? { t: 'b'; def: boolean }
    : T[K] extends unknown[] ? { t: 'a'; items: Val_0941<T[K][number]> }
    : T[K] extends object ? { t: 'o'; props: Val_0941<T[K]> }
    : { t: 'u' };
};
type EV_0941 = Val_0941<Entity_09_41>;

interface Registry_09_41 {
  entities: Map<string, Entity_09_41>;
  validators: EV_0941;
  paths: Set<EP_0941>;
  merged: DeepMerge_0941<Entity_09_41, { extra0941: string }>;
}

type CK_0941 = `p09.t41.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type { Entity_09_41, Registry_09_41, CK_0941, EP_0941, EV_0941, DeepMerge_0941 };
