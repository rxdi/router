import { InjectionToken } from '@rxdi/core';
import { BehaviorSubject } from 'rxjs';
import { Outlet } from './outlet';
import { RouterComponent } from './router.component';
export interface RouterOptions {
    baseUrl?: string;
    log?: boolean;
}
export interface Route<C> {
    path: string;
    component: C;
    children?: Route<C>[];
    redirect?: string;
    action?: () => Promise<any>;
}
export declare const RouterRoutlet = "router-outlet";
export declare const RouterInitialized = "router-initialized";
export declare const Routes: InjectionToken<Route<any>[]>;
export declare const RouterOptions: InjectionToken<RouterOptions>;
export declare type RouterRoutlet = BehaviorSubject<Outlet>;
export declare type RouterInitialized = BehaviorSubject<RouterComponent>;
