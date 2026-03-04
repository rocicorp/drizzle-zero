// pkg-04/types-19 - heavy interconnected types

import type { Entity_3_01, Registry_3_01 } from '../pkg-03/types-01';
import type { Entity_3_10, Registry_3_10 } from '../pkg-03/types-10';
import type { Entity_3_20, Registry_3_20 } from '../pkg-03/types-20';
import type { Entity_2_01, Registry_2_01 } from '../pkg-02/types-01';
import type { Entity_2_10, Registry_2_10 } from '../pkg-02/types-10';
import type { Entity_2_20, Registry_2_20 } from '../pkg-02/types-20';
import type { Entity_1_01, Registry_1_01 } from '../pkg-01/types-01';
import type { Entity_1_10, Registry_1_10 } from '../pkg-01/types-10';
import type { Entity_1_20, Registry_1_20 } from '../pkg-01/types-20';

type DeepMerge_0419<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object ? U[K] extends object ? DeepMerge_0419<T[K], U[K]> : U[K] : U[K]
    : K extends keyof T ? T[K] : K extends keyof U ? U[K] : never;
};

interface Entity_04_19 {
  id: string;
  meta: { created: Date; updated: Date; version: number; tags: string[]; attrs: Record<string, { v: unknown; t: string; ok: boolean }> };
  rels: { parent: Entity_04_19 | null; children: Entity_04_19[]; };
  cfg: { enabled: boolean; priority: number; rules: Array<{ cond: string; action: string; params: Record<string, unknown>; sub: { items: Array<{ id: string; w: number }> } }> };
  d19: { x0419: number; y0419: string; z0419: boolean };
}

type Path_0419<T, D extends unknown[] = []> = D['length'] extends 6 ? never
  : T extends object ? { [K in keyof T & string]: K | `${K}.${Path_0419<T[K], [...D, unknown]>}` }[keyof T & string] : never;
type EP_0419 = Path_0419<Entity_04_19>;

type Val_0419<T> = {
  [K in keyof T]: T[K] extends string ? { t: 's'; min: number; max: number }
    : T[K] extends number ? { t: 'n'; min: number; max: number }
    : T[K] extends boolean ? { t: 'b'; def: boolean }
    : T[K] extends unknown[] ? { t: 'a'; items: Val_0419<T[K][number]> }
    : T[K] extends object ? { t: 'o'; props: Val_0419<T[K]> }
    : { t: 'u' };
};
type EV_0419 = Val_0419<Entity_04_19>;

interface Registry_04_19 {
  entities: Map<string, Entity_04_19>;
  validators: EV_0419;
  paths: Set<EP_0419>;
  merged: DeepMerge_0419<Entity_04_19, { extra0419: string }>;
}

type CK_0419 = `p04.t19.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type { Entity_04_19, Registry_04_19, CK_0419, EP_0419, EV_0419, DeepMerge_0419 };
