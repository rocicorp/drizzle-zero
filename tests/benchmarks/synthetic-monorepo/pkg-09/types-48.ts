// pkg-09/types-48 - heavy interconnected types

import type { Entity_8_01, Registry_8_01 } from '../pkg-08/types-01';
import type { Entity_8_10, Registry_8_10 } from '../pkg-08/types-10';
import type { Entity_8_20, Registry_8_20 } from '../pkg-08/types-20';
import type { Entity_7_01, Registry_7_01 } from '../pkg-07/types-01';
import type { Entity_7_10, Registry_7_10 } from '../pkg-07/types-10';
import type { Entity_7_20, Registry_7_20 } from '../pkg-07/types-20';
import type { Entity_6_01, Registry_6_01 } from '../pkg-06/types-01';
import type { Entity_6_10, Registry_6_10 } from '../pkg-06/types-10';
import type { Entity_6_20, Registry_6_20 } from '../pkg-06/types-20';

type DeepMerge_0948<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object ? U[K] extends object ? DeepMerge_0948<T[K], U[K]> : U[K] : U[K]
    : K extends keyof T ? T[K] : K extends keyof U ? U[K] : never;
};

interface Entity_09_48 {
  id: string;
  meta: { created: Date; updated: Date; version: number; tags: string[]; attrs: Record<string, { v: unknown; t: string; ok: boolean }> };
  rels: { parent: Entity_09_48 | null; children: Entity_09_48[]; };
  cfg: { enabled: boolean; priority: number; rules: Array<{ cond: string; action: string; params: Record<string, unknown>; sub: { items: Array<{ id: string; w: number }> } }> };
  d48: { x0948: number; y0948: string; z0948: boolean };
}

type Path_0948<T, D extends unknown[] = []> = D['length'] extends 6 ? never
  : T extends object ? { [K in keyof T & string]: K | `${K}.${Path_0948<T[K], [...D, unknown]>}` }[keyof T & string] : never;
type EP_0948 = Path_0948<Entity_09_48>;

type Val_0948<T> = {
  [K in keyof T]: T[K] extends string ? { t: 's'; min: number; max: number }
    : T[K] extends number ? { t: 'n'; min: number; max: number }
    : T[K] extends boolean ? { t: 'b'; def: boolean }
    : T[K] extends unknown[] ? { t: 'a'; items: Val_0948<T[K][number]> }
    : T[K] extends object ? { t: 'o'; props: Val_0948<T[K]> }
    : { t: 'u' };
};
type EV_0948 = Val_0948<Entity_09_48>;

interface Registry_09_48 {
  entities: Map<string, Entity_09_48>;
  validators: EV_0948;
  paths: Set<EP_0948>;
  merged: DeepMerge_0948<Entity_09_48, { extra0948: string }>;
}

type CK_0948 = `p09.t48.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type { Entity_09_48, Registry_09_48, CK_0948, EP_0948, EV_0948, DeepMerge_0948 };
