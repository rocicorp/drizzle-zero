// pkg-30/types-34 - heavy interconnected types

import type { Entity_29_01, Registry_29_01 } from '../pkg-29/types-01';
import type { Entity_29_10, Registry_29_10 } from '../pkg-29/types-10';
import type { Entity_29_20, Registry_29_20 } from '../pkg-29/types-20';
import type { Entity_28_01, Registry_28_01 } from '../pkg-28/types-01';
import type { Entity_28_10, Registry_28_10 } from '../pkg-28/types-10';
import type { Entity_28_20, Registry_28_20 } from '../pkg-28/types-20';
import type { Entity_27_01, Registry_27_01 } from '../pkg-27/types-01';
import type { Entity_27_10, Registry_27_10 } from '../pkg-27/types-10';
import type { Entity_27_20, Registry_27_20 } from '../pkg-27/types-20';

type DeepMerge_3034<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object ? U[K] extends object ? DeepMerge_3034<T[K], U[K]> : U[K] : U[K]
    : K extends keyof T ? T[K] : K extends keyof U ? U[K] : never;
};

interface Entity_30_34 {
  id: string;
  meta: { created: Date; updated: Date; version: number; tags: string[]; attrs: Record<string, { v: unknown; t: string; ok: boolean }> };
  rels: { parent: Entity_30_34 | null; children: Entity_30_34[]; };
  cfg: { enabled: boolean; priority: number; rules: Array<{ cond: string; action: string; params: Record<string, unknown>; sub: { items: Array<{ id: string; w: number }> } }> };
  d34: { x3034: number; y3034: string; z3034: boolean };
}

type Path_3034<T, D extends unknown[] = []> = D['length'] extends 6 ? never
  : T extends object ? { [K in keyof T & string]: K | `${K}.${Path_3034<T[K], [...D, unknown]>}` }[keyof T & string] : never;
type EP_3034 = Path_3034<Entity_30_34>;

type Val_3034<T> = {
  [K in keyof T]: T[K] extends string ? { t: 's'; min: number; max: number }
    : T[K] extends number ? { t: 'n'; min: number; max: number }
    : T[K] extends boolean ? { t: 'b'; def: boolean }
    : T[K] extends unknown[] ? { t: 'a'; items: Val_3034<T[K][number]> }
    : T[K] extends object ? { t: 'o'; props: Val_3034<T[K]> }
    : { t: 'u' };
};
type EV_3034 = Val_3034<Entity_30_34>;

interface Registry_30_34 {
  entities: Map<string, Entity_30_34>;
  validators: EV_3034;
  paths: Set<EP_3034>;
  merged: DeepMerge_3034<Entity_30_34, { extra3034: string }>;
}

type CK_3034 = `p30.t34.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type { Entity_30_34, Registry_30_34, CK_3034, EP_3034, EV_3034, DeepMerge_3034 };
