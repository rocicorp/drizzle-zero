// pkg-35/types-41 - heavy interconnected types

import type { Entity_34_01, Registry_34_01 } from '../pkg-34/types-01';
import type { Entity_34_10, Registry_34_10 } from '../pkg-34/types-10';
import type { Entity_34_20, Registry_34_20 } from '../pkg-34/types-20';
import type { Entity_33_01, Registry_33_01 } from '../pkg-33/types-01';
import type { Entity_33_10, Registry_33_10 } from '../pkg-33/types-10';
import type { Entity_33_20, Registry_33_20 } from '../pkg-33/types-20';
import type { Entity_32_01, Registry_32_01 } from '../pkg-32/types-01';
import type { Entity_32_10, Registry_32_10 } from '../pkg-32/types-10';
import type { Entity_32_20, Registry_32_20 } from '../pkg-32/types-20';

type DeepMerge_3541<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object ? U[K] extends object ? DeepMerge_3541<T[K], U[K]> : U[K] : U[K]
    : K extends keyof T ? T[K] : K extends keyof U ? U[K] : never;
};

interface Entity_35_41 {
  id: string;
  meta: { created: Date; updated: Date; version: number; tags: string[]; attrs: Record<string, { v: unknown; t: string; ok: boolean }> };
  rels: { parent: Entity_35_41 | null; children: Entity_35_41[]; };
  cfg: { enabled: boolean; priority: number; rules: Array<{ cond: string; action: string; params: Record<string, unknown>; sub: { items: Array<{ id: string; w: number }> } }> };
  d41: { x3541: number; y3541: string; z3541: boolean };
}

type Path_3541<T, D extends unknown[] = []> = D['length'] extends 6 ? never
  : T extends object ? { [K in keyof T & string]: K | `${K}.${Path_3541<T[K], [...D, unknown]>}` }[keyof T & string] : never;
type EP_3541 = Path_3541<Entity_35_41>;

type Val_3541<T> = {
  [K in keyof T]: T[K] extends string ? { t: 's'; min: number; max: number }
    : T[K] extends number ? { t: 'n'; min: number; max: number }
    : T[K] extends boolean ? { t: 'b'; def: boolean }
    : T[K] extends unknown[] ? { t: 'a'; items: Val_3541<T[K][number]> }
    : T[K] extends object ? { t: 'o'; props: Val_3541<T[K]> }
    : { t: 'u' };
};
type EV_3541 = Val_3541<Entity_35_41>;

interface Registry_35_41 {
  entities: Map<string, Entity_35_41>;
  validators: EV_3541;
  paths: Set<EP_3541>;
  merged: DeepMerge_3541<Entity_35_41, { extra3541: string }>;
}

type CK_3541 = `p35.t41.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type { Entity_35_41, Registry_35_41, CK_3541, EP_3541, EV_3541, DeepMerge_3541 };
