import { InjectionToken, Container } from '@rxdi/core';
export const RouterRoutlet = new InjectionToken('router-outlet');
export const Routes = new InjectionToken('router-routes');
export const RouterOptions = new InjectionToken('router-options');
export function Router() {
    return (target, propertyKey) => {
        Object.defineProperty(target, propertyKey, {
            get: () => Container.get('router-plate').getValue()
        });
    };
}
