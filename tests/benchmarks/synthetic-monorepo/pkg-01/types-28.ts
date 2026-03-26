// pkg-01/types-28 - heavy interconnected types

type DeepMerge_0128<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object
      ? U[K] extends object
        ? DeepMerge_0128<T[K], U[K]>
        : U[K]
      : U[K]
    : K extends keyof T
      ? T[K]
      : K extends keyof U
        ? U[K]
        : never;
};

interface Entity_01_28 {
  id: string;
  meta: {
    created: Date;
    updated: Date;
    version: number;
    tags: string[];
    attrs: Record<string, {v: unknown; t: string; ok: boolean}>;
  };
  rels: {parent: Entity_01_28 | null; children: Entity_01_28[]};
  cfg: {
    enabled: boolean;
    priority: number;
    rules: Array<{
      cond: string;
      action: string;
      params: Record<string, unknown>;
      sub: {items: Array<{id: string; w: number}>};
    }>;
  };
  d28: {x0128: number; y0128: string; z0128: boolean};
}

type Path_0128<T, D extends unknown[] = []> = D['length'] extends 6
  ? never
  : T extends object
    ? {
        [K in keyof T & string]: K | `${K}.${Path_0128<T[K], [...D, unknown]>}`;
      }[keyof T & string]
    : never;
type EP_0128 = Path_0128<Entity_01_28>;

type Val_0128<T> = {
  [K in keyof T]: T[K] extends string
    ? {t: 's'; min: number; max: number}
    : T[K] extends number
      ? {t: 'n'; min: number; max: number}
      : T[K] extends boolean
        ? {t: 'b'; def: boolean}
        : T[K] extends unknown[]
          ? {t: 'a'; items: Val_0128<T[K][number]>}
          : T[K] extends object
            ? {t: 'o'; props: Val_0128<T[K]>}
            : {t: 'u'};
};
type EV_0128 = Val_0128<Entity_01_28>;

interface Registry_01_28 {
  entities: Map<string, Entity_01_28>;
  validators: EV_0128;
  paths: Set<EP_0128>;
  merged: DeepMerge_0128<Entity_01_28, {extra0128: string}>;
}

type CK_0128 =
  `p01.t28.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type {
  Entity_01_28,
  Registry_01_28,
  CK_0128,
  EP_0128,
  EV_0128,
  DeepMerge_0128,
};
