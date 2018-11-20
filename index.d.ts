import { ModuleWithServices } from "@rxdi/core";
import { Route } from "./route.model";
export declare class RouterModule {
    static forRoot(r: Route[]): ModuleWithServices;
}
export * from './context-resolver.service';
export { Route } from './route.model';
export * from './history/index';
export * from './routes.service';
export * from './decorators/index';
