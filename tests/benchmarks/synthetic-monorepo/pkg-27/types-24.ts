// pkg-27/types-24 - heavy interconnected types

import type { Entity_26_01, Registry_26_01 } from '../pkg-26/types-01';
import type { Entity_26_10, Registry_26_10 } from '../pkg-26/types-10';
import type { Entity_26_20, Registry_26_20 } from '../pkg-26/types-20';
import type { Entity_25_01, Registry_25_01 } from '../pkg-25/types-01';
import type { Entity_25_10, Registry_25_10 } from '../pkg-25/types-10';
import type { Entity_25_20, Registry_25_20 } from '../pkg-25/types-20';
import type { Entity_24_01, Registry_24_01 } from '../pkg-24/types-01';
import type { Entity_24_10, Registry_24_10 } from '../pkg-24/types-10';
import type { Entity_24_20, Registry_24_20 } from '../pkg-24/types-20';

type DeepMerge_2724<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object ? U[K] extends object ? DeepMerge_2724<T[K], U[K]> : U[K] : U[K]
    : K extends keyof T ? T[K] : K extends keyof U ? U[K] : never;
};

interface Entity_27_24 {
  id: string;
  meta: { created: Date; updated: Date; version: number; tags: string[]; attrs: Record<string, { v: unknown; t: string; ok: boolean }> };
  rels: { parent: Entity_27_24 | null; children: Entity_27_24[]; };
  cfg: { enabled: boolean; priority: number; rules: Array<{ cond: string; action: string; params: Record<string, unknown>; sub: { items: Array<{ id: string; w: number }> } }> };
  d24: { x2724: number; y2724: string; z2724: boolean };
}

type Path_2724<T, D extends unknown[] = []> = D['length'] extends 6 ? never
  : T extends object ? { [K in keyof T & string]: K | `${K}.${Path_2724<T[K], [...D, unknown]>}` }[keyof T & string] : never;
type EP_2724 = Path_2724<Entity_27_24>;

type Val_2724<T> = {
  [K in keyof T]: T[K] extends string ? { t: 's'; min: number; max: number }
    : T[K] extends number ? { t: 'n'; min: number; max: number }
    : T[K] extends boolean ? { t: 'b'; def: boolean }
    : T[K] extends unknown[] ? { t: 'a'; items: Val_2724<T[K][number]> }
    : T[K] extends object ? { t: 'o'; props: Val_2724<T[K]> }
    : { t: 'u' };
};
type EV_2724 = Val_2724<Entity_27_24>;

interface Registry_27_24 {
  entities: Map<string, Entity_27_24>;
  validators: EV_2724;
  paths: Set<EP_2724>;
  merged: DeepMerge_2724<Entity_27_24, { extra2724: string }>;
}

type CK_2724 = `p27.t24.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type { Entity_27_24, Registry_27_24, CK_2724, EP_2724, EV_2724, DeepMerge_2724 };
