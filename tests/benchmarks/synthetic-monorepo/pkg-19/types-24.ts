// pkg-19/types-24 - heavy interconnected types

import type { Entity_18_01, Registry_18_01 } from '../pkg-18/types-01';
import type { Entity_18_10, Registry_18_10 } from '../pkg-18/types-10';
import type { Entity_18_20, Registry_18_20 } from '../pkg-18/types-20';
import type { Entity_17_01, Registry_17_01 } from '../pkg-17/types-01';
import type { Entity_17_10, Registry_17_10 } from '../pkg-17/types-10';
import type { Entity_17_20, Registry_17_20 } from '../pkg-17/types-20';
import type { Entity_16_01, Registry_16_01 } from '../pkg-16/types-01';
import type { Entity_16_10, Registry_16_10 } from '../pkg-16/types-10';
import type { Entity_16_20, Registry_16_20 } from '../pkg-16/types-20';

type DeepMerge_1924<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object ? U[K] extends object ? DeepMerge_1924<T[K], U[K]> : U[K] : U[K]
    : K extends keyof T ? T[K] : K extends keyof U ? U[K] : never;
};

interface Entity_19_24 {
  id: string;
  meta: { created: Date; updated: Date; version: number; tags: string[]; attrs: Record<string, { v: unknown; t: string; ok: boolean }> };
  rels: { parent: Entity_19_24 | null; children: Entity_19_24[]; };
  cfg: { enabled: boolean; priority: number; rules: Array<{ cond: string; action: string; params: Record<string, unknown>; sub: { items: Array<{ id: string; w: number }> } }> };
  d24: { x1924: number; y1924: string; z1924: boolean };
}

type Path_1924<T, D extends unknown[] = []> = D['length'] extends 6 ? never
  : T extends object ? { [K in keyof T & string]: K | `${K}.${Path_1924<T[K], [...D, unknown]>}` }[keyof T & string] : never;
type EP_1924 = Path_1924<Entity_19_24>;

type Val_1924<T> = {
  [K in keyof T]: T[K] extends string ? { t: 's'; min: number; max: number }
    : T[K] extends number ? { t: 'n'; min: number; max: number }
    : T[K] extends boolean ? { t: 'b'; def: boolean }
    : T[K] extends unknown[] ? { t: 'a'; items: Val_1924<T[K][number]> }
    : T[K] extends object ? { t: 'o'; props: Val_1924<T[K]> }
    : { t: 'u' };
};
type EV_1924 = Val_1924<Entity_19_24>;

interface Registry_19_24 {
  entities: Map<string, Entity_19_24>;
  validators: EV_1924;
  paths: Set<EP_1924>;
  merged: DeepMerge_1924<Entity_19_24, { extra1924: string }>;
}

type CK_1924 = `p19.t24.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type { Entity_19_24, Registry_19_24, CK_1924, EP_1924, EV_1924, DeepMerge_1924 };
