import { ModuleWithServices } from '@rxdi/core';
import { RouterComponent } from './router.component';
import { RouterOptions, Route } from './injection.tokens';
export declare class RouterModule {
    static forRoot<C>(routes: Route<C>[], options?: RouterOptions): ModuleWithServices;
}
export * from './injection.tokens';
export * from './outlet';
export * from './decorators';
declare global {
    interface HTMLElementTagNameMap {
        'router-outlet': RouterComponent;
    }
}
