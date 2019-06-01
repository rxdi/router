import { InjectionToken } from '@rxdi/core';

export const Outlet = new InjectionToken('router-outlet');
export const Routes = new InjectionToken<Route<any>[]>('router-routes');
export const RouterOptions = new InjectionToken<RouterOptions>('router-options');

export interface RouterOptions {
  baseUrl: string;
}

export interface Route<C> {
  path: string;
  component: C;
  children?: Route<C>[];
  redirect?: string;
  action?: () => Promise<any>;
}

export interface NavigationTrigger {}