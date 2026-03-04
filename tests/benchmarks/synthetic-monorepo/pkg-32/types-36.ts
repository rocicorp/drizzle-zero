// pkg-32/types-36 - heavy interconnected types

import type { Entity_31_01, Registry_31_01 } from '../pkg-31/types-01';
import type { Entity_31_10, Registry_31_10 } from '../pkg-31/types-10';
import type { Entity_31_20, Registry_31_20 } from '../pkg-31/types-20';
import type { Entity_30_01, Registry_30_01 } from '../pkg-30/types-01';
import type { Entity_30_10, Registry_30_10 } from '../pkg-30/types-10';
import type { Entity_30_20, Registry_30_20 } from '../pkg-30/types-20';
import type { Entity_29_01, Registry_29_01 } from '../pkg-29/types-01';
import type { Entity_29_10, Registry_29_10 } from '../pkg-29/types-10';
import type { Entity_29_20, Registry_29_20 } from '../pkg-29/types-20';

type DeepMerge_3236<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object ? U[K] extends object ? DeepMerge_3236<T[K], U[K]> : U[K] : U[K]
    : K extends keyof T ? T[K] : K extends keyof U ? U[K] : never;
};

interface Entity_32_36 {
  id: string;
  meta: { created: Date; updated: Date; version: number; tags: string[]; attrs: Record<string, { v: unknown; t: string; ok: boolean }> };
  rels: { parent: Entity_32_36 | null; children: Entity_32_36[]; };
  cfg: { enabled: boolean; priority: number; rules: Array<{ cond: string; action: string; params: Record<string, unknown>; sub: { items: Array<{ id: string; w: number }> } }> };
  d36: { x3236: number; y3236: string; z3236: boolean };
}

type Path_3236<T, D extends unknown[] = []> = D['length'] extends 6 ? never
  : T extends object ? { [K in keyof T & string]: K | `${K}.${Path_3236<T[K], [...D, unknown]>}` }[keyof T & string] : never;
type EP_3236 = Path_3236<Entity_32_36>;

type Val_3236<T> = {
  [K in keyof T]: T[K] extends string ? { t: 's'; min: number; max: number }
    : T[K] extends number ? { t: 'n'; min: number; max: number }
    : T[K] extends boolean ? { t: 'b'; def: boolean }
    : T[K] extends unknown[] ? { t: 'a'; items: Val_3236<T[K][number]> }
    : T[K] extends object ? { t: 'o'; props: Val_3236<T[K]> }
    : { t: 'u' };
};
type EV_3236 = Val_3236<Entity_32_36>;

interface Registry_32_36 {
  entities: Map<string, Entity_32_36>;
  validators: EV_3236;
  paths: Set<EP_3236>;
  merged: DeepMerge_3236<Entity_32_36, { extra3236: string }>;
}

type CK_3236 = `p32.t36.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type { Entity_32_36, Registry_32_36, CK_3236, EP_3236, EV_3236, DeepMerge_3236 };
