// pkg-28/types-36 - heavy interconnected types

import type { Entity_27_01, Registry_27_01 } from '../pkg-27/types-01';
import type { Entity_27_10, Registry_27_10 } from '../pkg-27/types-10';
import type { Entity_27_20, Registry_27_20 } from '../pkg-27/types-20';
import type { Entity_26_01, Registry_26_01 } from '../pkg-26/types-01';
import type { Entity_26_10, Registry_26_10 } from '../pkg-26/types-10';
import type { Entity_26_20, Registry_26_20 } from '../pkg-26/types-20';
import type { Entity_25_01, Registry_25_01 } from '../pkg-25/types-01';
import type { Entity_25_10, Registry_25_10 } from '../pkg-25/types-10';
import type { Entity_25_20, Registry_25_20 } from '../pkg-25/types-20';

type DeepMerge_2836<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object ? U[K] extends object ? DeepMerge_2836<T[K], U[K]> : U[K] : U[K]
    : K extends keyof T ? T[K] : K extends keyof U ? U[K] : never;
};

interface Entity_28_36 {
  id: string;
  meta: { created: Date; updated: Date; version: number; tags: string[]; attrs: Record<string, { v: unknown; t: string; ok: boolean }> };
  rels: { parent: Entity_28_36 | null; children: Entity_28_36[]; };
  cfg: { enabled: boolean; priority: number; rules: Array<{ cond: string; action: string; params: Record<string, unknown>; sub: { items: Array<{ id: string; w: number }> } }> };
  d36: { x2836: number; y2836: string; z2836: boolean };
}

type Path_2836<T, D extends unknown[] = []> = D['length'] extends 6 ? never
  : T extends object ? { [K in keyof T & string]: K | `${K}.${Path_2836<T[K], [...D, unknown]>}` }[keyof T & string] : never;
type EP_2836 = Path_2836<Entity_28_36>;

type Val_2836<T> = {
  [K in keyof T]: T[K] extends string ? { t: 's'; min: number; max: number }
    : T[K] extends number ? { t: 'n'; min: number; max: number }
    : T[K] extends boolean ? { t: 'b'; def: boolean }
    : T[K] extends unknown[] ? { t: 'a'; items: Val_2836<T[K][number]> }
    : T[K] extends object ? { t: 'o'; props: Val_2836<T[K]> }
    : { t: 'u' };
};
type EV_2836 = Val_2836<Entity_28_36>;

interface Registry_28_36 {
  entities: Map<string, Entity_28_36>;
  validators: EV_2836;
  paths: Set<EP_2836>;
  merged: DeepMerge_2836<Entity_28_36, { extra2836: string }>;
}

type CK_2836 = `p28.t36.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type { Entity_28_36, Registry_28_36, CK_2836, EP_2836, EV_2836, DeepMerge_2836 };
