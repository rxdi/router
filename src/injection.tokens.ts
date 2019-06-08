import { Container } from '@rxdi/core';
import { BehaviorSubject } from 'rxjs';
import { Outlet } from './outlet';
import { RouterComponent } from './router.component';

export interface NavigationTrigger {}

export function Router() {
  return (target: Object, propertyKey: string) => {
    Object.defineProperty(target, propertyKey, {
      get: () =>
        (Container.get(RouterRoutlet) as BehaviorSubject<Outlet>).getValue()
    });
  };
}

export type LazyChildren = (context?, commands?) => Promise<any>;
export type Router = Outlet;

export interface Route<C = any> {
  path: string;
  component?: C | Function;
  animate?: boolean;
  children?: Route<C>[] | LazyChildren;
  redirect?: string;
  freeze?: boolean;
  action?: LazyChildren;
  canActivate?: Function;

}

export const RouterRoutlet = 'router-outlet';
export const RouterInitialized = 'router-initialized';
export const Routes = 'router-routes';
export const RouterOptions = 'router-options';

export interface RouterOptions {
  baseUrl?: string;
  log?: boolean;
  freeze?: boolean;
}
export type Routes = Route<any>[];

export type RouterRoutlet = BehaviorSubject<Outlet>;
export type RouterInitialized = BehaviorSubject<RouterComponent>;
