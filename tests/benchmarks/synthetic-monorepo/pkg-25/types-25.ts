// pkg-25/types-25 - heavy interconnected types

import type { Entity_24_01, Registry_24_01 } from '../pkg-24/types-01';
import type { Entity_24_10, Registry_24_10 } from '../pkg-24/types-10';
import type { Entity_24_20, Registry_24_20 } from '../pkg-24/types-20';
import type { Entity_23_01, Registry_23_01 } from '../pkg-23/types-01';
import type { Entity_23_10, Registry_23_10 } from '../pkg-23/types-10';
import type { Entity_23_20, Registry_23_20 } from '../pkg-23/types-20';
import type { Entity_22_01, Registry_22_01 } from '../pkg-22/types-01';
import type { Entity_22_10, Registry_22_10 } from '../pkg-22/types-10';
import type { Entity_22_20, Registry_22_20 } from '../pkg-22/types-20';

type DeepMerge_2525<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object ? U[K] extends object ? DeepMerge_2525<T[K], U[K]> : U[K] : U[K]
    : K extends keyof T ? T[K] : K extends keyof U ? U[K] : never;
};

interface Entity_25_25 {
  id: string;
  meta: { created: Date; updated: Date; version: number; tags: string[]; attrs: Record<string, { v: unknown; t: string; ok: boolean }> };
  rels: { parent: Entity_25_25 | null; children: Entity_25_25[]; };
  cfg: { enabled: boolean; priority: number; rules: Array<{ cond: string; action: string; params: Record<string, unknown>; sub: { items: Array<{ id: string; w: number }> } }> };
  d25: { x2525: number; y2525: string; z2525: boolean };
}

type Path_2525<T, D extends unknown[] = []> = D['length'] extends 6 ? never
  : T extends object ? { [K in keyof T & string]: K | `${K}.${Path_2525<T[K], [...D, unknown]>}` }[keyof T & string] : never;
type EP_2525 = Path_2525<Entity_25_25>;

type Val_2525<T> = {
  [K in keyof T]: T[K] extends string ? { t: 's'; min: number; max: number }
    : T[K] extends number ? { t: 'n'; min: number; max: number }
    : T[K] extends boolean ? { t: 'b'; def: boolean }
    : T[K] extends unknown[] ? { t: 'a'; items: Val_2525<T[K][number]> }
    : T[K] extends object ? { t: 'o'; props: Val_2525<T[K]> }
    : { t: 'u' };
};
type EV_2525 = Val_2525<Entity_25_25>;

interface Registry_25_25 {
  entities: Map<string, Entity_25_25>;
  validators: EV_2525;
  paths: Set<EP_2525>;
  merged: DeepMerge_2525<Entity_25_25, { extra2525: string }>;
}

type CK_2525 = `p25.t25.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type { Entity_25_25, Registry_25_25, CK_2525, EP_2525, EV_2525, DeepMerge_2525 };
