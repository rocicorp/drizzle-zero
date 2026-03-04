// pkg-20/types-46 - heavy interconnected types

import type { Entity_19_01, Registry_19_01 } from '../pkg-19/types-01';
import type { Entity_19_10, Registry_19_10 } from '../pkg-19/types-10';
import type { Entity_19_20, Registry_19_20 } from '../pkg-19/types-20';
import type { Entity_18_01, Registry_18_01 } from '../pkg-18/types-01';
import type { Entity_18_10, Registry_18_10 } from '../pkg-18/types-10';
import type { Entity_18_20, Registry_18_20 } from '../pkg-18/types-20';
import type { Entity_17_01, Registry_17_01 } from '../pkg-17/types-01';
import type { Entity_17_10, Registry_17_10 } from '../pkg-17/types-10';
import type { Entity_17_20, Registry_17_20 } from '../pkg-17/types-20';

type DeepMerge_2046<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object ? U[K] extends object ? DeepMerge_2046<T[K], U[K]> : U[K] : U[K]
    : K extends keyof T ? T[K] : K extends keyof U ? U[K] : never;
};

interface Entity_20_46 {
  id: string;
  meta: { created: Date; updated: Date; version: number; tags: string[]; attrs: Record<string, { v: unknown; t: string; ok: boolean }> };
  rels: { parent: Entity_20_46 | null; children: Entity_20_46[]; };
  cfg: { enabled: boolean; priority: number; rules: Array<{ cond: string; action: string; params: Record<string, unknown>; sub: { items: Array<{ id: string; w: number }> } }> };
  d46: { x2046: number; y2046: string; z2046: boolean };
}

type Path_2046<T, D extends unknown[] = []> = D['length'] extends 6 ? never
  : T extends object ? { [K in keyof T & string]: K | `${K}.${Path_2046<T[K], [...D, unknown]>}` }[keyof T & string] : never;
type EP_2046 = Path_2046<Entity_20_46>;

type Val_2046<T> = {
  [K in keyof T]: T[K] extends string ? { t: 's'; min: number; max: number }
    : T[K] extends number ? { t: 'n'; min: number; max: number }
    : T[K] extends boolean ? { t: 'b'; def: boolean }
    : T[K] extends unknown[] ? { t: 'a'; items: Val_2046<T[K][number]> }
    : T[K] extends object ? { t: 'o'; props: Val_2046<T[K]> }
    : { t: 'u' };
};
type EV_2046 = Val_2046<Entity_20_46>;

interface Registry_20_46 {
  entities: Map<string, Entity_20_46>;
  validators: EV_2046;
  paths: Set<EP_2046>;
  merged: DeepMerge_2046<Entity_20_46, { extra2046: string }>;
}

type CK_2046 = `p20.t46.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type { Entity_20_46, Registry_20_46, CK_2046, EP_2046, EV_2046, DeepMerge_2046 };
