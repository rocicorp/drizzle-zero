// pkg-25/types-37 - heavy interconnected types

import type { Entity_24_01, Registry_24_01 } from '../pkg-24/types-01';
import type { Entity_24_10, Registry_24_10 } from '../pkg-24/types-10';
import type { Entity_24_20, Registry_24_20 } from '../pkg-24/types-20';
import type { Entity_23_01, Registry_23_01 } from '../pkg-23/types-01';
import type { Entity_23_10, Registry_23_10 } from '../pkg-23/types-10';
import type { Entity_23_20, Registry_23_20 } from '../pkg-23/types-20';
import type { Entity_22_01, Registry_22_01 } from '../pkg-22/types-01';
import type { Entity_22_10, Registry_22_10 } from '../pkg-22/types-10';
import type { Entity_22_20, Registry_22_20 } from '../pkg-22/types-20';

type DeepMerge_2537<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object ? U[K] extends object ? DeepMerge_2537<T[K], U[K]> : U[K] : U[K]
    : K extends keyof T ? T[K] : K extends keyof U ? U[K] : never;
};

interface Entity_25_37 {
  id: string;
  meta: { created: Date; updated: Date; version: number; tags: string[]; attrs: Record<string, { v: unknown; t: string; ok: boolean }> };
  rels: { parent: Entity_25_37 | null; children: Entity_25_37[]; };
  cfg: { enabled: boolean; priority: number; rules: Array<{ cond: string; action: string; params: Record<string, unknown>; sub: { items: Array<{ id: string; w: number }> } }> };
  d37: { x2537: number; y2537: string; z2537: boolean };
}

type Path_2537<T, D extends unknown[] = []> = D['length'] extends 6 ? never
  : T extends object ? { [K in keyof T & string]: K | `${K}.${Path_2537<T[K], [...D, unknown]>}` }[keyof T & string] : never;
type EP_2537 = Path_2537<Entity_25_37>;

type Val_2537<T> = {
  [K in keyof T]: T[K] extends string ? { t: 's'; min: number; max: number }
    : T[K] extends number ? { t: 'n'; min: number; max: number }
    : T[K] extends boolean ? { t: 'b'; def: boolean }
    : T[K] extends unknown[] ? { t: 'a'; items: Val_2537<T[K][number]> }
    : T[K] extends object ? { t: 'o'; props: Val_2537<T[K]> }
    : { t: 'u' };
};
type EV_2537 = Val_2537<Entity_25_37>;

interface Registry_25_37 {
  entities: Map<string, Entity_25_37>;
  validators: EV_2537;
  paths: Set<EP_2537>;
  merged: DeepMerge_2537<Entity_25_37, { extra2537: string }>;
}

type CK_2537 = `p25.t37.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type { Entity_25_37, Registry_25_37, CK_2537, EP_2537, EV_2537, DeepMerge_2537 };
