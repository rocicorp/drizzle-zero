// pkg-40/types-07 - heavy interconnected types

import type { Entity_39_01, Registry_39_01 } from '../pkg-39/types-01';
import type { Entity_39_10, Registry_39_10 } from '../pkg-39/types-10';
import type { Entity_39_20, Registry_39_20 } from '../pkg-39/types-20';
import type { Entity_38_01, Registry_38_01 } from '../pkg-38/types-01';
import type { Entity_38_10, Registry_38_10 } from '../pkg-38/types-10';
import type { Entity_38_20, Registry_38_20 } from '../pkg-38/types-20';
import type { Entity_37_01, Registry_37_01 } from '../pkg-37/types-01';
import type { Entity_37_10, Registry_37_10 } from '../pkg-37/types-10';
import type { Entity_37_20, Registry_37_20 } from '../pkg-37/types-20';

type DeepMerge_4007<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object ? U[K] extends object ? DeepMerge_4007<T[K], U[K]> : U[K] : U[K]
    : K extends keyof T ? T[K] : K extends keyof U ? U[K] : never;
};

interface Entity_40_07 {
  id: string;
  meta: { created: Date; updated: Date; version: number; tags: string[]; attrs: Record<string, { v: unknown; t: string; ok: boolean }> };
  rels: { parent: Entity_40_07 | null; children: Entity_40_07[]; };
  cfg: { enabled: boolean; priority: number; rules: Array<{ cond: string; action: string; params: Record<string, unknown>; sub: { items: Array<{ id: string; w: number }> } }> };
  d07: { x4007: number; y4007: string; z4007: boolean };
}

type Path_4007<T, D extends unknown[] = []> = D['length'] extends 6 ? never
  : T extends object ? { [K in keyof T & string]: K | `${K}.${Path_4007<T[K], [...D, unknown]>}` }[keyof T & string] : never;
type EP_4007 = Path_4007<Entity_40_07>;

type Val_4007<T> = {
  [K in keyof T]: T[K] extends string ? { t: 's'; min: number; max: number }
    : T[K] extends number ? { t: 'n'; min: number; max: number }
    : T[K] extends boolean ? { t: 'b'; def: boolean }
    : T[K] extends unknown[] ? { t: 'a'; items: Val_4007<T[K][number]> }
    : T[K] extends object ? { t: 'o'; props: Val_4007<T[K]> }
    : { t: 'u' };
};
type EV_4007 = Val_4007<Entity_40_07>;

interface Registry_40_07 {
  entities: Map<string, Entity_40_07>;
  validators: EV_4007;
  paths: Set<EP_4007>;
  merged: DeepMerge_4007<Entity_40_07, { extra4007: string }>;
}

type CK_4007 = `p40.t07.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type { Entity_40_07, Registry_40_07, CK_4007, EP_4007, EV_4007, DeepMerge_4007 };
