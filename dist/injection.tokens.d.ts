import { InjectionToken } from '@rxdi/core';
export declare const RouterRoutlet: InjectionToken<unknown>;
export declare const Routes: InjectionToken<Route<any>[]>;
export declare const RouterOptions: InjectionToken<RouterOptions>;
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
export interface NavigationTrigger {
}
export declare function Router(): (target: any, propertyKey: any) => void;
