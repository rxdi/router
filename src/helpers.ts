import { BehaviorSubject } from 'rxjs';
import { Route, CanActivateResolver } from './injection.tokens';
import { Container } from '@rxdi/core';

export const ChildRoutesObservable = new BehaviorSubject(null);

function assignChildren(route: Route) {
  if (route.children && typeof route.children === 'function') {
    const lazyModule = route.children;
    route.children = async function(context, commands) {
      await lazyModule(context, commands);
      return ChildRoutesObservable.getValue();
    };
  }
  return route;
}

function assignAction(route: Route) {
  if (route.canActivate) {
    const guard: CanActivateResolver = Container.get(route.canActivate);
    if (route.action) {
      const originalAction = route.action;
      route.action = async function(context, commands) {
        await originalAction(context, commands);
        return guard.canActivate.bind(guard)(context, commands);
      }
    } else {
      route.action = guard.canActivate.bind(guard);
    }
  }
  return route;
}

function assignStaticIs(route: Route) {
  if (typeof route.component === 'function') {
    route.component = route.component.is();
  }
  return route;
}

export function loadRoutes(routes: Route[]) {
  const r = [...routes].map(route =>
    assignStaticIs(assignAction(assignChildren(route)))
  );
  ChildRoutesObservable.next(null);
  return r;
}
