// pkg-14/types-13 - heavy interconnected types

import type { Entity_13_01, Registry_13_01 } from '../pkg-13/types-01';
import type { Entity_13_10, Registry_13_10 } from '../pkg-13/types-10';
import type { Entity_13_20, Registry_13_20 } from '../pkg-13/types-20';
import type { Entity_12_01, Registry_12_01 } from '../pkg-12/types-01';
import type { Entity_12_10, Registry_12_10 } from '../pkg-12/types-10';
import type { Entity_12_20, Registry_12_20 } from '../pkg-12/types-20';
import type { Entity_11_01, Registry_11_01 } from '../pkg-11/types-01';
import type { Entity_11_10, Registry_11_10 } from '../pkg-11/types-10';
import type { Entity_11_20, Registry_11_20 } from '../pkg-11/types-20';

type DeepMerge_1413<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object ? U[K] extends object ? DeepMerge_1413<T[K], U[K]> : U[K] : U[K]
    : K extends keyof T ? T[K] : K extends keyof U ? U[K] : never;
};

interface Entity_14_13 {
  id: string;
  meta: { created: Date; updated: Date; version: number; tags: string[]; attrs: Record<string, { v: unknown; t: string; ok: boolean }> };
  rels: { parent: Entity_14_13 | null; children: Entity_14_13[]; };
  cfg: { enabled: boolean; priority: number; rules: Array<{ cond: string; action: string; params: Record<string, unknown>; sub: { items: Array<{ id: string; w: number }> } }> };
  d13: { x1413: number; y1413: string; z1413: boolean };
}

type Path_1413<T, D extends unknown[] = []> = D['length'] extends 6 ? never
  : T extends object ? { [K in keyof T & string]: K | `${K}.${Path_1413<T[K], [...D, unknown]>}` }[keyof T & string] : never;
type EP_1413 = Path_1413<Entity_14_13>;

type Val_1413<T> = {
  [K in keyof T]: T[K] extends string ? { t: 's'; min: number; max: number }
    : T[K] extends number ? { t: 'n'; min: number; max: number }
    : T[K] extends boolean ? { t: 'b'; def: boolean }
    : T[K] extends unknown[] ? { t: 'a'; items: Val_1413<T[K][number]> }
    : T[K] extends object ? { t: 'o'; props: Val_1413<T[K]> }
    : { t: 'u' };
};
type EV_1413 = Val_1413<Entity_14_13>;

interface Registry_14_13 {
  entities: Map<string, Entity_14_13>;
  validators: EV_1413;
  paths: Set<EP_1413>;
  merged: DeepMerge_1413<Entity_14_13, { extra1413: string }>;
}

type CK_1413 = `p14.t13.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type { Entity_14_13, Registry_14_13, CK_1413, EP_1413, EV_1413, DeepMerge_1413 };
