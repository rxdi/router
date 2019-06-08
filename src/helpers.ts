import { BehaviorSubject } from 'rxjs';
import { Route } from './injection.tokens';
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
  if (route.canActivate && typeof route.children === 'function' && !route.action) {
    const guard = Container.get(route.canActivate);
    route.action = guard['canActivate'].bind(guard);
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
