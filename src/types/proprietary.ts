import type { FC } from 'react';
import type { NextComponentType, NextPage } from 'next';

export type WithSEO = {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FCwChildren<T = Record<string, any> | undefined> = FC<
  { children: React.ReactNode } & Partial<T>
>;

export type NextPageWithAuth = NextPage & { auth: boolean };
export type NextComponentTypeWithAuth = NextComponentType & { auth?: boolean };

/* -------------------------------------------------------------------------- */
/*                                    Misc.                                    */
/* -------------------------------------------------------------------------- */

export type DeepPartial<T> = T extends object
  ? { [P in keyof T]?: DeepPartial<T[P]> }
  : T;

export type AnyPrimitive = string | number | boolean;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyFunction = (...args: any[]) => any;

export type ExtendProp<Obj, Prop, NewValue> = {
  [P in keyof Obj]: P extends Prop ? Obj[P] & NewValue : Obj[P];
};

export declare type Awaitable<T> = T | PromiseLike<T>;

export type Maybe = {
  string: string | null | undefined;
  number: string | null | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  object: Record<string, any> | null | undefined;
};

export interface StringObj {
  [p: string]: {
    [p: string]: string;
  };
}

export type Prettify<T> = {
  // @ SEE: https://youtu.be/2lCCKiWGlC0 (Matt Pocock)
  [K in keyof T]: T[K];
} & Record<string, unknown>;
