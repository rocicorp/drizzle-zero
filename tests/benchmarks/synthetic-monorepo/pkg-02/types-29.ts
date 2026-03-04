// pkg-02/types-29 - heavy interconnected types

import type { Entity_1_01, Registry_1_01 } from '../pkg-01/types-01';
import type { Entity_1_10, Registry_1_10 } from '../pkg-01/types-10';
import type { Entity_1_20, Registry_1_20 } from '../pkg-01/types-20';

type DeepMerge_0229<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object ? U[K] extends object ? DeepMerge_0229<T[K], U[K]> : U[K] : U[K]
    : K extends keyof T ? T[K] : K extends keyof U ? U[K] : never;
};

interface Entity_02_29 {
  id: string;
  meta: { created: Date; updated: Date; version: number; tags: string[]; attrs: Record<string, { v: unknown; t: string; ok: boolean }> };
  rels: { parent: Entity_02_29 | null; children: Entity_02_29[]; };
  cfg: { enabled: boolean; priority: number; rules: Array<{ cond: string; action: string; params: Record<string, unknown>; sub: { items: Array<{ id: string; w: number }> } }> };
  d29: { x0229: number; y0229: string; z0229: boolean };
}

type Path_0229<T, D extends unknown[] = []> = D['length'] extends 6 ? never
  : T extends object ? { [K in keyof T & string]: K | `${K}.${Path_0229<T[K], [...D, unknown]>}` }[keyof T & string] : never;
type EP_0229 = Path_0229<Entity_02_29>;

type Val_0229<T> = {
  [K in keyof T]: T[K] extends string ? { t: 's'; min: number; max: number }
    : T[K] extends number ? { t: 'n'; min: number; max: number }
    : T[K] extends boolean ? { t: 'b'; def: boolean }
    : T[K] extends unknown[] ? { t: 'a'; items: Val_0229<T[K][number]> }
    : T[K] extends object ? { t: 'o'; props: Val_0229<T[K]> }
    : { t: 'u' };
};
type EV_0229 = Val_0229<Entity_02_29>;

interface Registry_02_29 {
  entities: Map<string, Entity_02_29>;
  validators: EV_0229;
  paths: Set<EP_0229>;
  merged: DeepMerge_0229<Entity_02_29, { extra0229: string }>;
}

type CK_0229 = `p02.t29.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type { Entity_02_29, Registry_02_29, CK_0229, EP_0229, EV_0229, DeepMerge_0229 };
