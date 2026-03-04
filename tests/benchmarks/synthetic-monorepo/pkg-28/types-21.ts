// pkg-28/types-21 - heavy interconnected types

import type { Entity_27_01, Registry_27_01 } from '../pkg-27/types-01';
import type { Entity_27_10, Registry_27_10 } from '../pkg-27/types-10';
import type { Entity_27_20, Registry_27_20 } from '../pkg-27/types-20';
import type { Entity_26_01, Registry_26_01 } from '../pkg-26/types-01';
import type { Entity_26_10, Registry_26_10 } from '../pkg-26/types-10';
import type { Entity_26_20, Registry_26_20 } from '../pkg-26/types-20';
import type { Entity_25_01, Registry_25_01 } from '../pkg-25/types-01';
import type { Entity_25_10, Registry_25_10 } from '../pkg-25/types-10';
import type { Entity_25_20, Registry_25_20 } from '../pkg-25/types-20';

type DeepMerge_2821<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object ? U[K] extends object ? DeepMerge_2821<T[K], U[K]> : U[K] : U[K]
    : K extends keyof T ? T[K] : K extends keyof U ? U[K] : never;
};

interface Entity_28_21 {
  id: string;
  meta: { created: Date; updated: Date; version: number; tags: string[]; attrs: Record<string, { v: unknown; t: string; ok: boolean }> };
  rels: { parent: Entity_28_21 | null; children: Entity_28_21[]; };
  cfg: { enabled: boolean; priority: number; rules: Array<{ cond: string; action: string; params: Record<string, unknown>; sub: { items: Array<{ id: string; w: number }> } }> };
  d21: { x2821: number; y2821: string; z2821: boolean };
}

type Path_2821<T, D extends unknown[] = []> = D['length'] extends 6 ? never
  : T extends object ? { [K in keyof T & string]: K | `${K}.${Path_2821<T[K], [...D, unknown]>}` }[keyof T & string] : never;
type EP_2821 = Path_2821<Entity_28_21>;

type Val_2821<T> = {
  [K in keyof T]: T[K] extends string ? { t: 's'; min: number; max: number }
    : T[K] extends number ? { t: 'n'; min: number; max: number }
    : T[K] extends boolean ? { t: 'b'; def: boolean }
    : T[K] extends unknown[] ? { t: 'a'; items: Val_2821<T[K][number]> }
    : T[K] extends object ? { t: 'o'; props: Val_2821<T[K]> }
    : { t: 'u' };
};
type EV_2821 = Val_2821<Entity_28_21>;

interface Registry_28_21 {
  entities: Map<string, Entity_28_21>;
  validators: EV_2821;
  paths: Set<EP_2821>;
  merged: DeepMerge_2821<Entity_28_21, { extra2821: string }>;
}

type CK_2821 = `p28.t21.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type { Entity_28_21, Registry_28_21, CK_2821, EP_2821, EV_2821, DeepMerge_2821 };
