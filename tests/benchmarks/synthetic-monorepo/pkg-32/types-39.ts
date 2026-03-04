// pkg-32/types-39 - heavy interconnected types

import type { Entity_31_01, Registry_31_01 } from '../pkg-31/types-01';
import type { Entity_31_10, Registry_31_10 } from '../pkg-31/types-10';
import type { Entity_31_20, Registry_31_20 } from '../pkg-31/types-20';
import type { Entity_30_01, Registry_30_01 } from '../pkg-30/types-01';
import type { Entity_30_10, Registry_30_10 } from '../pkg-30/types-10';
import type { Entity_30_20, Registry_30_20 } from '../pkg-30/types-20';
import type { Entity_29_01, Registry_29_01 } from '../pkg-29/types-01';
import type { Entity_29_10, Registry_29_10 } from '../pkg-29/types-10';
import type { Entity_29_20, Registry_29_20 } from '../pkg-29/types-20';

type DeepMerge_3239<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object ? U[K] extends object ? DeepMerge_3239<T[K], U[K]> : U[K] : U[K]
    : K extends keyof T ? T[K] : K extends keyof U ? U[K] : never;
};

interface Entity_32_39 {
  id: string;
  meta: { created: Date; updated: Date; version: number; tags: string[]; attrs: Record<string, { v: unknown; t: string; ok: boolean }> };
  rels: { parent: Entity_32_39 | null; children: Entity_32_39[]; };
  cfg: { enabled: boolean; priority: number; rules: Array<{ cond: string; action: string; params: Record<string, unknown>; sub: { items: Array<{ id: string; w: number }> } }> };
  d39: { x3239: number; y3239: string; z3239: boolean };
}

type Path_3239<T, D extends unknown[] = []> = D['length'] extends 6 ? never
  : T extends object ? { [K in keyof T & string]: K | `${K}.${Path_3239<T[K], [...D, unknown]>}` }[keyof T & string] : never;
type EP_3239 = Path_3239<Entity_32_39>;

type Val_3239<T> = {
  [K in keyof T]: T[K] extends string ? { t: 's'; min: number; max: number }
    : T[K] extends number ? { t: 'n'; min: number; max: number }
    : T[K] extends boolean ? { t: 'b'; def: boolean }
    : T[K] extends unknown[] ? { t: 'a'; items: Val_3239<T[K][number]> }
    : T[K] extends object ? { t: 'o'; props: Val_3239<T[K]> }
    : { t: 'u' };
};
type EV_3239 = Val_3239<Entity_32_39>;

interface Registry_32_39 {
  entities: Map<string, Entity_32_39>;
  validators: EV_3239;
  paths: Set<EP_3239>;
  merged: DeepMerge_3239<Entity_32_39, { extra3239: string }>;
}

type CK_3239 = `p32.t39.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type { Entity_32_39, Registry_32_39, CK_3239, EP_3239, EV_3239, DeepMerge_3239 };
