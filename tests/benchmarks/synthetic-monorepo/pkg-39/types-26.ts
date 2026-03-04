// pkg-39/types-26 - heavy interconnected types

import type { Entity_38_01, Registry_38_01 } from '../pkg-38/types-01';
import type { Entity_38_10, Registry_38_10 } from '../pkg-38/types-10';
import type { Entity_38_20, Registry_38_20 } from '../pkg-38/types-20';
import type { Entity_37_01, Registry_37_01 } from '../pkg-37/types-01';
import type { Entity_37_10, Registry_37_10 } from '../pkg-37/types-10';
import type { Entity_37_20, Registry_37_20 } from '../pkg-37/types-20';
import type { Entity_36_01, Registry_36_01 } from '../pkg-36/types-01';
import type { Entity_36_10, Registry_36_10 } from '../pkg-36/types-10';
import type { Entity_36_20, Registry_36_20 } from '../pkg-36/types-20';

type DeepMerge_3926<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object ? U[K] extends object ? DeepMerge_3926<T[K], U[K]> : U[K] : U[K]
    : K extends keyof T ? T[K] : K extends keyof U ? U[K] : never;
};

interface Entity_39_26 {
  id: string;
  meta: { created: Date; updated: Date; version: number; tags: string[]; attrs: Record<string, { v: unknown; t: string; ok: boolean }> };
  rels: { parent: Entity_39_26 | null; children: Entity_39_26[]; };
  cfg: { enabled: boolean; priority: number; rules: Array<{ cond: string; action: string; params: Record<string, unknown>; sub: { items: Array<{ id: string; w: number }> } }> };
  d26: { x3926: number; y3926: string; z3926: boolean };
}

type Path_3926<T, D extends unknown[] = []> = D['length'] extends 6 ? never
  : T extends object ? { [K in keyof T & string]: K | `${K}.${Path_3926<T[K], [...D, unknown]>}` }[keyof T & string] : never;
type EP_3926 = Path_3926<Entity_39_26>;

type Val_3926<T> = {
  [K in keyof T]: T[K] extends string ? { t: 's'; min: number; max: number }
    : T[K] extends number ? { t: 'n'; min: number; max: number }
    : T[K] extends boolean ? { t: 'b'; def: boolean }
    : T[K] extends unknown[] ? { t: 'a'; items: Val_3926<T[K][number]> }
    : T[K] extends object ? { t: 'o'; props: Val_3926<T[K]> }
    : { t: 'u' };
};
type EV_3926 = Val_3926<Entity_39_26>;

interface Registry_39_26 {
  entities: Map<string, Entity_39_26>;
  validators: EV_3926;
  paths: Set<EP_3926>;
  merged: DeepMerge_3926<Entity_39_26, { extra3926: string }>;
}

type CK_3926 = `p39.t26.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type { Entity_39_26, Registry_39_26, CK_3926, EP_3926, EV_3926, DeepMerge_3926 };
