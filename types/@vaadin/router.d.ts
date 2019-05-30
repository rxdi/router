
export interface Route {
    path: string;
    component: any;
    action?: any;
}

export declare class Router {
    constructor(element: any);
    setRoutes(routes: Route[]): void;
}