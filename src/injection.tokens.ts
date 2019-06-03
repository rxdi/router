import { InjectionToken, Container } from '@rxdi/core';
import { BehaviorSubject } from 'rxjs';
import { Outlet } from './outlet';

export const RouterRoutlet = new InjectionToken('router-outlet');
export const Routes = new InjectionToken<Route<any>[]>('router-routes');
export const RouterOptions = new InjectionToken<RouterOptions>(
  'router-options'
);


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

export function Router() {
  return (target, propertyKey) => {
    Object.defineProperty(target, propertyKey, {
      get: () => (Container.get('router-plate') as BehaviorSubject<Outlet>).getValue()
    });
  };
}