import { ModuleWithServices } from '@rxdi/core';
import { Route, RouterOptions } from './injection.tokens';
import { RouterComponent } from './router.component';
export declare class RouterModule {
    static forRoot<C>(routes: Route<C>[], options?: RouterOptions): ModuleWithServices;
}
export * from './injection.tokens';
export * from './outlet';
declare global {
    interface HTMLElementTagNameMap {
        'router-outlet': RouterComponent;
    }
}
