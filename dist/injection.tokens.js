import { Container } from '@rxdi/core';
export function Router() {
    return (target, propertyKey) => {
        Object.defineProperty(target, propertyKey, {
            get: () => Container.get(RouterRoutlet).getValue()
        });
    };
}
export const RouterRoutlet = 'router-outlet';
export const RouterInitialized = 'router-initialized';
export const Routes = 'router-routes';
export const RouterOptions = 'router-options';
