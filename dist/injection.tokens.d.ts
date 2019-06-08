import { BehaviorSubject } from 'rxjs';
import { Outlet } from './outlet';
import { RouterComponent } from './router.component';
export interface NavigationTrigger {
}
export declare function Router(): (target: Object, propertyKey: string) => void;
export declare type LazyChildren = (context?: any, commands?: any) => Promise<any>;
export declare type Router = Outlet;
export interface Route<C = any> {
    path: string;
    component?: C | Function;
    animate?: boolean;
    children?: Route<C>[] | LazyChildren;
    redirect?: string;
    freeze?: boolean;
    action?: LazyChildren;
    canActivate?: Function;
}
export declare const RouterRoutlet = "router-outlet";
export declare const RouterInitialized = "router-initialized";
export declare const Routes = "router-routes";
export declare const RouterOptions = "router-options";
export interface RouterOptions {
    baseUrl?: string;
    log?: boolean;
    freeze?: boolean;
}
export declare type Routes = Route<any>[];
export declare type RouterRoutlet = BehaviorSubject<Outlet>;
export declare type RouterInitialized = BehaviorSubject<RouterComponent>;
