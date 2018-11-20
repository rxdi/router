import { Observable, BehaviorSubject } from "rxjs";
export declare class Router {
    private locationBar;
    activatedRoute: BehaviorSubject<any>;
    url: string;
    constructor();
    private navigateInternal;
    navigate(route: string, options?: {
        params: any;
        trigger?: boolean;
        replace?: boolean;
    }): Observable<void>;
    onChange(): Observable<string>;
    private getQueryParams;
    getSnapshot(): {
        route: string;
        params: {};
    };
    private getAllUrlParams;
    private start;
    freeze(): Observable<boolean>;
    unfreeze(): Observable<boolean>;
}
