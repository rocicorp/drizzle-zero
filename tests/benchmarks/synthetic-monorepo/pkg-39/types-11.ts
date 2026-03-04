// pkg-39/types-11 - heavy interconnected types

import type { Entity_38_01, Registry_38_01 } from '../pkg-38/types-01';
import type { Entity_38_10, Registry_38_10 } from '../pkg-38/types-10';
import type { Entity_38_20, Registry_38_20 } from '../pkg-38/types-20';
import type { Entity_37_01, Registry_37_01 } from '../pkg-37/types-01';
import type { Entity_37_10, Registry_37_10 } from '../pkg-37/types-10';
import type { Entity_37_20, Registry_37_20 } from '../pkg-37/types-20';
import type { Entity_36_01, Registry_36_01 } from '../pkg-36/types-01';
import type { Entity_36_10, Registry_36_10 } from '../pkg-36/types-10';
import type { Entity_36_20, Registry_36_20 } from '../pkg-36/types-20';

type DeepMerge_3911<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object ? U[K] extends object ? DeepMerge_3911<T[K], U[K]> : U[K] : U[K]
    : K extends keyof T ? T[K] : K extends keyof U ? U[K] : never;
};

interface Entity_39_11 {
  id: string;
  meta: { created: Date; updated: Date; version: number; tags: string[]; attrs: Record<string, { v: unknown; t: string; ok: boolean }> };
  rels: { parent: Entity_39_11 | null; children: Entity_39_11[]; };
  cfg: { enabled: boolean; priority: number; rules: Array<{ cond: string; action: string; params: Record<string, unknown>; sub: { items: Array<{ id: string; w: number }> } }> };
  d11: { x3911: number; y3911: string; z3911: boolean };
}

type Path_3911<T, D extends unknown[] = []> = D['length'] extends 6 ? never
  : T extends object ? { [K in keyof T & string]: K | `${K}.${Path_3911<T[K], [...D, unknown]>}` }[keyof T & string] : never;
type EP_3911 = Path_3911<Entity_39_11>;

type Val_3911<T> = {
  [K in keyof T]: T[K] extends string ? { t: 's'; min: number; max: number }
    : T[K] extends number ? { t: 'n'; min: number; max: number }
    : T[K] extends boolean ? { t: 'b'; def: boolean }
    : T[K] extends unknown[] ? { t: 'a'; items: Val_3911<T[K][number]> }
    : T[K] extends object ? { t: 'o'; props: Val_3911<T[K]> }
    : { t: 'u' };
};
type EV_3911 = Val_3911<Entity_39_11>;

interface Registry_39_11 {
  entities: Map<string, Entity_39_11>;
  validators: EV_3911;
  paths: Set<EP_3911>;
  merged: DeepMerge_3911<Entity_39_11, { extra3911: string }>;
}

type CK_3911 = `p39.t11.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type { Entity_39_11, Registry_39_11, CK_3911, EP_3911, EV_3911, DeepMerge_3911 };
