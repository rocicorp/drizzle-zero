// pkg-01/types-42 - heavy interconnected types

type DeepMerge_0142<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object
      ? U[K] extends object
        ? DeepMerge_0142<T[K], U[K]>
        : U[K]
      : U[K]
    : K extends keyof T
      ? T[K]
      : K extends keyof U
        ? U[K]
        : never;
};

interface Entity_01_42 {
  id: string;
  meta: {
    created: Date;
    updated: Date;
    version: number;
    tags: string[];
    attrs: Record<string, {v: unknown; t: string; ok: boolean}>;
  };
  rels: {parent: Entity_01_42 | null; children: Entity_01_42[]};
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
  d42: {x0142: number; y0142: string; z0142: boolean};
}

type Path_0142<T, D extends unknown[] = []> = D['length'] extends 6
  ? never
  : T extends object
    ? {
        [K in keyof T & string]: K | `${K}.${Path_0142<T[K], [...D, unknown]>}`;
      }[keyof T & string]
    : never;
type EP_0142 = Path_0142<Entity_01_42>;

type Val_0142<T> = {
  [K in keyof T]: T[K] extends string
    ? {t: 's'; min: number; max: number}
    : T[K] extends number
      ? {t: 'n'; min: number; max: number}
      : T[K] extends boolean
        ? {t: 'b'; def: boolean}
        : T[K] extends unknown[]
          ? {t: 'a'; items: Val_0142<T[K][number]>}
          : T[K] extends object
            ? {t: 'o'; props: Val_0142<T[K]>}
            : {t: 'u'};
};
type EV_0142 = Val_0142<Entity_01_42>;

interface Registry_01_42 {
  entities: Map<string, Entity_01_42>;
  validators: EV_0142;
  paths: Set<EP_0142>;
  merged: DeepMerge_0142<Entity_01_42, {extra0142: string}>;
}

type CK_0142 =
  `p01.t42.${'on' | 'off' | 'auto'}.${'dev' | 'stg' | 'prd'}.${'v1' | 'v2' | 'v3'}`;

export type {
  Entity_01_42,
  Registry_01_42,
  CK_0142,
  EP_0142,
  EV_0142,
  DeepMerge_0142,
};
