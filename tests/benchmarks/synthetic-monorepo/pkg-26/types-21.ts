// pkg-26/types-21 - heavy interconnected types

import type { Entity_25_01, Registry_25_01 } from '../pkg-25/types-01';
import type { Entity_25_10, Registry_25_10 } from '../pkg-25/types-10';
import type { Entity_25_20, Registry_25_20 } from '../pkg-25/types-20';
import type { Entity_24_01, Registry_24_01 } from '../pkg-24/types-01';
import type { Entity_24_10, Registry_24_10 } from '../pkg-24/types-10';
import type { Entity_24_20, Registry_24_20 } from '../pkg-24/types-20';
import type { Entity_23_01, Registry_23_01 } from '../pkg-23/types-01';
import type { Entity_23_10, Registry_23_10 } from '../pkg-23/types-10';
import type { Entity_23_20, Registry_23_20 } from '../pkg-23/types-20';

type DeepMerge_2621<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object ? U[K] extends object ? DeepMerge_2621<T[K], U[K]> : U[K] : U[K]
    : K extends keyof T ? T[K] : K extends keyof U ? U[K] : never;
};

interface Entity_26_21 {
  id: string;
  meta: { created: Date; updated: Date; version: number; tags: string[]; attrs: Record<string, { v: unknown; t: string; ok: boolean }> };
  rels: { parent: Entity_26_21 | null; children: Entity_26_21[]; };
  cfg: { enabled: boolean; priority: number; rules: Array<{ cond: string; action: string; params: Record<string, unknown>; sub: { items: Array<{ id: string; w: number }> } }> };
  d21: { x2621: number; y2621: string; z2621: boolean };
}

type Path_2621<T, D extends unknown[] = []> = D['length'] extends 6 ? never
  : T extends object ? { [K in keyof T & string]: K | `${K}.${Path_2621<T[K], [...D, unknown]>}` }[keyof T & string] : never;
type EP_2621 = Path_2621<Entity_26_21>;

type Val_2621<T> = {
  [K in keyof T]: T[K] extends string ? { t: 's'; min: number; max: number }
    : T[K] extends number ? { t: 'n'; min: number; max: number }
    : T[K] extends boolean ? { t: 'b'; def: boolean }
    : T[K] extends unknown[] ? { t: 'a'; items: Val_2621<T[K][number]> }
    : T[K] extends object ? { t: 'o'; props: Val_2621<T[K]> }
    : { t: 'u' };
};
type EV_2621 = Val_2621<Entity_26_21>;

interface Registry_26_21 {
  entities: Map<string, Entity_26_21>;
  validators: EV_2621;
  paths: Set<EP_2621>;
  merged: DeepMerge_2621<Entity_26_21, { extra2621: string }>;
}

type CK_2621 = `p26.t21.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type { Entity_26_21, Registry_26_21, CK_2621, EP_2621, EV_2621, DeepMerge_2621 };
