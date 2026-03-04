// pkg-36/types-48 - heavy interconnected types

import type { Entity_35_01, Registry_35_01 } from '../pkg-35/types-01';
import type { Entity_35_10, Registry_35_10 } from '../pkg-35/types-10';
import type { Entity_35_20, Registry_35_20 } from '../pkg-35/types-20';
import type { Entity_34_01, Registry_34_01 } from '../pkg-34/types-01';
import type { Entity_34_10, Registry_34_10 } from '../pkg-34/types-10';
import type { Entity_34_20, Registry_34_20 } from '../pkg-34/types-20';
import type { Entity_33_01, Registry_33_01 } from '../pkg-33/types-01';
import type { Entity_33_10, Registry_33_10 } from '../pkg-33/types-10';
import type { Entity_33_20, Registry_33_20 } from '../pkg-33/types-20';

type DeepMerge_3648<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object ? U[K] extends object ? DeepMerge_3648<T[K], U[K]> : U[K] : U[K]
    : K extends keyof T ? T[K] : K extends keyof U ? U[K] : never;
};

interface Entity_36_48 {
  id: string;
  meta: { created: Date; updated: Date; version: number; tags: string[]; attrs: Record<string, { v: unknown; t: string; ok: boolean }> };
  rels: { parent: Entity_36_48 | null; children: Entity_36_48[]; };
  cfg: { enabled: boolean; priority: number; rules: Array<{ cond: string; action: string; params: Record<string, unknown>; sub: { items: Array<{ id: string; w: number }> } }> };
  d48: { x3648: number; y3648: string; z3648: boolean };
}

type Path_3648<T, D extends unknown[] = []> = D['length'] extends 6 ? never
  : T extends object ? { [K in keyof T & string]: K | `${K}.${Path_3648<T[K], [...D, unknown]>}` }[keyof T & string] : never;
type EP_3648 = Path_3648<Entity_36_48>;

type Val_3648<T> = {
  [K in keyof T]: T[K] extends string ? { t: 's'; min: number; max: number }
    : T[K] extends number ? { t: 'n'; min: number; max: number }
    : T[K] extends boolean ? { t: 'b'; def: boolean }
    : T[K] extends unknown[] ? { t: 'a'; items: Val_3648<T[K][number]> }
    : T[K] extends object ? { t: 'o'; props: Val_3648<T[K]> }
    : { t: 'u' };
};
type EV_3648 = Val_3648<Entity_36_48>;

interface Registry_36_48 {
  entities: Map<string, Entity_36_48>;
  validators: EV_3648;
  paths: Set<EP_3648>;
  merged: DeepMerge_3648<Entity_36_48, { extra3648: string }>;
}

type CK_3648 = `p36.t48.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type { Entity_36_48, Registry_36_48, CK_3648, EP_3648, EV_3648, DeepMerge_3648 };
