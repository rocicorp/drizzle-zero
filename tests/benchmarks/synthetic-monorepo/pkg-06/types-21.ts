// pkg-06/types-21 - heavy interconnected types

import type { Entity_5_01, Registry_5_01 } from '../pkg-05/types-01';
import type { Entity_5_10, Registry_5_10 } from '../pkg-05/types-10';
import type { Entity_5_20, Registry_5_20 } from '../pkg-05/types-20';
import type { Entity_4_01, Registry_4_01 } from '../pkg-04/types-01';
import type { Entity_4_10, Registry_4_10 } from '../pkg-04/types-10';
import type { Entity_4_20, Registry_4_20 } from '../pkg-04/types-20';
import type { Entity_3_01, Registry_3_01 } from '../pkg-03/types-01';
import type { Entity_3_10, Registry_3_10 } from '../pkg-03/types-10';
import type { Entity_3_20, Registry_3_20 } from '../pkg-03/types-20';

type DeepMerge_0621<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object ? U[K] extends object ? DeepMerge_0621<T[K], U[K]> : U[K] : U[K]
    : K extends keyof T ? T[K] : K extends keyof U ? U[K] : never;
};

interface Entity_06_21 {
  id: string;
  meta: { created: Date; updated: Date; version: number; tags: string[]; attrs: Record<string, { v: unknown; t: string; ok: boolean }> };
  rels: { parent: Entity_06_21 | null; children: Entity_06_21[]; };
  cfg: { enabled: boolean; priority: number; rules: Array<{ cond: string; action: string; params: Record<string, unknown>; sub: { items: Array<{ id: string; w: number }> } }> };
  d21: { x0621: number; y0621: string; z0621: boolean };
}

type Path_0621<T, D extends unknown[] = []> = D['length'] extends 6 ? never
  : T extends object ? { [K in keyof T & string]: K | `${K}.${Path_0621<T[K], [...D, unknown]>}` }[keyof T & string] : never;
type EP_0621 = Path_0621<Entity_06_21>;

type Val_0621<T> = {
  [K in keyof T]: T[K] extends string ? { t: 's'; min: number; max: number }
    : T[K] extends number ? { t: 'n'; min: number; max: number }
    : T[K] extends boolean ? { t: 'b'; def: boolean }
    : T[K] extends unknown[] ? { t: 'a'; items: Val_0621<T[K][number]> }
    : T[K] extends object ? { t: 'o'; props: Val_0621<T[K]> }
    : { t: 'u' };
};
type EV_0621 = Val_0621<Entity_06_21>;

interface Registry_06_21 {
  entities: Map<string, Entity_06_21>;
  validators: EV_0621;
  paths: Set<EP_0621>;
  merged: DeepMerge_0621<Entity_06_21, { extra0621: string }>;
}

type CK_0621 = `p06.t21.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type { Entity_06_21, Registry_06_21, CK_0621, EP_0621, EV_0621, DeepMerge_0621 };
