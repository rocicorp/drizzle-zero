// pkg-34/types-26 - heavy interconnected types

import type { Entity_33_01, Registry_33_01 } from '../pkg-33/types-01';
import type { Entity_33_10, Registry_33_10 } from '../pkg-33/types-10';
import type { Entity_33_20, Registry_33_20 } from '../pkg-33/types-20';
import type { Entity_32_01, Registry_32_01 } from '../pkg-32/types-01';
import type { Entity_32_10, Registry_32_10 } from '../pkg-32/types-10';
import type { Entity_32_20, Registry_32_20 } from '../pkg-32/types-20';
import type { Entity_31_01, Registry_31_01 } from '../pkg-31/types-01';
import type { Entity_31_10, Registry_31_10 } from '../pkg-31/types-10';
import type { Entity_31_20, Registry_31_20 } from '../pkg-31/types-20';

type DeepMerge_3426<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object ? U[K] extends object ? DeepMerge_3426<T[K], U[K]> : U[K] : U[K]
    : K extends keyof T ? T[K] : K extends keyof U ? U[K] : never;
};

interface Entity_34_26 {
  id: string;
  meta: { created: Date; updated: Date; version: number; tags: string[]; attrs: Record<string, { v: unknown; t: string; ok: boolean }> };
  rels: { parent: Entity_34_26 | null; children: Entity_34_26[]; };
  cfg: { enabled: boolean; priority: number; rules: Array<{ cond: string; action: string; params: Record<string, unknown>; sub: { items: Array<{ id: string; w: number }> } }> };
  d26: { x3426: number; y3426: string; z3426: boolean };
}

type Path_3426<T, D extends unknown[] = []> = D['length'] extends 6 ? never
  : T extends object ? { [K in keyof T & string]: K | `${K}.${Path_3426<T[K], [...D, unknown]>}` }[keyof T & string] : never;
type EP_3426 = Path_3426<Entity_34_26>;

type Val_3426<T> = {
  [K in keyof T]: T[K] extends string ? { t: 's'; min: number; max: number }
    : T[K] extends number ? { t: 'n'; min: number; max: number }
    : T[K] extends boolean ? { t: 'b'; def: boolean }
    : T[K] extends unknown[] ? { t: 'a'; items: Val_3426<T[K][number]> }
    : T[K] extends object ? { t: 'o'; props: Val_3426<T[K]> }
    : { t: 'u' };
};
type EV_3426 = Val_3426<Entity_34_26>;

interface Registry_34_26 {
  entities: Map<string, Entity_34_26>;
  validators: EV_3426;
  paths: Set<EP_3426>;
  merged: DeepMerge_3426<Entity_34_26, { extra3426: string }>;
}

type CK_3426 = `p34.t26.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type { Entity_34_26, Registry_34_26, CK_3426, EP_3426, EV_3426, DeepMerge_3426 };
