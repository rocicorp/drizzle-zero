// pkg-02/types-41 - heavy interconnected types

import type { Entity_1_01, Registry_1_01 } from '../pkg-01/types-01';
import type { Entity_1_10, Registry_1_10 } from '../pkg-01/types-10';
import type { Entity_1_20, Registry_1_20 } from '../pkg-01/types-20';

type DeepMerge_0241<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object ? U[K] extends object ? DeepMerge_0241<T[K], U[K]> : U[K] : U[K]
    : K extends keyof T ? T[K] : K extends keyof U ? U[K] : never;
};

interface Entity_02_41 {
  id: string;
  meta: { created: Date; updated: Date; version: number; tags: string[]; attrs: Record<string, { v: unknown; t: string; ok: boolean }> };
  rels: { parent: Entity_02_41 | null; children: Entity_02_41[]; };
  cfg: { enabled: boolean; priority: number; rules: Array<{ cond: string; action: string; params: Record<string, unknown>; sub: { items: Array<{ id: string; w: number }> } }> };
  d41: { x0241: number; y0241: string; z0241: boolean };
}

type Path_0241<T, D extends unknown[] = []> = D['length'] extends 6 ? never
  : T extends object ? { [K in keyof T & string]: K | `${K}.${Path_0241<T[K], [...D, unknown]>}` }[keyof T & string] : never;
type EP_0241 = Path_0241<Entity_02_41>;

type Val_0241<T> = {
  [K in keyof T]: T[K] extends string ? { t: 's'; min: number; max: number }
    : T[K] extends number ? { t: 'n'; min: number; max: number }
    : T[K] extends boolean ? { t: 'b'; def: boolean }
    : T[K] extends unknown[] ? { t: 'a'; items: Val_0241<T[K][number]> }
    : T[K] extends object ? { t: 'o'; props: Val_0241<T[K]> }
    : { t: 'u' };
};
type EV_0241 = Val_0241<Entity_02_41>;

interface Registry_02_41 {
  entities: Map<string, Entity_02_41>;
  validators: EV_0241;
  paths: Set<EP_0241>;
  merged: DeepMerge_0241<Entity_02_41, { extra0241: string }>;
}

type CK_0241 = `p02.t41.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type { Entity_02_41, Registry_02_41, CK_0241, EP_0241, EV_0241, DeepMerge_0241 };
