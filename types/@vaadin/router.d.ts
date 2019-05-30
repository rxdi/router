
export interface Route {
    path: string;
    component: string;
    action?: any;
}

export declare class Router {
    constructor(element: any);
    setRoutes(routes: Route[]): void;
}