// pkg-06/types-43 - heavy interconnected types

import type { Entity_5_01, Registry_5_01 } from '../pkg-05/types-01';
import type { Entity_5_10, Registry_5_10 } from '../pkg-05/types-10';
import type { Entity_5_20, Registry_5_20 } from '../pkg-05/types-20';
import type { Entity_4_01, Registry_4_01 } from '../pkg-04/types-01';
import type { Entity_4_10, Registry_4_10 } from '../pkg-04/types-10';
import type { Entity_4_20, Registry_4_20 } from '../pkg-04/types-20';
import type { Entity_3_01, Registry_3_01 } from '../pkg-03/types-01';
import type { Entity_3_10, Registry_3_10 } from '../pkg-03/types-10';
import type { Entity_3_20, Registry_3_20 } from '../pkg-03/types-20';

type DeepMerge_0643<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object ? U[K] extends object ? DeepMerge_0643<T[K], U[K]> : U[K] : U[K]
    : K extends keyof T ? T[K] : K extends keyof U ? U[K] : never;
};

interface Entity_06_43 {
  id: string;
  meta: { created: Date; updated: Date; version: number; tags: string[]; attrs: Record<string, { v: unknown; t: string; ok: boolean }> };
  rels: { parent: Entity_06_43 | null; children: Entity_06_43[]; };
  cfg: { enabled: boolean; priority: number; rules: Array<{ cond: string; action: string; params: Record<string, unknown>; sub: { items: Array<{ id: string; w: number }> } }> };
  d43: { x0643: number; y0643: string; z0643: boolean };
}

type Path_0643<T, D extends unknown[] = []> = D['length'] extends 6 ? never
  : T extends object ? { [K in keyof T & string]: K | `${K}.${Path_0643<T[K], [...D, unknown]>}` }[keyof T & string] : never;
type EP_0643 = Path_0643<Entity_06_43>;

type Val_0643<T> = {
  [K in keyof T]: T[K] extends string ? { t: 's'; min: number; max: number }
    : T[K] extends number ? { t: 'n'; min: number; max: number }
    : T[K] extends boolean ? { t: 'b'; def: boolean }
    : T[K] extends unknown[] ? { t: 'a'; items: Val_0643<T[K][number]> }
    : T[K] extends object ? { t: 'o'; props: Val_0643<T[K]> }
    : { t: 'u' };
};
type EV_0643 = Val_0643<Entity_06_43>;

interface Registry_06_43 {
  entities: Map<string, Entity_06_43>;
  validators: EV_0643;
  paths: Set<EP_0643>;
  merged: DeepMerge_0643<Entity_06_43, { extra0643: string }>;
}

type CK_0643 = `p06.t43.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type { Entity_06_43, Registry_06_43, CK_0643, EP_0643, EV_0643, DeepMerge_0643 };
