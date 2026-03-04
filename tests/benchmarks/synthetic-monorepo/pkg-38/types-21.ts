// pkg-38/types-21 - heavy interconnected types

import type { Entity_37_01, Registry_37_01 } from '../pkg-37/types-01';
import type { Entity_37_10, Registry_37_10 } from '../pkg-37/types-10';
import type { Entity_37_20, Registry_37_20 } from '../pkg-37/types-20';
import type { Entity_36_01, Registry_36_01 } from '../pkg-36/types-01';
import type { Entity_36_10, Registry_36_10 } from '../pkg-36/types-10';
import type { Entity_36_20, Registry_36_20 } from '../pkg-36/types-20';
import type { Entity_35_01, Registry_35_01 } from '../pkg-35/types-01';
import type { Entity_35_10, Registry_35_10 } from '../pkg-35/types-10';
import type { Entity_35_20, Registry_35_20 } from '../pkg-35/types-20';

type DeepMerge_3821<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object ? U[K] extends object ? DeepMerge_3821<T[K], U[K]> : U[K] : U[K]
    : K extends keyof T ? T[K] : K extends keyof U ? U[K] : never;
};

interface Entity_38_21 {
  id: string;
  meta: { created: Date; updated: Date; version: number; tags: string[]; attrs: Record<string, { v: unknown; t: string; ok: boolean }> };
  rels: { parent: Entity_38_21 | null; children: Entity_38_21[]; };
  cfg: { enabled: boolean; priority: number; rules: Array<{ cond: string; action: string; params: Record<string, unknown>; sub: { items: Array<{ id: string; w: number }> } }> };
  d21: { x3821: number; y3821: string; z3821: boolean };
}

type Path_3821<T, D extends unknown[] = []> = D['length'] extends 6 ? never
  : T extends object ? { [K in keyof T & string]: K | `${K}.${Path_3821<T[K], [...D, unknown]>}` }[keyof T & string] : never;
type EP_3821 = Path_3821<Entity_38_21>;

type Val_3821<T> = {
  [K in keyof T]: T[K] extends string ? { t: 's'; min: number; max: number }
    : T[K] extends number ? { t: 'n'; min: number; max: number }
    : T[K] extends boolean ? { t: 'b'; def: boolean }
    : T[K] extends unknown[] ? { t: 'a'; items: Val_3821<T[K][number]> }
    : T[K] extends object ? { t: 'o'; props: Val_3821<T[K]> }
    : { t: 'u' };
};
type EV_3821 = Val_3821<Entity_38_21>;

interface Registry_38_21 {
  entities: Map<string, Entity_38_21>;
  validators: EV_3821;
  paths: Set<EP_3821>;
  merged: DeepMerge_3821<Entity_38_21, { extra3821: string }>;
}

type CK_3821 = `p38.t21.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type { Entity_38_21, Registry_38_21, CK_3821, EP_3821, EV_3821, DeepMerge_3821 };
