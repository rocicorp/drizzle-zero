// pkg-22/types-25 - heavy interconnected types

import type { Entity_21_01, Registry_21_01 } from '../pkg-21/types-01';
import type { Entity_21_10, Registry_21_10 } from '../pkg-21/types-10';
import type { Entity_21_20, Registry_21_20 } from '../pkg-21/types-20';
import type { Entity_20_01, Registry_20_01 } from '../pkg-20/types-01';
import type { Entity_20_10, Registry_20_10 } from '../pkg-20/types-10';
import type { Entity_20_20, Registry_20_20 } from '../pkg-20/types-20';
import type { Entity_19_01, Registry_19_01 } from '../pkg-19/types-01';
import type { Entity_19_10, Registry_19_10 } from '../pkg-19/types-10';
import type { Entity_19_20, Registry_19_20 } from '../pkg-19/types-20';

type DeepMerge_2225<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object ? U[K] extends object ? DeepMerge_2225<T[K], U[K]> : U[K] : U[K]
    : K extends keyof T ? T[K] : K extends keyof U ? U[K] : never;
};

interface Entity_22_25 {
  id: string;
  meta: { created: Date; updated: Date; version: number; tags: string[]; attrs: Record<string, { v: unknown; t: string; ok: boolean }> };
  rels: { parent: Entity_22_25 | null; children: Entity_22_25[]; };
  cfg: { enabled: boolean; priority: number; rules: Array<{ cond: string; action: string; params: Record<string, unknown>; sub: { items: Array<{ id: string; w: number }> } }> };
  d25: { x2225: number; y2225: string; z2225: boolean };
}

type Path_2225<T, D extends unknown[] = []> = D['length'] extends 6 ? never
  : T extends object ? { [K in keyof T & string]: K | `${K}.${Path_2225<T[K], [...D, unknown]>}` }[keyof T & string] : never;
type EP_2225 = Path_2225<Entity_22_25>;

type Val_2225<T> = {
  [K in keyof T]: T[K] extends string ? { t: 's'; min: number; max: number }
    : T[K] extends number ? { t: 'n'; min: number; max: number }
    : T[K] extends boolean ? { t: 'b'; def: boolean }
    : T[K] extends unknown[] ? { t: 'a'; items: Val_2225<T[K][number]> }
    : T[K] extends object ? { t: 'o'; props: Val_2225<T[K]> }
    : { t: 'u' };
};
type EV_2225 = Val_2225<Entity_22_25>;

interface Registry_22_25 {
  entities: Map<string, Entity_22_25>;
  validators: EV_2225;
  paths: Set<EP_2225>;
  merged: DeepMerge_2225<Entity_22_25, { extra2225: string }>;
}

type CK_2225 = `p22.t25.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type { Entity_22_25, Registry_22_25, CK_2225, EP_2225, EV_2225, DeepMerge_2225 };
