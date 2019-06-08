import { BehaviorSubject, isObservable } from 'rxjs';
import { Route, CanActivateResolver, CanActivateCommands, CanActivateContext, RouterOptions, RouteContext } from './injection.tokens';
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

async function activateGuard(result, commands, route: RouteContext) {
  if (isObservable(result)) {
    result = result.toPromise();
  }
  if (await result) {
    return result;
  } else {
    const routerOptions = Container.get(RouterOptions) as any;
    const redirect = commands.redirect(route.parent.path || '/');
    if (routerOptions.log) {
      console.error(`Guard ${route.canActivate['originalName']} activated!`);
    }
    return redirect;
  }
}

function assignAction(route: Route) {
  if (route.canActivate) {
    const guard: CanActivateResolver = Container.get(route.canActivate);
    if (route.action) {
      const originalAction = route.action;
      route.action = async function(context: CanActivateContext, commands: CanActivateCommands) {
        await originalAction(context, commands);
        const result = guard.canActivate.bind(guard)(context, commands);
        return activateGuard(result, commands, route as any);
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
