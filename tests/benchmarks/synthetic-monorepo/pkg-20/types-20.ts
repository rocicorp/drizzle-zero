// pkg-20/types-20 - heavy interconnected types

import type { Entity_19_01, Registry_19_01 } from '../pkg-19/types-01';
import type { Entity_19_10, Registry_19_10 } from '../pkg-19/types-10';
import type { Entity_19_20, Registry_19_20 } from '../pkg-19/types-20';
import type { Entity_18_01, Registry_18_01 } from '../pkg-18/types-01';
import type { Entity_18_10, Registry_18_10 } from '../pkg-18/types-10';
import type { Entity_18_20, Registry_18_20 } from '../pkg-18/types-20';
import type { Entity_17_01, Registry_17_01 } from '../pkg-17/types-01';
import type { Entity_17_10, Registry_17_10 } from '../pkg-17/types-10';
import type { Entity_17_20, Registry_17_20 } from '../pkg-17/types-20';

type DeepMerge_2020<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object ? U[K] extends object ? DeepMerge_2020<T[K], U[K]> : U[K] : U[K]
    : K extends keyof T ? T[K] : K extends keyof U ? U[K] : never;
};

interface Entity_20_20 {
  id: string;
  meta: { created: Date; updated: Date; version: number; tags: string[]; attrs: Record<string, { v: unknown; t: string; ok: boolean }> };
  rels: { parent: Entity_20_20 | null; children: Entity_20_20[]; };
  cfg: { enabled: boolean; priority: number; rules: Array<{ cond: string; action: string; params: Record<string, unknown>; sub: { items: Array<{ id: string; w: number }> } }> };
  d20: { x2020: number; y2020: string; z2020: boolean };
}

type Path_2020<T, D extends unknown[] = []> = D['length'] extends 6 ? never
  : T extends object ? { [K in keyof T & string]: K | `${K}.${Path_2020<T[K], [...D, unknown]>}` }[keyof T & string] : never;
type EP_2020 = Path_2020<Entity_20_20>;

type Val_2020<T> = {
  [K in keyof T]: T[K] extends string ? { t: 's'; min: number; max: number }
    : T[K] extends number ? { t: 'n'; min: number; max: number }
    : T[K] extends boolean ? { t: 'b'; def: boolean }
    : T[K] extends unknown[] ? { t: 'a'; items: Val_2020<T[K][number]> }
    : T[K] extends object ? { t: 'o'; props: Val_2020<T[K]> }
    : { t: 'u' };
};
type EV_2020 = Val_2020<Entity_20_20>;

interface Registry_20_20 {
  entities: Map<string, Entity_20_20>;
  validators: EV_2020;
  paths: Set<EP_2020>;
  merged: DeepMerge_2020<Entity_20_20, { extra2020: string }>;
}

type CK_2020 = `p20.t20.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type { Entity_20_20, Registry_20_20, CK_2020, EP_2020, EV_2020, DeepMerge_2020 };
