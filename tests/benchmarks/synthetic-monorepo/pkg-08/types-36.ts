// pkg-08/types-36 - heavy interconnected types

import type { Entity_7_01, Registry_7_01 } from '../pkg-07/types-01';
import type { Entity_7_10, Registry_7_10 } from '../pkg-07/types-10';
import type { Entity_7_20, Registry_7_20 } from '../pkg-07/types-20';
import type { Entity_6_01, Registry_6_01 } from '../pkg-06/types-01';
import type { Entity_6_10, Registry_6_10 } from '../pkg-06/types-10';
import type { Entity_6_20, Registry_6_20 } from '../pkg-06/types-20';
import type { Entity_5_01, Registry_5_01 } from '../pkg-05/types-01';
import type { Entity_5_10, Registry_5_10 } from '../pkg-05/types-10';
import type { Entity_5_20, Registry_5_20 } from '../pkg-05/types-20';

type DeepMerge_0836<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object ? U[K] extends object ? DeepMerge_0836<T[K], U[K]> : U[K] : U[K]
    : K extends keyof T ? T[K] : K extends keyof U ? U[K] : never;
};

interface Entity_08_36 {
  id: string;
  meta: { created: Date; updated: Date; version: number; tags: string[]; attrs: Record<string, { v: unknown; t: string; ok: boolean }> };
  rels: { parent: Entity_08_36 | null; children: Entity_08_36[]; };
  cfg: { enabled: boolean; priority: number; rules: Array<{ cond: string; action: string; params: Record<string, unknown>; sub: { items: Array<{ id: string; w: number }> } }> };
  d36: { x0836: number; y0836: string; z0836: boolean };
}

type Path_0836<T, D extends unknown[] = []> = D['length'] extends 6 ? never
  : T extends object ? { [K in keyof T & string]: K | `${K}.${Path_0836<T[K], [...D, unknown]>}` }[keyof T & string] : never;
type EP_0836 = Path_0836<Entity_08_36>;

type Val_0836<T> = {
  [K in keyof T]: T[K] extends string ? { t: 's'; min: number; max: number }
    : T[K] extends number ? { t: 'n'; min: number; max: number }
    : T[K] extends boolean ? { t: 'b'; def: boolean }
    : T[K] extends unknown[] ? { t: 'a'; items: Val_0836<T[K][number]> }
    : T[K] extends object ? { t: 'o'; props: Val_0836<T[K]> }
    : { t: 'u' };
};
type EV_0836 = Val_0836<Entity_08_36>;

interface Registry_08_36 {
  entities: Map<string, Entity_08_36>;
  validators: EV_0836;
  paths: Set<EP_0836>;
  merged: DeepMerge_0836<Entity_08_36, { extra0836: string }>;
}

type CK_0836 = `p08.t36.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type { Entity_08_36, Registry_08_36, CK_0836, EP_0836, EV_0836, DeepMerge_0836 };
