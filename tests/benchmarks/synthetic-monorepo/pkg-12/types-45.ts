// pkg-12/types-45 - heavy interconnected types

import type { Entity_11_01, Registry_11_01 } from '../pkg-11/types-01';
import type { Entity_11_10, Registry_11_10 } from '../pkg-11/types-10';
import type { Entity_11_20, Registry_11_20 } from '../pkg-11/types-20';
import type { Entity_10_01, Registry_10_01 } from '../pkg-10/types-01';
import type { Entity_10_10, Registry_10_10 } from '../pkg-10/types-10';
import type { Entity_10_20, Registry_10_20 } from '../pkg-10/types-20';
import type { Entity_9_01, Registry_9_01 } from '../pkg-09/types-01';
import type { Entity_9_10, Registry_9_10 } from '../pkg-09/types-10';
import type { Entity_9_20, Registry_9_20 } from '../pkg-09/types-20';

type DeepMerge_1245<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object ? U[K] extends object ? DeepMerge_1245<T[K], U[K]> : U[K] : U[K]
    : K extends keyof T ? T[K] : K extends keyof U ? U[K] : never;
};

interface Entity_12_45 {
  id: string;
  meta: { created: Date; updated: Date; version: number; tags: string[]; attrs: Record<string, { v: unknown; t: string; ok: boolean }> };
  rels: { parent: Entity_12_45 | null; children: Entity_12_45[]; };
  cfg: { enabled: boolean; priority: number; rules: Array<{ cond: string; action: string; params: Record<string, unknown>; sub: { items: Array<{ id: string; w: number }> } }> };
  d45: { x1245: number; y1245: string; z1245: boolean };
}

type Path_1245<T, D extends unknown[] = []> = D['length'] extends 6 ? never
  : T extends object ? { [K in keyof T & string]: K | `${K}.${Path_1245<T[K], [...D, unknown]>}` }[keyof T & string] : never;
type EP_1245 = Path_1245<Entity_12_45>;

type Val_1245<T> = {
  [K in keyof T]: T[K] extends string ? { t: 's'; min: number; max: number }
    : T[K] extends number ? { t: 'n'; min: number; max: number }
    : T[K] extends boolean ? { t: 'b'; def: boolean }
    : T[K] extends unknown[] ? { t: 'a'; items: Val_1245<T[K][number]> }
    : T[K] extends object ? { t: 'o'; props: Val_1245<T[K]> }
    : { t: 'u' };
};
type EV_1245 = Val_1245<Entity_12_45>;

interface Registry_12_45 {
  entities: Map<string, Entity_12_45>;
  validators: EV_1245;
  paths: Set<EP_1245>;
  merged: DeepMerge_1245<Entity_12_45, { extra1245: string }>;
}

type CK_1245 = `p12.t45.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type { Entity_12_45, Registry_12_45, CK_1245, EP_1245, EV_1245, DeepMerge_1245 };
