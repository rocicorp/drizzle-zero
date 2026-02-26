// pkg-03/types-33 - heavy interconnected types

import type { Entity_2_01, Registry_2_01 } from '../pkg-02/types-01';
import type { Entity_2_10, Registry_2_10 } from '../pkg-02/types-10';
import type { Entity_2_20, Registry_2_20 } from '../pkg-02/types-20';
import type { Entity_1_01, Registry_1_01 } from '../pkg-01/types-01';
import type { Entity_1_10, Registry_1_10 } from '../pkg-01/types-10';
import type { Entity_1_20, Registry_1_20 } from '../pkg-01/types-20';

type DeepMerge_0333<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object ? U[K] extends object ? DeepMerge_0333<T[K], U[K]> : U[K] : U[K]
    : K extends keyof T ? T[K] : K extends keyof U ? U[K] : never;
};

interface Entity_03_33 {
  id: string;
  meta: { created: Date; updated: Date; version: number; tags: string[]; attrs: Record<string, { v: unknown; t: string; ok: boolean }> };
  rels: { parent: Entity_03_33 | null; children: Entity_03_33[]; };
  cfg: { enabled: boolean; priority: number; rules: Array<{ cond: string; action: string; params: Record<string, unknown>; sub: { items: Array<{ id: string; w: number }> } }> };
  d33: { x0333: number; y0333: string; z0333: boolean };
}

type Path_0333<T, D extends unknown[] = []> = D['length'] extends 6 ? never
  : T extends object ? { [K in keyof T & string]: K | `${K}.${Path_0333<T[K], [...D, unknown]>}` }[keyof T & string] : never;
type EP_0333 = Path_0333<Entity_03_33>;

type Val_0333<T> = {
  [K in keyof T]: T[K] extends string ? { t: 's'; min: number; max: number }
    : T[K] extends number ? { t: 'n'; min: number; max: number }
    : T[K] extends boolean ? { t: 'b'; def: boolean }
    : T[K] extends unknown[] ? { t: 'a'; items: Val_0333<T[K][number]> }
    : T[K] extends object ? { t: 'o'; props: Val_0333<T[K]> }
    : { t: 'u' };
};
type EV_0333 = Val_0333<Entity_03_33>;

interface Registry_03_33 {
  entities: Map<string, Entity_03_33>;
  validators: EV_0333;
  paths: Set<EP_0333>;
  merged: DeepMerge_0333<Entity_03_33, { extra0333: string }>;
}

type CK_0333 = `p03.t33.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type { Entity_03_33, Registry_03_33, CK_0333, EP_0333, EV_0333, DeepMerge_0333 };
