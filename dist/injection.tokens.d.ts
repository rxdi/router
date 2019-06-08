import { BehaviorSubject, Observable } from 'rxjs';
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
export interface CanActivateResolver {
    canActivate(context: CanActivateContext, commands: CanActivateCommands): CanActivateRedirect | boolean | Promise<boolean> | Observable<boolean> | void;
}
export declare type CanActivateRedirect = (path: string) => {
    from: string;
    params: any;
    pathname: string;
};
export interface CanActivateContext {
    chain: {
        route: Route;
        path: string;
        element: HTMLUnknownElement;
    }[];
    keys: any[];
    next: (resume?: any, parent?: any, prevResult?: any) => any;
}
export interface CanActivateCommands {
    component: () => HTMLUnknownElement;
    redirect: CanActivateRedirect;
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
