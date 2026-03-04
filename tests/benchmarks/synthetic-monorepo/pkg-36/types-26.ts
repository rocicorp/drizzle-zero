// pkg-36/types-26 - heavy interconnected types

import type { Entity_35_01, Registry_35_01 } from '../pkg-35/types-01';
import type { Entity_35_10, Registry_35_10 } from '../pkg-35/types-10';
import type { Entity_35_20, Registry_35_20 } from '../pkg-35/types-20';
import type { Entity_34_01, Registry_34_01 } from '../pkg-34/types-01';
import type { Entity_34_10, Registry_34_10 } from '../pkg-34/types-10';
import type { Entity_34_20, Registry_34_20 } from '../pkg-34/types-20';
import type { Entity_33_01, Registry_33_01 } from '../pkg-33/types-01';
import type { Entity_33_10, Registry_33_10 } from '../pkg-33/types-10';
import type { Entity_33_20, Registry_33_20 } from '../pkg-33/types-20';

type DeepMerge_3626<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object ? U[K] extends object ? DeepMerge_3626<T[K], U[K]> : U[K] : U[K]
    : K extends keyof T ? T[K] : K extends keyof U ? U[K] : never;
};

interface Entity_36_26 {
  id: string;
  meta: { created: Date; updated: Date; version: number; tags: string[]; attrs: Record<string, { v: unknown; t: string; ok: boolean }> };
  rels: { parent: Entity_36_26 | null; children: Entity_36_26[]; };
  cfg: { enabled: boolean; priority: number; rules: Array<{ cond: string; action: string; params: Record<string, unknown>; sub: { items: Array<{ id: string; w: number }> } }> };
  d26: { x3626: number; y3626: string; z3626: boolean };
}

type Path_3626<T, D extends unknown[] = []> = D['length'] extends 6 ? never
  : T extends object ? { [K in keyof T & string]: K | `${K}.${Path_3626<T[K], [...D, unknown]>}` }[keyof T & string] : never;
type EP_3626 = Path_3626<Entity_36_26>;

type Val_3626<T> = {
  [K in keyof T]: T[K] extends string ? { t: 's'; min: number; max: number }
    : T[K] extends number ? { t: 'n'; min: number; max: number }
    : T[K] extends boolean ? { t: 'b'; def: boolean }
    : T[K] extends unknown[] ? { t: 'a'; items: Val_3626<T[K][number]> }
    : T[K] extends object ? { t: 'o'; props: Val_3626<T[K]> }
    : { t: 'u' };
};
type EV_3626 = Val_3626<Entity_36_26>;

interface Registry_36_26 {
  entities: Map<string, Entity_36_26>;
  validators: EV_3626;
  paths: Set<EP_3626>;
  merged: DeepMerge_3626<Entity_36_26, { extra3626: string }>;
}

type CK_3626 = `p36.t26.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type { Entity_36_26, Registry_36_26, CK_3626, EP_3626, EV_3626, DeepMerge_3626 };
