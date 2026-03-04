// pkg-35/types-22 - heavy interconnected types

import type { Entity_34_01, Registry_34_01 } from '../pkg-34/types-01';
import type { Entity_34_10, Registry_34_10 } from '../pkg-34/types-10';
import type { Entity_34_20, Registry_34_20 } from '../pkg-34/types-20';
import type { Entity_33_01, Registry_33_01 } from '../pkg-33/types-01';
import type { Entity_33_10, Registry_33_10 } from '../pkg-33/types-10';
import type { Entity_33_20, Registry_33_20 } from '../pkg-33/types-20';
import type { Entity_32_01, Registry_32_01 } from '../pkg-32/types-01';
import type { Entity_32_10, Registry_32_10 } from '../pkg-32/types-10';
import type { Entity_32_20, Registry_32_20 } from '../pkg-32/types-20';

type DeepMerge_3522<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object ? U[K] extends object ? DeepMerge_3522<T[K], U[K]> : U[K] : U[K]
    : K extends keyof T ? T[K] : K extends keyof U ? U[K] : never;
};

interface Entity_35_22 {
  id: string;
  meta: { created: Date; updated: Date; version: number; tags: string[]; attrs: Record<string, { v: unknown; t: string; ok: boolean }> };
  rels: { parent: Entity_35_22 | null; children: Entity_35_22[]; };
  cfg: { enabled: boolean; priority: number; rules: Array<{ cond: string; action: string; params: Record<string, unknown>; sub: { items: Array<{ id: string; w: number }> } }> };
  d22: { x3522: number; y3522: string; z3522: boolean };
}

type Path_3522<T, D extends unknown[] = []> = D['length'] extends 6 ? never
  : T extends object ? { [K in keyof T & string]: K | `${K}.${Path_3522<T[K], [...D, unknown]>}` }[keyof T & string] : never;
type EP_3522 = Path_3522<Entity_35_22>;

type Val_3522<T> = {
  [K in keyof T]: T[K] extends string ? { t: 's'; min: number; max: number }
    : T[K] extends number ? { t: 'n'; min: number; max: number }
    : T[K] extends boolean ? { t: 'b'; def: boolean }
    : T[K] extends unknown[] ? { t: 'a'; items: Val_3522<T[K][number]> }
    : T[K] extends object ? { t: 'o'; props: Val_3522<T[K]> }
    : { t: 'u' };
};
type EV_3522 = Val_3522<Entity_35_22>;

interface Registry_35_22 {
  entities: Map<string, Entity_35_22>;
  validators: EV_3522;
  paths: Set<EP_3522>;
  merged: DeepMerge_3522<Entity_35_22, { extra3522: string }>;
}

type CK_3522 = `p35.t22.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type { Entity_35_22, Registry_35_22, CK_3522, EP_3522, EV_3522, DeepMerge_3522 };
