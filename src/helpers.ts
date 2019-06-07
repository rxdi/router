import { BehaviorSubject } from 'rxjs';
import { Route } from './injection.tokens';
import { NotFoundPathConfig } from './not-found.component';

export const ChildRoutesObservable = new BehaviorSubject(null);

export function loadLazyRoutes(routes: Route[]) {

  const r = [...routes].map(route => {
    if (route.children && typeof route.children === 'function') {
      const lazyModule = route.children;
      route.children = async function() {
        await lazyModule();
        return ChildRoutesObservable.getValue();
      };
    }
    return route;
  });
  ChildRoutesObservable.next(null);
  return r;
}
