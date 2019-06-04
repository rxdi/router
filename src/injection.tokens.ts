import { Container } from '@rxdi/core';
import { BehaviorSubject } from 'rxjs';
import { Outlet } from './outlet';
import { RouterComponent } from './router.component';

export interface NavigationTrigger {}

export function Router() {
  return (target, propertyKey) => {
    Object.defineProperty(target, propertyKey, {
      get: () =>
        (Container.get(RouterRoutlet) as BehaviorSubject<Outlet>).getValue()
    });
  };
}
export type Router = Outlet;
export interface Route<C> {
  path: string;
  component: C;
  children?: Route<C>[];
  redirect?: string;
  action?: () => Promise<any>;
}

export const RouterRoutlet = 'router-outlet';
export const RouterInitialized = 'router-initialized';
export const Routes = 'router-routes';
export const RouterOptions = 'router-options';

export interface RouterOptions {
  baseUrl?: string;
  log?: boolean;
}
export type Routes = Route<any>[];

export type RouterRoutlet = BehaviorSubject<Outlet>;
export type RouterInitialized = BehaviorSubject<RouterComponent>;
