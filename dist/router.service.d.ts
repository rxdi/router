import { ModuleService } from '@rxdi/core';
import { Route } from './injection.tokens';
import { Outlet } from './outlet';
import { LitElement } from 'lit-element';
import { BehaviorSubject } from 'rxjs';
export declare class RouterService {
    private moduleService;
    private routes;
    private routerInitialized;
    private routerPlate;
    private subscription;
    constructor(moduleService: ModuleService, routes: Route<any>[], routerInitialized: BehaviorSubject<LitElement>, routerPlate: BehaviorSubject<Outlet>);
    getMetaDescriptors(): any[];
}
