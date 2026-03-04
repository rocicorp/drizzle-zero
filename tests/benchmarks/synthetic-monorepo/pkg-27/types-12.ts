// pkg-27/types-12 - heavy interconnected types

import type { Entity_26_01, Registry_26_01 } from '../pkg-26/types-01';
import type { Entity_26_10, Registry_26_10 } from '../pkg-26/types-10';
import type { Entity_26_20, Registry_26_20 } from '../pkg-26/types-20';
import type { Entity_25_01, Registry_25_01 } from '../pkg-25/types-01';
import type { Entity_25_10, Registry_25_10 } from '../pkg-25/types-10';
import type { Entity_25_20, Registry_25_20 } from '../pkg-25/types-20';
import type { Entity_24_01, Registry_24_01 } from '../pkg-24/types-01';
import type { Entity_24_10, Registry_24_10 } from '../pkg-24/types-10';
import type { Entity_24_20, Registry_24_20 } from '../pkg-24/types-20';

type DeepMerge_2712<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object ? U[K] extends object ? DeepMerge_2712<T[K], U[K]> : U[K] : U[K]
    : K extends keyof T ? T[K] : K extends keyof U ? U[K] : never;
};

interface Entity_27_12 {
  id: string;
  meta: { created: Date; updated: Date; version: number; tags: string[]; attrs: Record<string, { v: unknown; t: string; ok: boolean }> };
  rels: { parent: Entity_27_12 | null; children: Entity_27_12[]; };
  cfg: { enabled: boolean; priority: number; rules: Array<{ cond: string; action: string; params: Record<string, unknown>; sub: { items: Array<{ id: string; w: number }> } }> };
  d12: { x2712: number; y2712: string; z2712: boolean };
}

type Path_2712<T, D extends unknown[] = []> = D['length'] extends 6 ? never
  : T extends object ? { [K in keyof T & string]: K | `${K}.${Path_2712<T[K], [...D, unknown]>}` }[keyof T & string] : never;
type EP_2712 = Path_2712<Entity_27_12>;

type Val_2712<T> = {
  [K in keyof T]: T[K] extends string ? { t: 's'; min: number; max: number }
    : T[K] extends number ? { t: 'n'; min: number; max: number }
    : T[K] extends boolean ? { t: 'b'; def: boolean }
    : T[K] extends unknown[] ? { t: 'a'; items: Val_2712<T[K][number]> }
    : T[K] extends object ? { t: 'o'; props: Val_2712<T[K]> }
    : { t: 'u' };
};
type EV_2712 = Val_2712<Entity_27_12>;

interface Registry_27_12 {
  entities: Map<string, Entity_27_12>;
  validators: EV_2712;
  paths: Set<EP_2712>;
  merged: DeepMerge_2712<Entity_27_12, { extra2712: string }>;
}

type CK_2712 = `p27.t12.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type { Entity_27_12, Registry_27_12, CK_2712, EP_2712, EV_2712, DeepMerge_2712 };
