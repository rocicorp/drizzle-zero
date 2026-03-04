// pkg-37/types-09 - heavy interconnected types

import type { Entity_36_01, Registry_36_01 } from '../pkg-36/types-01';
import type { Entity_36_10, Registry_36_10 } from '../pkg-36/types-10';
import type { Entity_36_20, Registry_36_20 } from '../pkg-36/types-20';
import type { Entity_35_01, Registry_35_01 } from '../pkg-35/types-01';
import type { Entity_35_10, Registry_35_10 } from '../pkg-35/types-10';
import type { Entity_35_20, Registry_35_20 } from '../pkg-35/types-20';
import type { Entity_34_01, Registry_34_01 } from '../pkg-34/types-01';
import type { Entity_34_10, Registry_34_10 } from '../pkg-34/types-10';
import type { Entity_34_20, Registry_34_20 } from '../pkg-34/types-20';

type DeepMerge_3709<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object ? U[K] extends object ? DeepMerge_3709<T[K], U[K]> : U[K] : U[K]
    : K extends keyof T ? T[K] : K extends keyof U ? U[K] : never;
};

interface Entity_37_09 {
  id: string;
  meta: { created: Date; updated: Date; version: number; tags: string[]; attrs: Record<string, { v: unknown; t: string; ok: boolean }> };
  rels: { parent: Entity_37_09 | null; children: Entity_37_09[]; };
  cfg: { enabled: boolean; priority: number; rules: Array<{ cond: string; action: string; params: Record<string, unknown>; sub: { items: Array<{ id: string; w: number }> } }> };
  d09: { x3709: number; y3709: string; z3709: boolean };
}

type Path_3709<T, D extends unknown[] = []> = D['length'] extends 6 ? never
  : T extends object ? { [K in keyof T & string]: K | `${K}.${Path_3709<T[K], [...D, unknown]>}` }[keyof T & string] : never;
type EP_3709 = Path_3709<Entity_37_09>;

type Val_3709<T> = {
  [K in keyof T]: T[K] extends string ? { t: 's'; min: number; max: number }
    : T[K] extends number ? { t: 'n'; min: number; max: number }
    : T[K] extends boolean ? { t: 'b'; def: boolean }
    : T[K] extends unknown[] ? { t: 'a'; items: Val_3709<T[K][number]> }
    : T[K] extends object ? { t: 'o'; props: Val_3709<T[K]> }
    : { t: 'u' };
};
type EV_3709 = Val_3709<Entity_37_09>;

interface Registry_37_09 {
  entities: Map<string, Entity_37_09>;
  validators: EV_3709;
  paths: Set<EP_3709>;
  merged: DeepMerge_3709<Entity_37_09, { extra3709: string }>;
}

type CK_3709 = `p37.t09.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type { Entity_37_09, Registry_37_09, CK_3709, EP_3709, EV_3709, DeepMerge_3709 };
