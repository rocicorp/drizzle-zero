// pkg-11/types-02 - heavy interconnected types

import type { Entity_10_01, Registry_10_01 } from '../pkg-10/types-01';
import type { Entity_10_10, Registry_10_10 } from '../pkg-10/types-10';
import type { Entity_10_20, Registry_10_20 } from '../pkg-10/types-20';
import type { Entity_9_01, Registry_9_01 } from '../pkg-09/types-01';
import type { Entity_9_10, Registry_9_10 } from '../pkg-09/types-10';
import type { Entity_9_20, Registry_9_20 } from '../pkg-09/types-20';
import type { Entity_8_01, Registry_8_01 } from '../pkg-08/types-01';
import type { Entity_8_10, Registry_8_10 } from '../pkg-08/types-10';
import type { Entity_8_20, Registry_8_20 } from '../pkg-08/types-20';

type DeepMerge_1102<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object ? U[K] extends object ? DeepMerge_1102<T[K], U[K]> : U[K] : U[K]
    : K extends keyof T ? T[K] : K extends keyof U ? U[K] : never;
};

interface Entity_11_02 {
  id: string;
  meta: { created: Date; updated: Date; version: number; tags: string[]; attrs: Record<string, { v: unknown; t: string; ok: boolean }> };
  rels: { parent: Entity_11_02 | null; children: Entity_11_02[]; };
  cfg: { enabled: boolean; priority: number; rules: Array<{ cond: string; action: string; params: Record<string, unknown>; sub: { items: Array<{ id: string; w: number }> } }> };
  d02: { x1102: number; y1102: string; z1102: boolean };
}

type Path_1102<T, D extends unknown[] = []> = D['length'] extends 6 ? never
  : T extends object ? { [K in keyof T & string]: K | `${K}.${Path_1102<T[K], [...D, unknown]>}` }[keyof T & string] : never;
type EP_1102 = Path_1102<Entity_11_02>;

type Val_1102<T> = {
  [K in keyof T]: T[K] extends string ? { t: 's'; min: number; max: number }
    : T[K] extends number ? { t: 'n'; min: number; max: number }
    : T[K] extends boolean ? { t: 'b'; def: boolean }
    : T[K] extends unknown[] ? { t: 'a'; items: Val_1102<T[K][number]> }
    : T[K] extends object ? { t: 'o'; props: Val_1102<T[K]> }
    : { t: 'u' };
};
type EV_1102 = Val_1102<Entity_11_02>;

interface Registry_11_02 {
  entities: Map<string, Entity_11_02>;
  validators: EV_1102;
  paths: Set<EP_1102>;
  merged: DeepMerge_1102<Entity_11_02, { extra1102: string }>;
}

type CK_1102 = `p11.t02.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type { Entity_11_02, Registry_11_02, CK_1102, EP_1102, EV_1102, DeepMerge_1102 };
