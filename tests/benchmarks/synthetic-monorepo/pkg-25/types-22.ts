// pkg-25/types-22 - heavy interconnected types

import type { Entity_24_01, Registry_24_01 } from '../pkg-24/types-01';
import type { Entity_24_10, Registry_24_10 } from '../pkg-24/types-10';
import type { Entity_24_20, Registry_24_20 } from '../pkg-24/types-20';
import type { Entity_23_01, Registry_23_01 } from '../pkg-23/types-01';
import type { Entity_23_10, Registry_23_10 } from '../pkg-23/types-10';
import type { Entity_23_20, Registry_23_20 } from '../pkg-23/types-20';
import type { Entity_22_01, Registry_22_01 } from '../pkg-22/types-01';
import type { Entity_22_10, Registry_22_10 } from '../pkg-22/types-10';
import type { Entity_22_20, Registry_22_20 } from '../pkg-22/types-20';

type DeepMerge_2522<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object ? U[K] extends object ? DeepMerge_2522<T[K], U[K]> : U[K] : U[K]
    : K extends keyof T ? T[K] : K extends keyof U ? U[K] : never;
};

interface Entity_25_22 {
  id: string;
  meta: { created: Date; updated: Date; version: number; tags: string[]; attrs: Record<string, { v: unknown; t: string; ok: boolean }> };
  rels: { parent: Entity_25_22 | null; children: Entity_25_22[]; };
  cfg: { enabled: boolean; priority: number; rules: Array<{ cond: string; action: string; params: Record<string, unknown>; sub: { items: Array<{ id: string; w: number }> } }> };
  d22: { x2522: number; y2522: string; z2522: boolean };
}

type Path_2522<T, D extends unknown[] = []> = D['length'] extends 6 ? never
  : T extends object ? { [K in keyof T & string]: K | `${K}.${Path_2522<T[K], [...D, unknown]>}` }[keyof T & string] : never;
type EP_2522 = Path_2522<Entity_25_22>;

type Val_2522<T> = {
  [K in keyof T]: T[K] extends string ? { t: 's'; min: number; max: number }
    : T[K] extends number ? { t: 'n'; min: number; max: number }
    : T[K] extends boolean ? { t: 'b'; def: boolean }
    : T[K] extends unknown[] ? { t: 'a'; items: Val_2522<T[K][number]> }
    : T[K] extends object ? { t: 'o'; props: Val_2522<T[K]> }
    : { t: 'u' };
};
type EV_2522 = Val_2522<Entity_25_22>;

interface Registry_25_22 {
  entities: Map<string, Entity_25_22>;
  validators: EV_2522;
  paths: Set<EP_2522>;
  merged: DeepMerge_2522<Entity_25_22, { extra2522: string }>;
}

type CK_2522 = `p25.t22.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type { Entity_25_22, Registry_25_22, CK_2522, EP_2522, EV_2522, DeepMerge_2522 };
