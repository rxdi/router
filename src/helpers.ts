import { BehaviorSubject } from 'rxjs';
import { Route } from './injection.tokens';

export const ChildRoutesObservable = new BehaviorSubject(null);

export function loadLazyRoutes(routes: Route[]) {
  const r = [...routes].map(route => {
    debugger
    if (route.children && typeof route.children === 'function') {
      const lazyModule = route.children;
      route.children = async function() {
        await lazyModule();
        return ChildRoutesObservable.getValue();
      };
    }
    if (typeof route.component === 'function') {
      route.component = route.component.is();
    }
    return route;
  });
  ChildRoutesObservable.next(null);
  return r;
}
