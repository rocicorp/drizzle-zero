// pkg-24/types-24 - heavy interconnected types

import type { Entity_23_01, Registry_23_01 } from '../pkg-23/types-01';
import type { Entity_23_10, Registry_23_10 } from '../pkg-23/types-10';
import type { Entity_23_20, Registry_23_20 } from '../pkg-23/types-20';
import type { Entity_22_01, Registry_22_01 } from '../pkg-22/types-01';
import type { Entity_22_10, Registry_22_10 } from '../pkg-22/types-10';
import type { Entity_22_20, Registry_22_20 } from '../pkg-22/types-20';
import type { Entity_21_01, Registry_21_01 } from '../pkg-21/types-01';
import type { Entity_21_10, Registry_21_10 } from '../pkg-21/types-10';
import type { Entity_21_20, Registry_21_20 } from '../pkg-21/types-20';

type DeepMerge_2424<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object ? U[K] extends object ? DeepMerge_2424<T[K], U[K]> : U[K] : U[K]
    : K extends keyof T ? T[K] : K extends keyof U ? U[K] : never;
};

interface Entity_24_24 {
  id: string;
  meta: { created: Date; updated: Date; version: number; tags: string[]; attrs: Record<string, { v: unknown; t: string; ok: boolean }> };
  rels: { parent: Entity_24_24 | null; children: Entity_24_24[]; };
  cfg: { enabled: boolean; priority: number; rules: Array<{ cond: string; action: string; params: Record<string, unknown>; sub: { items: Array<{ id: string; w: number }> } }> };
  d24: { x2424: number; y2424: string; z2424: boolean };
}

type Path_2424<T, D extends unknown[] = []> = D['length'] extends 6 ? never
  : T extends object ? { [K in keyof T & string]: K | `${K}.${Path_2424<T[K], [...D, unknown]>}` }[keyof T & string] : never;
type EP_2424 = Path_2424<Entity_24_24>;

type Val_2424<T> = {
  [K in keyof T]: T[K] extends string ? { t: 's'; min: number; max: number }
    : T[K] extends number ? { t: 'n'; min: number; max: number }
    : T[K] extends boolean ? { t: 'b'; def: boolean }
    : T[K] extends unknown[] ? { t: 'a'; items: Val_2424<T[K][number]> }
    : T[K] extends object ? { t: 'o'; props: Val_2424<T[K]> }
    : { t: 'u' };
};
type EV_2424 = Val_2424<Entity_24_24>;

interface Registry_24_24 {
  entities: Map<string, Entity_24_24>;
  validators: EV_2424;
  paths: Set<EP_2424>;
  merged: DeepMerge_2424<Entity_24_24, { extra2424: string }>;
}

type CK_2424 = `p24.t24.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type { Entity_24_24, Registry_24_24, CK_2424, EP_2424, EV_2424, DeepMerge_2424 };
