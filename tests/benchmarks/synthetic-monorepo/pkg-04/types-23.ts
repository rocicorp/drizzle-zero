// pkg-04/types-23 - heavy interconnected types

import type { Entity_3_01, Registry_3_01 } from '../pkg-03/types-01';
import type { Entity_3_10, Registry_3_10 } from '../pkg-03/types-10';
import type { Entity_3_20, Registry_3_20 } from '../pkg-03/types-20';
import type { Entity_2_01, Registry_2_01 } from '../pkg-02/types-01';
import type { Entity_2_10, Registry_2_10 } from '../pkg-02/types-10';
import type { Entity_2_20, Registry_2_20 } from '../pkg-02/types-20';
import type { Entity_1_01, Registry_1_01 } from '../pkg-01/types-01';
import type { Entity_1_10, Registry_1_10 } from '../pkg-01/types-10';
import type { Entity_1_20, Registry_1_20 } from '../pkg-01/types-20';

type DeepMerge_0423<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object ? U[K] extends object ? DeepMerge_0423<T[K], U[K]> : U[K] : U[K]
    : K extends keyof T ? T[K] : K extends keyof U ? U[K] : never;
};

interface Entity_04_23 {
  id: string;
  meta: { created: Date; updated: Date; version: number; tags: string[]; attrs: Record<string, { v: unknown; t: string; ok: boolean }> };
  rels: { parent: Entity_04_23 | null; children: Entity_04_23[]; };
  cfg: { enabled: boolean; priority: number; rules: Array<{ cond: string; action: string; params: Record<string, unknown>; sub: { items: Array<{ id: string; w: number }> } }> };
  d23: { x0423: number; y0423: string; z0423: boolean };
}

type Path_0423<T, D extends unknown[] = []> = D['length'] extends 6 ? never
  : T extends object ? { [K in keyof T & string]: K | `${K}.${Path_0423<T[K], [...D, unknown]>}` }[keyof T & string] : never;
type EP_0423 = Path_0423<Entity_04_23>;

type Val_0423<T> = {
  [K in keyof T]: T[K] extends string ? { t: 's'; min: number; max: number }
    : T[K] extends number ? { t: 'n'; min: number; max: number }
    : T[K] extends boolean ? { t: 'b'; def: boolean }
    : T[K] extends unknown[] ? { t: 'a'; items: Val_0423<T[K][number]> }
    : T[K] extends object ? { t: 'o'; props: Val_0423<T[K]> }
    : { t: 'u' };
};
type EV_0423 = Val_0423<Entity_04_23>;

interface Registry_04_23 {
  entities: Map<string, Entity_04_23>;
  validators: EV_0423;
  paths: Set<EP_0423>;
  merged: DeepMerge_0423<Entity_04_23, { extra0423: string }>;
}

type CK_0423 = `p04.t23.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type { Entity_04_23, Registry_04_23, CK_0423, EP_0423, EV_0423, DeepMerge_0423 };
