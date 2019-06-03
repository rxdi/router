import { ModuleService } from '@rxdi/core';
import { Route } from './injection.tokens';
export declare class CommonService {
    private moduleService;
    private routes;
    constructor(moduleService: ModuleService, routes: Route<any>[]);
    getMetaDescriptors(): any[];
}
