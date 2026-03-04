// pkg-22/types-27 - heavy interconnected types

import type { Entity_21_01, Registry_21_01 } from '../pkg-21/types-01';
import type { Entity_21_10, Registry_21_10 } from '../pkg-21/types-10';
import type { Entity_21_20, Registry_21_20 } from '../pkg-21/types-20';
import type { Entity_20_01, Registry_20_01 } from '../pkg-20/types-01';
import type { Entity_20_10, Registry_20_10 } from '../pkg-20/types-10';
import type { Entity_20_20, Registry_20_20 } from '../pkg-20/types-20';
import type { Entity_19_01, Registry_19_01 } from '../pkg-19/types-01';
import type { Entity_19_10, Registry_19_10 } from '../pkg-19/types-10';
import type { Entity_19_20, Registry_19_20 } from '../pkg-19/types-20';

type DeepMerge_2227<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object ? U[K] extends object ? DeepMerge_2227<T[K], U[K]> : U[K] : U[K]
    : K extends keyof T ? T[K] : K extends keyof U ? U[K] : never;
};

interface Entity_22_27 {
  id: string;
  meta: { created: Date; updated: Date; version: number; tags: string[]; attrs: Record<string, { v: unknown; t: string; ok: boolean }> };
  rels: { parent: Entity_22_27 | null; children: Entity_22_27[]; };
  cfg: { enabled: boolean; priority: number; rules: Array<{ cond: string; action: string; params: Record<string, unknown>; sub: { items: Array<{ id: string; w: number }> } }> };
  d27: { x2227: number; y2227: string; z2227: boolean };
}

type Path_2227<T, D extends unknown[] = []> = D['length'] extends 6 ? never
  : T extends object ? { [K in keyof T & string]: K | `${K}.${Path_2227<T[K], [...D, unknown]>}` }[keyof T & string] : never;
type EP_2227 = Path_2227<Entity_22_27>;

type Val_2227<T> = {
  [K in keyof T]: T[K] extends string ? { t: 's'; min: number; max: number }
    : T[K] extends number ? { t: 'n'; min: number; max: number }
    : T[K] extends boolean ? { t: 'b'; def: boolean }
    : T[K] extends unknown[] ? { t: 'a'; items: Val_2227<T[K][number]> }
    : T[K] extends object ? { t: 'o'; props: Val_2227<T[K]> }
    : { t: 'u' };
};
type EV_2227 = Val_2227<Entity_22_27>;

interface Registry_22_27 {
  entities: Map<string, Entity_22_27>;
  validators: EV_2227;
  paths: Set<EP_2227>;
  merged: DeepMerge_2227<Entity_22_27, { extra2227: string }>;
}

type CK_2227 = `p22.t27.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type { Entity_22_27, Registry_22_27, CK_2227, EP_2227, EV_2227, DeepMerge_2227 };
