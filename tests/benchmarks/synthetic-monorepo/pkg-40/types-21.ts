// pkg-40/types-21 - heavy interconnected types

import type { Entity_39_01, Registry_39_01 } from '../pkg-39/types-01';
import type { Entity_39_10, Registry_39_10 } from '../pkg-39/types-10';
import type { Entity_39_20, Registry_39_20 } from '../pkg-39/types-20';
import type { Entity_38_01, Registry_38_01 } from '../pkg-38/types-01';
import type { Entity_38_10, Registry_38_10 } from '../pkg-38/types-10';
import type { Entity_38_20, Registry_38_20 } from '../pkg-38/types-20';
import type { Entity_37_01, Registry_37_01 } from '../pkg-37/types-01';
import type { Entity_37_10, Registry_37_10 } from '../pkg-37/types-10';
import type { Entity_37_20, Registry_37_20 } from '../pkg-37/types-20';

type DeepMerge_4021<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object ? U[K] extends object ? DeepMerge_4021<T[K], U[K]> : U[K] : U[K]
    : K extends keyof T ? T[K] : K extends keyof U ? U[K] : never;
};

interface Entity_40_21 {
  id: string;
  meta: { created: Date; updated: Date; version: number; tags: string[]; attrs: Record<string, { v: unknown; t: string; ok: boolean }> };
  rels: { parent: Entity_40_21 | null; children: Entity_40_21[]; };
  cfg: { enabled: boolean; priority: number; rules: Array<{ cond: string; action: string; params: Record<string, unknown>; sub: { items: Array<{ id: string; w: number }> } }> };
  d21: { x4021: number; y4021: string; z4021: boolean };
}

type Path_4021<T, D extends unknown[] = []> = D['length'] extends 6 ? never
  : T extends object ? { [K in keyof T & string]: K | `${K}.${Path_4021<T[K], [...D, unknown]>}` }[keyof T & string] : never;
type EP_4021 = Path_4021<Entity_40_21>;

type Val_4021<T> = {
  [K in keyof T]: T[K] extends string ? { t: 's'; min: number; max: number }
    : T[K] extends number ? { t: 'n'; min: number; max: number }
    : T[K] extends boolean ? { t: 'b'; def: boolean }
    : T[K] extends unknown[] ? { t: 'a'; items: Val_4021<T[K][number]> }
    : T[K] extends object ? { t: 'o'; props: Val_4021<T[K]> }
    : { t: 'u' };
};
type EV_4021 = Val_4021<Entity_40_21>;

interface Registry_40_21 {
  entities: Map<string, Entity_40_21>;
  validators: EV_4021;
  paths: Set<EP_4021>;
  merged: DeepMerge_4021<Entity_40_21, { extra4021: string }>;
}

type CK_4021 = `p40.t21.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type { Entity_40_21, Registry_40_21, CK_4021, EP_4021, EV_4021, DeepMerge_4021 };
