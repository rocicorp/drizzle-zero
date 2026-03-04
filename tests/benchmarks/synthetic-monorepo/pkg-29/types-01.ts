// pkg-29/types-01 - heavy interconnected types

import type { Entity_28_01, Registry_28_01 } from '../pkg-28/types-01';
import type { Entity_28_10, Registry_28_10 } from '../pkg-28/types-10';
import type { Entity_28_20, Registry_28_20 } from '../pkg-28/types-20';
import type { Entity_27_01, Registry_27_01 } from '../pkg-27/types-01';
import type { Entity_27_10, Registry_27_10 } from '../pkg-27/types-10';
import type { Entity_27_20, Registry_27_20 } from '../pkg-27/types-20';
import type { Entity_26_01, Registry_26_01 } from '../pkg-26/types-01';
import type { Entity_26_10, Registry_26_10 } from '../pkg-26/types-10';
import type { Entity_26_20, Registry_26_20 } from '../pkg-26/types-20';

type DeepMerge_2901<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object ? U[K] extends object ? DeepMerge_2901<T[K], U[K]> : U[K] : U[K]
    : K extends keyof T ? T[K] : K extends keyof U ? U[K] : never;
};

interface Entity_29_01 {
  id: string;
  meta: { created: Date; updated: Date; version: number; tags: string[]; attrs: Record<string, { v: unknown; t: string; ok: boolean }> };
  rels: { parent: Entity_29_01 | null; children: Entity_29_01[]; };
  cfg: { enabled: boolean; priority: number; rules: Array<{ cond: string; action: string; params: Record<string, unknown>; sub: { items: Array<{ id: string; w: number }> } }> };
  d01: { x2901: number; y2901: string; z2901: boolean };
}

type Path_2901<T, D extends unknown[] = []> = D['length'] extends 6 ? never
  : T extends object ? { [K in keyof T & string]: K | `${K}.${Path_2901<T[K], [...D, unknown]>}` }[keyof T & string] : never;
type EP_2901 = Path_2901<Entity_29_01>;

type Val_2901<T> = {
  [K in keyof T]: T[K] extends string ? { t: 's'; min: number; max: number }
    : T[K] extends number ? { t: 'n'; min: number; max: number }
    : T[K] extends boolean ? { t: 'b'; def: boolean }
    : T[K] extends unknown[] ? { t: 'a'; items: Val_2901<T[K][number]> }
    : T[K] extends object ? { t: 'o'; props: Val_2901<T[K]> }
    : { t: 'u' };
};
type EV_2901 = Val_2901<Entity_29_01>;

interface Registry_29_01 {
  entities: Map<string, Entity_29_01>;
  validators: EV_2901;
  paths: Set<EP_2901>;
  merged: DeepMerge_2901<Entity_29_01, { extra2901: string }>;
}

type CK_2901 = `p29.t01.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type { Entity_29_01, Registry_29_01, CK_2901, EP_2901, EV_2901, DeepMerge_2901 };
