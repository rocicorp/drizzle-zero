// pkg-26/types-35 - heavy interconnected types

import type { Entity_25_01, Registry_25_01 } from '../pkg-25/types-01';
import type { Entity_25_10, Registry_25_10 } from '../pkg-25/types-10';
import type { Entity_25_20, Registry_25_20 } from '../pkg-25/types-20';
import type { Entity_24_01, Registry_24_01 } from '../pkg-24/types-01';
import type { Entity_24_10, Registry_24_10 } from '../pkg-24/types-10';
import type { Entity_24_20, Registry_24_20 } from '../pkg-24/types-20';
import type { Entity_23_01, Registry_23_01 } from '../pkg-23/types-01';
import type { Entity_23_10, Registry_23_10 } from '../pkg-23/types-10';
import type { Entity_23_20, Registry_23_20 } from '../pkg-23/types-20';

type DeepMerge_2635<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object ? U[K] extends object ? DeepMerge_2635<T[K], U[K]> : U[K] : U[K]
    : K extends keyof T ? T[K] : K extends keyof U ? U[K] : never;
};

interface Entity_26_35 {
  id: string;
  meta: { created: Date; updated: Date; version: number; tags: string[]; attrs: Record<string, { v: unknown; t: string; ok: boolean }> };
  rels: { parent: Entity_26_35 | null; children: Entity_26_35[]; };
  cfg: { enabled: boolean; priority: number; rules: Array<{ cond: string; action: string; params: Record<string, unknown>; sub: { items: Array<{ id: string; w: number }> } }> };
  d35: { x2635: number; y2635: string; z2635: boolean };
}

type Path_2635<T, D extends unknown[] = []> = D['length'] extends 6 ? never
  : T extends object ? { [K in keyof T & string]: K | `${K}.${Path_2635<T[K], [...D, unknown]>}` }[keyof T & string] : never;
type EP_2635 = Path_2635<Entity_26_35>;

type Val_2635<T> = {
  [K in keyof T]: T[K] extends string ? { t: 's'; min: number; max: number }
    : T[K] extends number ? { t: 'n'; min: number; max: number }
    : T[K] extends boolean ? { t: 'b'; def: boolean }
    : T[K] extends unknown[] ? { t: 'a'; items: Val_2635<T[K][number]> }
    : T[K] extends object ? { t: 'o'; props: Val_2635<T[K]> }
    : { t: 'u' };
};
type EV_2635 = Val_2635<Entity_26_35>;

interface Registry_26_35 {
  entities: Map<string, Entity_26_35>;
  validators: EV_2635;
  paths: Set<EP_2635>;
  merged: DeepMerge_2635<Entity_26_35, { extra2635: string }>;
}

type CK_2635 = `p26.t35.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type { Entity_26_35, Registry_26_35, CK_2635, EP_2635, EV_2635, DeepMerge_2635 };
