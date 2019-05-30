import { ModuleWithServices } from '@rxdi/core';
import { Route } from './injection.tokens';
export declare class RouterModule {
    static forRoot<C>(element: string, routes: Route<C>[]): ModuleWithServices;
}
export * from './injection.tokens';
