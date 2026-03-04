// pkg-20/types-28 - heavy interconnected types

import type { Entity_19_01, Registry_19_01 } from '../pkg-19/types-01';
import type { Entity_19_10, Registry_19_10 } from '../pkg-19/types-10';
import type { Entity_19_20, Registry_19_20 } from '../pkg-19/types-20';
import type { Entity_18_01, Registry_18_01 } from '../pkg-18/types-01';
import type { Entity_18_10, Registry_18_10 } from '../pkg-18/types-10';
import type { Entity_18_20, Registry_18_20 } from '../pkg-18/types-20';
import type { Entity_17_01, Registry_17_01 } from '../pkg-17/types-01';
import type { Entity_17_10, Registry_17_10 } from '../pkg-17/types-10';
import type { Entity_17_20, Registry_17_20 } from '../pkg-17/types-20';

type DeepMerge_2028<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object ? U[K] extends object ? DeepMerge_2028<T[K], U[K]> : U[K] : U[K]
    : K extends keyof T ? T[K] : K extends keyof U ? U[K] : never;
};

interface Entity_20_28 {
  id: string;
  meta: { created: Date; updated: Date; version: number; tags: string[]; attrs: Record<string, { v: unknown; t: string; ok: boolean }> };
  rels: { parent: Entity_20_28 | null; children: Entity_20_28[]; };
  cfg: { enabled: boolean; priority: number; rules: Array<{ cond: string; action: string; params: Record<string, unknown>; sub: { items: Array<{ id: string; w: number }> } }> };
  d28: { x2028: number; y2028: string; z2028: boolean };
}

type Path_2028<T, D extends unknown[] = []> = D['length'] extends 6 ? never
  : T extends object ? { [K in keyof T & string]: K | `${K}.${Path_2028<T[K], [...D, unknown]>}` }[keyof T & string] : never;
type EP_2028 = Path_2028<Entity_20_28>;

type Val_2028<T> = {
  [K in keyof T]: T[K] extends string ? { t: 's'; min: number; max: number }
    : T[K] extends number ? { t: 'n'; min: number; max: number }
    : T[K] extends boolean ? { t: 'b'; def: boolean }
    : T[K] extends unknown[] ? { t: 'a'; items: Val_2028<T[K][number]> }
    : T[K] extends object ? { t: 'o'; props: Val_2028<T[K]> }
    : { t: 'u' };
};
type EV_2028 = Val_2028<Entity_20_28>;

interface Registry_20_28 {
  entities: Map<string, Entity_20_28>;
  validators: EV_2028;
  paths: Set<EP_2028>;
  merged: DeepMerge_2028<Entity_20_28, { extra2028: string }>;
}

type CK_2028 = `p20.t28.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type { Entity_20_28, Registry_20_28, CK_2028, EP_2028, EV_2028, DeepMerge_2028 };
