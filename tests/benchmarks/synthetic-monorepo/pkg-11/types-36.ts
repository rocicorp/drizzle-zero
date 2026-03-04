// pkg-11/types-36 - heavy interconnected types

import type { Entity_10_01, Registry_10_01 } from '../pkg-10/types-01';
import type { Entity_10_10, Registry_10_10 } from '../pkg-10/types-10';
import type { Entity_10_20, Registry_10_20 } from '../pkg-10/types-20';
import type { Entity_9_01, Registry_9_01 } from '../pkg-09/types-01';
import type { Entity_9_10, Registry_9_10 } from '../pkg-09/types-10';
import type { Entity_9_20, Registry_9_20 } from '../pkg-09/types-20';
import type { Entity_8_01, Registry_8_01 } from '../pkg-08/types-01';
import type { Entity_8_10, Registry_8_10 } from '../pkg-08/types-10';
import type { Entity_8_20, Registry_8_20 } from '../pkg-08/types-20';

type DeepMerge_1136<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object ? U[K] extends object ? DeepMerge_1136<T[K], U[K]> : U[K] : U[K]
    : K extends keyof T ? T[K] : K extends keyof U ? U[K] : never;
};

interface Entity_11_36 {
  id: string;
  meta: { created: Date; updated: Date; version: number; tags: string[]; attrs: Record<string, { v: unknown; t: string; ok: boolean }> };
  rels: { parent: Entity_11_36 | null; children: Entity_11_36[]; };
  cfg: { enabled: boolean; priority: number; rules: Array<{ cond: string; action: string; params: Record<string, unknown>; sub: { items: Array<{ id: string; w: number }> } }> };
  d36: { x1136: number; y1136: string; z1136: boolean };
}

type Path_1136<T, D extends unknown[] = []> = D['length'] extends 6 ? never
  : T extends object ? { [K in keyof T & string]: K | `${K}.${Path_1136<T[K], [...D, unknown]>}` }[keyof T & string] : never;
type EP_1136 = Path_1136<Entity_11_36>;

type Val_1136<T> = {
  [K in keyof T]: T[K] extends string ? { t: 's'; min: number; max: number }
    : T[K] extends number ? { t: 'n'; min: number; max: number }
    : T[K] extends boolean ? { t: 'b'; def: boolean }
    : T[K] extends unknown[] ? { t: 'a'; items: Val_1136<T[K][number]> }
    : T[K] extends object ? { t: 'o'; props: Val_1136<T[K]> }
    : { t: 'u' };
};
type EV_1136 = Val_1136<Entity_11_36>;

interface Registry_11_36 {
  entities: Map<string, Entity_11_36>;
  validators: EV_1136;
  paths: Set<EP_1136>;
  merged: DeepMerge_1136<Entity_11_36, { extra1136: string }>;
}

type CK_1136 = `p11.t36.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type { Entity_11_36, Registry_11_36, CK_1136, EP_1136, EV_1136, DeepMerge_1136 };
