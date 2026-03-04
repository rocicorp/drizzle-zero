// pkg-14/types-08 - heavy interconnected types

import type { Entity_13_01, Registry_13_01 } from '../pkg-13/types-01';
import type { Entity_13_10, Registry_13_10 } from '../pkg-13/types-10';
import type { Entity_13_20, Registry_13_20 } from '../pkg-13/types-20';
import type { Entity_12_01, Registry_12_01 } from '../pkg-12/types-01';
import type { Entity_12_10, Registry_12_10 } from '../pkg-12/types-10';
import type { Entity_12_20, Registry_12_20 } from '../pkg-12/types-20';
import type { Entity_11_01, Registry_11_01 } from '../pkg-11/types-01';
import type { Entity_11_10, Registry_11_10 } from '../pkg-11/types-10';
import type { Entity_11_20, Registry_11_20 } from '../pkg-11/types-20';

type DeepMerge_1408<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object ? U[K] extends object ? DeepMerge_1408<T[K], U[K]> : U[K] : U[K]
    : K extends keyof T ? T[K] : K extends keyof U ? U[K] : never;
};

interface Entity_14_08 {
  id: string;
  meta: { created: Date; updated: Date; version: number; tags: string[]; attrs: Record<string, { v: unknown; t: string; ok: boolean }> };
  rels: { parent: Entity_14_08 | null; children: Entity_14_08[]; };
  cfg: { enabled: boolean; priority: number; rules: Array<{ cond: string; action: string; params: Record<string, unknown>; sub: { items: Array<{ id: string; w: number }> } }> };
  d08: { x1408: number; y1408: string; z1408: boolean };
}

type Path_1408<T, D extends unknown[] = []> = D['length'] extends 6 ? never
  : T extends object ? { [K in keyof T & string]: K | `${K}.${Path_1408<T[K], [...D, unknown]>}` }[keyof T & string] : never;
type EP_1408 = Path_1408<Entity_14_08>;

type Val_1408<T> = {
  [K in keyof T]: T[K] extends string ? { t: 's'; min: number; max: number }
    : T[K] extends number ? { t: 'n'; min: number; max: number }
    : T[K] extends boolean ? { t: 'b'; def: boolean }
    : T[K] extends unknown[] ? { t: 'a'; items: Val_1408<T[K][number]> }
    : T[K] extends object ? { t: 'o'; props: Val_1408<T[K]> }
    : { t: 'u' };
};
type EV_1408 = Val_1408<Entity_14_08>;

interface Registry_14_08 {
  entities: Map<string, Entity_14_08>;
  validators: EV_1408;
  paths: Set<EP_1408>;
  merged: DeepMerge_1408<Entity_14_08, { extra1408: string }>;
}

type CK_1408 = `p14.t08.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type { Entity_14_08, Registry_14_08, CK_1408, EP_1408, EV_1408, DeepMerge_1408 };
