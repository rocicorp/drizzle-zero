// pkg-21/types-33 - heavy interconnected types

import type { Entity_20_01, Registry_20_01 } from '../pkg-20/types-01';
import type { Entity_20_10, Registry_20_10 } from '../pkg-20/types-10';
import type { Entity_20_20, Registry_20_20 } from '../pkg-20/types-20';
import type { Entity_19_01, Registry_19_01 } from '../pkg-19/types-01';
import type { Entity_19_10, Registry_19_10 } from '../pkg-19/types-10';
import type { Entity_19_20, Registry_19_20 } from '../pkg-19/types-20';
import type { Entity_18_01, Registry_18_01 } from '../pkg-18/types-01';
import type { Entity_18_10, Registry_18_10 } from '../pkg-18/types-10';
import type { Entity_18_20, Registry_18_20 } from '../pkg-18/types-20';

type DeepMerge_2133<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object ? U[K] extends object ? DeepMerge_2133<T[K], U[K]> : U[K] : U[K]
    : K extends keyof T ? T[K] : K extends keyof U ? U[K] : never;
};

interface Entity_21_33 {
  id: string;
  meta: { created: Date; updated: Date; version: number; tags: string[]; attrs: Record<string, { v: unknown; t: string; ok: boolean }> };
  rels: { parent: Entity_21_33 | null; children: Entity_21_33[]; };
  cfg: { enabled: boolean; priority: number; rules: Array<{ cond: string; action: string; params: Record<string, unknown>; sub: { items: Array<{ id: string; w: number }> } }> };
  d33: { x2133: number; y2133: string; z2133: boolean };
}

type Path_2133<T, D extends unknown[] = []> = D['length'] extends 6 ? never
  : T extends object ? { [K in keyof T & string]: K | `${K}.${Path_2133<T[K], [...D, unknown]>}` }[keyof T & string] : never;
type EP_2133 = Path_2133<Entity_21_33>;

type Val_2133<T> = {
  [K in keyof T]: T[K] extends string ? { t: 's'; min: number; max: number }
    : T[K] extends number ? { t: 'n'; min: number; max: number }
    : T[K] extends boolean ? { t: 'b'; def: boolean }
    : T[K] extends unknown[] ? { t: 'a'; items: Val_2133<T[K][number]> }
    : T[K] extends object ? { t: 'o'; props: Val_2133<T[K]> }
    : { t: 'u' };
};
type EV_2133 = Val_2133<Entity_21_33>;

interface Registry_21_33 {
  entities: Map<string, Entity_21_33>;
  validators: EV_2133;
  paths: Set<EP_2133>;
  merged: DeepMerge_2133<Entity_21_33, { extra2133: string }>;
}

type CK_2133 = `p21.t33.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type { Entity_21_33, Registry_21_33, CK_2133, EP_2133, EV_2133, DeepMerge_2133 };
